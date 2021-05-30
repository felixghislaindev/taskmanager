import {IResolvers} from "apollo-server-express"
import {ObjectId} from 'mongodb'
import {TasksDb,Task,CreateTask} from "../../../lib"
interface TASK {
    title: string,
    description: string,
    status: string,
    author: string,
    created:string
}
export const taskResolvers: IResolvers  = {
    Query:{
        Tasks: async (_root: undefined, _args: {}, {db}: {db: TasksDb}):
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
        updateTask: (_root: any, {title,description,status}: TASK,) =>{
            return {title,description,status}
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