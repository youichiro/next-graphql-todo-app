import { gql, useQuery } from "@apollo/client"

const TasksQuery = gql`
  query Tasks($projectId: Int!) {
    tasks(projectId: $projectId) {
      id
      title
    }
  }
`
const TaskList: React.FC = () => {
  const { data, loading, error } = useQuery(TasksQuery, {
    variables: { projectId: 1 },
  })

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error... {error.message}</p>

  return (
    <>
      <p>TaskList.tsx</p>
      <ul>
        {data.tasks.map(task => (
          <li key={task.id}>
            <p>{task.title}</p>
          </li>
        ))}
      </ul>
    </>
  )
}

export default TaskList
