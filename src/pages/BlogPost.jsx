import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import PropertyImage from "../components/PropertyImage";
import PageTransition from "../components/PageTransition";
import { usePost, usePosts } from "../hooks/useApiData";

export default function BlogPost() {
  const { id } = useParams();
  const { data: post, loading: postLoading } = usePost(id);
  const { data: posts } = usePosts();

  if (!postLoading && !post) return <Navigate to="/blog" replace />;

  if (postLoading || !post) {
    return (
      <PageTransition>
        <div className="pt-28 pb-24">
          <div className="h-[36vh] min-h-[260px] max-w-5xl mx-auto px-6 bg-card animate-pulse" />
        </div>
      </PageTransition>
    );
  }

  const more = (posts || []).filter((p) => p.id !== id).slice(0, 2);

  return (
    <PageTransition>
      <div className="pt-28 pb-24">
        <div className="max-w-3xl mx-auto px-6">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-sm text-slate hover:text-gold transition-colors mb-6"
          >
            <ArrowLeft size={15} /> Back to the journal
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 1.02 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="h-[36vh] min-h-[260px] max-w-5xl mx-auto px-6 overflow-hidden"
        >
          <PropertyImage image={post.image} art={post.art} className="w-full h-full" label={post.title} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="max-w-3xl mx-auto px-6 mt-10"
        >
          <span className="eyebrow text-gold">{post.category}</span>
          <h1 className="font-display text-3xl sm:text-4xl text-parchment mt-3 text-balance">
            {post.title}
          </h1>
          <p className="text-xs text-slate-dim mt-3">{post.readTime}</p>

          <div className="mt-8 space-y-5">
            {post.body.map((para, i) => (
              <p key={i} className="text-slate leading-relaxed">
                {para}
              </p>
            ))}
          </div>

          <div className="mt-12 pt-8 border-t border-hairline flex items-center justify-between">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 text-gold border-b border-gold/40 pb-1 hover:border-gold transition-colors"
            >
              Discuss this with an agent <ArrowRight size={14} />
            </Link>
          </div>
        </motion.div>

        {more.length > 0 && (
          <div className="max-w-5xl mx-auto px-6 mt-20">
            <h2 className="font-display text-2xl text-parchment mb-6">Continue reading</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {more.map((p) => (
                <Link
                  key={p.id}
                  to={`/blog/${p.id}`}
                  className="border border-hairline bg-card p-5 flex items-center gap-4 hover:border-gold transition-colors group"
                >
                  <div className="w-20 h-20 shrink-0 overflow-hidden">
                    <PropertyImage image={p.image} art={p.art} className="w-full h-full" label={p.title} />
                  </div>
                  <div>
                    <p className="font-display text-parchment group-hover:text-gold transition-colors">{p.title}</p>
                    <p className="text-xs text-slate-dim mt-1">{p.readTime}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </PageTransition>
  );
}
