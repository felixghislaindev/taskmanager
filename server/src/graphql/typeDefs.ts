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
type UpdatedTask {
    matchedCount: Int!, 
    modifiedCount: Int!
}
type CreatedTask {
    insertedId:ID!
}
type Query {
    tasks: [Task!]!
}
type Mutation {
    createTask(title:String!, description:String!,status:String!,author:String!,created:String!):CreatedTask!
    updateTask(id:ID!, title:String!, description:String!, status:Boolean!): UpdatedTask!
    deleteTask(id:ID!) : Task!
}
`