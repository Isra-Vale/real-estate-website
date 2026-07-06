import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Mail, MapPin, Send, CheckCircle2 } from "lucide-react";
import PageTransition from "../components/PageTransition";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <PageTransition>
      <div className="pt-32 pb-24 max-w-6xl mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="eyebrow text-gold">Get in Touch</span>
          <h1 className="font-display text-4xl sm:text-5xl text-parchment mt-3">
            Let's Find Your Address
          </h1>
          <p className="text-slate mt-4 max-w-lg mx-auto">
            Whether you're buying, selling, or simply curious about the market, our concierge team responds within the hour.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-2 space-y-6"
          >
            <ContactRow icon={<Phone size={18} />} label="Call us" value="(555) 123-4567" />
            <ContactRow icon={<Mail size={18} />} label="Email" value="hello@Guardian.com" />
            <ContactRow icon={<MapPin size={18} />} label="Headquarters" value="One Park Avenue, New York, NY" />

            <div className="border border-hairline bg-card p-6 mt-8">
              <p className="eyebrow text-gold mb-3">Office Hours</p>
              <div className="space-y-2 text-sm text-slate">
                <div className="flex justify-between"><span>Monday – Friday</span><span className="text-parchment">9am – 7pm</span></div>
                <div className="flex justify-between"><span>Saturday</span><span className="text-parchment">10am – 5pm</span></div>
                <div className="flex justify-between"><span>Sunday</span><span className="text-parchment">By appointment</span></div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:col-span-3 border border-hairline bg-card p-8"
          >
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center text-center py-16"
                >
                  <CheckCircle2 size={40} className="text-gold mb-5" strokeWidth={1.3} />
                  <p className="font-display text-2xl text-parchment">Message sent</p>
                  <p className="text-slate mt-2 max-w-sm">
                    Thank you, {form.name || "friend"}. A member of our concierge team will reach out shortly.
                  </p>
                  <button
                    onClick={() => { setSubmitted(false); setForm({ name: "", email: "", message: "" }); }}
                    className="mt-7 text-gold text-sm border-b border-gold/40 pb-1 hover:border-gold transition-colors"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-5"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <Field
                      label="Full Name"
                      value={form.name}
                      onChange={(v) => setForm((f) => ({ ...f, name: v }))}
                      required
                    />
                    <Field
                      label="Email"
                      type="email"
                      value={form.email}
                      onChange={(v) => setForm((f) => ({ ...f, email: v }))}
                      required
                    />
                  </div>
                  <div>
                    <label className="text-xs uppercase tracking-wide text-slate">Message</label>
                    <textarea
                      required
                      rows={5}
                      value={form.message}
                      onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                      className="mt-2 w-full bg-surface border border-hairline px-4 py-3 text-parchment outline-none focus-ring resize-none"
                      placeholder="Tell us what you're looking for..."
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-gold text-void py-4 text-sm uppercase tracking-wide flex items-center justify-center gap-2 hover:bg-gold-bright transition-colors focus-ring"
                  >
                    Send Message <Send size={15} />
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
}

function ContactRow({ icon, label, value }) {
  return (
    <div className="flex items-start gap-4 border border-hairline bg-card p-5">
      <span className="text-gold mt-0.5">{icon}</span>
      <div>
        <p className="text-xs uppercase tracking-wide text-slate-dim">{label}</p>
        <p className="text-parchment mt-1">{value}</p>
      </div>
    </div>
  );
}

function Field({ label, value, onChange, type = "text", required }) {
  return (
    <div>
      <label className="text-xs uppercase tracking-wide text-slate">{label}</label>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full bg-surface border border-hairline px-4 py-3 text-parchment outline-none focus-ring"
      />
    </div>
  );
}
