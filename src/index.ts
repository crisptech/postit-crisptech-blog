import "reflect-metadata";
import { MikroORM } from "@mikro-orm/core";
import { __prod__ } from "./constants";
import { mikroOrmConfig } from "./mikro-orm.config";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { HelloResolver } from "./resolvers/hello";
import { PostResolver } from "./resolvers/post";

// const main:() => Promise<void> = async () => {
const main = async (): Promise<void> => {
  const orm = await MikroORM.init(mikroOrmConfig);
  await orm.getMigrator().up();

  const app = express();

  const startServer = async () => {
    const apolloServer = new ApolloServer({
      schema: await buildSchema({
        resolvers: [HelloResolver, PostResolver],
        validate: false,
      }),
      // We only reference the em object in the context (entity manager)
      // This gives apollo access to the data from the entities defined in ORM.
      context: () => ({ em: orm.em }),
    });

    await apolloServer.start();
    apolloServer.applyMiddleware({ app });
  };

  startServer();

  app.listen(4000, () => {
    console.log("server started listening on port 4000");
  });
};

console.log("hello world");

main().catch((err) => {
  console.error(err);
});
