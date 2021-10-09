import Account from '../components/Account';
import ProjectList from '../components/ProjectList';

const Sidebar: React.FC = () => {
  return (
    <div>
      <Account />
      <ProjectList />
    </div>
  );
};

export default Sidebar;
