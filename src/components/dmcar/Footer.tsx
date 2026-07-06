import { Link } from "@tanstack/react-router";
import { Instagram, Mail } from "lucide-react";

const WA = "https://wa.me/5585988849957?text=Ol%C3%A1%2C%20venho%20pelo%20link%20do%20site%20da%20DMCAR%20e%20gostaria%20de%20mais%20informa%C3%A7%C3%B5es%21";

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
              <svg viewBox="0 0 32 32" className="w-4 h-4 fill-current" aria-hidden="true">
                <path d="M19.11 17.205c-.372 0-1.088 1.39-1.518 1.39a.63.63 0 0 1-.315-.1c-.802-.402-1.504-.817-2.163-1.447-.545-.516-1.146-1.29-1.46-1.963a.426.426 0 0 1-.073-.215c0-.33.99-.945.99-1.49 0-.143-.73-2.09-.832-2.335-.143-.372-.214-.487-.6-.487-.187 0-.36-.043-.53-.043-.302 0-.53.115-.746.315-.688.645-1.032 1.318-1.06 2.264v.114c-.015.99.472 1.977 1.017 2.78 1.23 1.82 2.506 3.41 4.554 4.34.616.287 2.035.888 2.722.888.817 0 2.15-.515 2.478-1.318.187-.46.244-.948.244-1.434 0-.085 0-.215-.058-.272-.116-.144-1.46-.86-1.633-.86zm-2.42 7.534h-.014c-1.49 0-2.95-.402-4.222-1.162l-.302-.18-3.13.82.834-3.05-.2-.314a8.265 8.265 0 0 1-1.276-4.42c0-4.59 3.745-8.334 8.348-8.334 2.235 0 4.32.87 5.896 2.435a8.27 8.27 0 0 1 2.444 5.898c-.013 4.59-3.756 8.336-8.378 8.336z m7.087-15.42A9.99 9.99 0 0 0 16.69 6.39c-5.523 0-10.026 4.504-10.04 10.027 0 1.76.46 3.49 1.348 5.018L6.566 26l4.682-1.232a10.022 10.022 0 0 0 4.79 1.218h.015c5.52 0 10.025-4.504 10.04-10.027a9.946 9.946 0 0 0-2.91-7.095z"/>
              </svg>
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
