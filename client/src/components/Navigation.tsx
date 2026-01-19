import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";

export function Navigation() {
  const [location] = useLocation();

  const links = [
    { href: "/", label: "Home" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center py-6">
      <div className="glass-panel rounded-full px-6 py-3 flex gap-8 items-center">
        {links.map((link) => (
          <Link key={link.href} href={link.href}>
            <div className="relative px-2 py-1 cursor-pointer group">
              <span 
                className={`text-sm font-medium transition-colors duration-200 ${
                  location === link.href ? "text-white" : "text-muted-foreground group-hover:text-white"
                }`}
              >
                {link.label}
              </span>
              {location === link.href && (
                <motion.div
                  layoutId="nav-pill"
                  className="absolute inset-0 bg-white/10 rounded-full -z-10"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </div>
          </Link>
        ))}
      </div>
    </nav>
  );
}
