import styles from '../styles/Home.module.css'
import { gql, useQuery } from '@apollo/client'
import Sidebar from '../layouts/Sidebar'
import { useSession } from 'next-auth/client'
import { sessionCache, sessionLoadingCache } from '../lib/cache'

const FetchProjectsQuery = gql`
  query FetchProjects($userId: Int!) {
    projects(userId: $userId) {
      id
      name
    }
  }
`
export default function Home() {
  const [session, sessionLoading] = useSession()
  sessionCache(session)
  sessionLoadingCache(sessionLoading)

  const { data, loading, error } = useQuery(FetchProjectsQuery, {
    variables: { userId: 1 },
  });

  if (sessionLoading) return <p>Validation session...</p>

  if (loading) return <p>Loading...</p>
  if (error) return <p>Oh no... {error.message}</p>

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <Sidebar></Sidebar>
        <ul>
          {data.projects.map(project => (
            <li key={project.id}>
              <p>{project.name}</p>
            </li>
          ))}
        </ul>
      </main>
    </div>
  )
}
