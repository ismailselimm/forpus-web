/**
 * Kısa cevap bloğunun içerik sözleşmesi.
 *
 * KENDİ DOSYASINDA, `lib/solutions.ts`te DEĞİL. Orada tanımlanmıştı ve iki
 * şeyi birden bozuyordu:
 *
 *   1. Bir arayüz sözleşmesi, sektör başına 900+ kelime pazarlama metni
 *      taşıyan 4.100 satırlık bir veri dosyasının içinde duruyordu. Pasaja
 *      bir alan eklemek, metin dosyasını düzenlemek demekti.
 *   2. `lib/blog.ts` yalnızca bu tipe ulaşmak için `lib/solutions.ts`e
 *      bağlanıyordu. O bağ tip düzeyinde silinse de modül grafiğinde
 *      duruyor ve blog'u içerik dosyasından ayırmayı imkânsız kılıyordu.
 *
 * `lib/solution-index.ts` tam olarak bu sebeple var: ağır içerik dosyasına
 * dokunmadan ona dair bir şey söyleyebilmek için. Bu dosya aynı desenin
 * tip tarafı.
 *
 * Bileşenin (`components/ui/KisaCevap.tsx`) içinde de olabilirdi — `Breadcrumb`
 * kendi `Crumb` tipini öyle veriyor — ama o zaman `lib/` bir bileşenden içe
 * aktarmak zorunda kalırdı; depoda bunun tek bir örneği yok ve katman kuralı
 * tek yönlü.
 */
export type KisaCevapIcerigi = { title: string; body: string };
