import { render, screen } from '@testing-library/react';
import ProjectListItem from "../src/components/ProjectListItem"
import { Project } from ".prisma/client"

const dummyProject: Project = {
  id: 1,
  name: 'a project name',
  userId: 1,
  createdAt: new Date(),
  updatedAt: new Date(),
};

describe('<ProjectListItem />', () => {
  it('hoge', () => {
    render(<ProjectListItem project={dummyProject} selectedProjectId={1} handleClick={() => null} />)
    expect(screen.getByText('a project name'));
  })
})
