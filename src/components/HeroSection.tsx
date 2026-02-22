import { motion } from "framer-motion";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  const scrollToDonate = () => {
    document.getElementById("donate")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background" />

      <div className="relative z-10 container mx-auto px-6 text-center max-w-3xl">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight mb-6"
        >
          Every Story Matters.{" "}
          <span className="text-primary">Every Prayer Counts.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="font-body text-lg sm:text-xl text-muted-foreground max-w-xl mx-auto mb-10 leading-relaxed"
        >
          Sacred Storyline is a platform for daily stories, reflections, and
          encouragement — bringing faith to life, one story at a time.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
        >
          <button
            onClick={scrollToDonate}
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-body font-medium text-lg px-8 py-4 rounded-lg shadow-donate hover:brightness-110 transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5"
          >
            Support the Mission
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
