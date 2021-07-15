import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const UpdateBrownie = z.object({
  id: z.number(),
  name: z.string(),
})

export default resolver.pipe(
  resolver.zod(UpdateBrownie),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const brownie = await db.brownie.update({ where: { id }, data })

    return brownie
  }
)
