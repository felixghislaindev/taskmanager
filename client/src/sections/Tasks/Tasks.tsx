import React, {useState,useEffect} from 'react';
import {server} from '../../lib/api'
import {
    CreateTask,
    CreatedTask,
    DeleteTask,
    DeleteTaskVariables,
    Task,
    TasksList} from '../Tasks/types'
const TASKS = `
query Tasks{
    tasks{
        id
        title
        description
        status
        author
        created
    }
}
`
const CREATE_TASK = `
mutation CreateTask(
        $title:String!, 
        $description:String!,
        $status:String!,
        $author:String!,
        $created:String!
){
    createTask(
        title:$title, 
        description:$description,
        status:$status,
        author:$author,
        created:$created
    ){
        insertedId
    }
}
`
const DELETE_TASKS = `
mutation DeleteTask($id: ID!) {
    deleteTask(id: $id){
        id
    }
}
`

export const Tasks = () => {
    const [tasksList,setTasksList] = useState<Task[]|null>(null);
    /**
     * actions needed 
     * list tasks
     * create task
     * update task
     * delete task
     */
    const createTask = async () => {
        const {data} = await server.fetch<CreatedTask,CreateTask>({query:CREATE_TASK,
        variables: {
        title:"created by our client",
        description:"i work",
        status:"none",
        author:"felix",
        created:"none"
        }
    })
        console.log(data)
    }
    const fetchTasks = async () =>{
        const {data} = await server.fetch<TasksList>({query:TASKS})
        console.log(data)
        setTasksList(data.tasks)
    }
    const deleteTask = async (id:string) =>{
        const {data} = await server.fetch<DeleteTask,DeleteTaskVariables>({query:DELETE_TASKS, 
        variables: {id}})
        console.log(data)
    }
    // const updateTask = () => {}
    // tasks listing
    const tasksListing = tasksList ? (
        <ul>
            {
                tasksList.map(task => {
                    return (
                            <li key={task.id}>
                                {task.title}
                                <button onClick={() => deleteTask(task.id)}>Delete Task</button>
                                </li>
                    )
                })
            }
        </ul>
    ) : null
    return (
        <div>
            {tasksListing}
            <button onClick={fetchTasks}>fetch tasks</button>
            <button onClick={createTask}>create task</button>
        </div>
    )
}