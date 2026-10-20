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
- Bölümler: Hero (sade: başlık, tek cümle, iki düğme), "Drie manieren" kartları, Traiteur, Eat in & take away, Ons verhaal, Catering (3 adım), Offerteformulier, Google reviews (mavi panel), Bezoek & bestellen, alt bilgi.
- Mitsos mavisi vurgu rengi: düğmeler, italik başlık kelimeleri, etiketler, reviews paneli. Zemin yeşil kalıyor.
- Önizleme (claude.ai artifact): https://claude.ai/artifact/8gRJQcXrZG6qnto6VD96PB

## Yapılacaklar
1. [x] **Ağ erişimini kontrol et:** (20 Ekim: `images.unsplash.com` ve `images.pexels.com` açık; `unsplash.com` ve `pexels.com` sayfaları kapalı, fotoğraflar web aramasıyla bulunan Pexels numaralarıyla indirildi.) `curl -sS -o /dev/null -w '%{http_code}' https://images.unsplash.com` komutu 200 veya 3xx dönmeli. Hâlâ 403 dönüyorsa kullanıcıya claude.ai/code → yeni oturum ekranı → mesaj kutusunun altındaki ortam seçici → ortamın dişli simgesi → Network access → Custom → `images.unsplash.com`, `images.pexels.com` yolunu tarif et. Oturum başlığının yanındaki ok kullanıcının uygulamasında yok.
2. [x] **Geçici fotoğraflar:** (Spanakopita hariç yapıldı, ayrıntılar `assets/img/KAYNAKLAR.md` dosyasında. Spanakopita için hâlâ fotoğraf gerekiyor.) Unsplash veya Pexels'ten ücretsiz lisanslı, **yumuşak, açık tonlu, minimal** Yunan yemek fotoğrafları bul (beyaz tabak, keten örtü, zeytinyağı, limon, doğal ışık). Gereken yerler:
   - Hero: "Meze aan tafel"
   - Kartlar: "Vitrine", "Pita gyros", "Meze buffet"
   - Traiteur kaydırıcısı: Moussaka, Spanakopita, Dolmades, Pastitsio
   - Eat in kaydırıcısı: Griekse salade, Pita gyros, Souvlaki
   - Catering kaydırıcısı: Meze buffet, Borrelplank, Walking dinner
   Fotoğrafları `assets/img/` altına indir, yaklaşık 1200 px genişliğe küçült, `.ph` yer tutucularının yerine `<img>` koy. Kaynak ve fotoğrafçıyı `assets/img/KAYNAKLAR.md` dosyasına yaz.
3. [x] **Kullanıcının vitrin fotoğrafını kullanma.** Kullanıcı bunu açıkça istemedi, eski kırpılmış görseller silindi.
4. [ ] Yer tutucu bilgileri gerçekleriyle değiştir (kullanıcıdan iste): açılış saatleri, telefon, e-posta (`info@mitsos.nl` tahmin), Instagram ve Facebook linkleri, menü ve sipariş linkleri. Bunlar sitede `.todo` sınıfıyla işaretli.
5. [ ] Adresi kullanıcıya teyit ettir.
6. [ ] Değişiklikten sonra: Playwright ile mobil (390 px) ve masaüstü (1280 px) ekran görüntüsü al, artifact'i güncelle, commit edip `claude/eerste-ontwerp` dalına push et.
7. [ ] **Google reviews:** Kullanıcıdan 3 gerçek Google yorumu (metin + isim) ve ortalama puanı iste. Uydurma yorum yazma. Şu an `.todo` yer tutucuları var.
8. [ ] **Ons verhaal:** Metin genel tutuldu ("familiezaak sinds 1996"). Kullanıcıya hikâyeyi teyit ettir (kim kurdu, aile kaç kuşak, vb.) ve bir aile/dükkân fotoğrafı iste.
9. [ ] **Cateringformulier:** Şimdilik ziyaretçinin e-posta uygulamasını açıyor (`mailto`, adres `assets/js/main.js` içinde `OFFERTE_EMAIL`). Yayın (hosting) seçilince gerçek bir form servisine bağla (Netlify Forms, Formspree vb.).
10. [ ] Kullanıcı istemeden PR açma. İleride: `main` dalı ve yayın (hosting) seçimi.

## İngilizce
- NL/EN düğmesi menüde. Çeviriler `assets/js/i18n.js` dosyasında (Felemenkçe metin → İngilizce). HTML'de bir metin değişirse buradaki anahtarı da güncelle.
- Dil sırası: `?lang=en` linki, ziyaretçinin önceki seçimi, tarayıcı dili (Felemenkçe değilse İngilizce).

## Notlar
- Bu oturumda "browser isn't supported" uyarısı çıktı. Büyük ihtimalle uygulama içi tarayıcıdan kaynaklanıyordu. Çözüm olarak tek dosyalık bir HTML (görseller içine gömülü) gönderildi.
- Kullanıcı tasarımda **yumuşak, minimal ve modern** bir görünüm istiyor.
