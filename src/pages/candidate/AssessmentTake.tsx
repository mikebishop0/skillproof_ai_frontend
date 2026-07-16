import { useParams } from 'react-router-dom';
import PageStub from '../../components/PageStub';

export default function AssessmentTake() {
  const { id } = useParams();
  return <PageStub title={`Assessment #${id}`} description="Answer the questions to complete this assessment." />;
}
