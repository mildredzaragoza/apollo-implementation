import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
const typeDefs = `#graphql
  # This "Book" type defines the queryable fields for every book in our data source.
  type Book {
    title: String
    author: String
    id: Int!
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each.
  type Query {
    booksCount: Int!
    books: [Book]
  }

  type Mutation {
    addBook(title: String, author: String): Book
    updateBook(id: Int!, title: String!, author: String!): Book
    deleteBook(title: String): [Book]
  }
`;
const books = [
    {
        id: 1,
        title: 'The Awakening',
        author: 'Kate Chopin',
    },
    {
        id: 2,
        title: 'City of Glass',
        author: 'Paul Auster',
    },
];
// Resolvers define how to fetch the types defined in your schema.
const resolvers = {
    Query: {
        booksCount: () => books.length,
        books: () => books,
    },
    Mutation: {
        addBook: (_, { title, author }) => {
            const sizee = books.length;
            const book = { id: books.length + 1, title, author };
            books.push(book);
            return book;
        },
        deleteBook: (root, { title }) => {
            const index = books.indexOf(title);
            books.splice(index, 1);
            return books;
        },
        updateBook: (root, { id, title, author }) => {
            const bookUpdated = books.find(book => book.id == id);
            bookUpdated.author = author;
            bookUpdated.title = title;
            return bookUpdated;
        }
    },
};
const server = new ApolloServer({
    typeDefs,
    resolvers,
});
// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
});
console.log(`🚀  Server ready at: ${url}`);
