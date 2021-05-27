import {ApolloServer} from "apollo-server-express"
import express from 'express';
import {typeDefs,resolvers} from './graphql/'
const app = express()
const server = new ApolloServer({typeDefs,resolvers})
server.applyMiddleware({ app,path: "/api"})
const port = 9000
app.get('/',(_req, res) =>res.send('/api is the endpoint to go to'))
app.listen(port)
console.log('listening on port'+port)