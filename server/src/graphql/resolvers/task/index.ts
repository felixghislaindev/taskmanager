import {IResolvers} from "apollo-server-express"
import {ObjectId} from 'mongodb'
import {TasksDb,Task,CreateTask} from "../../../lib"
interface TASK {
    id:string,
    title: string,
    description: string,
    status: string,
    author: string,
    created:string
}
interface UpdatedTask {
    matchedCount : number, 
    modifiedCount : number
}
export const taskResolvers: IResolvers  = {
    Query:{
        tasks: async (_root: undefined, _args: {}, {db}: {db: TasksDb}):
        Promise<Task[]> => { return await db.tasks.find({}).toArray() }
    },
    Mutation: {
        createTask: async(_root: any, 
            {title,description,status,author,created}:TASK,
            {db}: {db: TasksDb}
            ):Promise<CreateTask> =>{
                const createdTask = await db.tasks.insertOne({_id: new ObjectId(), title, description,status,author,created});
                return {insertedId : new ObjectId(createdTask.insertedId)}
        },
        updateTask: async(_root: any, {id,title,description,status}: TASK, {db}: {db: TasksDb}):
        Promise<UpdatedTask> =>{
            const updatedTask = await db.tasks.updateOne({_id: new ObjectId(id)},{$set: {title, description, status}})
            if(!updatedTask.modifiedCount){
                throw new Error("Could not update the selected task")
            }
            return updatedTask
        },
        deleteTask: async (_root: any, {id}:{id:string},{db}: {db: TasksDb}) =>{
            const deleteTask = await db.tasks.findOneAndDelete({_id: new ObjectId(id)})
            if(!deleteTask.value) {
                throw new Error('could not delete this task try again')
            }
            return deleteTask.value;
        }
    },
    Task: {
        id: (task:Task): string => task._id.toString()
    }
}