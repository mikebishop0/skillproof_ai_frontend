import { useParams } from 'react-router-dom';
import PageStub from '../../components/PageStub';

export default function AIReport() {
  const { id } = useParams();
  return <PageStub title={`AI Competency Report #${id}`} description="Full AI-generated skill evaluation." />;
}
