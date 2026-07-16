interface PageStubProps {
  title: string;
  description: string;
}

export default function PageStub({ title, description }: PageStubProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-8 dark:border-slate-800 dark:bg-slate-900">
      <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">{title}</h1>
      <p className="mt-2 text-slate-500 dark:text-slate-400">{description}</p>
    </div>
  );
}
