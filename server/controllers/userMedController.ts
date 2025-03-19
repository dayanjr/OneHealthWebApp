import { Request, Response } from "express";

import { selectUserDrugs, selectUserDrugRecordTable, selectUserDrugReportByDrug, selectUserDrugReport,selectUserTookDrugs, userTookDrug } from "../services/userMedQueries.js";

export const getUserDrugs = async(req:Request, res:Response) => {
    const { id } = req.params;
    try{
        const drugs = (await selectUserDrugs(parseInt(id)))?.rows;
        res.status(200).send(drugs);
    } catch (err: unknown) {
        if(err instanceof Error) {
            console.error(err.message);
        }else {
            console.error("An unknown error occurred");
        }
        res.status(500).send({
            err: "An error occurred while fetching your medication data"
        });
    }
}

export const addDrugRecord = async(req:Request, res:Response) => {
    const {user_id} = req.params;
    const {drug_id} = req.body;
    try{
        userTookDrug(parseInt(user_id),drug_id);
        res.status(200).send({
            message: "successfully added notification", 
        });        
    } catch (err: unknown) {
        if(err instanceof Error) {
            console.error(err.message);
        }else {
            console.error("An unknown error occurred");
        }
        res.status(500).send({
            err: "An error occurred while recording your the medication you took"
        });
    }
}

export const getDrugRecords = async(req:Request, res:Response) => {
    const {user_id} = req.params;
    try{
        const drug_records = (await selectUserTookDrugs(parseInt(user_id)))?.rows;
        res.status(200).send(drug_records);
    }catch(err:unknown) {
        if(err instanceof Error) {
            console.error(err.message);
        }else {
            console.error("An unknown error occurred");
        }
        res.status(500).send({
            err: "An error occurred while fetching your medication records"
        });
    }
}

export const getUserDrugRecordTable = async(req:Request, res:Response) => {
    const {user_id} = req.params;
    try{
        const drug_records = (await selectUserDrugRecordTable(parseInt(user_id)))?.rows;
        res.status(200).send(drug_records);
    }catch(err:unknown) {
        if(err instanceof Error) {
            console.error(err.message);
        }else { 
            console.error("An unknown error occurred");
        }
        res.status(500).send({
            err: "An error occurred while fetching your medication recording table"
        });
    }
}

export const getUserDrugReport = async(req:Request, res:Response) => {
    const {user_id} = req.params;
    try{
        const drug_report = (await selectUserDrugReport(parseInt(user_id)))?.rows;
        res.status(200).send(drug_report);
    }catch(err:unknown) {
        if(err instanceof Error) {
            console.error(err.message);
        }else {
            console.error("An unknown error occurred");
        }
        res.status(500).send({
            err: "An error occurred while fetching the drug report for the user"
        });
    }
}

export const getUserDrugReportByDrug = async(req:Request, res:Response) => {
    const {user_id,drug_id} = req.params;
    try{
        const drug_report = (await selectUserDrugReportByDrug(parseInt(user_id),parseInt(drug_id)))?.rows;
        res.status(200).send(drug_report);
    }catch(err:unknown) {
       if(err instanceof Error) {
            console.error(err.message);
        }
        else {
            console.error("An unknown error occurred");
        }
        res.status(500).send({
            err: "An error occurred while fetching the record for this drug"
        });
    }
}