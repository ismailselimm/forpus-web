"use client";

import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import Link from "next/link";

import { iziOzetle, kaynakIzi } from "@/lib/kaynak-izi";
import {
  Mail,
  MessageCircle,
  MapPin,
  Facebook,
  Instagram,
  Linkedin,
  ArrowUpRight,
  Loader2,
  CheckCircle2,
  AlertCircle,
  type LucideIcon,
} from "lucide-react";
import { Reveal } from "@/components/fx/Reveal";
import Aurora from "@/components/fx/Aurora";
import Magnetic from "@/components/fx/Magnetic";
import { useLang } from "@/components/providers/LanguageProvider";
import { PRESET_SERVICE_EVENT, SERVICE_KEYS, type ServiceKey } from "@/lib/services";

type InfoRow = {
  icon: LucideIcon;
  label: string;
  value: string;
  href?: string;
};

import { aktifSosyal, type SosyalHesap } from "@/lib/site";

/** Hesap adı → ikon. Liste `lib/site.ts`te; ikon eşlemesi görünüm kararı. */
const SOSYAL_IKON: Record<SosyalHesap["ad"], typeof Instagram> = {
  Instagram,
  Facebook,
  LinkedIn: Linkedin,
  WhatsApp: MessageCircle,
};

type SocialLink = {
  icon: LucideIcon;
  name: string;
};

const FIELD_CLASS =
  "w-full rounded-xl border border-line bg-white px-4 py-3 text-ink placeholder:text-ink-3 transition-shadow focus:outline-none focus:ring-2 focus:ring-cyan/40";

// Web3Forms erişim anahtarı — GİZLİ DEĞİLDİR, istemci tarafında açık olması normaldir
// (e-posta adresinin takma adı gibi çalışır). web3forms.com'dan ücretsiz alınır.
const WEB3FORMS_KEY =
  process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? "162a3e34-5c74-4476-8ade-fd9e540e92fd";

// Lead paneli — form buraya da kayıt düşer.
//
// Web3Forms BİRİNCİL kanal olarak kalıyor ve dokunulmadı: panel çökse, sunucu
// yeniden başlasa veya DNS bir sorun yaşasa bile mesaj e-posta olarak ulaşır.
// Panel çağrısı "gönder ve unut" — başarısız olursa kullanıcı hiçbir şey
// görmez, form yine başarıyla tamamlanır. Lead kaybetmek, panele kaydetmemekten
// çok daha pahalı.
const PANEL_INTAKE_URL =
  process.env.NEXT_PUBLIC_PANEL_INTAKE_URL ?? "https://panel.forpusyazilim.com/api/intake/site";

/** Panele kaydı düşer. Hata fırlatmaz — form akışını hiçbir koşulda bozmaz. */
function panelKaydiGonder(veri: {
  name: string;
  email: string;
  company: string;
  service: string;
  message: string;
}): void {
  // Seçilen hizmet mesajın başına yazılıyor: panelde ilk bakışta hangi hattın
  // sorulduğu görünsün (web mi, reklam mı) — triyajın en çok işe yarayan bilgisi.
  const govde = veri.service ? `İlgilendiği hizmet: ${veri.service}\n\n${veri.message}` : veri.message;

  // Ziyaretin kaynak izi. Panel bu alanları henüz tanımıyor olabilir —
  // tanımıyorsa zod bilinmeyen anahtarları düşürüyor, istek yine geçiyor.
  // Bu yüzden site tarafını önce yayına almak güvenli.
  const iz = kaynakIzi();
  const izOzeti = iziOzetle(iz);

  void fetch(PANEL_INTAKE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: veri.name,
      email: veri.email,
      company: veri.company || undefined,
      // Özet mesaja da yazılıyor: yapısal alanlar bir yerde bozulsa bile
      // atıf bilgisi lead'in gövdesinde kalıyor.
      message: izOzeti ? `${govde}\n\n— geldiği yer: ${izOzeti}` : govde,
      iz,
    }),
    // Sekme kapansa bile isteğin tamamlanma şansı olsun.
    keepalive: true,
  }).catch(() => {
    /* panel erişilemezse sessiz geç — Web3Forms zaten mesajı iletti */
  });
}

export default function Contact() {
  const { t } = useLang();
  const c = t.contact;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [service, setService] = useState(c.form.serviceOptions[0]);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  // Persona cards deep-link here: preselect the matching "Hizmet" so the form arrives half-filled.
  useEffect(() => {
    const onPreset = (e: Event) => {
      const key = (e as CustomEvent<ServiceKey>).detail;
      const opt = c.form.serviceOptions[SERVICE_KEYS.indexOf(key)];
      if (opt) setService(opt);
    };
    window.addEventListener(PRESET_SERVICE_EVENT, onPreset);
    return () => window.removeEventListener(PRESET_SERVICE_EVENT, onPreset);
  }, [c.form.serviceOptions]);

  const infoRows: InfoRow[] = [
    {
      icon: Mail,
      label: c.info.emailLabel,
      value: c.info.email,
      href: `mailto:${c.info.email}`,
    },
    {
      icon: MapPin,
      label: c.info.locationLabel,
      value: c.info.location,
    },
  ];

  // Footer ile AYNI listeden. İki ekran iki ayrı dizi taşıdığı sürece
  // birine hesap eklenip diğerine eklenmemesi an meselesiydi.
  const socials = [
    ...aktifSosyal().map((h) => ({ icon: SOSYAL_IKON[h.ad], name: h.ad, href: h.href })),
    { icon: Mail, name: c.info.emailLabel, href: `mailto:${c.info.email}` },
  ];

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "sending") return;
    if (!name.trim() || !email.trim() || !message.trim()) return;

    // Honeypot: gerçek kullanıcı bu alanı görmez/doldurmaz; bot doldurursa sessizce iptal
    const honeypot = (e.currentTarget.elements.namedItem("botcheck") as HTMLInputElement | null)?.checked;
    if (honeypot) return;

    setStatus("sending");

    // Panele ÖNCE ve Web3Forms'tan BAĞIMSIZ gönderiyoruz. Başarı dalının içine
    // koymak yanlıştı: Web3Forms bir sebeple hata verdiğinde (ağ, geçici kesinti,
    // bot filtresi) lead panele hiç düşmüyordu — oysa panel bizim sistemimiz ve
    // kaydı en çok orada tutmak istiyoruz. İkisi artık paralel gidiyor.
    panelKaydiGonder({
      name: name.trim(),
      email: email.trim(),
      company: company.trim(),
      service,
      message: message.trim(),
    });

    try {
      // FormData (multipart) → "basit istek", CORS preflight yok → en sağlam yöntem
      const fd = new FormData();
      fd.append("access_key", WEB3FORMS_KEY);
      fd.append("subject", `Forpus — Yeni mesaj: ${name.trim()}`);
      fd.append("from_name", name.trim());
      fd.append("replyto", email.trim());
      // Alan adları BİLEREK ASCII: Web3Forms multipart alan İSİMLERİNDEKİ Türkçe
      // karakterleri bozuyor (ş→Åž). i18n etiketleriyle (c.form.*) değiştirmeyin —
      // bunlar dilden bağımsız, sabit kalmalı. (Değerler UTF-8, sorunsuz.)
      fd.append("Ad", name.trim());
      fd.append("E-posta", email.trim());
      fd.append("Firma / Marka", company.trim() || "-");
      fd.append("Hizmet", service);
      fd.append("Mesaj", message.trim());

      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: fd,
      });
      const data = (await res.json()) as { success?: boolean };
      if (res.ok && data.success) {
        setStatus("success");
        setName("");
        setEmail("");
        setCompany("");
        setService(c.form.serviceOptions[0]);
        setMessage("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const SubmitIcon = status === "sending" ? Loader2 : ArrowUpRight;
  const notice =
    status === "success"
      ? { role: "status" as const, Icon: CheckCircle2, cls: "border-green/30 bg-green/5 text-green-deep", msg: c.form.success }
      : status === "error"
        ? { role: "alert" as const, Icon: AlertCircle, cls: "border-red-400/40 bg-red-50 text-red-600", msg: c.form.error }
        : null;

  return (
    <section id="contact" className="section relative overflow-hidden bg-bg-2/60">
      <Aurora className="opacity-50" />

      <div className="container-x relative z-10">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <span className="eyebrow">{c.eyebrow}</span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="h-section mt-5 whitespace-pre-line">{c.title}</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="lead mx-auto mt-5 max-w-xl">{c.subtitle}</p>
          </Reveal>
        </div>

        <div className="mt-16 grid items-start gap-6 lg:grid-cols-2 lg:gap-10">
          {/* LEFT — contact info */}
          <Reveal>
            <div className="flex h-full flex-col gap-4">
              {infoRows.map((row) => {
                const Icon = row.icon;
                const inner: ReactNode = (
                  <>
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-green via-cyan to-blue text-white shadow-[var(--shadow-glow)] transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
                      <Icon className="h-[22px] w-[22px]" strokeWidth={1.8} />
                    </span>
                    <span className="min-w-0">
                      <span className="block font-mono text-[0.7rem] uppercase tracking-[0.2em] text-ink-3">
                        {row.label}
                      </span>
                      <span className="mt-1 block break-words text-[1.05rem] font-semibold text-ink">
                        {row.value}
                      </span>
                    </span>
                  </>
                );

                return (
                  <div key={row.label} className="group">
                    {row.href ? (
                      <a
                        href={row.href}
                        className="glass-card border-gradient flex items-center gap-4 p-5 transition-transform duration-500 hover:-translate-y-1"
                      >
                        {inner}
                        <ArrowUpRight className="ml-auto h-5 w-5 shrink-0 text-ink-3 transition-colors group-hover:text-cyan-deep" />
                      </a>
                    ) : (
                      <div className="glass-card border-gradient flex items-center gap-4 p-5 transition-transform duration-500 hover:-translate-y-1">
                        {inner}
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Social row */}
              <div className="glass-card mt-auto flex flex-wrap items-center gap-4 p-5">
                <span className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-ink-3">
                  {c.info.socialLabel}
                </span>
                <div className="flex flex-wrap gap-2.5">
                  {socials.map((s) => {
                    const Icon = s.icon;
                    return (
                      <a
                        key={s.name}
                        href={s.href}
                        aria-label={s.name}
                        {...(s.href.startsWith("http")
                          ? { target: "_blank", rel: "noopener noreferrer" }
                          : {})}
                        className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white text-ink-2 transition-all duration-300 hover:-translate-y-0.5 hover:border-transparent hover:bg-gradient-to-br hover:from-green hover:via-cyan hover:to-blue hover:text-white hover:shadow-[var(--shadow-glow)]"
                      >
                        <Icon className="h-[18px] w-[18px]" strokeWidth={1.8} />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </Reveal>

          {/* RIGHT — form */}
          <Reveal delay={0.08}>
            <form
              onSubmit={handleSubmit}
              noValidate
              className="glass-card border-gradient relative overflow-hidden p-6 sm:p-9"
            >
              <div className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-gradient-to-br from-cyan/20 to-blue/10 blur-3xl" />

              {/* Honeypot — ekran dışı, botlar için tuzak */}
              <input
                type="checkbox"
                name="botcheck"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="absolute left-[-9999px] h-0 w-0 opacity-0"
              />

              <div className="relative grid gap-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <label className="block">
                    <span className="mb-2 block font-mono text-[0.7rem] uppercase tracking-[0.2em] text-ink-3">
                      {c.form.name}
                    </span>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={c.form.name}
                      autoComplete="name"
                      className={FIELD_CLASS}
                    />
                  </label>

                  <label className="block">
                    <span className="mb-2 block font-mono text-[0.7rem] uppercase tracking-[0.2em] text-ink-3">
                      {c.form.email}
                    </span>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={c.form.email}
                      autoComplete="email"
                      className={FIELD_CLASS}
                    />
                  </label>
                </div>

                <label className="block">
                  <span className="mb-2 block font-mono text-[0.7rem] uppercase tracking-[0.2em] text-ink-3">
                    {c.form.company}
                  </span>
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder={c.form.company}
                    autoComplete="organization"
                    className={FIELD_CLASS}
                  />
                </label>

                <label className="block">
                  <span className="mb-2 block font-mono text-[0.7rem] uppercase tracking-[0.2em] text-ink-3">
                    {c.form.service}
                  </span>
                  <select
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className={FIELD_CLASS}
                  >
                    {c.form.serviceOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="block">
                  <span className="mb-2 block font-mono text-[0.7rem] uppercase tracking-[0.2em] text-ink-3">
                    {c.form.message}
                  </span>
                  <textarea
                    required
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={c.form.message}
                    className={`${FIELD_CLASS} resize-none`}
                  />
                </label>

                <Magnetic className="mt-1 self-start" strength={0.25}>
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    aria-busy={status === "sending"}
                    className="btn btn-primary disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {status === "sending" ? c.form.sending : c.form.submit}
                    <SubmitIcon
                      className={`h-[18px] w-[18px] ${status === "sending" ? "animate-spin" : ""}`}
                    />
                  </button>
                </Magnetic>

                {/* KVKK md.10 aydınlatmayı verinin ELDE EDİLMESİ SIRASINDA
                    istiyor. Bağlantılar yalnızca footer'daydı; hizmet
                    sayfasından #contact'a atlayıp formu dolduran ziyaretçi
                    metni hiç görmeden gönderiyordu. */}
                <p className="text-[0.78rem] leading-relaxed text-ink-3">
                  {c.form.aydinlatmaOnce}{" "}
                  <Link href="/kvkk" className="underline underline-offset-2 hover:text-ink-2">
                    {c.form.aydinlatmaKvkk}
                  </Link>{" "}
                  {c.form.aydinlatmaOrta}{" "}
                  <Link href="/gizlilik" className="underline underline-offset-2 hover:text-ink-2">
                    {c.form.aydinlatmaGizlilik}
                  </Link>{" "}
                  {c.form.aydinlatmaSonra}
                </p>

                {notice && (
                  <p
                    role={notice.role}
                    className={`flex items-start gap-2.5 rounded-xl border px-4 py-3 text-[0.92rem] font-medium ${notice.cls}`}
                  >
                    <notice.Icon className="mt-0.5 h-4 w-4 shrink-0" strokeWidth={2} />
                    {notice.msg}
                  </p>
                )}
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
