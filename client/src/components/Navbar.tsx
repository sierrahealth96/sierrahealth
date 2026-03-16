import { Link, useLocation } from "wouter";
import { ShoppingBag, Search, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useCart } from "@/lib/cart";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { motion } from "framer-motion";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();
  const { items, setIsOpen } = useCart();
  const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b",
        scrolled
          ? "glass border-gray-200/50 py-3"
          : "bg-transparent border-transparent py-5"
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* 🔥 SIERRA HEALTH LOGO - Infinity Animation */}
        <Link href="/" className="flex items-center gap-3 group cursor-pointer">
          {/* Animated Infinity S */}
          <motion.div
            className="w-12 h-12 relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-500 via-teal-500 to-emerald-600 shadow-xl group-hover:shadow-emerald-500/30 border-2 border-white/20"
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
            whileHover={{ scale: 1.1, rotate: 0 }}
          >
            {/* Infinity Orbit S */}
            <motion.div
              className="absolute inset-0 w-full h-full flex items-center justify-center"
              animate={{
                rotate: [0, -360],
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <motion.div
                className="w-8 h-8 bg-white/20 rounded-full border-2 border-white/40 backdrop-blur-sm flex items-center justify-center font-bold text-emerald-100 text-lg"
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                S
              </motion.div>
            </motion.div>

            {/* Static Sierra Badge */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-black text-white text-xl drop-shadow-lg font-display tracking-tight">
                S
              </span>
            </div>

            {/* Glow Effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-emerald-400/50 via-transparent to-teal-400/50 rounded-2xl"
              animate={{
                rotate: [0, 360],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          </motion.div>

          {/* Gradient Sierra Text */}
          <motion.span 
            className="font-display font-black text-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-700 bg-clip-text text-transparent tracking-tight drop-shadow-lg"
            whileHover={{ scale: 1.05, y: -2 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            Sierra
          </motion.span>

          <motion.span 
            className="font-display font-bold text-lg bg-gradient-to-r from-slate-400 via-gray-300 to-slate-500 bg-clip-text text-transparent tracking-tight ml-1"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            Health
          </motion.span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-all duration-300 hover:text-emerald-500 group relative",
                location === link.href 
                  ? "text-emerald-600 font-bold" 
                  : "text-muted-foreground hover:-translate-y-0.5"
              )}
            >
              {link.name}
              {/* Underline Animation */}
              <motion.div
                className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full"
                initial={false}
                animate={location === link.href ? { width: "100%" } : { width: 0 }}
                transition={{ duration: 0.3 }}
              />
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-emerald-500 hover:bg-emerald-500/10">
            <Search className="w-5 h-5" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="relative text-muted-foreground hover:text-emerald-500 hover:bg-emerald-500/10"
            onClick={() => setIsOpen(true)}
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <motion.span 
                className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-xs font-bold flex items-center justify-center rounded-full shadow-lg"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                whileHover={{ scale: 1.1 }}
              >
                {cartCount}
              </motion.span>
            )}
          </Button>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden hover:bg-emerald-500/10">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent className="bg-gradient-to-b from-white/95 to-emerald-50/80 border-emerald-200">
              <div className="flex flex-col gap-6 mt-10">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={cn(
                      "text-xl font-bold text-foreground hover:text-emerald-500 py-3 px-4 rounded-2xl hover:bg-emerald-500/10 transition-all duration-300 border-r-4 border-transparent hover:border-emerald-500",
                      location === link.href && "bg-emerald-500/20 border-emerald-500 text-emerald-600"
                    )}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
