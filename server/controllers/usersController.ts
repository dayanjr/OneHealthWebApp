import { Request, Response } from 'express';

import {selectAllUsers, selectUser, createUser, changeUser, removeUser, selectLocations, CheckDuplicate} from '../services/userQueries.js';

export const getAllUsers = async(req:Request, res:Response) => {
    try{
        const allUsers = (await selectAllUsers())?.rows;
        res.status(200).send(allUsers);
    } catch (err: unknown) {
        if(err instanceof Error) {
            console.error(err.message);
        }else {
            console.error("An unknown error occurred");
        }
        res.status(500).send({
            err: "An error occurred while fetching the users"
        });
    }
}

export const getUser = async(req:Request, res:Response) => {
    const { id } = req.params;
    try{
        const user = (await selectUser(parseInt(id)))?.rows;
        res.status(200).send(user);
    } catch(err: unknown) {
        // type narrowing to check if err is an instance of Error
        // if it is, log the message
        if(err instanceof Error) {
            console.error(err.message);
        } else {
            console.error("An unknown error occurred");
        }
        res.status(500).send({
            err: "An error occurred while fetching the user"
        });
    }
}

export const getUserByNameAndLocation = async(req:Request, res:Response) => {
    const { name, location } = req.params;
    try{
        const user = (await CheckDuplicate(name, location))?.rows;
        res.status(200).send(user);
    } catch (err: unknown) {
        if(err instanceof Error) {
            console.error(err.message);
        }
        else {
            console.error("An unknown error occurred");
        }
        res.status(500).send({  
            err: "An error occurred while checking if the user exists"
        });
    }
}

export const addUser = async(req:Request, res:Response) => {
    const { name, location, points } = req.body;
    try{
        createUser(name, location, points);
        res.status(200).send({
            message: "susccessfully added user",
        })
    } catch (err: unknown) {
        if(err instanceof Error) {
            console.error(err.message);
        }
        else {
            console.error("An unknown error occurred");
        }
        res.status(500).send({
            err: "An error occurred while adding the user"
        });
    }
}

export const updateUser = async(req:Request, res:Response) => {
    const { id } = req.params;
    const { name, location, points} = req.body;
    try{
        changeUser(parseInt(id), name, location, points);
        res.status(200).send({
            message: "successfully updated user",
        });
    } catch (err: unknown) {
        if(err instanceof Error) {
            console.error(err.message);
        }
        else {
            console.error("An unknown error occurred");
        }
        res.status(500).send({
            err: "An error occurred while updating the user"
        });
    }
}

export const deleteUser = async(req:Request, res:Response) => {
    const { id } = req.params;
    try{
        removeUser(parseInt(id));
        res.status(200).send({
            message: "successfully deleted user",
        });
    } catch (err: unknown) {
        if(err instanceof Error) {
            console.error(err.message);
        }
        else {
            console.error("An unknown error occurred");
        }
        res.status(500).send({
            err: "An error occurred while deleting the user"
        });
    }
}

export const getLocations = async(req:Request, res:Response) => {
    try{
        const locations = (await selectLocations())?.rows;
        res.status(200).send(locations);
    } catch (err: unknown) {
        if(err instanceof Error) {
        console.error(err.message);
        }
        else {
            console.error("An unknown error occurred");
        }
        res.status(500).send({
            err: "An error occurred while fetching the locations"
        });
    }
}



