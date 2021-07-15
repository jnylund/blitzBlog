import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const CreatePost = z.object({
  title: z.string(),
  author: z.string(),
  content: z.string(),
  comments: z.array(z.object({ content: z.string(), author: z.string() })),
})

export default resolver.pipe(resolver.zod(CreatePost), resolver.authorize(), async (input) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  // const post = await db.post.create({ data: input })
  const post = await db.post.create({
    data: {
      ...input,
      comments: { create: input.comments },
    },
  })
  return post
})
