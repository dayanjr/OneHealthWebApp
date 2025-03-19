import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import axios from "axios";
import { useAppContext } from "../contexts/userContexts";
import { useState} from "react";
import toTitleCase from '../utils/titleCase';


// const columns: GridColDef[] = [
//   { field: 'Venlafaxine', headerName: 'Venlafaxine', width: 475 },
//   { field: 'Tylenol', headerName: 'Tylenol', width: 475 },
//   { field: 'sequence_date', headerName: 'DATE', width: 475 },
// ];

const paginationModel = { page: 0, pageSize: 5 };


interface DataRow {
    [key: string]: any;
  }


interface MedicationRecordProps {
    user_drug_record_id: number;
    user_id: number;
    user_name: string;
    drug_id: number;
    drug_name: string;
    sequence_date: string;
    num_drugs_taken: number;
  }
   
   

  export default function MedicationRecords(){

    const options:any  = { year: 'numeric', month: 'long', day: 'numeric',timeZone: 'UTC' };
    const { sharedValue } = useAppContext();
    const [tableData, setTableData] = useState<any[]>([]);
    const [columns, setColumns] = useState<GridColDef[]>([]);
    const [showRecordTable,setShowRecordTable] = useState<boolean>(false)

    const transformData = (data: MedicationRecordProps[]) => {
      return data.map(row => ({
        user_drug_record_id: row.user_drug_record_id,
        user_id: row.user_id,
        user_name: row.user_name,
        drug_id: row.drug_id,
        drug_name: row.drug_name,
        date: new Date(row.sequence_date).toLocaleDateString('en-US', options),
        num_drugs_taken: row.num_drugs_taken,
      }));
    };

  function getRecords(){
      axios.get(`http://localhost:3000/users/drugs/tookdrugs/${sharedValue.id}/table`).then((response)=>{
        console.log(response.data);
          setUpRecords(response.data);
    })
      setShowRecordTable(true)
  }

  function setUpRecords(data: MedicationRecordProps[]) {
    setTableData(pivotTable(transformData(data), 'date', 'drug_name', 'num_drugs_taken'));
    console.log("Column Names:", Object.keys(pivotTable(transformData(data), 'date', 'drug_name', 'num_drugs_taken')[0]).length);
    console.log(pivotTable(transformData(data), 'date', 'drug_name', 'num_drugs_taken'));
    if(tableData.length == 0){
    Object.keys(pivotTable(transformData(data), 'date', 'drug_name', 'num_drugs_taken')[0]).forEach((column) => {
          // columns.push({ field: column, headerName: column, width: 475 });
          setColumns((prevColumns) => [
            ...prevColumns,
            { field: column, headerName: toTitleCase(column), width: 1100/Object.keys(pivotTable(transformData(data), 'date', 'drug_name', 'num_drugs_taken')[0]).length},
          ]);
    });
  }
  setShowRecordTable(true);

  }

  function pivotTable(data: DataRow[], rowKey: string, colKey: string, valueKey: string): DataRow[] {
    // Get unique column values to become new columns
    const uniqueColumns = [...new Set(data.map(item => item[colKey]))].sort();
    
    // Group by the row identifier
    const groupedData = data.reduce((acc, curr) => {
        const rowId = curr[rowKey];
        if (!acc[rowId]) {
            acc[rowId] = {};
        }
        acc[rowId][curr[colKey]] = curr[valueKey];
        return acc;
    }, {} as { [key: string]: { [key: string]: any } });

    // Convert grouped data to final pivoted format
    const pivotedData = Object.entries(groupedData).map(([rowId, values]) => {
        const row: DataRow = { [rowKey]: rowId };
        uniqueColumns.forEach(col => {
            row[col.toString()] = values[col] || null;
        });
        return row;
    });
    return pivotedData;
}

  function DrugRecordsTable() {

    return (
      <>
      <button onClick={()=>setShowRecordTable(false)}>Hide Records</button>
      <div className='records_table'>
      <Paper sx={{ height: 405, width: '80%' }}>
      <DataGrid
        rows={tableData}
        columns={columns}
        getRowId={(row) => row.date}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        sx={{ border: 0 }}
      />
    </Paper>
    </div>
    </>
    )
  }
  return(
    <>
    <button onClick={()=> getRecords()}> Show Records</button>
    {showRecordTable && <DrugRecordsTable />}
    </>
  )
}