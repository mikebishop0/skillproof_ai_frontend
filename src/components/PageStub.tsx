interface PageStubProps {
  title: string;
  description: string;
}

export default function PageStub({ title, description }: PageStubProps) {
  return (
    <div className="card">
      <h1>{title}</h1>
      <p style={{ marginTop: 8, color: 'var(--spai-slate)' }}>{description}</p>
    </div>
  );
}
