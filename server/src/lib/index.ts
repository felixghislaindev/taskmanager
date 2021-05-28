import { ObjectId, Collection } from 'mongodb'
export interface Task {
    _id: ObjectId, 
    title: string,
    description: string,
    status: string,
    author: string,
    created: string,
}
export interface CreateTask {
    insertedId:ObjectId
}
export interface TasksDb {
    tasks : Collection<Task>
}