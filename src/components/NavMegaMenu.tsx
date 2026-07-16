import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, LayoutGrid } from 'lucide-react';
import type { NavMenuConfig } from '../data/navMenus';

interface NavMegaMenuProps {
  menu: NavMenuConfig;
}

export default function NavMegaMenu({ menu }: NavMegaMenuProps) {
  const [open, setOpen] = useState(false);
  const [primaryColumn, secondaryColumn] = menu.columns;

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button className="flex items-center gap-1 rounded-md px-2 py-1.5 hover:bg-slate-100 hover:text-brand-500 dark:hover:bg-slate-800">
        {menu.label}
        <ChevronDown className={`h-4 w-4 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="absolute left-1/2 top-full z-20 mt-2 w-[720px] -translate-x-1/3 rounded-xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-900">
          <div className="grid grid-cols-[1.4fr_1fr_1fr] gap-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                {primaryColumn.heading}
              </p>
              <ul className="mt-3 space-y-4">
                {primaryColumn.links.map((item) => (
                  <li key={item.title}>
                    <Link to={item.to} className="block">
                      <p className="text-sm font-semibold text-slate-900 hover:text-brand-500 dark:text-white">
                        {item.title}
                      </p>
                      {item.description && <p className="text-xs text-slate-400">{item.description}</p>}
                    </Link>
                  </li>
                ))}
              </ul>
              {primaryColumn.footer && (
                <Link
                  to={primaryColumn.footer.to}
                  className="mt-4 flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:text-brand-700 dark:text-brand-300"
                >
                  <LayoutGrid className="h-4 w-4" />
                  {primaryColumn.footer.title}
                </Link>
              )}
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                {secondaryColumn.heading}
              </p>
              <ul className="mt-3 space-y-3">
                {secondaryColumn.links.map((item) => (
                  <li key={item.title}>
                    <Link
                      to={item.to}
                      className="text-sm font-semibold text-slate-900 hover:text-brand-500 dark:text-white"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl border border-slate-200 p-4 dark:border-slate-800">
              <div className="rounded-lg bg-gradient-to-br from-brand-500 to-brand-800 p-4 text-center text-white">
                <p className="text-sm">{menu.promo.kicker}</p>
                <p className="font-serif text-2xl italic">{menu.promo.title}</p>
              </div>
              <p className="mt-3 text-sm font-semibold text-slate-900 dark:text-white">
                {menu.promo.description}
              </p>
              <div className="mt-3 space-y-2 border-t border-slate-100 pt-3 text-sm font-medium text-slate-600 dark:border-slate-800 dark:text-slate-300">
                {menu.promo.links.map((item) => (
                  <Link key={item.title} to={item.to} className="block hover:text-brand-500">
                    {item.title}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
