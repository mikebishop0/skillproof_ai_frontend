import { Link } from 'react-router-dom';
import { BadgeCheck, FileSearch, ShieldCheck, UserRound } from 'lucide-react';
import AudienceSection from '../../components/AudienceSection';

const features = [
  {
    icon: FileSearch,
    title: 'Evidence-based profiles',
    description: 'Upload real projects, GitHub links, and architecture diagrams as proof of your skills.',
  },
  {
    icon: ShieldCheck,
    title: 'AI-reviewed competency reports',
    description: 'AI evaluates project complexity, code quality, and technical depth to score your skills.',
  },
  {
    icon: BadgeCheck,
    title: 'Verified skill badges',
    description: 'Earn shareable badges like "Verified Java Developer" once your evidence is validated.',
  },
];

export default function LandingPage() {
  return (
    <div>
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* Left: headline + CTA */}
          <div>
            <span className="inline-block rounded-full bg-brand-100 px-3 py-1 text-xs font-semibold text-brand-700 dark:bg-brand-900/30 dark:text-brand-300">
              AI-Powered Skill Verification
            </span>
            <h1 className="mt-4 text-5xl font-bold leading-[1.05] tracking-tight text-slate-900 sm:text-6xl dark:text-white">
              Turn Skills Into <span className="text-brand-500">Verifiable Evidence</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg text-slate-500 dark:text-slate-400">
              Zonopact SkillProof AI helps candidates prove real skills with AI-reviewed projects,
              assessments, and verified badges &mdash; free for recruiters to explore.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/register"
                className="rounded-md bg-brand-500 px-6 py-3 font-semibold text-white hover:bg-brand-600"
              >
                Build your profile
              </Link>
              <Link
                to="/pricing"
                className="rounded-md border border-brand-500 bg-brand-100 px-6 py-3 font-semibold text-brand-800 hover:bg-brand-200 dark:bg-brand-900/30 dark:text-brand-200"
              >
                See pricing
              </Link>
            </div>
          </div>

          {/* Right: illustration with floating proof cards, Credly-style banner */}
          <div className="relative mx-auto aspect-square w-full max-w-md">
            <div
              className="absolute -right-8 -top-8 h-full w-full rounded-3xl opacity-60 dark:opacity-20"
              style={{
                backgroundImage: 'radial-gradient(currentColor 1.5px, transparent 1.5px)',
                backgroundSize: '18px 18px',
                color: '#cbd5e1',
              }}
            />

            <div className="relative h-full w-full overflow-hidden rounded-3xl bg-gradient-to-br from-teal-400 via-teal-300 to-emerald-200 shadow-xl">
              <div className="flex h-full items-center justify-center">
                <div className="flex h-32 w-32 items-center justify-center rounded-full bg-white/90 shadow-lg">
                  <UserRound className="h-16 w-16 text-teal-600" />
                </div>
              </div>
            </div>

            {/* Floating card: candidate + score */}
            <div className="absolute -left-6 top-8 w-44 rounded-xl bg-white p-4 shadow-lg dark:bg-slate-800">
              <p className="font-semibold text-slate-900 dark:text-white">Aarav Sharma</p>
              <p className="text-xs font-medium text-brand-500">Java Architecture</p>
              <p className="mt-3 text-xs text-slate-400">AI Score</p>
              <p className="text-xl font-bold text-emerald-600">92%</p>
            </div>

            {/* Floating card: verified badges counter */}
            <div className="absolute -bottom-6 right-2 flex items-center gap-3 rounded-xl bg-white px-4 py-3 shadow-lg dark:bg-slate-800">
              <span className="text-sm font-medium text-slate-700 dark:text-slate-200">Badges Verified</span>
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-500 text-sm font-bold text-white">
                29
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-slate-200 bg-slate-50 py-20 dark:border-slate-800 dark:bg-slate-900/40">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-8 sm:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-100 dark:bg-brand-900/30">
                  <feature.icon className="h-6 w-6 text-brand-500" />
                </div>
                <h2 className="mt-4 text-lg font-semibold text-slate-900 dark:text-white">
                  {feature.title}
                </h2>
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <AudienceSection
        heading="For Candidates & Job Seekers"
        paragraph="Build an evidence-based profile alongside thousands of verified professionals. Upload real projects, pass AI-reviewed assessments, and earn badges recruiters can actually trust — turning your skills into proof, not just claims."
        buttonLabel="Build Your Profile"
        buttonTo="/register"
        imageSrc="https://picsum.photos/seed/skillproof-candidates/800/900"
        imageAlt="Candidate reviewing their skill portfolio"
      />

      <AudienceSection
        heading="For Recruiters & Employers"
        paragraph="Skip the guesswork of resume screening. Search a network of AI-verified candidates, review AI-generated competency reports backed by real evidence, and hire with confidence — free for recruiters to explore."
        buttonLabel="Search Candidates"
        buttonTo="/recruiter/search"
        imageSrc="https://picsum.photos/seed/skillproof-recruiters/800/900"
        imageAlt="Recruiter reviewing a candidate's verified skill report"
        reverse
      />

      <section className="mx-auto max-w-3xl px-6 py-20 text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-brand-500">Example output</p>
        <div className="mt-4 overflow-hidden rounded-xl border border-brand-200 bg-white text-left shadow-sm dark:border-brand-800 dark:bg-slate-900">
          <div className="border-b border-brand-100 bg-brand-50 px-6 py-3 dark:border-brand-900/40 dark:bg-brand-900/20">
            <p className="font-semibold text-slate-900 dark:text-white">Candidate: Aarav Sharma</p>
            <p className="font-medium text-brand-600 dark:text-brand-300">Java Architecture Score: 92%</p>
          </div>
          <div className="px-6 py-4">
            <ul className="list-disc space-y-1 pl-5 text-sm text-slate-500 dark:text-slate-400">
              <li>Built Spring Boot Microservices</li>
              <li>Designed Event-Driven Systems</li>
              <li>Completed Architecture Assessment</li>
            </ul>
            <p className="mt-3 text-xs font-medium text-brand-500">&#10003; Verified by Zonopact AI</p>
          </div>
        </div>
      </section>
    </div>
  );
}
