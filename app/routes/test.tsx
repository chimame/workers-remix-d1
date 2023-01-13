import { LoaderArgs } from "@remix-run/cloudflare"
import { useLoaderData } from "@remix-run/react"
import { client } from "~/database/client.server"

export const loader = async ({ context }: LoaderArgs) => {
  const users = await client(context.DB).selectFrom('User').selectAll().execute()

  return {
    users
  }
}

const Test = () => {
  const { users } = useLoaderData() as unknown as ReturnType<typeof loader> extends Promise<infer T> ? T : never

  return (
    <div>user count: {users.length}</div>
  )
}

export default Test
