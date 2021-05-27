import {IResolvers} from "apollo-server-express"
interface TASK {
    id: string,
    title: string,
    description: string,
    status: string,
    author: string,
    created:string
}
export const resolvers: IResolvers  = {
    Query:{
        Tasks: () => { return 'will return the list of tasks'}
    },
    Mutation: {
        createTask: (_root: any, {id,title,description,status,author,created}:TASK) =>{
            return {id,title,description,status,author,created}
        },
        updateTask: (_root: any, {id,title,description,status}: TASK) =>{
            return {id,title,description,status}
        },
        deleteTask: (_root: any, {id}:TASK) =>{}
    }
}