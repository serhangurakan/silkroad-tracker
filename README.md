# Silkroad Unique & Event Tracker

Production-ready React tracker uygulaması - Silkroad Online için Unique ve Event takip sistemi.

## Özellikler

### Uniques Tracker
- **Garden Uniques**: 4-8 saat respawn tracker (progress bar + countdown)
- **Log Parser**: Game loglarından otomatik kill zamanı çıkarma
- **Normal Uniques**: Spawn point görsel haritaları
- **Titan Uniques**: Event bazlı spawn point gösterimi
- **Element Uniques**: Spawn point görsel browser

### Event Schedule
- 40+ sistem eventi hazır entegre
- Zaman barı ve timeline görselleştirmesi
- 2 dakika öncesi alarm sistemi (ses + popup)
- Custom event ekleme/silme
- Event toggle (aktif/pasif)
- LocalStorage ile kalıcı ayarlar

## Kurulum

```bash
cd silkroad-tracker
npm install
npm run dev
```

Tarayıcıda `http://localhost:5173` adresini aç.

## Build

```bash
npm run build
npm run preview
```

## Özelleştirme

### Spawn Point Görselleri

`src/data/uniques.js` içindeki `spawnImages` objesinde PNG path'lerini güncelle:

```javascript
export const spawnImages = {
  'tiger_girl': '/images/Tiger Girl Spawn Points.png',
  // Kendi görsellerin için path güncelle
};
```

Görselleri `public/images/` klasörüne ekle.

### Alarm Sesi

`public/beep.mp3` dosyasını kendi alarm sesinle değiştir (2 saniye önerilen).

### Event Ekleme

Kod içinden: `src/data/events.js`
UI'dan: Event Schedule sekmesinde "+ Yeni Event" butonu

## Teknolojiler

- React 18
- Vite
- date-fns
- CSS3 (Dark tema)
- LocalStorage

## Yapı

```
src/
├── components/       # UI componentler
├── data/            # Unique ve event config
├── hooks/           # Custom hooks (localStorage)
├── utils/           # Helper fonksiyonlar
├── App.jsx          # Ana component
└── styles.css       # Global stiller
```

## Notlar

- Tüm veriler localStorage'a otomatik kaydedilir
- Alarm sistemi 5 saniyede bir kontrol eder
- Garden unique respawn: 4-8 saat arası lineer progress
- Event zamanları 24 saat formatında
