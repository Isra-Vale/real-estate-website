import { Link } from "react-router-dom";
import { Sparkle } from "lucide-react";

function SocialIcon({ path }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d={path} />
    </svg>
  );
}

const socials = [
  {
    label: "Instagram",
    path: "M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8A5.8 5.8 0 0 1 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2Zm-.2 2A3.6 3.6 0 0 0 4 7.6v8.8A3.6 3.6 0 0 0 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6A3.6 3.6 0 0 0 16.4 4H7.6Zm8.65 1.5a1.15 1.15 0 1 1 0 2.3 1.15 1.15 0 0 1 0-2.3ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z",
  },
  {
    label: "LinkedIn",
    path: "M4.98 3.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5ZM3 9.98h4v11.02H3V9.98Zm7 0h3.8v1.5h.05c.53-1 1.83-2.06 3.77-2.06 4.03 0 4.78 2.65 4.78 6.1v5.48h-4v-4.86c0-1.16-.02-2.65-1.62-2.65-1.62 0-1.87 1.27-1.87 2.57v4.94h-4V9.98Z",
  },
  {
    label: "X",
    path: "M3 3h4.4l4.1 5.5L16.2 3H21l-7 8.4L21 21h-4.4l-4.4-5.9L7.1 21H3l7.3-8.8L3 3Z",
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-hairline bg-void">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Sparkle size={16} className="text-gold" strokeWidth={1.5} />
              <span className="font-display text-xl text-parchment">Guardian</span>
            </div>
            <p className="text-sm text-slate leading-relaxed max-w-xs">
              Representing the world's most distinguished properties since 2009.
            </p>
            <div className="flex gap-4 mt-6 text-slate">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href="#"
                  aria-label={s.label}
                  className="hover:text-gold transition-colors focus-ring rounded-sm"
                >
                  <SocialIcon path={s.path} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="eyebrow text-gold mb-4">Explore</h4>
            <ul className="space-y-3 text-sm text-slate">
              <li><Link to="/properties" className="hover:text-parchment transition-colors">Properties</Link></li>
              <li><Link to="/rentals" className="hover:text-parchment transition-colors">Rentals</Link></li>
              <li><Link to="/luxury" className="hover:text-parchment transition-colors">Luxury Collection</Link></li>
              <li><Link to="/compare" className="hover:text-parchment transition-colors">Compare Properties</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="eyebrow text-gold mb-4">Company</h4>
            <ul className="space-y-3 text-sm text-slate">
              <li><Link to="/agents" className="hover:text-parchment transition-colors">Our Guardian</Link></li>
              <li><Link to="/about" className="hover:text-parchment transition-colors">About Guardian</Link></li>
              <li><Link to="/blog" className="hover:text-parchment transition-colors">Journal</Link></li>
              <li><Link to="/contact" className="hover:text-parchment transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="eyebrow text-gold mb-4">Newsletter</h4>
            <p className="text-sm text-slate mb-4">New listings, before they're public.</p>
            <form className="flex border-b border-hairline focus-within:border-gold transition-colors" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                required
                placeholder="Your email"
                className="bg-transparent text-sm py-2 flex-1 outline-none placeholder:text-slate-dim text-parchment"
              />
              <button type="submit" className="text-gold text-xs uppercase tracking-wider py-2 focus-ring">
                Join
              </button>
            </form>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-hairline flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-dim">
          <span>&copy; {new Date().getFullYear()} Guardian Properties. All rights reserved.</span>
          <div className="flex gap-6">
            <a href="#" className="hover:text-slate transition-colors">Privacy</a>
            <a href="#" className="hover:text-slate transition-colors">Terms</a>
            <Link to="/contact" className="hover:text-slate transition-colors">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
