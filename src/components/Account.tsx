import Link from 'next/link'
import { useRouter } from "next/router";
import { signOut } from 'next-auth/client'
import { useReactiveVar } from "@apollo/client";
import { sessionCache } from '../lib/cache'

const Account: React.FC = () => {
  const router = useRouter()
  const isActive: (pathname: string) => boolean = (pathname) =>
  router.pathname === pathname
  const session = useReactiveVar(sessionCache)

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

export default Account
