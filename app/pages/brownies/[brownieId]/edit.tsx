import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useMutation, useParam, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getBrownie from "app/brownies/queries/getBrownie"
import updateBrownie from "app/brownies/mutations/updateBrownie"
import { BrownieForm, FORM_ERROR } from "app/brownies/components/BrownieForm"

export const EditBrownie = () => {
  const router = useRouter()
  const brownieId = useParam("brownieId", "number")
  const [brownie, { setQueryData }] = useQuery(
    getBrownie,
    { id: brownieId },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  )
  const [updateBrownieMutation] = useMutation(updateBrownie)

  return (
    <>
      <Head>
        <title>Edit Brownie {brownie.id}</title>
      </Head>

      <div>
        <h1>Edit Brownie {brownie.id}</h1>
        <pre>{JSON.stringify(brownie)}</pre>

        <BrownieForm
          submitText="Update Brownie"
          // TODO use a zod schema for form validation
          //  - Tip: extract mutation's schema into a shared `validations.ts` file and
          //         then import and use it here
          // schema={UpdateBrownie}
          initialValues={brownie}
          onSubmit={async (values) => {
            try {
              const updated = await updateBrownieMutation({
                id: brownie.id,
                ...values,
              })
              await setQueryData(updated)
              router.push(Routes.ShowBrowniePage({ brownieId: updated.id }))
            } catch (error) {
              console.error(error)
              return {
                [FORM_ERROR]: error.toString(),
              }
            }
          }}
        />
      </div>
    </>
  )
}

const EditBrowniePage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditBrownie />
      </Suspense>

      <p>
        <Link href={Routes.BrowniesPage()}>
          <a>Brownies</a>
        </Link>
      </p>
    </div>
  )
}

EditBrowniePage.authenticate = true
EditBrowniePage.getLayout = (page) => <Layout>{page}</Layout>

export default EditBrowniePage
