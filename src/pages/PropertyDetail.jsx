import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Bed, Bath, Maximize, MapPin, ArrowLeft, Heart, Calendar, ArrowRight } from "lucide-react";
import PropertyImage from "../components/PropertyImage";
import PropertyCard from "../components/PropertyCard";
import CardGridSkeleton from "../components/CardGridSkeleton";
import PageTransition from "../components/PageTransition";
import { formatPrice } from "../data/mockData";
import { useProperty, useProperties, useAgents } from "../hooks/useApiData";
import { useSaved } from "../hooks/useSavedContext";

export default function PropertyDetail() {
  const { id } = useParams();
  const { data: property, loading: propertyLoading } = useProperty(id);
  const { data: properties, loading: listLoading } = useProperties();
  const { data: agents } = useAgents();
  const { toggleSave, isSaved } = useSaved();

  if (!propertyLoading && !property) return <Navigate to="/properties" replace />;

  if (propertyLoading || !property) {
    return (
      <PageTransition>
        <div className="pt-32 pb-24 max-w-7xl mx-auto px-6 lg:px-10">
          <div className="h-[55vh] min-h-95 bg-card animate-pulse" />
        </div>
      </PageTransition>
    );
  }

  const list = properties || [];
  const propertyIndex = list.findIndex((p) => p.id === id);
  const agent =
    agents && agents.length > 0
      ? agents[(propertyIndex < 0 ? 0 : propertyIndex) % agents.length]
      : null;
  const related = list.filter((p) => p.id !== id).slice(0, 3);

  return (
    <PageTransition>
      <div className="pt-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <Link
            to="/properties"
            className="inline-flex items-center gap-2 text-sm text-slate hover:text-gold transition-colors mb-6"
          >
            <ArrowLeft size={15} /> Back to all properties
          </Link>
        </div>

        {/* hero image */}
        <motion.div
          initial={{ opacity: 0, scale: 1.02 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative h-[55vh] min-h-95 mx-6 lg:mx-10 max-w-7xl xl:mx-auto overflow-hidden"
        >
          <PropertyImage
            image={property.image}
            art={property.art}
            className="w-full h-full object-cover"
            label={property.name}
          />
          <div className="absolute inset-0 bg-linear-to-t from-void via-void/10 to-transparent" />
          <button
            onClick={() => toggleSave(property.id)}
            aria-pressed={isSaved(property.id)}
            aria-label={isSaved(property.id) ? "Remove from saved" : "Save property"}
            className="absolute top-5 right-5 w-11 h-11 rounded-full bg-void/60 backdrop-blur flex items-center justify-center focus-ring"
          >
            <Heart
              size={18}
              className={isSaved(property.id) ? "fill-gold text-gold" : "text-parchment"}
            />
          </button>
        </motion.div>

        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-14 grid grid-cols-1 lg:grid-cols-3 gap-14">
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              <span className="eyebrow text-gold">{property.tag}</span>
              <h1 className="font-display text-4xl sm:text-5xl text-parchment mt-3">
                {property.name}
              </h1>
              <p className="flex items-center gap-2 text-slate mt-3">
                <MapPin size={15} /> {property.location}
              </p>

              <div className="flex flex-wrap items-center gap-6 mt-8 py-6 border-y border-hairline">
                <Stat icon={<Bed size={18} />} value={property.beds} label="Bedrooms" />
                <Stat icon={<Bath size={18} />} value={property.baths} label="Bathrooms" />
                <Stat icon={<Maximize size={18} />} value={property.sqft.toLocaleString()} label="Sq Ft" />
                <Stat icon={<Calendar size={18} />} value={property.year} label="Year Built" />
              </div>

              <h2 className="font-display text-2xl text-parchment mt-10 mb-4">About this property</h2>
              <p className="text-slate leading-relaxed">
                {property.blurb} This residence has been thoughtfully maintained and
                upgraded throughout, offering an effortless balance of privacy and
                proximity to the world's most sought-after neighborhoods. Aurum's
                concierge team can arrange private viewings, virtual walkthroughs, and
                introductions to the design and architecture team behind the original build.
              </p>

              <div className="flex flex-wrap gap-2 mt-8">
                {property.features.map((f) => (
                  <span
                    key={f}
                    className="text-xs uppercase tracking-wide px-3 py-1.5 border border-hairline text-slate"
                  >
                    {f}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* sidebar */}
          <motion.aside
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="space-y-6"
          >
            <div className="border border-hairline bg-card p-6">
              <p className="eyebrow text-slate mb-1">Price</p>
              <p className="font-display text-3xl text-gold">{formatPrice(property.price)}</p>
              <Link
                to="/contact"
                className="mt-6 w-full bg-gold text-void py-3.5 text-sm uppercase tracking-wide flex items-center justify-center gap-2 hover:bg-gold-bright transition-colors focus-ring"
              >
                Request a Viewing <ArrowRight size={15} />
              </Link>
              <Link
                to="/compare"
                className="mt-3 w-full border border-hairline text-parchment py-3.5 text-sm uppercase tracking-wide flex items-center justify-center gap-2 hover:border-gold hover:text-gold transition-colors focus-ring"
              >
                Add to Compare
              </Link>
            </div>

            {agent && (
              <div className="border border-hairline bg-card p-6">
                <p className="eyebrow text-gold mb-4">Listing Agent</p>
                <p className="font-display text-lg text-parchment">{agent.name}</p>
                <p className="text-xs text-slate mt-1">{agent.title}</p>
                <Link
                  to="/agents"
                  className="mt-5 inline-flex items-center gap-2 text-sm text-gold border-b border-gold/40 pb-1 hover:border-gold transition-colors"
                >
                  View profile <ArrowRight size={14} />
                </Link>
              </div>
            )}
          </motion.aside>
        </div>

        <section className="max-w-7xl mx-auto px-6 lg:px-10 pb-24">
          <h2 className="font-display text-3xl text-parchment mb-8">You may also like</h2>
          {listLoading ? (
            <CardGridSkeleton count={3} />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((p, i) => (
                <PropertyCard key={p.id} property={p} index={i} onSave={toggleSave} saved={isSaved(p.id)} />
              ))}
            </div>
          )}
        </section>
      </div>
    </PageTransition>
  );
}

function Stat({ icon, value, label }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-gold">{icon}</span>
      <div>
        <p className="text-parchment font-medium">{value}</p>
        <p className="text-xs text-slate-dim">{label}</p>
      </div>
    </div>
  );
}