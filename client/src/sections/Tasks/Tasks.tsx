import React from 'react';
import {server} from '../../lib/api'
import {createdTask,DeleteTask,DeleteTaskVariables,Task,TasksList} from '../Tasks/types'
const TASKS = `
query Tasks{
    Tasks{
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
    /**
     * actions needed 
     * list tasks
     * create task
     * update task
     * delete task
     */
    const createTask = async () => {
        const {data} = await server.fetch<createdTask,Task>({query:CREATE_TASK,
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
    }
    const deleteTask = async () =>{
        const {data} = await server.fetch<DeleteTask,DeleteTaskVariables>({query:DELETE_TASKS, 
        variables: {id: '60b046f5cacd1b519044ea2e'}})
        console.log(data)

    }
    return (
        <div>
            <button onClick={fetchTasks}>fetch tasks</button>
            <button onClick={deleteTask}>delete task</button>
            <button onClick={createTask}>create task</button>
        </div>
    )
}