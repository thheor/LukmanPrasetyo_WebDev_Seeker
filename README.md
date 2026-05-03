# Eco-Track — Lukman Prasetyo

## Tentang Project

Eco-Track adalah sebuah aplikasi web yang didesain untuk membantu pengguna, terutama mahasiswa, untuk dapat menghitung dan menyadari jejak karbon harian mereka. Aplikasi web ini menghitung jejak karbon harian berdasarkan penggunaan transportasi dan perangkat elektronik yang digunakan (AC dan Laptop) dalam satuan kg C0₂. Dengan memberikan data kalkulasi, project ini bertujuan untuk menjembatani kesenjangan antara kebiasaan sehari-hari dan dampaknya terhadap iklim global.

## Masalah Iklim yang Disoroti

Project ini berfokus pada emisi tersembunyi yang biasa dilakukan oleh mahasiswa yang berkontribusi secara signifikan pada krisis iklim global. Dengan mengukur dampak dari penggunaan kendaraan dan perangkat elektronik, aplikasi ini mengubah data abstrak menjadi informasi yang berguna. Tujuan saya adalah untuk mendorong gaya hidup berkelanjutan melalui perubahan-perubahan kecil dalam konsumsi energi dan transportasi sehari-hari.

## Jalur Spesialisasi yang Dipilih

- [x] A1. Real-time UI Feedback
- [ ] A2. Interactive Tips (Action Plan)
- [ ] A3. Dynamic Result Display
- [x] B1. Static File Serving
- [x] B2. The Carbon API
- [x] B3. Smart Validation

## Cara Menjalankan Project

1. Buka terminal dan jalankan perintah berikut.
   ```bash
   git clone https://github.com/thheor/LukmanPrasetyo_WebDev_Seeker.git
   cd LukmanPrasetyo_WebDev_Seeker/eco-track-project/
   ```
2. Install dependencies.
   ```bash
   npm install
   ```
3. Jalankan server.
   ```bash
   npm run dev
   ```
4. Buka browser dan masuk buka url `http://localhost:3000`

## Tantangan yang Dihadapi

Kesulitan teknis yang saya hadapi adalah saat mengimplementasikan _strict server-side validation_. Hal ini karena operator `typeof` tidak memberikan hasil yang sesuai, misalnya `typeof NaN` memberikan hasil "number" dan data dari input element HTML selalu berupa string. Untuk menangani masalah ini, saya menggunakan `Number()` dan `isNaN()` untuk mengubah nilai input menjadi `number` untuk nilai angka, `null` untuk nilai kosong, dan `NaN` untuk nilai bukan angka. Kemudian nilai tersebut dicek untuk memberikan pesan error yang sesuai.
