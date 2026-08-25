import Image from "next/image";

/**
 * Açılış perdesi — tamamen CSS ile çalışır, JavaScript'e bağımlı değil.
 *
 * Neden böyle: perde daha önce React state'iyle yönetiliyordu ve sunucudan
 * gelip içeriği örttüğü için, kalkması hydration'a bağlıydı. Yavaş bağlantıda
 * ~790KB JS inene kadar ekranda kalıyor, başlığın görünmesini 8,6 saniyeye
 * kadar geciktiriyordu. Artık kendini CSS animasyonuyla kaldırıyor (globals.css
 * `.preloader`), JS hiç çalışmasa bile 1,75 saniyede yoluna çekiliyor.
 *
 * Oturumda tekrar gösterilmemesi app/layout.tsx içindeki satır içi script ile
 * hallediliyor: <html data-acilis-goruldu> varsa CSS perdeyi hiç çizmiyor.
 * O script boyamadan önce çalıştığı için perde bir an bile parlamıyor.
 */
export default function Preloader() {
  return (
    <div
      aria-hidden="true"
      className="preloader pointer-events-none fixed inset-0 z-[100] grid place-items-center overflow-hidden bg-bg"
    >
      {/* marka ışıltıları */}
      <div
        className="absolute -left-20 -top-24 h-72 w-72 rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(95,190,46,0.18), transparent 70%)" }}
      />
      <div
        className="absolute -bottom-24 -right-16 h-80 w-80 rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(30,146,230,0.18), transparent 70%)" }}
      />

      <div className="relative flex flex-col items-center gap-8">
        <div className="relative">
          <span
            className="absolute -inset-6 rounded-full bg-cyan/25 blur-2xl"
            style={{ animation: "node-pulse 1.6s ease-in-out infinite" }}
          />
          <Image
            src="/brand/forpus-logo.png"
            alt=""
            width={96}
            height={96}
            className="relative h-[84px] w-[84px] object-contain"
          />
        </div>

        <div className="h-[3px] w-44 overflow-hidden rounded-full bg-line">
          <div className="preloader__bar h-full rounded-full" style={{ background: "var(--grad-brand)" }} />
        </div>
      </div>
    </div>
  );
}
