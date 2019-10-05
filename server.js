const { authors, books, reviews } = require('./utils/mock.js');;
const apollo = require('apollo-server');
const { ApolloServer, gql } = apollo;

/*
  Query is the root which is exposed as 
  the callable endpoint 
*/
let typeDefs = gql `

  type Query {
    authors: [Author]
    author(id: Int): Author
  }

  type Author {
    name: String
    books: [Book]
  }

  type Book {
    title: String,
    review: Float
  }
`;

let resolvers = {

  /*
    Parameter 1: 
      The first parameter in a resolver is called a parent object, 
      which it gets from the resolver above it.
      Notice how, unlike for Author and Book, the first paramenter 
      is either _ or not defined.
      This is because this is the resolver for the root queries, 
      so they do not have parent objects.

    Paramenter 2:
      The second parameter contains the argument provided by the
      client, in this case the "id" for the author endpoint.
  */
  Query: {
    author: (_, args) => {
      // Returns the parent object of the Author resolver 
      return authors.find(a => a.id === args.id);
    },
    authors: () => {
      return authors;
    }
  },

  /* 
    Notice that even though 'authors' in the Query resolver 
    returns an array of author objects.
    You automatically only get one author object at a time 
    to deal with. 
  */
  Author: {
    books: (author /* parent */ ) => {
      return books.filter(b => b.authorId == author.id)
    }
  },

  /* 
    Each field in a GraphQL query type
    get the same parent object.
  */
  Book: {
    title: (book /* parent */ ) => {
      return book.title;
    },
    review: (book /* parent */ ) => {
      // Notice how the book title is only logged
      // when fetching a review.
      // This helps optimise queries in cases where 
      // external calls are made.
      console.log(`Got review for: ${book.title}`);
      return reviews.find(r => r.bookId === book.id).review;
    },
  }
};

const server = new ApolloServer({ typeDefs, resolvers });
server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});