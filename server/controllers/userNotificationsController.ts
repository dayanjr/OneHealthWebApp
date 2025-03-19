import { Request, Response } from "express";

import { selectAllNotifications, selectUserNotifications, createNotification } from "../services/userNotificationQueries.js";

export const getAllNotifications = async(req:Request, res:Response) => {
    try{
        const notifications = (await selectAllNotifications())?.rows;
        res.status(200).send(notifications);
    } catch (err: unknown) {
        if(err instanceof Error) {
            console.error(err.message);
        }else{
            console.error("An unknown error occurred");
        }
        res.status(500).send({
            err: "An error occurred while fetching all notifications"
        });
    }
}

export const getUserNotifications = async(req:Request, res:Response) => {
    const { id } = req.params;
    try{
        const notifications = (await selectUserNotifications(parseInt(id)))?.rows;
        res.status(200).send(notifications);
    } catch (err: unknown) {
        if(err instanceof Error) {
            console.error(err.message);
        }else{
            console.error("An unknown error occurred");
        }
        res.status(500).send({
            err: "An error occurred while fetching your notifications"
        });
    }
}


export const addNotification = async(req:Request, res:Response) => {
    const { user_id, notification_id } = req.body;
    try{
        createNotification(user_id, notification_id);
        res.status(200).send({
            message: "successfully added notification",
        });
    } catch (err: unknown) {
        if(err instanceof Error) {
            console.error(err.message);
        }else{
            console.error("An unknown error occurred");
        }
        res.status(500).send({
            err: "An error occurred while adding the notification to your account"
        });
    }
}