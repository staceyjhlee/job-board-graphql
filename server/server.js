import { ApolloServer } from "@apollo/server";
import { expressMiddleware as apolloMiddleware } from "@apollo/server/express4";
import cors from "cors";
import express from "express";
import { readFile } from "node:fs/promises";
import { authMiddleware, handleLogin } from "./auth.js";
import { resolvers } from "./resolvers.js";

const PORT = 9000;

const app = express();
//cors adds response headers to allow for cross origin requests
//express json parses the request body to a javascript object, do it for all requests in the middleware.
app.use(cors(), express.json(), authMiddleware);

// the /login is a handler, the handler processes the request and returns a response.
app.post("/login", handleLogin);
//read graphql file and assign it as a string to typeDefs; we use readFile so we 
const typeDefs = await readFile("./schema.graphql", "utf8");

//declare apollo server which takes in typedefs and resolvers
const apolloServer = new ApolloServer({ typeDefs, resolvers });
//integrate apollo with express, start it first, this is asynchronous
await apolloServer.start();
//apply to graphql path, and we call apollomiddlewarefunction which expects the apolloserver and this will be passed into the apollo middleware engine
//the apollomiddleware integrates apollo with express. 
app.use("/graphql", apolloMiddleware(apolloServer));

app.listen({ port: PORT }, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`GraphQL endpoint: http://localhost:${PORT}/graphql`);
});
