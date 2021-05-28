import {ApolloServer} from "apollo-server-express"
import express ,{Application}from 'express';
import dotenv from 'dotenv';
dotenv.config();
import {typeDefs,resolvers} from './graphql/'
import {connectDb} from './database'

const port = 9000
const mount = async(app: Application)=> {
    const db = await connectDb()
    const server = new ApolloServer({typeDefs,resolvers, context: () => ({db})})
    server.applyMiddleware({ app,path: "/api"})
    app.get('/',(_req, res) =>res.send('/api is the endpoint to go to'))
    app.listen(process.env.PORT)
    console.log('listening on port'+port)
}
mount(express())