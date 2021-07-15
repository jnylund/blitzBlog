import { paginate, resolver } from "blitz"
import db, { Prisma } from "db"

interface GetBrowniesInput
  extends Pick<Prisma.BrownieFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetBrowniesInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const {
      items: brownies,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.brownie.count({ where }),
      query: (paginateArgs) => db.brownie.findMany({ ...paginateArgs, where, orderBy }),
    })

    return {
      brownies,
      nextPage,
      hasMore,
      count,
    }
  }
)
