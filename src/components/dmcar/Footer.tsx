import { Link } from "@tanstack/react-router";
import { Instagram, Mail } from "lucide-react";

const WA = "https://wa.me/5585987198049";

export function Footer() {
  return (
    <footer className="bg-[#070707] border-t-2 border-gold">
      <div className="mx-auto max-w-7xl px-6 py-20 grid gap-12 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="font-display text-4xl text-gold mb-3">DMCAR</div>
          <p className="italic text-muted-foreground text-sm mb-4">Mais de 20 anos acelerando sonhos.</p>
          <p className="text-sm text-white/70 leading-relaxed mb-5">
            Referência em seminovos em Fortaleza, com duas lojas, oficina própria e um time que coloca o cliente em primeiro lugar.
          </p>
          <div className="flex items-center gap-3">
            <a href="https://www.instagram.com/dmcarveiculos" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="p-2 rounded-full border border-border hover:border-gold hover:text-gold transition-colors">
              <Instagram className="w-4 h-4" />
            </a>
            <a href={WA} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="p-2 rounded-full border border-border hover:border-gold hover:text-gold transition-colors">
              <svg viewBox="0 0 32 32" className="w-4 h-4 fill-current"><path d="M16 0C7.163 0 0 7.163 0 16c0 2.822.736 5.468 2.027 7.77L0 32l8.43-2.01A15.934 15.934 0 0 0 16 32c8.837 0 16-7.163 16-16S24.837 0 16 0z"/></svg>
            </a>
            <a href="#" aria-label="Facebook" className="p-2 rounded-full border border-border hover:border-gold hover:text-gold transition-colors">
              <Facebook className="w-4 h-4" />
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-display text-gold text-lg mb-4 tracking-wider">NAVEGAÇÃO</h4>
          <ul className="space-y-2 text-sm text-white/70">
            <li><Link to="/" className="hover:text-gold">Início</Link></li>
            <li><Link to="/showroom" className="hover:text-gold">Estoque</Link></li>
            <li><a href="/#historia" className="hover:text-gold">Nossa História</a></li>
            <li><a href="/#missao" className="hover:text-gold">Missão e Valores</a></li>
            <li><a href="/#garantia" className="hover:text-gold">Garantia</a></li>
            <li><a href="/#consultores" className="hover:text-gold">Consultores</a></li>
            <li><a href="/#depoimentos" className="hover:text-gold">Depoimentos</a></li>
            <li><a href="/#unidades" className="hover:text-gold">Nossas Unidades</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-gold text-lg mb-4 tracking-wider">NOSSAS UNIDADES</h4>
          <ul className="space-y-3 text-sm text-white/70">
            <li><span className="text-white font-semibold">Loja 1</span><br/>Av. Mister Hull, 4971 — Antônio Bezerra<br/>(85) 98719-8049</li>
            <li><span className="text-white font-semibold">Loja 2</span><br/>Av. Mister Hull, 4940 — Antônio Bezerra<br/>(85) 98719-8049</li>
            <li><span className="text-white font-semibold">Oficina</span><br/>Rua Gen. Alípio dos Santos, 1357 — Quintino Cunha<br/>(85) 3879-4106</li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-gold text-lg mb-4 tracking-wider">FALE CONOSCO</h4>
          <ul className="space-y-2 text-sm text-white/70 mb-5">
            <li className="flex items-center gap-2"><Mail className="w-4 h-4 text-gold"/> dmcaroficina@hotmail.com</li>
            <li className="flex items-center gap-2"><Mail className="w-4 h-4 text-gold"/> consultoresdmcarveiculos@gmail.com</li>
          </ul>
          <a href={WA} target="_blank" rel="noopener noreferrer" className="inline-block btn-primary rounded-full px-4 py-2 text-sm">
            Falar no WhatsApp
          </a>
        </div>
      </div>

      <div className="bg-black border-t border-border">
        <div className="mx-auto max-w-7xl px-6 py-5 flex flex-col md:flex-row gap-3 items-center justify-between text-[11px] text-[#555]">
          <span className="text-center md:text-left">CNPJ: 32.101.023/0001-89 · PARCELA JUSTA COMÉRCIO DE VEÍCULOS LTDA · <Link to="/privacidade" className="hover:text-gold">Política de Privacidade</Link></span>
          <span className="text-center">© 2025 DMCAR. Todos os direitos reservados.</span>
          <span className="text-center md:text-right">Desenvolvido com 🖤 para quem ama carros</span>
        </div>
      </div>
    </footer>
  );
}
