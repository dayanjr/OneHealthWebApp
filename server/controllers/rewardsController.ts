import { Request, Response} from 'express';

import { selectAllRewards, selectAllActiveRewards,selectRewardById, insertReward, changeReward, CheckDuplicateReward } from '../services/rewardsQueries.js';

export const getRewards =  async(req:Request, res:Response) => {
    try{
        const allRewards = (await selectAllRewards())?.rows;
        res.status(200).send(allRewards);
    } catch (err: unknown) {
        if(err instanceof Error) {
            console.error(err.message);
        }else {
            console.error("An unknown error occurred");
        }
        res.status(500).send({  
            err: "An error occurred while fetching all rewards"
        });
    }
}

export const getRewardByName = async(req:Request, res:Response) => {
    const { name } = req.params;
    try{
        const reward = (await CheckDuplicateReward(name))?.rows;
        res.status(200).send(reward);
    } catch (err: unknown) {
        if(err instanceof Error) {
            console.error(err.message);
        }else { 
            console.error("An unknown error occurred");
        }
        res.status(500).send({
            err: "An error occurred while checking for duplicate rewards"
        });
    }
}

export const getActiveRewards = async(req:Request, res:Response) => {
    try{
        const allActiveRewards = (await selectAllActiveRewards())?.rows;
        res.status(200).send(allActiveRewards);
    } catch (err: unknown) {
        if(err instanceof Error) {
            console.error(err.message);
        }else{
            console.error("An unknown error occurred");
        }
        res.status(500).send({
            err: "An error occurred while fetching all active rewards"
        });
    }
}

export const addReward = async(req:Request, res:Response) => {
    const { name, points } = req.body;
    try{
        insertReward(name, points);
        res.status(200).send({
            message: "susccessfully added reward",
        })
    } catch (err: unknown) {
        if(err instanceof Error) {
            console.error(err.message);
        }else {
            console.error("An unknown error occurred");
        }
        res.status(500).send({
            err: "An error occurred while adding the reward"
        });
    }
}

export const getReward = async(req:Request, res:Response) => {
    const { id } = req.params;
    try{
        const reward = (await selectRewardById(parseInt(id)))?.rows; 
        res.status(200).send(reward);
    } catch (err: unknown) {
        if(err instanceof Error) {
            console.error(err.message);
        }else {
            console.error("An unknown error occurred");
        }
        res.status(500).send({
            err: "An error occurred while fetching the reward"
        });
    }
}


export const updateReward = async(req:Request, res:Response) => {
    const { id } = req.params;
    const { name, points , status} = req.body;
    try{
        changeReward(parseInt(id), name, points, status);
        res.status(200).send({
            message: "susccessfully updated reward",
        })
    } catch (err: unknown) {
        if(err instanceof Error) {
            console.error(err.message);
        }else {
            console.error("An unknown error occurred");
        }
        res.status(500).send({
            err: "An error occurred while updating the reward"
        });
    }
}