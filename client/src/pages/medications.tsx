import { useEffect} from "react";
import { useAppContext } from "../contexts/userContexts";
import UserInfo from "../components/userInfo";
import LoggedOut from "../components/loggedOut";
import axios from "axios";
import MedicationRecords from "../components/medicationRecords";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import { FormControlLabel, FormGroup } from "@mui/material";
import { useMedications } from "../hooks/useMedications";
import { useUserMedicationsContext } from "../contexts/userMedicationsContexts";


export default function Medications() {
  const { sharedValue } = useAppContext();
  const { getMedications } = useMedications();

  const {userMedications} = useUserMedicationsContext();

  let counter = 0;
  const handleChange = (index:string) => {
    console.log(index);
    const checkBox = document.getElementById(index) as HTMLInputElement;
    checkBox.disabled = true;
  };
  
  function tookDrug(drug_number: number,index:string){
    axios.post(`http://localhost:3000/users/drugs/tookdrugs/${sharedValue.id}`,{
        drug_id: drug_number
    })
    .then((response)=>{
      console.log(response);
      handleChange(index);
    })
    .catch((error)=>{
      console.log(error)
    })
  }



  useEffect(() => {
    getMedications();
  }, []);
 
  if(sharedValue.name === ""){
    return(
      <>
      <LoggedOut />
      </>
  )}

  
  
  function MedicationTable() {
    return (
      <TableContainer component={Paper} sx={{width: "80%"}} >
        <Table sx={{ minWidth: 650}} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Medication Name</TableCell>
              <TableCell>Dosage</TableCell>
              <TableCell>Last Taken Today</TableCell>
              <TableCell>Last Taken</TableCell>
              <TableCell>Recording</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userMedications.map((row) => (
              counter = 1,
              <TableRow
                key={row.drug_id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell>{row.drug_id}</TableCell>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell>{row.dosage}</TableCell>
                <TableCell>
                  {row.last_taken_today
                    ? `${new Date(row.last_taken_today).getUTCHours() % 12 === 0 ? 12 :new Date(row.last_taken_today).getUTCHours() % 12}:${new Date(row.last_taken_today).getUTCMinutes() < 10 ? `0${new Date(row.last_taken_today).getUTCMinutes()}`: `${new Date(row.last_taken_today).getUTCMinutes()}`}${new Date(row.last_taken_today).getUTCHours() >= 12 ? 'PM' : 'AM'}`
                    : 'N/A'}
                </TableCell>
                <TableCell>
                  {row.last_taken
                    ? `${new Date(row.last_taken).toLocaleDateString()} ${new Date(row.last_taken).getUTCHours() % 12 === 0 ? 12 :new Date(row.last_taken).getUTCHours() % 12}:${new Date(row.last_taken).getUTCMinutes() < 10 ? `0${new Date(row.last_taken).getUTCMinutes()}`: `${new Date(row.last_taken).getUTCMinutes()}`}${new Date(row.last_taken).getUTCHours() >= 12 ? 'PM' : 'AM'}`
                    : 'N/A'}
                </TableCell>
                <TableCell><FormGroup>
                {Array.from({length: row.num_took}).map(()=> {
                  const index = counter++;
                  return(
                    <FormControlLabel control={ <Checkbox id={row.name+index as unknown as string} key={index} checked={true} disabled = {true} />} label = {'Dose '+ (index) } labelPlacement="end"/>
                  )
                })}
                {Array.from({length: row.num_required_daily - row.num_took}).map(()=> {
                  const index = counter++;
                  return(
                  <FormControlLabel control={ <Checkbox id={row.name+index as unknown as string} key={index} onChange={() => tookDrug(row.drug_id,row.name + index)} />} label = {'Dose '+ (index)} labelPlacement="end" />
                  )
                })}
                </FormGroup></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }


  return (
    <div >
      <h1>Medications</h1>
      <UserInfo />
      <div className="medication_info_table">
        <MedicationTable />
      </div>
      <div className="medication_records">
        <MedicationRecords />
      </div>
    </div>
  );
}