const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

const { GraphQLError } = require('graphql')

const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const User = require('../models/user')
const Author = require('../models/author')
const Book = require('../models/book')

const resolvers = {
    User: {
        friendOf: async (root) => {
            const friends = await User.find({friends: {$in: [root._id]} })
            return friends
        }
    },
    Query: {
        me: (root, args, {currentUser}) => {
            console.log(currentUser)
            return currentUser
        },
        userCount: async () => User.collection.countDocuments(),
        bookCount: async () => Book.collection.countDocuments(),
        authorCount: async () => Author.collection.countDocuments(),
        allUsers: async () => {
            const users = await User.find({}).populate('friends')
            return users
        },
        allBooks: async () => {

            const books = await Book.find({}).populate('author')
            return books
        },
        allBooksByGenre: async (root, args) => {

            const books = await Book.find({}).populate('author')
            console.log(books)
            let filterArr = []
            books.forEach(book => {
                if (book.genres.includes(args.genre)) {
                    filterArr.push(book)
                }
            })
            if (!books) {
                return Book.find({}).populate('author')
            }
            return filterArr
        },
        allAuthors: async () => {
            const authors = await Author.find({})
            return authors
        }
    },
    Mutation: {

        createUser: async (root, args) => {
            const saltRounds = 10
            const passwordHash = await bcrypt.hash(args.password, saltRounds)

            const user = new User({ username: args.username, passwordHash: passwordHash, favoriteGenre: args.favoriteGenre })
            try {
                await user.save()
            } catch (error) {
                throw new GraphQLError('Creation of user failed', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                        invalidArgs: args.name,
                        error
                    }
                })
            }

            pubsub.publish('USER_ADDED', { userAdded: user })
            return user

        },

        login: async (root, args) => {

            const user = await User.findOne({ username: args.username })
            const passwordCorrect = user === null
                ? false
                : await bcrypt.compare(args.password, user.passwordHash)

            if (!user || !passwordCorrect) {
                throw new GraphQLError('wrong credentials', {
                    extensions: {
                        code: 'BAD_USER_INPUT'
                    }
                })
            }

            const userForToken = {
                username: user.username,
                id: user._id
            }

            return {
                value: jwt.sign(
                    userForToken,
                    process.env.SECRET,
                    { expiresIn: 60 * 60 }
                )
            }

        },

        addBook: async (root, args, context) => {

            console.log("We're starting.....")
            const currentUser = context.currentUser

            if (!currentUser) {
                throw new GraphQLError('user not authenticated', {
                    extensions: {
                        code: 'BAD_USER_INPUT'
                    }
                })
            }

            let author = await Author.findOne({ name: args.author })
            if (!author) {
                author = new Author({
                    name: args.author,
                    bookCount: 1,
                    born: null
                })

                try {
                    await author.save()
                } catch (error) {
                    throw new GraphQLError('Saving new author failed', {
                        extensions: {
                            code: 'BAD_USER_INPUT',
                            invalidArgs: args.name,
                            error
                        }
                    })
                }
            }

            const book = new Book({
                title: args.title,
                published: args.published,
                genres: args.genres,
                author: author
            })

            try {
                await book.save()
            } catch (error) {
                throw new GraphQLError('Saving book failed', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                        invalidArgs: args.name,
                        error
                    }
                })
            }
            pubsub.publish('BOOK_ADDED', { bookAdded: book })
            return book

        },

        addFriend: async (root, args, { currentUser }) => {

            console.log('We are starting...', currentUser)

            if (!currentUser) {
                throw new GraphQLError('user not authenticated', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                    }
                })
            }

            const friend = await User.findOne(args.friend)
            const isFriend = currentUser.friends.map(f => f._id.toString().includes(args.friend))

            if (!isFriend) {
                currentUser.friends = currentUser.friends.concat(friend)
            }

            try {
                currentUser.save()
            }
            catch (error) {
                throw new GraphQLError('Saving friend failed', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                        invalidArgs: args.name,
                        error
                    }
                })
            }

            return friend

        },

        editAuthor: async (root, args) => {

            const author = await Author.findOne({ name: args.name })
            author.born = args.setBornTo

            try {
                await author.save()
            }
            catch (error) {
                throw new GraphQLError('Saving birthday failed', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                        invalidArgs: args.name,
                        error
                    }
                })
            }

            return author
        }

    },

    Subscription: {
        userAdded: {
            subscribe: () => pubsub.asyncIterator('USER_ADDED')
        },
        bookAdded: {
            subscribe: () => pubsub.asyncIterator('BOOK_ADDED')
        }
    }
}

module.exports = resolvers