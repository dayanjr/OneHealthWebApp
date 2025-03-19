import { useMedications } from "../hooks/useMedications";
import { useUserMedicationsContext } from "../contexts/userMedicationsContexts"
import { useEffect, useState} from "react";
import axios from "axios";
import { useAppContext } from "../contexts/userContexts";
import { DonutChart } from "../assets/donutChart";


interface DrugReport {
    id: number;
    user_id: number;
    med_stats: string;
    quantity: number;
}

export default function DrugDashboard(){
    const { getMedications } = useMedications();
    const {userMedications} = useUserMedicationsContext();
    const { sharedValue } = useAppContext();
    const [report, setReport] = useState<DrugReport[]>([]);
    const [filter, setFilter] = useState<number>(0);


    function getDrugReport(){
        axios.get(`http://localhost:3000/users/drugs/tookdrugs/${sharedValue.id}/report`).then((response)=>{
            console.log(response.data);
            setReport(response.data);
        })
    }

    function getDrugReportByDrug(drug_id:number){
        if(drug_id === 0){
            getDrugReport();
            setFilter(0);
            return;
        }
        axios.get(`http://localhost:3000/users/drugs/tookdrugs/${sharedValue.id}/report/${drug_id}`).then((response)=>{
            console.log(response.data);
            setReport(response.data);
            setFilter(drug_id);
        }
        )
    }

    function filterMedications(med: {drug_id:number}){
        console.log(med);
        if(filter !== 0){
            if(med.drug_id === filter){
                return true;
            }
            return false;
        }
        return true;

    }

    useEffect(() => {
        getMedications();
        getDrugReport();
      }, []);
    return(
        <div id = "notification-preview" className = "card">
            <h2>Medications</h2>
            <select name="selectedMedication" id="selectedMedication" onChange={(e) => getDrugReportByDrug(parseInt(e.target.value))}>
                <option value="0">All Medications</option>
                {userMedications.map((med) => (
                    <option key={med.drug_id} value={med.drug_id}>{med.name}</option>
                ))}
            </select>
            <div className="medication">
            </div>
                <div id="donut_chart">
                    {report.length === 0 ? (
                        <p>No medications on record</p>
                    ) : (
                        <>
                        <h3>Meds Taken / Meds Required</h3>
                        <p>{report[0].quantity}/{report[1].quantity + report[0].quantity}</p>
                        </>
                    )}
                     <DonutChart data = {report} width={150} height={150}/>
                     {userMedications.filter(filterMedications).map((med) => (
                        <div key={med.drug_id} className="medication">
                            {med.last_taken_today === null ? (
                                <p> Last Time Taken {med.name} Today: N/A</p>
                            ) : (
                                <p> Last Time Taken {med.name} Today: {new Date(med.last_taken_today).getUTCHours() % 12 === 0 ? 12 :new Date(med.last_taken_today).getUTCHours() % 12}:{new Date(med.last_taken_today).getUTCMinutes() < 10? `0${new Date(med.last_taken_today).getUTCMinutes()}`: `${new Date(med.last_taken_today).getUTCMinutes()}`}{new Date(med.last_taken_today).getUTCHours() >= 12 ? 'PM': 'AM'}</p>
                            )}
                        </div>
                     ))}
                </div>
        </div>
    )
}