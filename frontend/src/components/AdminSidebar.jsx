import { Link, useLocation } from "wouter";
import { 
  LayoutDashboard, 
  Package2, 
  FolderOpen, 
  UsersRound, 
  ShoppingBag, 
  Settings2, 
  LogOut,
  Stethoscope
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function AdminSidebar({ onLogout }) {
  const [location] = useLocation();

  const menuItems = [
    {
      title: "Tableau de bord",
      icon: LayoutDashboard,
      href: "/admin/dashboard",
      description: "Vue d'ensemble"
    },
    {
      title: "Produits",
      icon: Package2,
      href: "/admin/produits",
      description: "Gérer l'inventaire"
    },
    {
      title: "Catégories",
      icon: FolderOpen,
      href: "/admin/categories",
      description: "Organiser les produits"
    },
    {
      title: "Utilisateurs",
      icon: UsersRound,
      href: "/admin/utilisateurs",
      description: "Gérer les comptes"
    },
    {
      title: "Commandes",
      icon: ShoppingBag,
      href: "/admin/commandes",
      description: "Suivre les ventes"
    },
    {
      title: "Paramètres",
      icon: Settings2,
      href: "/admin/parametres",
      description: "Configuration"
    }
  ];

  const isActive = (href) => location === href;

  return (
    <div className="w-64 h-full bg-sidebar border-r flex flex-col">
      {/* Logo and branding */}
      <div className="p-6 border-b">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 bg-primary rounded-lg flex items-center justify-center">
            <Stethoscope className="h-6 w-6 text-primary-foreground" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-foreground">PharmaCare</h2>
            <p className="text-sm text-muted-foreground">Administration</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);

          return (
            <Link key={item.href} href={item.href}>
              <Button
                variant={active ? "default" : "ghost"}
                className="w-full justify-start h-auto p-3"
                data-testid={`link-admin-${item.title.toLowerCase().replace(/\s+/g, '-')}`}
              >
                <Icon className="h-5 w-5 mr-3 flex-shrink-0" />
                <div className="text-left flex-1">
                  <div className="font-medium">{item.title}</div>
                  <div className="text-xs opacity-70">{item.description}</div>
                </div>
              </Button>
            </Link>
          );
        })}
      </nav>

      <Separator />

      {/* User info and logout */}
      <div className="p-4 space-y-4">
        <Card>
          <CardContent className="p-3">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src="" alt="Admin" />
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate">Administrateur</p>
                <p className="text-xs text-muted-foreground truncate">admin@pharmacare.fr</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Button 
          variant="ghost" 
          className="w-full justify-start text-destructive hover:text-destructive"
          onClick={() => {
            console.log('Logging out admin');
            onLogout?.();
          }}
          data-testid="button-admin-logout"
        >
          <LogOut className="h-5 w-5 mr-3" />
          Déconnexion
        </Button>
      </div>
    </div>
  );
}
