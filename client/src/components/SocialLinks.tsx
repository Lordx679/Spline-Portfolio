import { Github, Twitter, Linkedin, Mail } from "lucide-react";
import { SiDiscord } from "react-icons/si";
import { motion } from "framer-motion";

export function SocialLinks() {
  const socials = [
    { icon: SiDiscord, href: "https://discord.com", label: "Discord" },
    { icon: Github, href: "https://github.com", label: "GitHub" },
    { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
    { icon: Mail, href: "mailto:hello@example.com", label: "Email" },
  ];

  return (
    <div className="flex gap-4">
      {socials.map((social, idx) => (
        <motion.a
          key={idx}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 rounded-full bg-secondary/50 border border-white/5 text-muted-foreground hover:text-white hover:bg-primary/20 hover:border-primary/50 transition-all duration-300 group"
          whileHover={{ y: -4, scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          aria-label={social.label}
        >
          <social.icon className="w-5 h-5" />
        </motion.a>
      ))}
    </div>
  );
}
