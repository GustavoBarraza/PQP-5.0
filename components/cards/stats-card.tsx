import { ReactNode } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUp, ArrowDown } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string;
  description?: string;
  trend?: {
    value: string;
    direction: "up" | "down" | "neutral";
  };
  icon?: ReactNode;
}

export function StatsCard({ title, value, description, trend, icon }: StatsCardProps) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardDescription className="text-sm">{title}</CardDescription>
          {icon && <div className="text-gray-500">{icon}</div>}
        </div>
        <CardTitle className="text-2xl font-bold">{value}</CardTitle>
      </CardHeader>
      <CardContent>
        {trend && (
          <div className="flex items-center gap-1 text-sm">
            {trend.direction === "up" && (
              <ArrowUp className="w-4 h-4 text-emerald-600" />
            )}
            {trend.direction === "down" && (
              <ArrowDown className="w-4 h-4 text-red-600" />
            )}
            <span
              className={
                trend.direction === "up"
                  ? "text-emerald-600"
                  : trend.direction === "down"
                  ? "text-red-600"
                  : "text-gray-600"
              }
            >
              {trend.value}
            </span>
            {description && <span className="text-gray-600 ml-1">{description}</span>}
          </div>
        )}
        {!trend && description && (
          <p className="text-sm text-gray-600">{description}</p>
        )}
      </CardContent>
    </Card>
  );
}
