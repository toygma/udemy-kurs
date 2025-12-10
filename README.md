# 👩‍⚕️ MERN-HEALTH

Bu Udemy kursumda; hasta, doktor ve admin panellerinin yer aldığı kapsamlı bir kontrol sistemi geliştiriyorum. Hastalar doktorlarla randevu oluşturabilirken, doktorlar bu randevuları onaylayabilir veya iptal edebilir. 
Admin paneli ise tüm kullanıcı yorumlarını, randevu geçmişlerini ve sistem aktivitelerini detaylı şekilde görüntüleyebilmek için tasarlandı.
Ayrıca projede pagination, sort, filter ve advanced search gibi modern listeleme ve veri yönetimi özellikleri de tam kapsamlı olarak uygulanmıştır.


## 🚀 Özellikler

### Hasta Özellikleri

- ✅ **JWT ile kayıt ve giriş işlemleri**
- ✅ **Profil bilgilerini güncelleme.**
- ✅ **Hastaya özel randevu görüntüleme ve yönetim sistemi**
- ✅ **Doktorları kategoriye göre filtreleme**
- ✅ **Anahtar kelime ile doktor arama (Search)**
- ✅ **Doktor profil ve detay bilgilerini görüntüleme**
- ✅ **Doktorlara yorum ve puanlama yapabilme**
- ✅ **Profil fotoğrafı ve diğer görseller için Cloudinary entegrasyonu**


### Doktor Özellikleri

- ✅ **JWT ile kayıt ve giriş işlemleri**
- ✅ **Doktor paneli ile kontrol sağlama**
- ✅ **Doktora özel randevu görüntüleme ve yönetim sistemi**
- ✅ **Anahtar kelime ile hasta arama (Search)**
- ✅ **Hasta profil ve detay bilgilerini görüntüleme**


### Admin Özellikleri

- ✅ **Kullanıcı rollerini (hasta, doktor, admin) güncelleme**
- ✅ **Doktor kayıt başvurularını onaylama veya reddetme**
- ✅ **Kullanıcıları engelleme / engel kaldırma**
- ✅ **Toplam doktor, hasta, yorum ve randevu istatistiklerini görüntüleme**
- ✅ **Hasta profil ve detay bilgilerini inceleme**
---

## 🛠️ Teknik özellikler

- ✅ **React 19.1 (en güncel sürüm) kullanıldı**
- ✅ **MongoDB veritabanı yönetimi için Mongoose ORM**
- ✅ **Görsel yükleme ve yönetimi için Cloudinary entegrasyonu**
- ✅ **RTK Query ile gelişmiş state management ve data fetching**
- ✅ **JWT ile kimlik doğrulama (Auth)**
- ✅ **Dinamik filtreleme ve arama fonksiyonları**
- ✅ **Tüm kaynaklar için tam kapsamlı CRUD işlemleri**
- ✅ **Yorum ve puanlama sistemi**
- ✅ **Responsive ve kullanıcı dostu arayüz tasarımı**

---

## .ENV

```bash
PORT = 5000

MONGODB_URI =""

NODE_ENV = development

FRONTEND_URL = ""

JWT_SECRET= ""
JWT_EXPIRES_TIME = ""
COOKIE_EXPIRES_TIME= ""


CLOUDINARY_SECRET_KEY =""
CLOUDINARY_API_KEY = ""
CLOUDINARY_CLOUD_NAME = ""

STRIPE_PUBLISHABLE_KEY=""
STRIPE_SECRET_KEY=""
STRIPE_WEBHOOK_SECRET=""

VITE_REACT_APP_API="
```

## 🧰 Tech Stack

| Layer                 | Technology                      |
| ----------            | ------------------------------- |
| Frontend              | React 19.1, Tailwind CSS        |
| Backend               | Node.js, Express.js             |
| Database              | MongoDB (Mongoose ORM)          |
| Auth                  | JWT                             |
| Forms                 | React Hook Form                 |
| HTTP Requests         | RESTful API                     |
| Alerts                | React Hot Toast                 |
| Images                | Cloudinary                      |

---

## 🧑‍💻 Başlarken

### 🔧 Gereksinimler

- Node.js `v22+`

### 📦 Kurulum

```bash
# 1. Clone the repository
git clone <repository-url>
cd backend
cd frontend

# 2. Install dependencies
npm install

```

# 2. Install dependencies

```bash
pnpm install && npm install
```

# 3. Run

```bash
npm run dev
```

### ✨ UI & UX

- Temiz, modern ve kullanıcı dostu arayüz
- Masaüstü, tablet ve mobil cihazlar için tam duyarlı tasarım
- İlan oluşturma ve düzenleme için kolay formlar
- Hızlı filtreleme ve arama fonksiyonları
- Yorum ve puanlama sistemi

---

### 🔐 Security & Performance

- JWT ile güvenli kimlik doğrulama
- Cloudinary ile optimize edilmiş ve güvenli görsel yönetimi
- Mongoose ile hızlı ve güvenilir veritabanı işlemleri

---
