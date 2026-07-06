import { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sparkle } from "lucide-react";

const links = [
  { to: "/properties", label: "Properties" },
  { to: "/rentals", label: "Rentals" },
  { to: "/luxury", label: "Luxury" },
  { to: "/agents", label: "Agents" },
  { to: "/about", label: "About" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-500 ${
        scrolled ? "bg-void/90 backdrop-blur-md border-b border-hairline" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group focus-ring rounded-sm">
          <Sparkle
            size={16}
            className="text-gold transition-transform duration-500 group-hover:rotate-180"
            strokeWidth={1.5}
          />
          <span className="font-display text-2xl tracking-wide text-parchment">Guardian</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-9">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `relative text-sm tracking-wide py-2 focus-ring rounded-sm transition-colors ${
                  isActive ? "text-gold" : "text-slate hover:text-parchment"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {l.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute left-0 -bottom-0.5 h-px w-full bg-gold"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Link
            to="/contact"
            className="border border-gold text-gold text-xs tracking-[0.18em] uppercase px-5 py-2.5 hover:bg-gold hover:text-void transition-colors duration-300 focus-ring"
          >
            Contact
          </Link>
        </div>

        <button
          className="lg:hidden text-parchment focus-ring rounded-sm p-1"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden overflow-hidden bg-void border-b border-hairline"
          >
            <div className="px-6 py-6 flex flex-col gap-5">
              {links.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `text-base ${isActive ? "text-gold" : "text-slate"}`
                  }
                >
                  {l.label}
                </NavLink>
              ))}
              <Link
                to="/contact"
                onClick={() => setOpen(false)}
                className="mt-2 border border-gold text-gold text-xs tracking-[0.18em] uppercase px-5 py-3 text-center"
              >
                Contact
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
