import { render, screen, fireEvent } from '@testing-library/react';
import ProjectListItem from '../src/components/ProjectListItem';
import { Project } from '.prisma/client';

const project: Project = {
  id: 1,
  name: 'a project name',
  userId: 1,
  createdAt: new Date(),
  updatedAt: new Date(),
};

describe('<ProjectListItem />', () => {
  it('display a project name', () => {
    render(<ProjectListItem project={project} selectedProjectId={1} handleClick={() => null} />);
    expect(screen.getByText('a project name'));
  });

  it('called onClick', () => {
    const handleClick = jest.fn();
    render(<ProjectListItem project={project} selectedProjectId={1} handleClick={handleClick} />);
    fireEvent.click(screen.getByText('a project name'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
