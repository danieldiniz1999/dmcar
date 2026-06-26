import { createFileRoute, Link } from "@tanstack/react-router";
import { Search, CreditCard, FileText, Handshake, MapPin, Phone, Mail, Wrench, Shield, Settings, Star, Calendar, Gauge, Cog, Palette, User, ArrowRight } from "lucide-react";
import { Header } from "@/components/dmcar/Header";
import { Footer } from "@/components/dmcar/Footer";
import { WhatsAppFloat } from "@/components/dmcar/WhatsAppFloat";
import { CookieBanner } from "@/components/dmcar/CookieBanner";
import { Reveal } from "@/components/dmcar/Reveal";
import { StatNumber } from "@/components/dmcar/StatNumber";
import heroCar from "@/assets/hero-car.jpg";
import carSedan from "@/assets/car-sedan.jpg";
import carSuv from "@/assets/car-suv.jpg";
import carHatch from "@/assets/car-hatch.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "DMCAR Veículos Multimarcas | Seminovos em Fortaleza" },
      { name: "description", content: "A DMCAR é referência em seminovos em Fortaleza/CE. Mais de 3.000 veículos vendidos, 2 lojas, oficina própria e garantia de 90 dias. Financiamento facilitado." },
      { name: "keywords", content: "seminovos fortaleza, carros usados fortaleza, DMCAR, comprar carro fortaleza, veículos multimarcas fortaleza, Antonio Bezerra carros" },
      { property: "og:title", content: "DMCAR Veículos Multimarcas | Seminovos em Fortaleza" },
      { property: "og:description", content: "Mais de 3.000 veículos vendidos, 2 lojas e oficina própria. Seu próximo carro é aqui." },
      { property: "og:url", content: "https://dmcar.site/" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "https://dmcar.site/" }],
  }),
  component: HomePage,
});

const WA_LOJA = "https://wa.me/5585987198049?text=Ol%C3%A1%2C%20vim%20pelo%20site%20da%20DMCAR%20e%20gostaria%20de%20mais%20informa%C3%A7%C3%B5es!";
const WA_ITALO = "https://wa.me/5585989154419?text=Ol%C3%A1%20%C3%8Dtalo%2C%20vim%20pelo%20site%20da%20DMCAR%20e%20gostaria%20de%20saber%20mais%20sobre%20os%20ve%C3%ADculos%20dispon%C3%ADveis!";
const WA_WALLYSON = "https://wa.me/5585989338918?text=Ol%C3%A1%20Wallyson%2C%20vim%20pelo%20site%20da%20DMCAR%20e%20gostaria%20de%20saber%20mais%20sobre%20os%20ve%C3%ADculos%20dispon%C3%ADveis!";

function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <Stats />
      <Diferenciais />
      <Estoque />
      <Historia />
      <Missao />
      <Consultores />
      <Garantia />
      <Depoimentos />
      <Unidades />
      <Footer />
      <WhatsAppFloat />
      <CookieBanner />
    </div>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <img src={heroCar} alt="" className="w-full h-full object-cover opacity-50" width={1920} height={1080} />
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/60 to-background" />
      </div>
      <div className="relative mx-auto max-w-7xl px-6 pt-20 pb-24 md:pt-28 md:pb-32">
        <div className="max-w-3xl">
          <div className="hero-rise" style={{ animationDelay: "0ms" }}>
            <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-4 py-1.5 text-xs uppercase tracking-widest text-gold">
              ✦ Veículos Multimarcas · Fortaleza, CE
            </span>
          </div>
          <h1 className="hero-rise mt-6 font-display text-6xl sm:text-7xl md:text-8xl leading-[0.95] text-white" style={{ animationDelay: "150ms" }}>
            SEU PRÓXIMO<br/>CARRO É <span className="text-gold">AQUI.</span>
          </h1>
          <p className="hero-rise mt-6 max-w-xl text-lg text-muted-foreground" style={{ animationDelay: "300ms" }}>
            Seminovos selecionados, financiamento facilitado e total transparência na negociação.
          </p>
          <div className="hero-rise mt-8 flex flex-col sm:flex-row gap-3" style={{ animationDelay: "450ms" }}>
            <Link to="/showroom" className="btn-primary rounded-full px-7 py-3.5 text-sm text-center">Ver Estoque</Link>
            <a href={WA_LOJA} target="_blank" rel="noopener noreferrer" className="btn-outline rounded-full px-7 py-3.5 text-sm text-center">Falar com um Consultor</a>
          </div>
        </div>

        <div className="hero-rise mt-16 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 border-t border-border pt-10" style={{ animationDelay: "650ms" }}>
          <StatNumber value={3000} suffix="+" label="Veículos Vendidos" />
          <StatNumber value={11} suffix="Anos" label="de DMCAR" />
          <StatNumber value={20} suffix="Anos" label="com Carros" />
          <StatNumber value={40} suffix="+" label="Em Estoque" />
          <StatNumber value={2} label="Lojas" />
        </div>
      </div>
    </section>
  );
}

function Stats() {
  return (
    <section className="bg-[#0F0F0F] border-t-2 border-gold py-20">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="font-display text-4xl md:text-5xl text-white">DMCAR EM NÚMEROS</h2>
          <p className="mt-3 text-muted-foreground">Duas décadas de dedicação. Resultados que você pode confiar.</p>
        </Reveal>
        <Reveal>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 divide-y sm:divide-y-0 lg:divide-x divide-border">
            <StatNumber value={3000} suffix="+" label="Veículos Vendidos" />
            <StatNumber value={11} suffix="Anos" label="de DMCAR" />
            <StatNumber value={20} suffix="Anos" label="Trabalhando com Carros" />
            <StatNumber value={40} suffix="+" label="Carros em Estoque" />
            <StatNumber value={2} label="Lojas em Operação" />
          </div>
        </Reveal>
        <Reveal delay={150} className="mt-12 text-center">
          <p className="italic text-muted-foreground">"Cada número representa uma história. Cada história, um cliente que confiou na DMCAR."</p>
        </Reveal>
      </div>
    </section>
  );
}

const dif = [
  { icon: Search, title: "Veículos Vistoriados", text: "Cada carro passa por inspeção rigorosa antes de entrar no estoque." },
  { icon: CreditCard, title: "Financiamento Facilitado", text: "Trabalhamos com os melhores bancos para aprovar seu crédito." },
  { icon: FileText, title: "Documentação Inclusa", text: "Cuidamos de toda a burocracia para você não ter dor de cabeça." },
  { icon: Handshake, title: "Negociação Transparente", text: "Sem letras miúdas. Você sabe exatamente o que está comprando." },
];

function Diferenciais() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="text-center mb-14">
          <h2 className="font-display text-4xl md:text-5xl">POR QUE ESCOLHER A DMCAR?</h2>
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {dif.map((d, i) => (
            <Reveal key={d.title} delay={i * 100}>
              <div className="card-vehicle h-full rounded-2xl bg-surface border border-border p-7">
                <div className="w-12 h-12 rounded-xl bg-gold/10 border border-gold/30 flex items-center justify-center mb-5">
                  <d.icon className="w-6 h-6 text-gold" />
                </div>
                <h3 className="font-display text-2xl mb-2">{d.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{d.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

const cars = [
  { img: carSedan, badge: "Destaque", badgeColor: "bg-gold text-black", model: "Toyota Corolla XEi 2022", ano: "2022", km: "32.500 km", cambio: "Automático", cor: "Prata", preco: "R$ 119.900" },
  { img: carSuv, badge: "Novo", badgeColor: "bg-white text-black", model: "Jeep Compass Limited 2023", ano: "2023", km: "18.900 km", cambio: "Automático", cor: "Cinza", preco: "R$ 159.900" },
  { img: carHatch, badge: "Destaque", badgeColor: "bg-gold text-black", model: "Hyundai HB20 Comfort 2022", ano: "2022", km: "24.100 km", cambio: "Manual", cor: "Vermelho", preco: "R$ 72.900" },
];

function Estoque() {
  return (
    <section id="estoque" className="bg-[#0F0F0F] py-24">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="text-center mb-14">
          <h2 className="font-display text-4xl md:text-5xl">DESTAQUES DO ESTOQUE</h2>
          <p className="mt-3 text-muted-foreground">Uma seleção dos melhores veículos disponíveis agora</p>
        </Reveal>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cars.map((c, i) => (
            <Reveal key={c.model} delay={i * 100}>
              <article className="card-vehicle group h-full rounded-2xl bg-surface border border-border overflow-hidden flex flex-col">
                <div className="relative aspect-[4/3] bg-black overflow-hidden">
                  <img src={c.img} alt={c.model} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <span className={`absolute top-3 left-3 ${c.badgeColor} text-[10px] uppercase tracking-widest font-bold px-3 py-1 rounded-full`}>{c.badge}</span>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="font-display text-2xl mb-4">{c.model}</h3>
                  <div className="grid grid-cols-2 gap-3 text-xs text-muted-foreground mb-5">
                    <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-gold" /> {c.ano}</span>
                    <span className="flex items-center gap-1.5"><Gauge className="w-3.5 h-3.5 text-gold" /> {c.km}</span>
                    <span className="flex items-center gap-1.5"><Cog className="w-3.5 h-3.5 text-gold" /> {c.cambio}</span>
                    <span className="flex items-center gap-1.5"><Palette className="w-3.5 h-3.5 text-gold" /> {c.cor}</span>
                  </div>
                  <div className="font-mono-d text-3xl text-gold font-bold mb-5 mt-auto">{c.preco}</div>
                  <div className="flex gap-2">
                    <a href={WA_LOJA} target="_blank" rel="noopener noreferrer" className="flex-1 btn-primary rounded-full px-4 py-2.5 text-xs text-center">Tenho Interesse</a>
                    <Link to="/showroom" className="flex-1 btn-outline rounded-full px-4 py-2.5 text-xs text-center">Ver Detalhes</Link>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-14 text-center">
          <p className="text-muted-foreground mb-5">Temos mais de 40 veículos esperando por você.</p>
          <Link to="/showroom" className="inline-flex items-center gap-2 btn-primary rounded-full px-8 py-4 text-base">
            Ver Showroom Completo <ArrowRight className="w-4 h-4" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

const timeline = [
  { ano: "2005", marco: "O Começo nas Mãos", titulo: "Da Mecânica à Excelência", texto: "Tudo começou com uma chave de fenda e muita determinação. Diogo Microni, movido pela paixão pela mecânica automotiva, abriu sua própria oficina e aprendeu na prática o que os livros não ensinam: que confiança se constrói parafuso por parafuso, cliente por cliente. Por anos, foi ele mesmo quem esteve sob cada carro, garantindo cada serviço com as próprias mãos." },
  { ano: "2015", marco: "Um Novo Motor", titulo: "Nasce a DMCAR Veículos", texto: "Após uma década construindo reputação no setor de serviços, Diogo enxergou uma oportunidade maior. Com o mesmo rigor técnico e a mesma ética que marcaram seus anos de oficina, fundou a DMCAR Veículos — trazendo para o mercado de seminovos um padrão de qualidade que os clientes simplesmente não encontravam em outro lugar." },
  { ano: "2020", marco: "Acelerando", titulo: "Crescimento que Fala por Si", texto: "Em poucos anos, a DMCAR se consolidou como uma das revendedoras mais respeitadas de Fortaleza. O boca a boca dos clientes satisfeitos foi o maior marketing. Cada veículo vendido com transparência virou um cliente fiel. Cada negociação honesta virou uma indicação." },
  { ano: "Hoje", marco: "3.000+ Veículos e Contando", titulo: "Uma Marca de Credibilidade", texto: "Com mais de 3.000 veículos vendidos e uma comunidade de clientes que retornam e indicam, a DMCAR chegou onde chegou sem atalhos. Diogo Microni segue à frente do negócio com os mesmos valores do primeiro dia — porque para ele, o verdadeiro destino não é uma conquista, é a coragem de continuar acelerando rumo ao próximo horizonte." },
];

function Historia() {
  return (
    <section id="historia" className="py-24">
      <div className="mx-auto max-w-5xl px-6">
        <Reveal className="text-center mb-12">
          <h2 className="font-display text-4xl md:text-5xl">NOSSA HISTÓRIA</h2>
          <p className="mt-3 text-muted-foreground">20 anos de motor ligado. Uma trajetória construída com suor, paixão e respeito.</p>
        </Reveal>

        <Reveal className="max-w-3xl mx-auto text-center mb-16">
          <p className="text-lg text-white/90 leading-relaxed">
            "Antes de se tornar referência no mercado automobilístico de Fortaleza, a DMCAR nasceu de algo que nenhum manual ensina: <span className="text-gold">a coragem de transformar paixão em propósito.</span>"
          </p>
        </Reveal>

        <div className="relative pl-8 md:pl-0">
          <div className="absolute left-3 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-gold/0 via-gold/50 to-gold/0 md:-translate-x-1/2" />
          {timeline.map((t, i) => (
            <Reveal key={t.ano} delay={i * 100}>
              <div className={`relative mb-12 md:grid md:grid-cols-2 md:gap-12 ${i % 2 === 0 ? "" : "md:[&>div:first-child]:order-2"}`}>
                <div className={`hidden md:block ${i % 2 === 0 ? "text-right" : "text-left"}`}>
                  <div className="font-mono-d text-5xl text-gold font-black">{t.ano}</div>
                </div>
                <div className="relative">
                  <span className="absolute -left-[34px] md:left-auto md:-translate-x-[calc(50%+24px)] md:top-2 top-2 w-3 h-3 rounded-full bg-gold ring-4 ring-background" style={{ left: "-29px" }} />
                  <div className="md:hidden font-mono-d text-3xl text-gold font-black mb-1">{t.ano}</div>
                  <div className="text-xs uppercase tracking-widest text-muted-foreground mb-2">📍 {t.marco}</div>
                  <h3 className="font-display text-2xl md:text-3xl mb-3">{t.titulo}</h3>
                  <p className="text-sm text-white/75 leading-relaxed">{t.texto}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-16">
          <div className="rounded-2xl bg-gold text-black p-8 md:p-10 text-center">
            <p className="font-display text-2xl md:text-3xl leading-tight">
              3.000+ veículos vendidos. 20 anos de história. E a certeza de que o melhor ainda está por vir.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Missao() {
  const valores = ["Transparência em cada negociação", "Respeito e atenção ao cliente", "Compromisso com a qualidade", "Agilidade no processo de compra", "Responsabilidade e ética profissional"];
  return (
    <section id="missao" className="bg-[#0F0F0F] py-24">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="text-center mb-14">
          <h2 className="font-display text-4xl md:text-5xl">QUEM SOMOS</h2>
        </Reveal>
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          <Reveal>
            <div className="rounded-2xl bg-surface border border-border border-l-4 border-l-gold p-8 h-full">
              <div className="text-xs uppercase tracking-widest text-gold mb-3">Missão</div>
              <p className="text-white/85 leading-relaxed">"Conectar pessoas ao carro dos seus sonhos com honestidade, agilidade e o melhor custo-benefício do mercado. Na DMCAR, cada venda é o início de um relacionamento de confiança."</p>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="rounded-2xl bg-surface border border-border border-l-4 border-l-gold p-8 h-full">
              <div className="text-xs uppercase tracking-widest text-gold mb-3">Visão</div>
              <p className="text-white/85 leading-relaxed">"Ser referência em Fortaleza e região como a agência multimarcas mais confiável, reconhecida pela excelência no atendimento e pela qualidade dos veículos que comercializa."</p>
            </div>
          </Reveal>
        </div>
        <Reveal delay={200}>
          <div className="rounded-2xl bg-surface border border-border p-8">
            <div className="text-xs uppercase tracking-widest text-gold mb-4">Valores</div>
            <div className="flex flex-wrap gap-2">
              {valores.map(v => (
                <span key={v} className="inline-flex items-center gap-2 rounded-full bg-gold/10 border border-gold/30 px-4 py-2 text-sm text-white/90">
                  <Star className="w-3.5 h-3.5 text-gold fill-gold" /> {v}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Consultores() {
  const list = [
    { nome: "Ítalo", link: WA_ITALO },
    { nome: "Wallyson", link: WA_WALLYSON },
  ];
  return (
    <section id="consultores" className="py-24">
      <div className="mx-auto max-w-5xl px-6">
        <Reveal className="text-center mb-12">
          <h2 className="font-display text-4xl md:text-5xl">ATENDIMENTO PERSONALIZADO</h2>
          <p className="mt-3 text-muted-foreground">Nossos consultores estão prontos para te ajudar a encontrar o carro ideal.</p>
        </Reveal>
        <div className="grid md:grid-cols-2 gap-6">
          {list.map((c, i) => (
            <Reveal key={c.nome} delay={i * 100}>
              <div className="card-vehicle rounded-2xl bg-surface border border-border p-8 text-center">
                <div className="w-24 h-24 mx-auto rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center mb-5">
                  <User className="w-12 h-12 text-gold" />
                </div>
                <h3 className="font-display text-3xl">{c.nome}</h3>
                <p className="text-sm text-muted-foreground mb-6">Consultor de Vendas</p>
                <a href={c.link} target="_blank" rel="noopener noreferrer" className="inline-block btn-primary rounded-full px-7 py-3 text-sm">
                  Falar com {c.nome}
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

const garantia = [
  { icon: Wrench, title: "Revisão Antes da Venda", text: "Todos os veículos passam por uma revisão completa em nossa oficina própria antes de serem disponibilizados, garantindo qualidade, confiabilidade e segurança na sua compra." },
  { icon: Shield, title: "90 Dias de Garantia", text: "Oferecemos garantia legal de 90 dias para motor e caixa de marchas, proporcionando ainda mais confiança para você adquirir seu veículo com total tranquilidade." },
  { icon: Settings, title: "Atendimento na Nossa Oficina", text: "Todos os serviços relacionados à garantia são realizados em nossa própria oficina, por equipe técnica especializada, com agilidade, transparência e o padrão de qualidade que nossos clientes merecem." },
];

function Garantia() {
  return (
    <section id="garantia" className="bg-[#0F0F0F] border-t-2 border-gold py-24">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="text-center mb-14">
          <h2 className="font-display text-4xl md:text-5xl">GARANTIA E QUALIDADE</h2>
          <p className="mt-3 text-muted-foreground">Na DMCAR, sua segurança e tranquilidade vêm em primeiro lugar.</p>
        </Reveal>
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {garantia.map((g, i) => (
            <Reveal key={g.title} delay={i * 100}>
              <div className="card-vehicle h-full rounded-2xl bg-surface border border-border p-8 text-center">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-gold/10 border border-gold/30 flex items-center justify-center mb-5">
                  <g.icon className="w-8 h-8 text-gold" />
                </div>
                <h3 className="font-display text-2xl mb-3">{g.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{g.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <div className="rounded-2xl bg-gold text-black p-8 text-center">
            <p className="font-display text-xl md:text-2xl">Comprando na DMCAR, você tem a certeza de que está fazendo um negócio seguro.</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

const deps = [
  { nome: "Carlos Eduardo M.", bairro: "Meireles", texto: "Fui atendido com muita atenção desde o primeiro contato. Saí com meu carro no mesmo dia e sem nenhuma surpresa na hora de assinar. DMCAR de verdade entrega o que promete!" },
  { nome: "Rafaela Sousa", bairro: "Jóquei Clube", texto: "Estava com receio de comprar seminovo, mas o Ítalo me explicou tudo com calma e transparência. O carro estava impecável e o preço foi muito justo. Super recomendo!" },
  { nome: "Marcelo Teixeira", bairro: "Barra do Ceará", texto: "Processo de financiamento que achei que ia ser uma dor de cabeça foi resolvido em menos de um dia. Equipe muito competente e prestativa. Parabéns à DMCAR!" },
  { nome: "Fernanda Lima", bairro: "Farias Brito", texto: "Já é o segundo carro que compro aqui. Voltei porque sei que vou ser bem atendida e que o carro vai ser exatamente o que prometeram. Confiança total na DMCAR." },
  { nome: "Diego Albuquerque", bairro: "Mondubim", texto: "O Wallyson me ajudou a escolher o modelo certo para o meu perfil e meu bolso. Saí satisfeito demais! A negociação foi honesta e o pós-venda também foi ótimo." },
  { nome: "Patrícia Holanda", bairro: "Jurema — Caucaia", texto: "Vim de Caucaia especialmente para conhecer a DMCAR depois de ver nas redes sociais. Valeu cada quilômetro! Carro incrível, atendimento excelente e preço honesto." },
  { nome: "Renato Cavalcante", bairro: "Antônio Bezerra", texto: "Comprei meu primeiro carro aqui e foi uma experiência incrível. Sem pressão, sem enrolação. Me ajudaram a encontrar exatamente o que eu precisava dentro do meu orçamento." },
  { nome: "Simone Gadelha", bairro: "Henrique Jorge", texto: "Seriedade e profissionalismo em cada detalhe. Desde a recepção até a entrega do veículo, fui tratada com muito respeito. A DMCAR virou referência pra mim e para minha família!" },
];

function Depoimentos() {
  return (
    <section id="depoimentos" className="py-24">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="text-center mb-14">
          <h2 className="font-display text-4xl md:text-5xl">O QUE NOSSOS CLIENTES DIZEM</h2>
          <p className="mt-3 text-muted-foreground">Histórias reais de quem já realizou o sonho do carro novo com a DMCAR</p>
        </Reveal>
        <div className="grid md:grid-cols-2 gap-6">
          {deps.map((d, i) => (
            <Reveal key={d.nome} delay={(i % 2) * 80}>
              <div className="card-vehicle h-full rounded-2xl bg-surface border border-border p-7">
                <div className="flex items-center gap-1 mb-4 text-gold">
                  {Array.from({ length: 5 }).map((_, k) => <Star key={k} className="w-4 h-4 fill-current" />)}
                </div>
                <p className="text-white/85 leading-relaxed italic">"{d.texto}"</p>
                <div className="mt-5 pt-5 border-t border-border">
                  <div className="font-display text-lg">{d.nome}</div>
                  <div className="text-xs text-muted-foreground">{d.bairro}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

const unidades = [
  {
    tag: "LOJA 01",
    icon: MapPin,
    end: "Av. Mister Hull, 4971 — Antônio Bezerra, Fortaleza/CE · CEP 60356-675",
    tel: "(85) 98719-8049",
    hora: "Seg–Sex 8h–18h · Sáb 8h–13h · Dom Fechado",
    maps: "https://www.google.com/maps/search/?api=1&query=Av.+Mister+Hull+4971+Antonio+Bezerra+Fortaleza",
    wa: "https://wa.me/5585987198049?text=Ol%C3%A1%2C%20vim%20pelo%20site%20e%20gostaria%20de%20falar%20com%20a%20Loja%201%20da%20DMCAR!",
    waLabel: "Falar pelo WhatsApp",
  },
  {
    tag: "LOJA 02",
    icon: MapPin,
    end: "Av. Mister Hull, 4940 — Antônio Bezerra, Fortaleza/CE · CEP 60356-415",
    tel: "(85) 98719-8049",
    hora: "Seg–Sex 8h–18h · Sáb 8h–13h · Dom Fechado",
    maps: "https://www.google.com/maps/search/?api=1&query=Av.+Mister+Hull+4940+Antonio+Bezerra+Fortaleza",
    wa: "https://wa.me/5585987198049?text=Ol%C3%A1%2C%20vim%20pelo%20site%20e%20gostaria%20de%20falar%20com%20a%20Loja%202%20da%20DMCAR!",
    waLabel: "Falar pelo WhatsApp",
  },
  {
    tag: "OFICINA",
    icon: Wrench,
    end: "Rua General Alípio dos Santos, 1357 — Quintino Cunha, Fortaleza/CE · CEP 60351-815",
    tel: "(85) 3879-4106",
    hora: "Seg–Sex 8h–18h · Sáb 8h–12h · Dom Fechado",
    maps: "https://www.google.com/maps/search/?api=1&query=Rua+General+Alipio+dos+Santos+1357+Quintino+Cunha+Fortaleza",
    wa: "tel:+558538794106",
    waLabel: "Ligar para a Oficina",
  },
];

function Unidades() {
  return (
    <section id="unidades" className="bg-[#0F0F0F] py-24">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="text-center mb-14">
          <h2 className="font-display text-4xl md:text-5xl">ONDE ESTAMOS</h2>
          <p className="mt-3 text-muted-foreground">Duas lojas e uma oficina própria. Tudo para você ter a melhor experiência.</p>
        </Reveal>
        <div className="grid md:grid-cols-3 gap-6">
          {unidades.map((u, i) => (
            <Reveal key={u.tag} delay={i * 100}>
              <div className="card-vehicle h-full rounded-2xl bg-surface border-t-2 border-t-gold border border-border p-7 flex flex-col">
                <div className="flex items-center justify-between mb-5">
                  <span className="text-xs uppercase tracking-widest text-gold font-bold">{u.tag}</span>
                  <u.icon className="w-5 h-5 text-gold" />
                </div>
                <p className="text-sm text-white/85 leading-relaxed mb-4">{u.end}</p>
                <div className="space-y-1.5 text-sm text-muted-foreground mb-6">
                  <div className="flex items-center gap-2"><Phone className="w-3.5 h-3.5 text-gold" /> {u.tel}</div>
                  <div className="text-xs">{u.hora}</div>
                </div>
                <div className="mt-auto flex flex-col gap-2">
                  <a href={u.maps} target="_blank" rel="noopener noreferrer" className="btn-primary rounded-full px-4 py-2.5 text-xs text-center">Como Chegar</a>
                  <a href={u.wa} target="_blank" rel="noopener noreferrer" className="btn-outline rounded-full px-4 py-2.5 text-xs text-center">{u.waLabel}</a>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12 text-center space-y-1.5 text-sm text-white/80">
          <div className="flex items-center justify-center gap-2"><Mail className="w-4 h-4 text-gold" /> dmcaroficina@hotmail.com</div>
          <div className="flex items-center justify-center gap-2"><Mail className="w-4 h-4 text-gold" /> consultoresdmcarveiculos@gmail.com</div>
        </Reveal>

        <Reveal className="mt-10">
          <div className="rounded-2xl overflow-hidden border border-border">
            <iframe
              src="https://www.google.com/maps?q=Av.+Mister+Hull,+Antonio+Bezerra,+Fortaleza&output=embed"
              width="100%"
              height="380"
              style={{ border: 0, filter: "grayscale(0.4) contrast(1.1)" }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Mapa DMCAR"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
