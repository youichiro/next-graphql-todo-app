import React from "react";
import Link from 'next/link'
import { useRouter } from "next/router";
import { signOut, useSession } from 'next-auth/client'

const Sidebar: React.FC = () => {
  const router = useRouter()
  const isActive: (pathname: string) => boolean = (pathname) =>
    router.pathname === pathname
  const [session, loading] = useSession()

  if (loading) {
    return (
      <div>
        <p>Validating session ...</p>
      </div>
    )
  }

  if (!session) {
    return (
      <div>
        <Link href="/api/auth/signin">
          <a data-active={isActive('/signup')}>Log in</a>
        </Link>
      </div>
    )
  }

  if (session) {
    return (
      <div>
        <p>{session.user.name} ({session.user.email})</p>
        <button onClick={() => signOut()}>
          <a>Log out</a>
        </button>
      </div>
    )
  }
}

export default Sidebar
