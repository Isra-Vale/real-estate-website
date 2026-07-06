import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import PropertyImage from "../components/PropertyImage";
import PageTransition from "../components/PageTransition";
import { usePosts } from "../hooks/useApiData";

function PostSkeleton() {
  return (
    <div className="border border-hairline bg-card overflow-hidden animate-pulse">
      <div className="h-48 bg-surface-2" />
      <div className="p-6 space-y-3">
        <div className="h-5 w-3/4 bg-surface-2 rounded-sm" />
        <div className="h-3 w-full bg-surface-2 rounded-sm" />
        <div className="h-3 w-2/3 bg-surface-2 rounded-sm" />
      </div>
    </div>
  );
}

export default function Blog() {
  const { data: posts, loading } = usePosts();

  return (
    <PageTransition>
      <div className="pt-32 pb-24 max-w-7xl mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="eyebrow text-gold">The Guardian Journal</span>
          <h1 className="font-display text-4xl sm:text-5xl text-parchment mt-3">
            Insight Before Inventory
          </h1>
          <p className="text-slate mt-4 max-w-lg mx-auto">
            Market analysis, design notes, and field guides from the people closing the deals.
          </p>
        </motion.div>

        {loading || !posts ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <PostSkeleton key={i} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post, i) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.07 }}
                whileHover={{ y: -5 }}
                className="border border-hairline bg-card overflow-hidden group"
              >
                <Link to={`/blog/${post.id}`} className="block focus-ring">
                  <div className="h-48 overflow-hidden relative">
                    <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.6 }}>
                      <PropertyImage
                        image={post.image}
                        art={post.art}
                        className="w-full h-full"
                        label={post.title}
                      />
                    </motion.div>
                    <span className="absolute top-4 left-4 text-[10px] uppercase tracking-[0.16em] px-2.5 py-1 bg-void/70 text-gold backdrop-blur">
                      {post.category}
                    </span>
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-xl text-parchment leading-snug group-hover:text-gold transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-sm text-slate mt-3 leading-relaxed">{post.excerpt}</p>
                    <div className="flex items-center justify-between mt-5 pt-5 border-t border-hairline">
                      <span className="text-xs text-slate-dim">{post.readTime}</span>
                      <span className="flex items-center gap-1.5 text-sm text-gold">
                        Read <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </PageTransition>
  );
}
