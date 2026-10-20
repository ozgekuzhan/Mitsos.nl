# Mitsos.nl yapılacaklar listesi

Önceki oturumdan devir notu. Çalışma dalı: `claude/eerste-ontwerp`.

## Proje özeti
- Müşteri: **Mitsos Traiterie**, Amsterdam'da Yunan traiteur (1996'dan beri). Take away, eat in, catering.
- Adres (web aramasından, müşteriye teyit ettirilecek): Tweede Hugo de Grootstraat 25H, 1052 LB Amsterdam.
- Kullanıcı Amsterdam'da yaşıyor ve Türkçe konuşuyor. Site metinleri **Felemenkçe**.
- Örnek alınan site: Evi Evane (Paris'te Yunan traiteur). Yapısı: hero, 3 kutu (Restaurant / Traiteurs / Catering), sonra bölümler ve alt bilgi.

## Şu anki durum
- `index.html`, `assets/css/style.css`, `assets/js/main.js`, `assets/vendor/lenis.min.js` (Lenis 1.1.20, akıcı kaydırma).
- Tasarım yumuşak ve minimal: kırık beyaz zemin `#F8F7F2`, adaçayı yeşili `#93AB79` (açık tonu `#EDF1E6`, koyu tonu `#56703F`), Mitsos mavisi `#1E4FC2` (logoda), lacivert metin `#1B2742`.
- Yazı tipleri: Instrument Serif (başlıklar), Manrope (gövde), Marcellus (MITSOS logosu).
- Cam efektli yüzen menü, CSS scroll-driven animasyonlar, yuvarlak paneller.
- Bölümler: Hero, "Drie manieren" kartları, Traiteur, Eat in & take away, Catering (3 adım), Bezoek & bestellen, alt bilgi.
- Önizleme (claude.ai artifact): https://claude.ai/artifact/8gRJQcXrZG6qnto6VD96PB

## Yapılacaklar
1. [ ] **Ağ erişimini kontrol et:** `curl -sS -o /dev/null -w '%{http_code}' https://images.unsplash.com` komutu 200 veya 3xx dönmeli. Hâlâ 403 dönüyorsa kullanıcıya claude.ai/code → yeni oturum ekranı → mesaj kutusunun altındaki ortam seçici → ortamın dişli simgesi → Network access → Custom → `images.unsplash.com`, `images.pexels.com` yolunu tarif et. Oturum başlığının yanındaki ok kullanıcının uygulamasında yok.
2. [ ] **Geçici fotoğraflar:** Unsplash veya Pexels'ten ücretsiz lisanslı, **yumuşak, açık tonlu, minimal** Yunan yemek fotoğrafları bul (beyaz tabak, keten örtü, zeytinyağı, limon, doğal ışık). Gereken yerler:
   - Hero: "Meze aan tafel"
   - Kartlar: "Vitrine", "Pita gyros", "Meze buffet"
   - Traiteur kaydırıcısı: Moussaka, Spanakopita, Dolmades, Pastitsio
   - Eat in kaydırıcısı: Griekse salade, Pita gyros, Souvlaki
   - Catering kaydırıcısı: Meze buffet, Borrelplank, Walking dinner
   Fotoğrafları `assets/img/` altına indir, yaklaşık 1200 px genişliğe küçült, `.ph` yer tutucularının yerine `<img>` koy. Kaynak ve fotoğrafçıyı `assets/img/KAYNAKLAR.md` dosyasına yaz.
3. [ ] **Kullanıcının vitrin fotoğrafını kullanma.** Kullanıcı bunu açıkça istemedi, eski kırpılmış görseller silindi.
4. [ ] Yer tutucu bilgileri gerçekleriyle değiştir (kullanıcıdan iste): açılış saatleri, telefon, e-posta (`info@mitsos.nl` tahmin), Instagram ve Facebook linkleri, menü ve sipariş linkleri. Bunlar sitede `.todo` sınıfıyla işaretli.
5. [ ] Adresi kullanıcıya teyit ettir.
6. [ ] Değişiklikten sonra: Playwright ile mobil (390 px) ve masaüstü (1280 px) ekran görüntüsü al, artifact'i güncelle, commit edip `claude/eerste-ontwerp` dalına push et.
7. [ ] Kullanıcı istemeden PR açma. İleride: `main` dalı ve yayın (hosting) seçimi.

## Notlar
- Bu oturumda "browser isn't supported" uyarısı çıktı. Büyük ihtimalle uygulama içi tarayıcıdan kaynaklanıyordu. Çözüm olarak tek dosyalık bir HTML (görseller içine gömülü) gönderildi.
- Kullanıcı tasarımda **yumuşak, minimal ve modern** bir görünüm istiyor.
