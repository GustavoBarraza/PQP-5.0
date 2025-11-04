import { ReactNode } from "react";

interface PageHeaderProps {
  icon: ReactNode;
  title: string;
  subtitle?: string;
  cta?: ReactNode;
}

export function PageHeader({ icon, title, subtitle, cta }: PageHeaderProps) {
  return (
    <header className="flex items-center justify-between mb-8">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
          {icon}
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
          {subtitle && <p className="text-sm text-gray-600">{subtitle}</p>}
        </div>
      </div>
      {cta && <div>{cta}</div>}
    </header>
  );
}
