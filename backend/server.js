const express = require("express");
const expressGraphQL = require("express-graphql").graphqlHTTP;
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLNonNull,
  graphql,
} = require("graphql");
const cors = require('cors');

const app = express();
app.use(cors());


//data
const users = [
  { id: 1, name: "Nikita" },
  { id: 2, name: "John" },
  { id: 3, name: "Warn" },
];

const posts = [
  {
    id: 1,
    thema:'bees',
    content: "Hi, i like bees so much <3",
    likes: [2],
    userId: 2,
  },
  {
    id: 2,
    thema:'Trump',
    content: "I think trump was good president",
    likes: [],
    userId: 3,
  },
  {
    id: 3,
    thema:'Mom',
    content: "My mom totally anoying me..",
    likes: [],
    userId: 1,
  },
];

const comments = [
  { id: 1, postId: 1, userId: 1, content: "Me too" },
  { id: 2, postId: 1, userId: 2, content: "The same" },
];

//types
const CommentType = new GraphQLObjectType({
  name: "Comment",
  description: "This represents a comments written by a users",
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLInt) },
    userId: { type: GraphQLNonNull(GraphQLInt) },
    user: {
      type: UserType,
      resolve: (comment) => {
        return users.find((user) => user.id === comment.userId);
      },
    },
    postId: { type: GraphQLNonNull(GraphQLInt) },
    content: { type: GraphQLNonNull(GraphQLString) },
  }),
});

const PostType = new GraphQLObjectType({
  name: "Post",
  description: "This represents a post written by a user",
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLInt) },
    thema:{ type: GraphQLNonNull(GraphQLString) },
    content: { type: GraphQLNonNull(GraphQLString) },
    likes: { type: GraphQLList(GraphQLInt) },
    comments: {
      type: new GraphQLList(CommentType),
      resolve: (post) => {
        return comments.filter((comment) => comment.postId === post.id);
      },
    },
    userId: { type: GraphQLNonNull(GraphQLInt) },
    user: {
      type: UserType,
      resolve: (post) => {
        return users.find((user) => user.id === post.userId);
      },
    },
  }),
});

const UserType = new GraphQLObjectType({
  name: "User",
  description: "This represents a user",
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLInt) },
    name: { type: GraphQLNonNull(GraphQLString) },
    posts: {
      type: GraphQLList(PostType),
      resolve: (user) => {
        return posts.filter((book) => book.userId === user.id);
      },
    },
  }),
});

//query
const RootQueryType = new GraphQLObjectType({
  name: "Query",
  description: "Root Query",
  fields: () => ({
    post: {
      type: PostType,
      description: "A Single Post",
      args: {
        id: { type: GraphQLInt },
      },
      resolve: (parent, args) => posts.find((post) => post.id === args.id),
    },
    posts: {
      type: new GraphQLList(PostType),
      description: "List of All posts",
      resolve: () => posts,
    },
    users: {
      type: new GraphQLList(UserType),
      description: "List of All Users",
      resolve: () => users,
    },
    user: {
      type: UserType,
      description: "Single User",
      args: {
        id: { type: GraphQLInt },
      },
      resolve: (parent, args) => users.find((user) => user.id === args.id),
    },
  }),
});

const RootMutationType = new GraphQLObjectType({
  name: "Mutation",
  description: "Root Mutation",
  fields: () => ({
    addPost: {
      type: PostType,
      description: "Add a post",
      args: {
        content: { type: GraphQLNonNull(GraphQLString) },
        userId: { type: GraphQLNonNull(GraphQLInt) },
      },
      resolve: (parent, args) => {
        const post = {
          id: posts.length + 1,
          content: args.content,
          likes: 0,
          userId: args.userId,
        };
        posts.push(post);
        return post;
      },
    },
    addComment: {
      type: CommentType,
      description: "Add a comment",
      args: {
        content: { type: GraphQLNonNull(GraphQLString) },
        userId: { type: GraphQLNonNull(GraphQLInt) },
        postId: { type: GraphQLNonNull(GraphQLInt) },
      },
      resolve: (parent, args) => {
        const comment = {
          id: comments.length + 1,
          content: args.content,
          userId: args.userId,
          postId: args.postId,
        };
        comments.push(comment);
        return comment;
      },
    },
    addLike: {
      type: PostType,
      description: "Add a like",
      args: {
        userId: { type: GraphQLNonNull(GraphQLInt) },
        postId: { type: GraphQLNonNull(GraphQLInt) },
      },
      resolve: (parent, args) => {
        const data = {
          userId: args.userId,
          postId: args.postId,
        };
        const post = posts.find((post) => post.id === data.postId);
        const findlike = post.likes.find(like => like === data.userId);

        if (!findlike) {
          post.likes.push(data.userId);
        }
        return post;
      },
    },
  }),
});

const schema = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType,
});

app.use(
  "/graphql",
  expressGraphQL({
    schema: schema,
    graphiql: true,
  })
);
app.listen(5000, () => {
  console.log("server running");
});
