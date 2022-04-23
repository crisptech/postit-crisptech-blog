import { __prod__ } from "./constants";
import { Post } from "./entities/Post";
import { MikroORM } from "@mikro-orm/core";
import path from "path";

export const mikroOrmConfig: Parameters<typeof MikroORM.init>[0] = {
  migrations: {
    path: path.join(__dirname, "./migrations"), // path to the folder with migrations
    glob: "!(*.d).{js,ts}", // how to match migration files (all .js and .ts files, but not .d.ts)
  },
  entities: [Post],
  allowGlobalContext: true,
  dbName: "postit",
  user: "tom",
  password: "tom",
  type: "postgresql",
  debug: !__prod__,
};

export default mikroOrmConfig;
