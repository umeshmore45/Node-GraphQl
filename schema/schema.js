const graphql = require("graphql");
const _ = require("lodash");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
} = graphql;

// dummmy data
const books = [
  { name: "sdbc", genre: "edohd", id: "1", authorid: "1" },
  { name: "eggs", genre: "ifesd", id: "2", authorid: "2" },
  { name: "cesf", genre: "essdd", id: "3", authorid: "3" },
  { name: "dnvn", genre: "dncvsdd", id: "4", authorid: "2" },
  { name: "dnvhjf", genre: "digid", id: "5", authorid: "2" },
  { name: "pdpm", genre: "edcp", id: "6", authorid: "3" },
];

const authors = [
  { name: "Raj", age: 48, id: "1" },
  { name: "Akash", age: 54, id: "2" },
  { name: "Abhay", age: 22, id: "3" },
];

const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent, args) {
        return _.find(authors, { id: parent.authorid });
      },
    },
  }),
});

const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    id: { type: GraphQLID },
    books: {
      type: GraphQLList(BookType),
      resolve(parent, args) {
        return _.filter(books, { authorid: parent.id });
      },
    },
  }),
});

const RootType = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return _.find(books, { id: args.id });
      },
    },

    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return _.find(authors, { id: args.id });
      },
    },

    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return books;
      },
    },

    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parent, args) {
        return authors;
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootType,
});
