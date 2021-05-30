export interface Task {
    id?: string, 
    title: string,
    description: string,
    status: string,
    author: string,
    created: string,
}
export type TasksList = {
    tasks: Task[]
}
export interface createdTask{
    insertedId: string
}
export interface DeleteTask{
    task: Task
}
export interface DeleteTaskVariables{
    id: string
}