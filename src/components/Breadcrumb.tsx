import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export default function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="bg-slate-100/80 border-b border-slate-200 py-2.5 px-4 sm:px-6 lg:px-8 text-xs text-slate-600 no-print">
      <div className="max-w-7xl mx-auto flex items-center space-x-2">
        <Link
          href="/"
          className="flex items-center gap-1 text-slate-500 hover:text-[#0f2042] transition"
        >
          <Home className="w-3.5 h-3.5" />
          <span>Beranda</span>
        </Link>

        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          return (
            <React.Fragment key={idx}>
              <ChevronRight className="w-3 h-3 text-slate-400" />
              {isLast || !item.href ? (
                <span className="font-semibold text-[#0f2042] truncate max-w-[200px] sm:max-w-md">
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="text-slate-500 hover:text-[#0f2042] transition"
                >
                  {item.label}
                </Link>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </nav>
  );
}
