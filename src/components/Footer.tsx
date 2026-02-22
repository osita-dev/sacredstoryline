const Footer = () => {
  return (
    <footer className="bg-secondary/60 border-t border-border/50 py-10">
      <div className="container mx-auto px-6 text-center">
        <p className="font-heading text-lg font-semibold text-foreground mb-2">
          SACRED STORYLINE
        </p>
        <a
          href="mailto:sacredstoryline0@gmail.com"
          className="font-body text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          jesus@sacredstoryline
        </a>
        <p className="font-body text-xs text-muted-foreground mt-4">
          © {new Date().getFullYear()} Sacred Storyline. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
