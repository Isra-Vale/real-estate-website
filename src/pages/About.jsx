import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import PropertyImage from "../components/PropertyImage";
import Stats from "../components/Stats";
import PageTransition from "../components/PageTransition";

const values = [
  {
    title: "Discretion First",
    body: "Many of our best transactions never appear in a public listing. Privacy isn't a feature, it's the default.",
  },
  {
    title: "Fewer Clients, More Attention",
    body: "Every agent caps their active client list so each search gets full attention, not a rotation.",
  },
  {
    title: "Global, Not Generic",
    body: "Our network spans 40 countries, but every recommendation is made by someone who has walked the property.",
  },
];

export default function About() {
  return (
    <PageTransition>
      <div className="pt-32">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="eyebrow text-gold">Since 2009</span>
            <h1 className="font-display text-4xl sm:text-6xl text-parchment mt-4 text-balance">
              Built on Relationships, Not Listings
            </h1>
            <p className="text-slate mt-6 max-w-2xl mx-auto leading-relaxed">
              Aurum began as a three-person team representing a handful of
              estates in the Hamptons. Today we work across six countries,
              but the model hasn't changed: small teams, deep relationships,
              and access most buyers never see.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 1.02 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="h-[40vh] min-h-90 my-16 mx-6 lg:mx-10 overflow-hidden"
        >
          <PropertyImage
            image="./src/images/about-banner.png"
            art={{ variant: "noon", seed: 31 }}
            className="w-full h-full"
            label="The Guardian team"
          />
        </motion.div>

        <Stats />

        <section className="max-w-6xl mx-auto px-6 py-24 grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="border border-hairline bg-card p-7"
            >
              <span className="font-display text-3xl text-gold">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="font-display text-xl text-parchment mt-4">{v.title}</h3>
              <p className="text-slate text-sm mt-3 leading-relaxed">{v.body}</p>
            </motion.div>
          ))}
        </section>

        <section className="max-w-4xl mx-auto px-6 pb-24 text-center">
          <h2 className="font-display text-3xl sm:text-4xl text-parchment text-balance">
            Curious what discretion looks like in practice?
          </h2>
          <Link
            to="/agents"
            className="inline-flex items-center gap-2 mt-8 bg-gold text-void px-8 py-3.5 text-sm uppercase tracking-wide hover:bg-gold-bright transition-colors focus-ring"
          >
            Meet the Team <ArrowRight size={15} />
          </Link>
        </section>
      </div>
    </PageTransition>
  );
}
