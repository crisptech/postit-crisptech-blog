import { MyContext } from "src/types";
import { Ctx, Query, Resolver } from "type-graphql";
import { Post } from "../entities/Post";

@Resolver()
export class PostResolver {
  @Query(() => [Post])
  posts(@Ctx() { em }: MyContext): Promise<Post[]> {
    return em.find(Post, {});
  }
}

/*
The classes utilised have to be of graphql type so it can be understood. 
Therefore we have to make changes to our Post entity through graph-ql type decorator tags.
We specify the entity class to be @ObjectType, its methods as @Field.


To then map our query to the database connectivity, we have to connect it fully to our ORM library.
The ORM library has access to the entities in the database through the em (entity manager) object.

We can set the context to apollo to be aware of this em object, then specificallly refer to this
context in our 'posts' method. We can then use this to find the records of Post within our database

*/
