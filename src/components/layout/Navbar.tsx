
import { Bell, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface NavbarProps {
  title: string;
}

export function Navbar({ title }: NavbarProps) {
  return (
    <header className="border-b py-3 px-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">{title}</h1>
        
        <div className="flex items-center gap-4">
          <div className="relative w-64">
            <Search 
              className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
              size={18} 
            />
            <Input 
              placeholder="Buscar..." 
              className="pl-8 bg-muted/30" 
            />
          </div>
          
          <Button variant="ghost" size="icon" className="relative">
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-antenna-accent-warning rounded-full"></span>
          </Button>
        </div>
      </div>
    </header>
  );
}
