import { useParams } from 'react-router-dom';
import PageStub from '../../components/PageStub';

export default function ProjectDetail() {
  const { id } = useParams();
  return <PageStub title={`Project #${id}`} description="Project details and AI review status." />;
}
