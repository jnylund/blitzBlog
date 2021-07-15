import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const CreateBrownie = z.object({
  name: z.string(),
})

export default resolver.pipe(resolver.zod(CreateBrownie), resolver.authorize(), async (input) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const brownie = await db.brownie.create({ data: input })

  return brownie
})
