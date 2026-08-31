import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/dmcar/Header";
import { Footer } from "@/components/dmcar/Footer";
import { WhatsAppFloat } from "@/components/dmcar/WhatsAppFloat";
import { CookieBanner } from "@/components/dmcar/CookieBanner";

export const Route = createFileRoute("/privacidade")({
  head: () => ({
    meta: [
      { title: "Política de Privacidade | DMCAR Veículos Multimarcas" },
      {
        name: "description",
        content:
          "Política de Privacidade da DMCAR Veículos Multimarcas em conformidade com a LGPD.",
      },
      { property: "og:title", content: "Política de Privacidade | DMCAR" },
      {
        property: "og:description",
        content: "Como a DMCAR trata seus dados, em conformidade com a LGPD.",
      },
      { property: "og:url", content: "https://dmcar.site/privacidade" },
      { name: "twitter:title", content: "Política de Privacidade | DMCAR" },
      {
        name: "twitter:description",
        content: "Como a DMCAR trata seus dados em conformidade com a LGPD.",
      },
    ],
    links: [{ rel: "canonical", href: "https://dmcar.site/privacidade" }],
  }),
  component: PrivacidadePage,
});

function PrivacidadePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <article className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="font-display text-4xl md:text-5xl text-gold mb-2">
          POLÍTICA DE PRIVACIDADE
        </h1>
        <p className="text-muted-foreground text-sm mb-10">
          DMCAR Veículos Multimarcas · Última atualização: junho de 2025
        </p>

        <div className="space-y-8 text-white/85 leading-relaxed text-sm">
          <Section title="1. QUEM SOMOS">
            A DMCAR Veículos Multimarcas, inscrita no CNPJ sob o nº 32.101.023/0001-89, razão social
            PARCELA JUSTA COMÉRCIO DE VEÍCULOS LTDA, com sede na Av. Mister Hull, 4971, Antônio
            Bezerra, Fortaleza/CE, é responsável pelo tratamento dos dados pessoais coletados neste
            site, em conformidade com a Lei Geral de Proteção de Dados (LGPD — Lei nº 13.709/2018).
          </Section>
          <Section title="2. QUAIS DADOS COLETAMOS">
            <ul className="list-disc pl-5 space-y-1.5">
              <li>
                Dados fornecidos voluntariamente: nome, telefone e mensagens enviadas via WhatsApp
                ou e-mail ao entrar em contato com nossos consultores.
              </li>
              <li>
                Dados de navegação: endereço IP, tipo de navegador, páginas visitadas e tempo de
                permanência, coletados automaticamente para fins de análise e melhoria do site.
              </li>
            </ul>
          </Section>
          <Section title="3. COMO USAMOS SEUS DADOS">
            <ul className="list-disc pl-5 space-y-1.5">
              <li>Responder às suas solicitações de atendimento e informações sobre veículos</li>
              <li>
                Enviar informações sobre nosso estoque, promoções e novidades (somente com seu
                consentimento)
              </li>
              <li>Melhorar a experiência de navegação no site</li>
              <li>Cumprir obrigações legais e regulatórias</li>
            </ul>
          </Section>
          <Section title="4. COMPARTILHAMENTO DE DADOS">
            Não vendemos, alugamos ou compartilhamos seus dados pessoais com terceiros para fins
            comerciais. Seus dados podem ser compartilhados apenas com prestadores de serviços
            essenciais ao funcionamento do site (como serviços de hospedagem) e quando exigido por
            lei ou ordem judicial.
          </Section>
          <Section title="5. COOKIES">
            Utilizamos cookies para melhorar sua experiência de navegação. Você pode gerenciar ou
            desativar os cookies nas configurações do seu navegador. Ao continuar navegando no site,
            você consente com o uso de cookies conforme esta política.
          </Section>
          <Section title="6. SEUS DIREITOS (LGPD)">
            Você tem direito a: confirmar se tratamos seus dados · acessar seus dados · corrigir
            dados incompletos ou desatualizados · solicitar a exclusão dos seus dados · revogar seu
            consentimento a qualquer momento.
            <br />
            <br />
            Para exercer seus direitos, entre em contato pelo e-mail:{" "}
            <a className="text-gold" href="mailto:dmcaroficina@hotmail.com">
              dmcaroficina@hotmail.com
            </a>
          </Section>
          <Section title="7. SEGURANÇA">
            Adotamos medidas técnicas e organizacionais para proteger seus dados contra acesso não
            autorizado, perda ou divulgação indevida.
          </Section>
          <Section title="8. ALTERAÇÕES NESTA POLÍTICA">
            Podemos atualizar esta Política de Privacidade periodicamente. Recomendamos que você a
            revise regularmente. A data da última atualização sempre estará indicada no topo desta
            página.
          </Section>
          <Section title="9. CONTATO">
            📧 dmcaroficina@hotmail.com
            <br />
            📧 consultoresdmcarveiculos@gmail.com
            <br />
            📞 (85) 98719-8049
          </Section>
        </div>
      </article>
      <Footer />
      <WhatsAppFloat />
      <CookieBanner />
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="font-display text-xl text-gold mb-2">{title}</h2>
      <div>{children}</div>
    </section>
  );
}
