import { useRef, useState, type FormEvent } from "react";
import { z } from "zod";
import { track } from "@/lib/analytics";
import { waLink } from "@/lib/whatsapp";

const DIFICULDADES = [
  "Minha empresa não aparece bem no Google.",
  "Meu perfil precisa ser melhor organizado.",
  "Quero atrair mais oportunidades.",
  "Quero melhorar minha presença digital.",
  "Ainda não sei exatamente o que preciso.",
];

const schema = z.object({
  nome: z.string().trim().min(2, "Informe seu nome.").max(100),
  empresa: z.string().trim().min(2, "Informe o nome da empresa.").max(120),
  cidade: z.string().trim().min(2, "Informe a cidade.").max(80),
  segmento: z.string().trim().min(2, "Informe o segmento.").max(80),
  whatsapp: z
    .string()
    .trim()
    .refine((v) => v.replace(/\D/g, "").length >= 10 && v.replace(/\D/g, "").length <= 13, "Informe um WhatsApp válido com DDD."),
  perfil: z.union([z.literal(""), z.string().trim().url("Informe um link válido (começando com https://).").max(500)]),
  dificuldade: z.string().refine((v) => DIFICULDADES.includes(v), "Selecione uma opção."),
  consentimento: z.literal("on", { errorMap: () => ({ message: "É necessário autorizar o contato." }) }),
});

type Status = "idle" | "loading" | "success" | "error";
const field = "mt-1.5 w-full rounded-lg border border-input bg-background px-3.5 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/30";

export function DiagnosticForm() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [link, setLink] = useState("");
  const started = useRef(false);

  const onStart = () => {
    if (!started.current) { started.current = true; track("form_start"); }
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    const parsed = schema.safeParse({ ...data, perfil: data["perfil"] ?? "", consentimento: data["consentimento"] ?? "" });
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      parsed.error.issues.forEach((i) => { const k = String(i.path[0]); if (!errs[k]) errs[k] = i.message; });
      setErrors(errs);
      setStatus("idle");
      document.getElementById(`f-${Object.keys(errs)[0]}`)?.focus();
      return;
    }
    setErrors({});
    setStatus("loading");
    const d = parsed.data;
    const msg = [
      "Olá! Gostaria de solicitar um diagnóstico gratuito da presença digital da minha empresa.",
      "",
      `*Nome:* ${d.nome}`,
      `*Empresa:* ${d.empresa}`,
      `*Cidade:* ${d.cidade}`,
      `*Segmento:* ${d.segmento}`,
      `*WhatsApp:* ${d.whatsapp}`,
      `*Perfil no Google:* ${d.perfil || "Não informado"}`,
      `*Principal dificuldade:* ${d.dificuldade}`,
    ].join("\n");
    const url = waLink(msg);
    setLink(url);
    const win = window.open(url, "_blank", "noopener,noreferrer");
    if (win === null) {
      // Pop-up bloqueado: não simulamos sucesso, oferecemos o link direto.
      setStatus("error");
      return;
    }
    track("form_submit", { segmento: d.segmento });
    setStatus("success");
  };

  if (status === "success") {
    return (
      <div role="status" className="rounded-2xl bg-card p-8 text-center shadow-[var(--shadow-card)]">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-accent text-2xl text-accent-foreground" aria-hidden>✓</div>
        <h3 className="mt-4 text-xl font-bold">Quase lá! Finalize no WhatsApp.</h3>
        <p className="mt-2 text-sm text-muted-foreground">Abrimos o WhatsApp com seus dados organizados. Basta tocar em <strong>enviar</strong> na conversa para que a GF receba sua solicitação.</p>
        <a href={link} target="_blank" rel="noopener noreferrer" className="btn-primary mt-6">Abrir o WhatsApp novamente</a>
      </div>
    );
  }

  const Err = ({ k }: { k: string }) => errors[k] ? <p id={`e-${k}`} className="mt-1 text-xs font-medium text-destructive">{errors[k]}</p> : null;
  const aria = (k: string) => ({ id: `f-${k}`, name: k, "aria-invalid": !!errors[k], "aria-describedby": errors[k] ? `e-${k}` : undefined });

  return (
    <form noValidate onSubmit={onSubmit} onFocus={onStart} className="rounded-2xl bg-card p-6 text-card-foreground shadow-[var(--shadow-card)] sm:p-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="text-sm font-semibold">Nome *<input {...aria("nome")} autoComplete="name" className={field} /><Err k="nome" /></label>
        <label className="text-sm font-semibold">Nome da empresa *<input {...aria("empresa")} autoComplete="organization" className={field} /><Err k="empresa" /></label>
        <label className="text-sm font-semibold">Cidade *<input {...aria("cidade")} autoComplete="address-level2" className={field} /><Err k="cidade" /></label>
        <label className="text-sm font-semibold">Segmento de atuação *<input {...aria("segmento")} placeholder="Ex.: salão de beleza" className={field} /><Err k="segmento" /></label>
        <label className="text-sm font-semibold">WhatsApp *<input {...aria("whatsapp")} type="tel" inputMode="tel" autoComplete="tel" placeholder="(00) 00000-0000" className={field} /><Err k="whatsapp" /></label>
        <label className="text-sm font-semibold">Link do Perfil no Google <span className="font-normal text-muted-foreground">(opcional)</span><input {...aria("perfil")} type="url" placeholder="https://" className={field} /><Err k="perfil" /></label>
        <label className="text-sm font-semibold sm:col-span-2">Principal dificuldade *
          <select {...aria("dificuldade")} defaultValue="" className={field}>
            <option value="" disabled>Selecione uma opção</option>
            {DIFICULDADES.map((d) => <option key={d} value={d}>{d}</option>)}
          </select><Err k="dificuldade" />
        </label>
      </div>
      <label className="mt-5 flex items-start gap-3 text-xs leading-relaxed text-muted-foreground">
        <input {...aria("consentimento")} type="checkbox" className="mt-0.5 h-4 w-4 accent-[var(--emerald-deep)]" />
        <span>Autorizo a GF Soluções Digitais a entrar em contato pelo WhatsApp informado. Meus dados serão usados apenas para o diagnóstico e o atendimento.</span>
      </label>
      <Err k="consentimento" />
      {status === "error" && (
        <div role="alert" className="mt-4 rounded-lg border border-destructive/30 bg-destructive/5 p-3 text-sm">
          Não conseguimos abrir o WhatsApp automaticamente.{" "}
          <a href={link} target="_blank" rel="noopener noreferrer" onClick={() => { track("form_submit"); setStatus("success"); }} className="font-bold text-foreground underline">Toque aqui para enviar sua solicitação</a>.
        </div>
      )}
      <button type="submit" disabled={status === "loading"} className="btn-primary mt-6 w-full disabled:opacity-60">
        {status === "loading" ? "Abrindo o WhatsApp…" : "SOLICITAR MEU DIAGNÓSTICO GRATUITO"}
      </button>
      <p className="mt-3 text-center text-xs text-muted-foreground">Ao enviar, você será direcionado ao WhatsApp da GF com seus dados preenchidos.</p>
    </form>
  );
}
