import { Link, useRouter, useMutation, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import createBrownie from "app/brownies/mutations/createBrownie"
import { BrownieForm, FORM_ERROR } from "app/brownies/components/BrownieForm"

const NewBrowniePage: BlitzPage = () => {
  const router = useRouter()
  const [createBrownieMutation] = useMutation(createBrownie)

  return (
    <div>
      <h1>Create New Brownie</h1>

      <BrownieForm
        submitText="Create Brownie"
        // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        // schema={CreateBrownie}
        // initialValues={{}}
        onSubmit={async (values) => {
          try {
            const brownie = await createBrownieMutation(values)
            router.push(Routes.ShowBrowniePage({ brownieId: brownie.id }))
          } catch (error) {
            console.error(error)
            return {
              [FORM_ERROR]: error.toString(),
            }
          }
        }}
      />

      <p>
        <Link href={Routes.BrowniesPage()}>
          <a>Brownies</a>
        </Link>
      </p>
    </div>
  )
}

NewBrowniePage.authenticate = true
NewBrowniePage.getLayout = (page) => <Layout title={"Create New Brownie"}>{page}</Layout>

export default NewBrowniePage
