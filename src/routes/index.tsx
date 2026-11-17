import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { DiagnosticForm } from "@/components/gf/DiagnosticForm";
import { track } from "@/lib/analytics";
import { waLink } from "@/lib/whatsapp";

const TITLE = "GF Soluções Digitais | Presença Digital e Google para Empresas";
const DESC = "Fortaleça a presença digital da sua empresa. Conheça a GF Soluções Digitais e solicite um diagnóstico gratuito da sua presença no Google.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESC },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        name: "GF Soluções Digitais",
        slogan: "Sua empresa onde o cliente procura.",
        description: DESC,
        telephone: "+55 17 99614-0963",
        areaServed: "BR",
      }),
    }],
  }),
  component: Index,
});

const NAV = [
  ["Início", "#inicio"], ["Soluções", "#solucoes"], ["Método", "#metodo"], ["Resultados", "#resultados"], ["Contato", "#diagnostico"],
] as const;

function Logo({ light }: { light?: boolean }) {
  return (
    <a href="#inicio" className="flex items-center gap-2.5" aria-label="GF Soluções Digitais — início">
      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald font-display text-sm font-extrabold text-navy">GF</span>
      <span className={`font-display text-sm font-bold leading-tight ${light ? "text-on-navy" : "text-foreground"}`}>GF Soluções<br /><span className="font-semibold text-emerald-deep">Digitais</span></span>
    </a>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <Logo />
        <nav aria-label="Principal" className="hidden items-center gap-7 md:flex">
          {NAV.map(([l, h]) => <a key={h} href={h} className="text-sm font-semibold text-muted-foreground hover:text-foreground">{l}</a>)}
          <a href="#diagnostico" onClick={() => track("cta_primary_click", { local: "header" })} className="btn-primary !px-5 !py-2.5 text-xs">Diagnóstico gratuito</a>
        </nav>
        <button className="rounded-md p-2 md:hidden" aria-label={open ? "Fechar menu" : "Abrir menu"} aria-expanded={open} onClick={() => setOpen(!open)}>
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>{open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}</svg>
        </button>
      </div>
      {open && (
        <nav aria-label="Menu móvel" className="border-t border-border bg-background px-5 py-4 md:hidden">
          {NAV.map(([l, h]) => <a key={h} href={h} onClick={() => setOpen(false)} className="block py-2.5 font-semibold">{l}</a>)}
        </nav>
      )}
    </header>
  );
}

function SearchVisual() {
  return (
    <div className="relative mx-auto w-full max-w-md" aria-hidden>
      <div className="rounded-2xl bg-background p-4 shadow-[var(--shadow-card)]">
        <div className="flex items-center gap-3 rounded-full border border-border px-4 py-3">
          <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground"><circle cx="8" cy="8" r="6" /><path d="M13 13l4 4" /></svg>
          <span className="text-sm text-foreground">salão de beleza perto de mim</span>
        </div>
        <div className="mt-4 space-y-3">
          <div className="rounded-xl border-2 border-emerald bg-accent/50 p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-display text-sm font-bold">Sua Empresa</p>
                <p className="mt-0.5 text-xs text-muted-foreground">Serviço local · Aberto agora</p>
              </div>
              <span className="rounded-full bg-emerald px-2 py-0.5 text-[10px] font-bold text-navy">VOCÊ</span>
            </div>
            <div className="mt-3 grid grid-cols-3 gap-2">
              {["Ligar", "Rota", "Site"].map((t) => <span key={t} className="rounded-full border border-emerald-deep/40 py-1.5 text-center text-[11px] font-semibold text-accent-foreground">{t}</span>)}
            </div>
          </div>
          {[1, 2].map((i) => (
            <div key={i} className="rounded-xl border border-border p-4 opacity-60">
              <div className="h-2.5 w-28 rounded bg-muted-foreground/30" />
              <div className="mt-2 h-2 w-40 rounded bg-muted-foreground/15" />
            </div>
          ))}
        </div>
      </div>
      <div className="absolute -bottom-4 -left-3 rounded-xl bg-navy px-4 py-3 text-xs font-semibold text-on-navy shadow-[var(--shadow-card)]">📍 Cliente encontrou você</div>
    </div>
  );
}

function Hero() {
  return (
    <section id="inicio" className="relative overflow-hidden bg-navy text-on-navy">
      <div className="pointer-events-none absolute -right-40 -top-40 h-[28rem] w-[28rem] rounded-full bg-emerald/10 blur-3xl" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-5 py-16 md:grid-cols-[1.15fr_1fr] md:py-24">
        <div className="animate-fade-up">
          <p className="eyebrow !text-emerald">Sua empresa onde o cliente procura.</p>
          <h1 className="mt-4 text-[2rem] font-extrabold leading-[1.12] sm:text-5xl">Quando alguém procura pelo que sua empresa oferece, <span className="text-emerald">encontra você no Google?</span></h1>
          <p className="mt-5 text-lg text-on-navy-muted">Ajude mais pessoas a descobrirem sua empresa, conhecerem seus serviços e encontrarem um caminho fácil para entrar em contato.</p>
          <p className="mt-3 text-sm text-on-navy-muted/80">A GF Soluções Digitais trabalha para fortalecer a presença online de empresas locais, com estratégia, organização e acompanhamento.</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href={waLink()} target="_blank" rel="noopener noreferrer" onClick={() => { track("cta_primary_click", { local: "hero" }); track("whatsapp_click", { local: "hero" }); }} className="btn-primary">QUERO MEU DIAGNÓSTICO GRATUITO</a>
            <a href="#metodo" className="btn-ghost-navy">Entenda como funciona ↓</a>
          </div>
        </div>
        <SearchVisual />
      </div>
    </section>
  );
}

function SectionHead({ eyebrow, title, children, center }: { eyebrow: string; title: string; children?: React.ReactNode; center?: boolean }) {
  return (
    <div className={`max-w-3xl ${center ? "mx-auto text-center" : ""}`}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-3 text-[1.75rem] font-bold leading-tight sm:text-4xl">{title}</h2>
      {children && <div className="mt-4 text-muted-foreground">{children}</div>}
    </div>
  );
}

function Problema() {
  const itens = [
    "Sua empresa aparece quando alguém pesquisa pelo serviço que você oferece?",
    "Seu perfil transmite confiança e apresenta informações atualizadas?",
    "Seus serviços, fotos, localização e formas de contato estão organizados?",
    "O cliente consegue encontrar informações e falar com você facilmente?",
    "Você sabe o que as pessoas fazem quando encontram sua empresa no Google?",
  ];
  return (
    <section className="mx-auto max-w-6xl px-5 py-20">
      <SectionHead eyebrow="O problema e a oportunidade" title="Seu próximo cliente pode estar procurando por você agora." />
      <ul className="mt-10 grid gap-3 md:grid-cols-2">
        {itens.map((t, i) => (
          <li key={t} className="flex gap-4 rounded-xl border border-border p-5">
            <span className="font-display text-sm font-bold text-emerald-deep">0{i + 1}</span>
            <span className="font-medium">{t}</span>
          </li>
        ))}
      </ul>
      <p className="mt-10 border-l-4 border-emerald pl-5 font-display text-lg font-semibold sm:text-xl">Muitas empresas já têm qualidade no que fazem, mas ainda não apresentam todo esse potencial na internet.</p>
    </section>
  );
}

function Solucoes() {
  const s = [
    ["Perfil da Empresa no Google", "Criação, configuração, otimização e gestão estratégica do perfil.", "◎"],
    ["Estratégia de presença local", "Organização das informações para facilitar a descoberta da empresa nas pesquisas locais.", "⌖"],
    ["Conteúdo estratégico", "Planejamento e produção de conteúdos alinhados às necessidades e objetivos do negócio.", "✎"],
    ["Integração dos canais digitais", "Conexão entre Google, site, Instagram e WhatsApp, conforme a estratégia contratada.", "⇄"],
    ["Acompanhamento de desempenho", "Análise de indicadores para compreender interações e oportunidades de melhoria.", "↗"],
    ["Orientação e mentoria", "Acompanhamento para que o empresário entenda melhor sua presença digital e saiba cuidar dos aspectos essenciais.", "✦"],
  ];
  return (
    <section id="solucoes" className="bg-muted py-20">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHead eyebrow="O que a GF faz" title="Não se trata apenas de aparecer. Trata-se de construir uma presença digital que faça sentido para o seu negócio." />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {s.map(([t, d, ic]) => (
            <article key={t} className="rounded-2xl bg-card p-6 shadow-[var(--shadow-card)]">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-navy text-lg text-emerald" aria-hidden>{ic}</span>
              <h3 className="mt-5 text-lg font-bold">{t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{d}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Metodo() {
  const e = [
    ["Diagnóstico", "Entender a situação atual da empresa."],
    ["Planejamento", "Definir prioridades e oportunidades."],
    ["Estruturação", "Organizar e otimizar os canais digitais."],
    ["Execução", "Colocar a estratégia em prática."],
    ["Acompanhamento", "Analisar indicadores e orientar melhorias."],
  ];
  return (
    <section id="metodo" className="bg-navy py-20 text-on-navy">
      <div className="mx-auto max-w-6xl px-5">
        <p className="eyebrow !text-emerald">Método Pedra Angular</p>
        <h2 className="mt-3 max-w-3xl text-[1.75rem] font-bold leading-tight sm:text-4xl">Uma metodologia para construir uma presença digital mais forte.</h2>
        <p className="mt-4 max-w-2xl text-on-navy-muted">Metodologia própria da GF: cinco etapas conectadas, para que cada ação tenha um porquê.</p>
        <ol className="relative mt-14 grid gap-8 md:grid-cols-5 md:gap-4">
          <div className="absolute left-5 top-5 bottom-5 w-px bg-emerald/30 md:left-5 md:right-5 md:top-5 md:bottom-auto md:h-px md:w-auto" aria-hidden />
          {e.map(([t, d], i) => (
            <li key={t} className="relative flex gap-5 md:flex-col md:gap-4">
              <span className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald font-display font-bold text-navy">{i + 1}</span>
              <div>
                <h3 className="font-bold">{t}</h3>
                <p className="mt-1 text-sm text-on-navy-muted">{d}</p>
              </div>
            </li>
          ))}
        </ol>
        <p className="mt-12 text-xs text-on-navy-muted/80">O trabalho busca melhorar a qualidade e a organização da presença digital. Não prometemos posições específicas no Google nem resultados garantidos.</p>
      </div>
    </section>
  );
}

/* ===== RESULTADOS: substitua os itens abaixo SOMENTE por materiais reais e autorizados. =====
   Para cada resultado preencha: titulo, periodo, contexto (o que a métrica significa) e imagem (print real).
   Interações (visualizações, cliques, rotas, ligações) NÃO são vendas nem clientes conquistados. */
type Resultado = { titulo: string; periodo: string; contexto: string; imagem?: string; alt?: string };
type Depoimento = { nome: string; segmento: string; texto: string };
const RESULTADOS: Resultado[] = [];
const DEPOIMENTOS: Depoimento[] = [];

const SLOTS = [
  "Print do Perfil da Empresa no Google",
  "Visualizações, pesquisas e interações",
  "Ligações, cliques e solicitações de rota",
  "Comparação entre períodos",
  "Exemplo de trabalho realizado",
  "Antes e depois do perfil",
];

function Resultados() {
  return (
    <section id="resultados" className="mx-auto max-w-6xl px-5 py-20">
      <SectionHead eyebrow="Provas reais" title="Resultados que podem ser acompanhados.">
        <p>Cada material apresenta o período analisado e o contexto da métrica. Interações indicam como as pessoas encontraram e acessaram o perfil, não equivalem a vendas.</p>
      </SectionHead>
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {RESULTADOS.length > 0
          ? RESULTADOS.map((r) => (
              <figure key={r.titulo} className="overflow-hidden rounded-2xl border border-border bg-card">
                {r.imagem && <img src={r.imagem} alt={r.alt ?? r.titulo} loading="lazy" className="aspect-[4/3] w-full object-cover" />}
                <figcaption className="p-5">
                  <h3 className="font-bold">{r.titulo}</h3>
                  <p className="mt-1 text-xs font-semibold text-emerald-deep">Período: {r.periodo}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{r.contexto}</p>
                </figcaption>
              </figure>
            ))
          : SLOTS.map((t) => (
              <div key={t} className="flex aspect-[4/3] flex-col items-center justify-center rounded-2xl border-2 border-dashed border-input bg-muted/60 p-6 text-center">
                <span className="rounded-full bg-background px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Conteúdo a substituir</span>
                <p className="mt-3 text-sm font-semibold">{t}</p>
                <p className="mt-1 text-xs text-muted-foreground">Período · contexto da métrica</p>
              </div>
            ))}
      </div>
      <h3 className="mt-16 text-xl font-bold">Depoimentos de clientes</h3>
      <div className="mt-6 grid gap-5 md:grid-cols-2">
        {DEPOIMENTOS.length > 0
          ? DEPOIMENTOS.map((d) => (
              <blockquote key={d.nome} className="rounded-2xl bg-muted p-6">
                <p className="text-sm leading-relaxed">“{d.texto}”</p>
                <footer className="mt-4 text-sm font-bold">{d.nome}<span className="block text-xs font-medium text-muted-foreground">{d.segmento}</span></footer>
              </blockquote>
            ))
          : [1, 2].map((i) => (
              <div key={i} className="rounded-2xl border-2 border-dashed border-input p-6">
                <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Conteúdo a substituir</span>
                <p className="mt-2 text-sm text-muted-foreground">Espaço para depoimento real e autorizado: texto, nome e segmento do cliente.</p>
              </div>
            ))}
      </div>
    </section>
  );
}

function Diferenciais() {
  const d = [
    ["Estratégia sob medida", "Estratégia pensada para a realidade de cada negócio."],
    ["Acompanhamento próximo", "Acompanhamento próximo e orientação em cada etapa."],
    ["Área do Cliente GF", "Um espaço para acompanhar informações e indicadores disponíveis."],
    ["Mentoria", "Para desenvolver conhecimento e autonomia sobre a presença digital."],
  ];
  return (
    <section className="bg-muted py-20">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 md:grid-cols-[1fr_1.2fr] md:items-center">
        <SectionHead eyebrow="Diferenciais da GF" title="Você não precisa ficar sozinho tentando entender o digital.">
          <p>A GF não trabalha apenas para executar tarefas. Trabalhamos para que você compreenda melhor sua presença online e tome decisões com mais segurança.</p>
        </SectionHead>
        <div className="grid gap-4 sm:grid-cols-2">
          {d.map(([t, x]) => (
            <div key={t} className="rounded-2xl bg-card p-6 shadow-[var(--shadow-card)]">
              <span className="block h-1 w-8 rounded bg-emerald" aria-hidden />
              <h3 className="mt-4 font-bold">{t}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{x}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Diagnostico() {
  return (
    <section id="diagnostico" className="bg-navy py-20 text-on-navy">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 lg:grid-cols-[1fr_1.3fr] lg:items-start">
        <div>
          <p className="eyebrow !text-emerald">Diagnóstico gratuito</p>
          <h2 className="mt-3 text-[1.75rem] font-bold leading-tight sm:text-4xl">Vamos descobrir como sua empresa está aparecendo na internet?</h2>
          <p className="mt-4 text-on-navy-muted">Solicite um diagnóstico gratuito da sua presença digital. Vamos observar sua presença atual e identificar oportunidades de melhoria.</p>
          <ul className="mt-6 space-y-2 text-sm text-on-navy-muted">
            <li>✓ Sem obrigação de contratação</li>
            <li>✓ Atendimento pelo WhatsApp</li>
            <li>✓ Leva menos de 1 minuto para preencher</li>
          </ul>
        </div>
        <DiagnosticForm />
      </div>
    </section>
  );
}

const FAQ = [
  ["O que é o Perfil da Empresa no Google?", "É a apresentação da sua empresa no Google e no Google Maps. Ali aparecem informações como endereço ou área de atendimento, horários, serviços, fotos e formas de contato, como telefone, site e rota."],
  ["Minha empresa já tem um perfil. Ainda preciso de ajuda?", "Sim. Um perfil existente pode precisar de atualização, organização, otimização e acompanhamento para apresentar bem o seu negócio."],
  ["A GF garante que minha empresa ficará em primeiro lugar no Google?", "Não. Nenhuma posição específica pode ser garantida. O trabalho é focado em melhorar a qualidade e a organização da presença digital, acompanhando indicadores e oportunidades."],
  ["Quanto custa o serviço?", "O investimento depende das necessidades, da situação atual e do escopo do projeto. Por isso, o primeiro passo é entender o negócio e identificar o que faz sentido."],
  ["O diagnóstico gratuito me obriga a contratar?", "Não. O diagnóstico serve para identificar oportunidades e orientar os próximos passos, sem obrigação de contratação."],
  ["A GF atende somente empresas de uma cidade?", "A GF trabalha com empresas locais e pode avaliar projetos de diferentes localidades."],
];

function Faq() {
  return (
    <section className="mx-auto max-w-3xl px-5 py-20">
      <SectionHead center eyebrow="Perguntas frequentes" title="Dúvidas comuns" />
      <div className="mt-10 divide-y divide-border rounded-2xl border border-border">
        {FAQ.map(([q, a]) => (
          <details key={q} className="group p-5 [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold">
              <h3 className="text-base">{q}</h3>
              <span className="text-xl text-emerald-deep transition-transform group-open:rotate-45" aria-hidden>+</span>
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

function CtaFinal() {
  return (
    <section className="px-5 pb-20">
      <div className="mx-auto max-w-5xl rounded-3xl bg-navy px-6 py-14 text-center text-on-navy sm:px-12">
        <h2 className="text-[1.75rem] font-bold sm:text-4xl">Seu negócio merece ser encontrado.</h2>
        <p className="mx-auto mt-4 max-w-xl text-on-navy-muted">Dê o primeiro passo para fortalecer sua presença digital. Solicite seu diagnóstico gratuito e descubra onde sua empresa pode melhorar.</p>
        <a href={waLink()} target="_blank" rel="noopener noreferrer" onClick={() => { track("final_cta_click"); track("whatsapp_click", { local: "cta_final" }); }} className="btn-primary mt-8">QUERO MEU DIAGNÓSTICO GRATUITO</a>
        <p className="mt-8 font-display text-sm font-semibold text-emerald">Sua empresa onde o cliente procura.</p>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border py-10 pb-28">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <Logo />
        <p>WhatsApp: <a className="font-semibold text-foreground" href={waLink()} target="_blank" rel="noopener noreferrer" onClick={() => track("whatsapp_click", { local: "footer" })}>(17) 99614-0963</a></p>
        <p>© {new Date().getFullYear()} GF Soluções Digitais</p>
      </div>
    </footer>
  );
}

function FloatingWhatsApp() {
  return (
    <a href={waLink()} target="_blank" rel="noopener noreferrer" aria-label="Falar com a GF pelo WhatsApp" onClick={() => track("whatsapp_click", { local: "flutuante" })}
      className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-emerald text-navy shadow-[var(--shadow-cta)] transition-transform hover:scale-105">
      <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.7.1-.2.3-.8.9-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.2-.5-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6l.4-.5c.2-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-.9-2.1c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5.1 4.5 2.5 1 3 .8 3.6.7.6-.1 1.7-.7 2-1.4.2-.7.2-1.2.2-1.4-.1-.1-.3-.2-.6-.3zM12 2a10 10 0 00-8.6 15l-1.4 5 5.1-1.3A10 10 0 1012 2zm0 18.2c-1.5 0-3-.4-4.2-1.2l-.3-.2-3 .8.8-3-.2-.3A8.2 8.2 0 1112 20.2z" /></svg>
    </a>
  );
}

function Index() {
  return (
    <>
      <a href="#conteudo" className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-50 focus:rounded focus:bg-background focus:px-3 focus:py-2">Pular para o conteúdo</a>
      <Header />
      <main id="conteudo">
        <Hero />
        <Problema />
        <Solucoes />
        <Metodo />
        <Resultados />
        <Diferenciais />
        <Diagnostico />
        <Faq />
        <CtaFinal />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
