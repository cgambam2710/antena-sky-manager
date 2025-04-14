
import { cn } from "@/lib/utils";

interface StatusCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: {
    value: string;
    positive: boolean;
  };
  className?: string;
}

export function StatusCard({ title, value, icon, trend, className }: StatusCardProps) {
  return (
    <div className={cn("bg-white rounded-lg p-5 shadow-sm border", className)}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground font-medium">{title}</p>
          <p className="text-2xl font-bold mt-1">{value}</p>
          
          {trend && (
            <div className="flex items-center gap-1 mt-1">
              <span className={cn(
                "text-xs font-medium",
                trend.positive ? "text-antenna-accent-success" : "text-antenna-accent-error"
              )}>
                {trend.positive ? "+" : "-"}{trend.value}
              </span>
              <span className="text-xs text-muted-foreground">desde último mes</span>
            </div>
          )}
        </div>
        
        <div className="bg-primary/10 p-3 rounded-full text-primary">
          {icon}
        </div>
      </div>
    </div>
  );
}
