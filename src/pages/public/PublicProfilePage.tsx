import { useParams } from 'react-router-dom';
import { BadgeCheck } from 'lucide-react';

export default function PublicProfilePage() {
  const { username } = useParams();

  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <div className="rounded-xl border border-slate-200 bg-white p-8 dark:border-slate-800 dark:bg-slate-900">
        <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">{username}</h1>
        <p className="mt-1 text-sm text-slate-400">Evidence-based skill profile</p>

        <div className="mt-6 flex items-center gap-2 rounded-lg bg-brand-50 px-4 py-3 text-brand-700 dark:bg-brand-900/20 dark:text-brand-300">
          <BadgeCheck className="h-5 w-5" />
          <span className="text-sm font-medium">Verified by Zonopact AI &mdash; Java Architecture Score: 92%</span>
        </div>

        <h2 className="mt-8 text-sm font-semibold uppercase tracking-wide text-slate-400">Evidence</h2>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-600 dark:text-slate-300">
          <li>Built Spring Boot Microservices</li>
          <li>Designed Event-Driven Systems</li>
          <li>Completed Architecture Assessment</li>
        </ul>
      </div>
    </div>
  );
}
