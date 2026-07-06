import { motion } from "framer-motion";
import { useCountUp } from "../hooks/useCountUp";
import { useStats } from "../hooks/useApiData";

function Stat({ stat, index }) {
  const { ref, display } = useCountUp(stat.value, { decimals: stat.value % 1 !== 0 ? 1 : 0 });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="text-center"
    >
      <p className="font-display text-4xl sm:text-5xl text-gold">
        {stat.prefix}
        {display}
        {stat.suffix}
      </p>
      <p className="text-slate text-sm mt-2 tracking-wide">{stat.label}</p>
    </motion.div>
  );
}

export default function Stats() {
  const { data: stats, loading } = useStats();

  if (loading || !stats) {
    return <section className="border-y border-hairline bg-surface h-[180px]" />;
  }

  return (
    <section className="border-y border-hairline bg-surface">
      <div className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-2 md:grid-cols-4 gap-10">
        {stats.map((s, i) => (
          <Stat key={s.label} stat={s} index={i} />
        ))}
      </div>
    </section>
  );
}
