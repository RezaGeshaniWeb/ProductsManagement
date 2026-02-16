# Products Management API

یک API ساده برای مدیریت محصولات که با Node.js و ماژول HTTP بومی ساخته شده است.

## Base URL
```
https://productsmanagement-1.onrender.com
```

## نصب و راه‌اندازی

### پیش‌نیازها
- Node.js (نسخه 14 یا بالاتر)
- npm

### مراحل نصب

1. کلون کردن یا دانلود پروژه
```bash
cd Products-Management
```

2. نصب وابستگی‌ها
```bash
npm install
```

3. اجرای پروژه در حالت توسعه
```bash
npm run dev
```

4. اجرای پروژه در حالت production
```bash
npm start
```

سرور روی پورت 3000 اجرا می‌شود: `http://localhost:3000`

## ساختار پروژه

```
Products-Management/
├── controllers/
│   └── product.controllers.js    # کنترلرهای API
├── model/
│   └── product.model.js          # مدل و منطق دسترسی به داده
├── data/
│   └── products.json             # فایل ذخیره‌سازی محصولات
├── index.js                      # فایل اصلی سرور
├── package.json                  # فایل پیکربندی npm
└── README.md                     # مستندات پروژه
```

## ساختار داده محصول

```json
{
  "id": 1,
  "title": "نام محصول",
  "category": "man",
  "price": "950.000",
  "quantity": 1,
  "img1": "https://example.com/image.jpg"
}
```

### فیلدها:
- `id` (number/string): شناسه یکتای محصول (به صورت خودکار در POST ایجاد می‌شود)
- `title` (string): نام محصول
- `category` (string): دسته‌بندی محصول (مثلاً: man, woman)
- `price` (string/number): قیمت محصول
- `quantity` (number, اختیاری): تعداد موجودی
- `img1` (string, اختیاری): آدرس تصویر محصول

## API Endpoints

### 1. دریافت تمام محصولات

دریافت لیست تمام محصولات

**Request:**
```http
GET /api/products
```

**Response:**
```json
[
  {
    "id": 1,
    "title": "عینک آفتابی دیتا",
    "category": "man",
    "price": "950.000",
    "quantity": 1,
    "img1": "https://example.com/image.jpg"
  },
  ...
]
```

**Status Code:** `200 OK`

---

### 2. دریافت محصول بر اساس ID

دریافت اطلاعات یک محصول خاص

**Request:**
```http
GET /api/products/:id
```

**Parameters:**
- `id` (path parameter): شناسه محصول

**Response (موفق):**
```json
{
  "id": 1,
  "title": "عینک آفتابی دیتا",
  "category": "man",
  "price": "950.000",
  "quantity": 1,
  "img1": "https://example.com/image.jpg"
}
```

**Status Code:** `200 OK`

**Response (یافت نشد):**
```json
{
  "message": "not found any product"
}
```

**Status Code:** `404 Not Found`

---

### 3. ایجاد محصول جدید

ایجاد یک محصول جدید

**Request:**
```http
POST /api/products
Content-Type: application/json
```

**Body:**
```json
{
  "title": "عینک آفتابی جدید",
  "category": "man",
  "price": "950.000",
  "quantity": 1,
  "img1": "https://example.com/image.jpg"
}
```

**نکته:** فیلد `id` به صورت خودکار با استفاده از timestamp ایجاد می‌شود.

**Response:**
```json
{
  "message": "new product created !",
  "data": {
    "id": 1771264283913,
    "title": "عینک آفتابی جدید",
    "category": "man",
    "price": "950.000",
    "quantity": 1,
    "img1": "https://example.com/image.jpg"
  }
}
```

**Status Code:** `201 Created`

---

### 4. به‌روزرسانی محصول

به‌روزرسانی اطلاعات یک محصول موجود

**Request:**
```http
PUT /api/products/:id
Content-Type: application/json
```

**Parameters:**
- `id` (path parameter): شناسه محصول

**Body:**
```json
{
  "title": "عنوان به‌روزرسانی شده",
  "price": "1.200.000"
}
```

**نکته:** می‌توانید فقط فیلدهایی که می‌خواهید به‌روزرسانی شوند را ارسال کنید.

**Response (موفق):**
```json
{
  "message": "product updated !"
}
```

**Status Code:** `200 OK`

**Response (یافت نشد):**
```json
{
  "message": "not found product !"
}
```

**Status Code:** `404 Not Found`

---

### 5. حذف محصول

حذف یک محصول از سیستم

**Request:**
```http
DELETE /api/products/:id
```

**Parameters:**
- `id` (path parameter): شناسه محصول

**Response (موفق):**
```json
{
  "message": "product delete !"
}
```

**Status Code:** `200 OK`

**Response (یافت نشد):**
```json
{
  "message": "not found product !"
}
```

**Status Code:** `404 Not Found`

---

## مثال‌های استفاده

### دریافت تمام محصولات
```bash
curl https://productsmanagement-1.onrender.com/api/products
```

### دریافت محصول با ID
```bash
curl https://productsmanagement-1.onrender.com/api/products/1
```

### ایجاد محصول جدید
```bash
curl -X POST https://productsmanagement-1.onrender.com/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "title": "عینک آفتابی جدید",
    "category": "man",
    "price": "950.000",
    "quantity": 1,
    "img1": "https://example.com/image.jpg"
  }'
```

### به‌روزرسانی محصول
```bash
curl -X PUT https://productsmanagement-1.onrender.com/api/products/1 \
  -H "Content-Type: application/json" \
  -d '{
    "title": "عنوان جدید",
    "price": "1.200.000"
  }'
```

### حذف محصول
```bash
curl -X DELETE https://productsmanagement-1.onrender.com/api/products/1
```

## مدیریت خطا

- **404 Not Found**: زمانی که مسیر درخواستی یافت نشود یا محصول با ID مشخص وجود نداشته باشد
- **500 Internal Server Error**: در صورت بروز خطا در سرور (در لاگ‌ها نمایش داده می‌شود)

## تکنولوژی‌های استفاده شده

- **Node.js**: محیط اجرای JavaScript
- **HTTP Module**: ماژول بومی Node.js برای ایجاد سرور
- **File System (fs)**: برای خواندن و نوشتن فایل JSON
- **nodemon**: برای اجرای خودکار در حالت توسعه

## نکات مهم

1. داده‌ها در فایل `data/products.json` ذخیره می‌شوند
2. شناسه محصول در متد POST به صورت خودکار با `Date.now()` ایجاد می‌شود
3. تمام درخواست‌ها و پاسخ‌ها به صورت JSON هستند
4. در متد PUT، فقط فیلدهای ارسال شده به‌روزرسانی می‌شوند

## مجوز

ISC
