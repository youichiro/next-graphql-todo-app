import styles from '../styles/pages/home.module.scss'
import Sidebar from '../layouts/Sidebar'
import { useSession } from 'next-auth/client'
import { sessionCache, sessionLoadingCache } from '../lib/cache'
import Main from '../layouts/Main'

export default function Home() {
  const [session, sessionLoading] = useSession()
  sessionCache(session)
  sessionLoadingCache(sessionLoading)

  if (sessionLoading) return <p>Validation session...</p>

  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <Sidebar></Sidebar>
      </div>
      <main className={styles.main}>
        <Main />
      </main>
    </div>
  )
}
