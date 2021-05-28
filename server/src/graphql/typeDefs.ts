import {gql} from "apollo-server-express"
export const typeDefs = gql`
type Task{
    id: ID!
    title: String!
    description: String!
    status: String!
    author: String!
    created: String!
}
type CreatedTask {
    insertedId:ID!
}
type Query {
    Tasks: [Task!]!
}
type Mutation {
    createTask(title:String!, description:String,status:String,author:String,created:String):CreatedTask!
    updateTask(id:ID!, title:String!, description:String!, status:String): Task!
    deleteTask(id:ID!) : Task!
}
`