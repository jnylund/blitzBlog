import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useParam, BlitzPage, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getPost from "app/posts/queries/getPost"
import deletePost from "app/posts/mutations/deletePost"

export const Post = () => {
  const router = useRouter()
  const postId = useParam("postId", "number")
  const [deletePostMutation] = useMutation(deletePost)
  const [post] = useQuery(getPost, { id: postId })

  return (
    <>
      <Head>
        <title>Post {post.id}</title>
      </Head>

      <div>
        <h1>Post {post.title}</h1>
        Body: {post.content}
        <ul>
          {post.comments.map((comment) => (
            <li key={comment.id}>
              {comment.content} - {comment.author} votes
            </li>
          ))}
        </ul>
        <div>
          <Link href={Routes.EditPostPage({ postId: post.id })}>
            <a>Edit</a>
          </Link>
        </div>
        <div>
          <button
            type="button"
            onClick={async () => {
              if (window.confirm("This will be deleted")) {
                await deletePostMutation({ id: post.id })
                router.push(Routes.PostsPage())
              }
            }}
            style={{ marginLeft: "0.5rem" }}
          >
            Delete
          </button>
        </div>
      </div>
    </>
  )
}

const ShowPostPage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href={Routes.PostsPage()}>
          <a>Posts</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Post />
      </Suspense>
    </div>
  )
}

ShowPostPage.authenticate = true
ShowPostPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowPostPage
