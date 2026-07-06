import { motion } from "framer-motion";
import { Star, Phone, Mail, MessageCircle, Calendar } from "lucide-react";
import PageTransition from "../components/PageTransition";
import AgentAvatar from "../components/AgentAvatar";
import { useAgents } from "../hooks/useApiData";

function AgentSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 border border-hairline bg-card overflow-hidden animate-pulse">
      <div className="h-80 lg:h-auto bg-surface-2" />
      <div className="p-10 space-y-4">
        <div className="h-4 w-32 bg-surface-2 rounded-sm" />
        <div className="h-8 w-48 bg-surface-2 rounded-sm" />
        <div className="h-3 w-40 bg-surface-2 rounded-sm" />
        <div className="h-20 w-full bg-surface-2 rounded-sm mt-4" />
      </div>
    </div>
  );
}

export default function Agents() {
  const { data: agents, loading } = useAgents();

  return (
    <PageTransition>
      <div className="pt-32 pb-24 max-w-7xl mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="eyebrow text-gold">Our Team</span>
          <h1 className="font-display text-4xl sm:text-5xl text-parchment mt-3">
            Meet Your Concierge
          </h1>
          <p className="text-slate mt-4 max-w-lg mx-auto">
            A small team of specialists, each focused on a single segment of the
            ultra-prime market, so every client gets a true expert.
          </p>
        </motion.div>

        {loading || !agents ? (
          <div className="space-y-16">
            {Array.from({ length: 2 }).map((_, i) => (
              <AgentSkeleton key={i} />
            ))}
          </div>
        ) : (
          <div className="space-y-16">
            {agents.map((agent, i) => (
              <motion.div
                key={agent.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-0 border border-hairline bg-card overflow-hidden ${
                  i % 2 === 1 ? "lg:[direction:rtl]" : ""
                }`}
              >
                <div className="relative h-80 lg:h-auto bg-surface-2 flex items-center justify-center overflow-hidden [direction:ltr]">
                  <span className="absolute top-5 left-5 z-10 text-[10px] tracking-[0.16em] uppercase px-2.5 py-1 bg-gold text-void font-medium">
                    {agent.badge}
                  </span>
                  <AgentAvatar
                    image={agent.image}
                    name={agent.name}
                    className="w-full h-full lg:absolute lg:inset-0"
                  />
                </div>

                <div className="p-8 sm:p-10 flex flex-col justify-center [direction:ltr]">
                  <div className="flex items-center gap-1.5 mb-3">
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <Star
                        key={idx}
                        size={14}
                        className={idx < Math.round(agent.rating) ? "fill-gold text-gold" : "text-hairline"}
                      />
                    ))}
                    <span className="text-xs text-slate ml-1">
                      {agent.rating}/5 &middot; {agent.reviews} reviews
                    </span>
                  </div>

                  <h3 className="font-display text-3xl text-parchment">{agent.name}</h3>
                  <p className="eyebrow text-gold mt-1">{agent.title}</p>

                  <p className="text-slate mt-5 leading-relaxed">&ldquo;{agent.quote}&rdquo;</p>

                  <p className="text-xs text-slate-dim mt-5">
                    Specialty: <span className="text-slate">{agent.specialty}</span>
                  </p>

                  <div className="flex flex-wrap items-center gap-5 mt-6 text-sm text-slate">
                    <span className="flex items-center gap-2">
                      <Phone size={14} className="text-gold" /> {agent.phone}
                    </span>
                    <span className="flex items-center gap-2">
                      <Mail size={14} className="text-gold" /> {agent.email}
                    </span>
                  </div>

                  <div className="flex gap-3 mt-7">
                    <button className="bg-gold text-void px-6 py-3 text-sm uppercase tracking-wide flex items-center gap-2 hover:bg-gold-bright transition-colors focus-ring">
                      <MessageCircle size={15} /> Chat Now
                    </button>
                    <button className="border border-hairline text-parchment px-6 py-3 text-sm uppercase tracking-wide flex items-center gap-2 hover:border-gold hover:text-gold transition-colors focus-ring">
                      <Calendar size={15} /> Schedule Call
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </PageTransition>
  );
}
