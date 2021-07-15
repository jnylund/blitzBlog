import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useParam, BlitzPage, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getBrownie from "app/brownies/queries/getBrownie"
import deleteBrownie from "app/brownies/mutations/deleteBrownie"

export const Brownie = () => {
  const router = useRouter()
  const brownieId = useParam("brownieId", "number")
  const [deleteBrownieMutation] = useMutation(deleteBrownie)
  const [brownie] = useQuery(getBrownie, { id: brownieId })

  return (
    <>
      <Head>
        <title>Brownie {brownie.id}</title>
      </Head>

      <div>
        <h1>Brownie {brownie.id}</h1>
        <pre>{JSON.stringify(brownie, null, 2)}</pre>

        <Link href={Routes.EditBrowniePage({ brownieId: brownie.id })}>
          <a>Edit</a>
        </Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteBrownieMutation({ id: brownie.id })
              router.push(Routes.BrowniesPage())
            }
          }}
          style={{ marginLeft: "0.5rem" }}
        >
          Delete
        </button>
      </div>
    </>
  )
}

const ShowBrowniePage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href={Routes.BrowniesPage()}>
          <a>Brownies</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Brownie />
      </Suspense>
    </div>
  )
}

ShowBrowniePage.authenticate = true
ShowBrowniePage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowBrowniePage
