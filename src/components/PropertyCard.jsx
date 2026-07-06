import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Bed, Bath, Maximize, Heart, ArrowUpRight } from "lucide-react";
import PropertyImage from "./PropertyImage";
import { formatPrice } from "../data/mockData";

const tagColors = {
  "New Listing": "bg-gold text-void",
  Featured: "bg-parchment text-void",
  Exclusive: "bg-gold text-void",
  Sold: "bg-slate-dim text-void",
};

export default function PropertyCard({ property, index = 0, onSave, saved }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
      className="group relative bg-card border border-hairline overflow-hidden"
    >
      <Link to={`/properties/${property.id}`} className="block focus-ring">
        <div className="relative h-64 overflow-hidden">
          <motion.div
            className="absolute inset-0"
            whileHover={{ scale: 1.06 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <img
              src={property.image}
              alt={property.name}
              className="w-full h-full object-cover"
            />
          </motion.div>
          <div className="absolute inset-0 bg-linear-to-t from-void/70 via-transparent to-transparent" />

          <span
            className={`absolute top-4 left-4 text-[10px] tracking-[0.16em] uppercase px-2.5 py-1 font-medium ${
              tagColors[property.tag] || "bg-gold text-void"
            }`}
          >
            {property.tag}
          </span>

          {onSave && (
            <button
              onClick={(e) => {
                e.preventDefault();
                onSave(property.id);
              }}
              aria-label={saved ? "Remove from saved" : "Save property"}
              aria-pressed={saved}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-void/60 backdrop-blur flex items-center justify-center focus-ring"
            >
              <Heart
                size={16}
                className={saved ? "fill-gold text-gold" : "text-parchment"}
                strokeWidth={1.5}
              />
            </button>
          )}
        </div>

        <div className="p-6">
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-display text-xl text-parchment leading-snug">{property.name}</h3>
            <ArrowUpRight
              size={18}
              className="text-gold shrink-0 mt-1 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </div>
          <p className="text-sm text-slate mt-1">{property.location}</p>

          <div className="flex items-center justify-between mt-5 pt-5 border-t border-hairline">
            <span className="font-display text-lg text-gold">{formatPrice(property.price)}</span>
            <div className="flex items-center gap-4 text-slate text-xs">
              <span className="flex items-center gap-1.5">
                <Bed size={14} strokeWidth={1.5} /> {property.beds}
              </span>
              <span className="flex items-center gap-1.5">
                <Bath size={14} strokeWidth={1.5} /> {property.baths}
              </span>
              <span className="flex items-center gap-1.5">
                <Maximize size={14} strokeWidth={1.5} /> {property.sqft.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
