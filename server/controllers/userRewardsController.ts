import { Request, Response } from "express";

import {inputReward, selectRewards, selectPopularPrizes, selectPopularPrizesByUser, selectPopularPrizesByLocation} from "../services/userRewardsQueries.js";

export const addReward = async(req:Request, res:Response) => {
    const { user_id, reward_id , price_at_pruchase} = req.body;
    try{
        inputReward(user_id, reward_id, price_at_pruchase);
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
            err: "An error occurred while adding the reward to your account"  
        });
    }
}

export const getUserRewards = async(req:Request, res:Response) => {
    const { user_id } = req.params;
    try{
        const rewards = (await selectRewards(parseInt(user_id)))?.rows; 
        res.status(200).send(rewards);
    } catch (err: unknown) {
        if(err instanceof Error) {
            console.error(err.message);
        }else {
            console.error("An unknown error occurred");
        }
        res.status(500).send({ 
            err: "An error occurred while fetching your rewards"
        });
    }
}

export const getPopularPrizes = async(req:Request, res:Response) => {
    try{
        const rewards = (await selectPopularPrizes())?.rows; 
        res.status(200).send(rewards);
    } catch (err: unknown) {
        if(err instanceof Error) {
            console.error(err.message);
        }else {
            console.error("An unknown error occurred");
        }
        res.status(500).send({
            err: "An error occurred while fetching the popular prizes"
        });
    }
}

export const getPopularPrizesByUser = async(req:Request, res:Response) => {
    const { user_id } = req.params;
    try{
        const rewards = (await selectPopularPrizesByUser(parseInt(user_id)))?.rows; 
        res.status(200).send(rewards);
    } catch (err: unknown) {
        if(err instanceof Error) {
            console.error(err.message);
        }else {
            console.error("An unknown error occurred");
        }
        res.status(500).send({
            err: "An error occurred while fetching your most popular prizes"
        });
    }
}

export const getPopularPrizesByLocation = async(req:Request, res:Response) => {
    const { location } = req.params;
    try{
        const rewards = (await selectPopularPrizesByLocation(location))?.rows; 
        res.status(200).send(rewards);
    } catch (err: unknown) {
        if(err instanceof Error) {
            console.error(err.message);
        }else {
            console.error("An unknown error occurred");
        }
        res.status(500).send({
            err: "An error occurred while fetching the popular prizes for the location"
        });
    }
}