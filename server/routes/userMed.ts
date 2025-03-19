// userRouter.get('/drugs/:id', getUserDrugs);
// userRouter.get('/tookdrugs/:user_id', getDrugRecords);
// userRouter.post('/tookdrugs/:user_id', addDrugRecord);
// userRouter.get('/tookdrugs/:user_id/table', getUserDrugRecordTable);
// userRouter.get('/tookdrugs/:user_id/report', getUserDrugReport);
// userRouter.get('/tookdrugs/:user_id/report/:drug_id', getUserDrugReportByDrug);

import express from 'express';

import cors from 'cors';

import 'dotenv/config';


const userMedicationsRouter = express.Router();

userMedicationsRouter.use(cors());

userMedicationsRouter.use(express.json());


import {getUserDrugs, addDrugRecord, getDrugRecords, getUserDrugRecordTable, getUserDrugReport, getUserDrugReportByDrug} from '../controllers/userMedController.js';

userMedicationsRouter.get('/:id', getUserDrugs);
userMedicationsRouter.get('/tookdrugs/:user_id', getDrugRecords);
userMedicationsRouter.post('/tookdrugs/:user_id', addDrugRecord);
userMedicationsRouter.get('/tookdrugs/:user_id/table', getUserDrugRecordTable);
userMedicationsRouter.get('/tookdrugs/:user_id/report', getUserDrugReport);
userMedicationsRouter.get('/tookdrugs/:user_id/report/:drug_id', getUserDrugReportByDrug);

export default userMedicationsRouter;