import React from "react";

const Footer: React.FC = () => (
    <footer className="w-full flex flex-col items-center justify-center py-6 mt-12 border-t border-white/10 bg-neutral-950 text-neutral-400 text-sm">
        <div className="mb-2">
            Hecho por{" "}
            <span className="font-semibold text-white">AzzADesigns</span>
        </div>
        <div className="flex gap-4">
            <a
                href="https://www.linkedin.com/in/azariel-moreno-4267ba254/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white underline transition"
            >
                LinkedIn
            </a>
            <a
                href="https://github.com/AzzADesigns"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white underline transition"
            >
                GitHub
            </a>
            <a
                href="https://azzadesignsweb.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white underline transition"
            >
                Portfolio
            </a>
        </div>
    </footer>
);

export default Footer;
