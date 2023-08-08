const { ApolloServer } = require('apollo-server')
const fs = require('fs')
const path = require('path')

let links = [{
    id: 'link-0',
    url: 'www.howtographql.com',
    description: 'Fullstack tutorial for GraphQL'
},
{
    id: 'link-1',
    url: 'www.elvirova.com',
    description: 'a gorgeous gummy'
}
]

const resolvers = {
    Query: {
        info: () => `This is a sample message.`,
        feed: () => links,
        link: (root, args) => {
            const filteredLink = links.filter(l => l.id === args.id)[0]
            return filteredLink
        }
    },

    Mutation: {
        post: (root, args) => {
            let idCount = links.length
            const link = {
                id: `link-${idCount++}`,
                description: args.description,
                url: args.url
            }
            links.push(link)
            return link
        },
        updateLink: (root, args) => {
            const updatedLink = {
                id: args.id,
                description: args.description,
                url: args.url
            }
            const newLinks = links.map(l => l.id === args.id ? { ...l, description: args.description, url: args.url } : l)
            links = newLinks
            return updatedLink
        },
        deleteLink: (root, args) => {
            const deletedLink = links.filter(l => l.id === args.id)[0]
            console.log(deletedLink)
            const updatedLinks = links.filter(l => l.id !== args.id)
            links = updatedLinks
            return deletedLink
        }
    }
}

const server = new ApolloServer({
    typeDefs: fs.readFileSync(
        path.join(__dirname, 'schema.graphql'),
        'utf8'
    ),
    resolvers
})

server.listen()
    .then(({ url }) => {
        console.log(`Server running on ${url}`)
    })