import { LoaderArgs, ActionArgs } from "@remix-run/cloudflare"
import { Form, useLoaderData } from "@remix-run/react"
import { client } from "~/database/client.server"

export const loader = async ({ context }: LoaderArgs) => {
  const users = await client(context.DB).selectFrom('User').selectAll().execute()

  // Type is not set unless defined in generic.(ex all<T>())
  //const data = await context.DB.prepare('SELECT * FROM User').all()
  //console.log('data.results', data.results)
  // #=> [
  //  { id: <number>, email: <string>, name: <string | null> },
  //  { id: <number>, email: <string>, name: <string | null> },
  // ]

  return {
    users
  }
}

export const action = async ({ context, request }: ActionArgs) => {
  const formData = await request.formData()
  const email = formData.get('email') as string | null
  const name = formData.get('name') as string | null

  if (!email) {
    throw new Response('Error', { status: 422 })
  }

  const user = await client(context.DB).insertInto('User').values({
    email,
    name
  })
  .returningAll()
  .executeTakeFirst()

  return user
}

const Users = () => {
  const { users } = useLoaderData() as unknown as ReturnType<typeof loader> extends Promise<infer T> ? T : never

  return (
    <div>
      <Form method="post">
        <input name='email' required type='email' />
        <input name='name' />
        <button type="submit">create</button>
      </Form>
      <div>user count: {users.length} users</div>
      <div>
        <ul>
          {users.map(user => {
            return (
              <li key={user.id}>{user.email}({user.name})</li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default Users
