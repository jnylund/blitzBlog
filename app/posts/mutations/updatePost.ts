import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const UpdatePost = z.object({
  id: z.number(),
  title: z.string(),
  author: z.string(),
  content: z.string(),
  comments: z.array(z.object({ content: z.string(), author: z.string() })),
})

export default resolver.pipe(
  resolver.zod(UpdatePost),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    //    const post = await db.post.update({ where: { id }, data })
    const post = await db.post.update({
      where: { id },
      data: { comments: { create: data.comments } },
    })

    return post
  }
)
