
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Activity, Trophy, ChartBar } from "lucide-react";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  // Navigation items
  const navItems = [
    { name: "Games", path: "/", icon: <Activity className="w-4 h-4 mr-2" /> },
    { name: "Live", path: "/live", icon: <Trophy className="w-4 h-4 mr-2" /> },
    { name: "Stats", path: "/stats", icon: <ChartBar className="w-4 h-4 mr-2" /> },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 sm:px-6 ${
        scrolled ? "py-2 bg-white/80 dark:bg-black/80 backdrop-blur-md shadow-sm" : "py-4 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className="relative w-10 h-10 flex items-center justify-center">
            <div className="absolute w-full h-full bg-primary/20 rounded-full animate-pulse-subtle"></div>
            <Activity className="w-6 h-6 text-primary" />
          </div>
          <span className="text-xl font-bold tracking-tight">HoopWise</span>
        </Link>

        <div className="hidden md:flex space-x-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`px-4 py-2 rounded-lg flex items-center transition-colors ${
                location.pathname === item.path
                  ? "bg-primary/10 text-primary"
                  : "hover:bg-secondary"
              }`}
            >
              {item.icon}
              {item.name}
            </Link>
          ))}
        </div>

        <div className="flex items-center space-x-4">
          <div className="hidden sm:flex items-center space-x-2">
            <div className="ai-indicator"></div>
            <span className="text-sm font-medium text-muted-foreground">AI Active</span>
          </div>

          <Link
            to="/betting-slip"
            className="relative px-4 py-2 rounded-lg flex items-center bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            <span>Slip</span>
            <div className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center bg-destructive text-destructive-foreground text-xs font-bold rounded-full">
              2
            </div>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
