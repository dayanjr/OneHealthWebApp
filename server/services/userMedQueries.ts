import pool from "../model/db.js";

export const selectUserDrugs = (id: number) => {
    const drugs = pool.query("SELECT u.id AS user_id,d.drug_id,d.name,ud.dosage, \
      ud.num_required_daily,COALESCE(daily_record.num_took,0)::integer AS num_took, \
      daily_record.last_taken_today,record.last_taken \
    FROM \
    	users u \
    JOIN \
    	user_drugs ud ON u.id = ud.user_id \
    JOIN \
    	drugs d ON ud.drug_id = d.drug_id \
    LEFT JOIN ( \
    SELECT drug_id, count(*) AS num_took, MAX(took_drug) AS last_taken_today FROM user_took_drugs \
    WHERE user_id = $1 AND DATE(took_drug) = CURRENT_DATE \
    GROUP BY drug_id \
    ) daily_record ON d.drug_id = daily_record.drug_id \
    LEFT JOIN (SELECT drug_id,MAX(took_drug) AS last_taken FROM user_took_drugs \
    WHERE user_id = $1 \
    GROUP BY drug_id) record ON d.drug_id = record.drug_id \
    WHERE \
    	u.id = $1;", [id]);
    return drugs;
  }
  
  export const userTookDrug = (user_id: number, drug_id:number) => {
    pool.query("INSERT INTO user_took_drugs (user_id,drug_id,took_drug) VALUES($1,$2,CURRENT_TIMESTAMP)", [user_id,drug_id])
  }
  
  export const selectUserTookDrugs = (user_id:number) => {
    const drug_records = pool.query("SELECT ROW_NUMBER() OVER (ORDER BY took_drug) \
      AS user_took_drugs_id,name, took_drug from user_took_drugs\
    JOIN drugs ON user_took_drugs.drug_id = drugs.drug_id\
    WHERE user_id = $1",[user_id]);
    return drug_records;
  }
  
  export const selectUserDrugRecordTable = (user_id:number) => {
    const drug_records = pool.query("\
  WITH user_dates AS(SELECT \
      u.id AS user_id,\
      u.name AS user_name, \
      ud.drug_id,\
    ud.num_required_daily,\
      ud.dosage,\
      d.name AS drug_name, \
      date(gs.date) AS sequence_date \
  FROM \
      users u \
  JOIN user_drugs ud ON u.id = ud.user_id \
  JOIN drugs d ON ud.drug_id = d.drug_id \
  CROSS JOIN LATERAL generate_series( \
      u.created_at::date,\
      CURRENT_DATE,\
      '1 day'::interval\
  ) AS gs(date)\
  WHERE u.id = $1)\
  SELECT \
  ROW_NUMBER() OVER (PARTITION BY ud.user_id ORDER BY sequence_date DESC) AS user_drug_record_id,\
  ud.user_id,\
  ud.user_name,\
  ud.sequence_date,\
  ud.drug_id,\
  ud.drug_name,\
  ud.dosage, \
  CONCAT(count(ut.drug_id),'/',ud.num_required_daily) AS num_drugs_taken \
  FROM user_dates ud \
  LEFT JOIN user_took_drugs ut ON ud.sequence_date = date(ut.took_drug) AND ud.drug_id = ut.drug_id AND ud.user_id = ut.user_id \
  GROUP BY ud.user_id,ud.user_name,ud.sequence_date,ud.drug_id,ud.drug_name,ud.dosage,ud.num_required_daily \
  ORDER BY ud.sequence_date DESC",[user_id])
    return drug_records;
  }
  
  export const selectUserDrugReport = (user_id:number) => {
    const drug_report = pool.query("SELECT ROW_NUMBER() OVER (ORDER BY drug_report.user_id) AS ID,drug_report.user_id,\
       v.med_stats, v.quantity::integer \
  FROM(SELECT user_id,SUM(num_took) AS num_meds_taken, SUM(num_required_daily)-Sum(num_took) AS num_meds_remaining \
  FROM (SELECT u.id AS user_id,d.drug_id,d.name,ud.dosage,ud.num_required_daily,COALESCE(record.num_took,0) AS num_took \
  FROM \
      users u \
  JOIN \
      user_drugs ud ON u.id = ud.user_id \
  JOIN \
      drugs d ON ud.drug_id = d.drug_id \
  LEFT JOIN ( \
  SELECT drug_id, count(*) AS num_took FROM user_took_drugs \
  WHERE user_id = $1 AND DATE(took_drug) = CURRENT_DATE \
  GROUP BY drug_id \
  ) record ON d.drug_id = record.drug_id \
  WHERE \
      u.id = $1) \
  GROUP BY user_id) AS drug_report \
  CROSS JOIN LATERAL( \
      VALUES \
          ('num_meds_took', drug_report.num_meds_taken), \
          ('num_meds_reamining', drug_report.num_meds_remaining) \
  ) AS v(med_stats,quantity)", [user_id])
  return drug_report;}
  
  
  export const selectUserDrugReportByDrug = (user_id:number,drug_id:number) => {
    const drug_report = pool.query("SELECT ROW_NUMBER() OVER (ORDER BY drug_report.user_id) AS ID,drug_report.user_id,\
       v.med_stats, v.quantity::integer \
  FROM(SELECT user_id,drug_id,SUM(num_took) AS num_meds_taken, SUM(num_required_daily)-Sum(num_took) AS num_meds_remaining \
  FROM (SELECT u.id AS user_id,d.drug_id,d.name,ud.dosage,ud.num_required_daily,COALESCE(record.num_took,0) AS num_took \
  FROM \
      users u \
  JOIN \
      user_drugs ud ON u.id = ud.user_id \
  JOIN \
      drugs d ON ud.drug_id = d.drug_id \
  LEFT JOIN ( \
  SELECT drug_id, count(*) AS num_took FROM user_took_drugs \
  WHERE user_id = $1 AND DATE(took_drug) = CURRENT_DATE \
  GROUP BY drug_id \
  ) record ON d.drug_id = record.drug_id \
  WHERE \
      u.id = $1 AND d.drug_id = $2) \
  GROUP BY user_id,drug_id) AS drug_report \
  CROSS JOIN LATERAL( \
      VALUES \
          ('num_meds_took', drug_report.num_meds_taken), \
          ('num_meds_reamining', drug_report.num_meds_remaining) \
  ) AS v(med_stats,quantity)", [user_id,drug_id])
   return drug_report;
  }
  