import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const DeleteBrownie = z.object({
  id: z.number(),
})

export default resolver.pipe(resolver.zod(DeleteBrownie), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const brownie = await db.brownie.deleteMany({ where: { id } })

  return brownie
})
