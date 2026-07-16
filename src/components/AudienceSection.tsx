import { Link } from 'react-router-dom';

interface AudienceSectionProps {
  heading: string;
  paragraph: string;
  buttonLabel: string;
  buttonTo: string;
  imageSrc: string;
  imageAlt: string;
  reverse?: boolean;
}

export default function AudienceSection({
  heading,
  paragraph,
  buttonLabel,
  buttonTo,
  imageSrc,
  imageAlt,
  reverse = false,
}: AudienceSectionProps) {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <div className="grid items-center gap-16 lg:grid-cols-2">
        <div className={reverse ? 'lg:order-2' : ''}>
          <h2 className="text-4xl font-normal leading-tight text-slate-900 dark:text-white">{heading}</h2>
          <p className="mt-5 max-w-lg text-slate-500 dark:text-slate-400">{paragraph}</p>
          <Link
            to={buttonTo}
            className="mt-8 inline-block rounded-md border border-brand-500 px-6 py-3 font-semibold text-brand-600 hover:bg-brand-50 dark:text-brand-300 dark:hover:bg-brand-900/20"
          >
            {buttonLabel}
          </Link>
        </div>

        <div className={`relative mx-auto aspect-[8/9] w-full max-w-md ${reverse ? 'lg:order-1' : ''}`}>
          {/* Dot-grid pattern accent */}
          <div
            className="absolute -right-6 -top-6 -z-10 h-2/3 w-2/3"
            style={{
              backgroundImage: 'radial-gradient(#a3e635 2px, transparent 2px)',
              backgroundSize: '18px 18px',
            }}
          />
          {/* Solid circle accent */}
          <div className="absolute -bottom-8 -left-8 -z-10 h-40 w-40 rounded-full bg-amber-400" />

          {/* Photo, clipped into an arch/shield shape */}
          <img
            src={imageSrc}
            alt={imageAlt}
            className="h-full w-full rounded-t-full rounded-b-2xl object-cover shadow-xl"
          />
        </div>
      </div>
    </section>
  );
}
