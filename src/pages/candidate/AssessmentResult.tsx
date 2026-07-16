import { useParams } from 'react-router-dom';
import PageStub from '../../components/PageStub';

export default function AssessmentResult() {
  const { id } = useParams();
  return <PageStub title={`Result for Assessment #${id}`} description="Your score and AI feedback." />;
}
