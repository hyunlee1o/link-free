import { useState } from 'react'

import { useAuth } from 'hooks/useAuth'
import { fetchData } from 'services/fetchData'
import { guestUserRoute } from 'utils/guestUserRoute'

import type { GetServerSideProps } from 'next'

export default function AuthPage() {
  const { signIn } = useAuth()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  return (
    <form>
      <input
        type="text"
        value={username}
        onChange={e => setUsername(e.target.value)}
        placeholder="username"
      />
      <input
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder="password"
      />
      <button
        onClick={e => {
          e.preventDefault()
          signIn(username, password)
        }}
      >
        Sign In
      </button>
    </form>
  )
}

export const getServerSideProps: GetServerSideProps = guestUserRoute(async () => {
  const initialData = await fetchData()
  return { props: { initialData } }
})
