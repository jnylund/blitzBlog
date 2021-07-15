import { Suspense } from "react"
import { Head, Link, usePaginatedQuery, useRouter, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getBrownies from "app/brownies/queries/getBrownies"

const ITEMS_PER_PAGE = 100

export const BrowniesList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ brownies, hasMore }] = usePaginatedQuery(getBrownies, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div>
      <ul>
        {brownies.map((brownie) => (
          <li key={brownie.id}>
            <Link href={Routes.ShowBrowniePage({ brownieId: brownie.id })}>
              <a>{brownie.name}</a>
            </Link>
          </li>
        ))}
      </ul>

      <button disabled={page === 0} onClick={goToPreviousPage}>
        Previous
      </button>
      <button disabled={!hasMore} onClick={goToNextPage}>
        Next
      </button>
    </div>
  )
}

const BrowniesPage: BlitzPage = () => {
  return (
    <>
      <Head>
        <title>Brownies</title>
      </Head>

      <div>
        <p>
          <Link href={Routes.NewBrowniePage()}>
            <a>Create Brownie</a>
          </Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <BrowniesList />
        </Suspense>
      </div>
    </>
  )
}

BrowniesPage.authenticate = true
BrowniesPage.getLayout = (page) => <Layout>{page}</Layout>

export default BrowniesPage
