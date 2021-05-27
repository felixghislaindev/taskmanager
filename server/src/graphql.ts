import {GraphQLSchema,GraphQLObjectType,GraphQLID, GraphQLString,GraphQLNonNull,GraphQLList} from "graphql"
const task = new GraphQLObjectType({
    name:"Task",
    fields:{
        id: {type:GraphQLNonNull(GraphQLID)},
        title: {type:GraphQLNonNull(GraphQLString)},
        description: {type:GraphQLNonNull(GraphQLString)},
        status: {type:GraphQLNonNull(GraphQLString)},
        author: {type:GraphQLNonNull(GraphQLString)},
        created: {type:GraphQLNonNull(GraphQLString)},
    }
})
const query = new GraphQLObjectType({
    name:"Query",
    fields:{
        tasks: {type: GraphQLList(GraphQLNonNull(task))}
    }
})
const mutation = new GraphQLObjectType({
    name:"Mutation",
    fields:{
        createTask:{
            type: GraphQLNonNull(task),
            args: {
                id: {type: GraphQLNonNull(GraphQLID)},
                title: {type:GraphQLNonNull(GraphQLString)},
                description: {type:GraphQLNonNull(GraphQLString)},
                status: {type:GraphQLNonNull(GraphQLString)},
                author: {type:GraphQLNonNull(GraphQLString)},
                created: {type:GraphQLNonNull(GraphQLString)},
            },
            resolve:(_root, {id,title,description,status,author,created}) => {
                return {id,title,description,status,author,created}
            }
        },
        updateTask:{
            type:GraphQLNonNull(task),
            args:{
                id: {type:GraphQLNonNull(GraphQLID)},
                title: {type:GraphQLNonNull(GraphQLString)},
                description: {type:GraphQLNonNull(GraphQLString)},
                status: {type:GraphQLNonNull(GraphQLString)},
            },
            resolve:(_root,{id,title,description,status}) => {}
        },
        deleteTask:{
            type: GraphQLNonNull(task),
            args:{
                id: {type:GraphQLNonNull(GraphQLID)},
            },
            resolve:(_root,{id}) => {}
        },
    }
})
export const schema = new GraphQLSchema({query,mutation})