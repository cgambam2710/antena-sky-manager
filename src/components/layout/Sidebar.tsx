
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  BarChart3,
  Home,
  MapPin,
  Radio,
  Settings,
  PlusCircle,
} from "lucide-react";

interface SidebarItemProps {
  icon: React.ElementType;
  label: string;
  path: string;
  isActive: boolean;
}

const SidebarItem = ({ icon: Icon, label, path, isActive }: SidebarItemProps) => (
  <Link to={path}>
    <Button
      variant="ghost"
      className={cn(
        "w-full justify-start gap-2 pl-3",
        isActive
          ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
          : "hover:bg-sidebar-accent/50 text-sidebar-foreground/80"
      )}
    >
      <Icon size={18} />
      {label}
    </Button>
  </Link>
);

export function Sidebar() {
  const location = useLocation();
  const currentPath = location.pathname;

  const menuItems = [
    { icon: Home, label: "Dashboard", path: "/" },
    { icon: MapPin, label: "Mapa", path: "/map" },
    { icon: Radio, label: "Antenas", path: "/antennas" },
    { icon: PlusCircle, label: "Nueva Antena", path: "/new-antenna" },
    { icon: BarChart3, label: "Métricas", path: "/metrics" },
    { icon: Settings, label: "Configuración", path: "/settings" }
  ];

  return (
    <div className="bg-sidebar h-screen w-64 py-6 px-3 flex flex-col gap-6 border-r border-sidebar-border">
      <div className="px-3">
        <h1 className="text-sidebar-foreground font-bold text-2xl flex items-center gap-2">
          <Radio size={24} className="text-sidebar-primary" />
          <span>Antenna SKY</span>
        </h1>
      </div>

      <nav className="flex-1 flex flex-col gap-1">
        {menuItems.map((item) => (
          <SidebarItem
            key={item.path}
            icon={item.icon}
            label={item.label}
            path={item.path}
            isActive={
              item.path === "/"
                ? currentPath === "/"
                : currentPath.startsWith(item.path)
            }
          />
        ))}
      </nav>

      <div className="px-3 py-3 border-t border-sidebar-border">
        <div className="flex items-center gap-3 px-2">
          <div className="w-8 h-8 rounded-full bg-sidebar-accent flex items-center justify-center text-sidebar-primary font-medium">
            AT
          </div>
          <div className="flex-1">
            <div className="text-sm font-medium text-sidebar-foreground">Admin</div>
            <div className="text-xs text-sidebar-foreground/70">Técnico</div>
          </div>
        </div>
      </div>
    </div>
  );
}
