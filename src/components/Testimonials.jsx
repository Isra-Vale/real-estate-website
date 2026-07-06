import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { useTestimonials } from "../hooks/useApiData";

export default function Testimonials() {
  const { data: testimonials, loading } = useTestimonials();

  if (loading || !testimonials) return null;

  return (
    <section className="bg-void py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <span className="eyebrow text-gold">Client Stories</span>
          <h2 className="font-display text-4xl sm:text-5xl text-parchment mt-3">
            Stories of Success
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.figure
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="border border-hairline bg-card p-7 flex flex-col"
            >
              <div className="flex gap-1 mb-4 text-gold">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <Star key={idx} size={14} className="fill-gold" />
                ))}
              </div>
              <blockquote className="text-parchment/90 text-[0.95rem] leading-relaxed flex-1">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-6 pt-5 border-t border-hairline">
                <p className="font-display text-parchment">{t.name}</p>
                <p className="text-gold text-xs mt-1">{t.detail}</p>
                <p className="text-slate-dim text-xs mt-0.5">{t.closed}</p>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
