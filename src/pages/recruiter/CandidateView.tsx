import { useParams } from 'react-router-dom';
import PageStub from '../../components/PageStub';

export default function CandidateView() {
  const { id } = useParams();
  return <PageStub title={`Candidate #${id}`} description="Profile, badges, and AI report for this candidate." />;
}
