
/**
 *
 * create connections between sever and mongo db database
 *
 */
 
import { MongoClient } from "mongodb"
import {TasksDb} from '../lib'

const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_USER_PASSWORD}@${process.env.DB_CLUSTER}.mjz00.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
export const connectDb = async(): Promise<TasksDb>=> {
    const client = await MongoClient.connect(url, { 
        useNewUrlParser:true,
        useUnifiedTopology: true
    })
    const db = client.db("taskManager");
    return {tasks: db.collection("tasks")}
}