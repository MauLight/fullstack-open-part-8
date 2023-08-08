const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { GraphQLError } = require('graphql')
const { v1: uuid } = require('uuid')

let people = [
    {
        name: "Arto Hellas",
        phone: "040-123543",
        street: "Tapiolankatu 5 A",
        city: "Espoo",
        id: "3d594650-3436-11e9-bc57-8b80ba54c431"
    },
    {
        name: "Matti Luukkainen",
        phone: "040-432342",
        street: "Malminkaari 10 A",
        city: "Helsinki",
        id: '3d599470-3436-11e9-bc57-8b80ba54c431'
    },
    {
        name: "Venla Ruuska",
        street: "Nallemäentie 22 C",
        city: "Helsinki",
        id: '3d599471-3436-11e9-bc57-8b80ba54c431'
    },
]

//GraphQL schema
const typeDefs = `

type Address {
    street: String!
    city: String!
}

type Person {
    name: String!
    phone: String
    address: Address!
    id: ID!
}

enum YesNo {
    YES
    NO
}

type Query {
    peopleCount: Int!
    allPeople(phone: YesNo): [Person!]!
    findPerson(name: String!): Person 
}

type Mutation {
    addPerson(
        name: String!
        phone: String
        street: String!
        city: String!
    ): Person

    editNumber(
        name: String!
        phone: String!
    ): Person
}

`
//How graphQl queries are resolved
const resolvers = {
    Query: {
        peopleCount: () => people.length,
        allPeople: (root, args) => {
            if (!args.phone) {
                return people
            }
            const byPhone = (person) =>
                args.phone === 'YES' ? person.phone : !person.phone
            return people.filter(byPhone)
        },
        findPerson: (root, args) => people.find(p => p.name === args.name)
    },

    Person: {
        address: (root) => {
            return {
                street: root.street,
                city: root.city
            }
        }
    },

    Mutation: {
        addPerson: (root, args) => {
            if (people.find(p => p.name === args.name)) {
              throw new GraphQLError('Name must be unique', {
                extensions: {
                  code: 'BAD_USER_INPUT',
                  invalidArgs: args.name
                }
              })
            }
            const person = { ...args, id: uuid() }
            people = people.concat(person)
            return person
          },

        editNumber: (root, args) => {
            const person = people.find(p => p.name === args.name)
            if (!person) {
                return null
            }

            const updatedPerson = { ...person, phone: args.phone }
            people = people.map(p => p.name === args.name ? updatedPerson : p)
            return updatedPerson
        }
    }
}

//ApolloServer
const server = new ApolloServer({
    typeDefs,
    resolvers
})

startStandaloneServer(server, {
    listen: { port: 4000 },
}).then(({ url }) => {
    console.log(`Server ready at ${url}`)
})