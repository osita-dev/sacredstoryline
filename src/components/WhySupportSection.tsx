import { motion } from "framer-motion";
import { BookOpen, Globe, Heart } from "lucide-react";

const cards = [
  {
    icon: BookOpen,
    title: "Daily Stories",
    description: "Inspiring narratives delivered every day to uplift and encourage your journey.",
  },
  {
    icon: Globe,
    title: "Global Impact",
    description: "Reaching hearts across the world with hope, faith, and community.",
  },
  {
    icon: Heart,
    title: "Faith & Encouragement",
    description: "A safe space for reflection, prayer, and spiritual growth.",
  },
];

const WhySupportSection = () => {
  return (
    <section className="py-24 sm:py-32 bg-background">
      <div className="container mx-auto px-6 max-w-5xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="font-heading text-3xl sm:text-4xl font-semibold text-center text-foreground mb-16"
        >
          Why Your Support Matters
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {cards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="group bg-card rounded-xl p-8 text-center shadow-soft hover:shadow-card transition-all duration-300 hover:-translate-y-1 border border-border/50"
            >
              <div className="w-14 h-14 mx-auto mb-5 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                <card.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-heading text-xl font-semibold text-foreground mb-2">
                {card.title}
              </h3>
              <p className="font-body text-sm text-muted-foreground leading-relaxed">
                {card.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhySupportSection;
