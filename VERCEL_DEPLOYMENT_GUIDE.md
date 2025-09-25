# دليل نشر تطبيق PrePilot على Vercel

## 📋 المتطلبات

1. **حساب Vercel**: سجل في [vercel.com](https://vercel.com)
2. **مفتاح Gemini API**: احصل على مفتاح من [Google AI Studio](https://aistudio.google.com)
3. **GitHub Repository**: ارفع الكود إلى GitHub

## 🚀 خطوات النشر

### 1. إعداد متغيرات البيئة في Vercel

1. اذهب إلى [Vercel Dashboard](https://vercel.com/dashboard)
2. اختر مشروعك
3. اذهب إلى Settings > Environment Variables
4. أضف المتغيرات التالية:

```
GEMINI_API_KEY = your_actual_gemini_api_key
NODE_ENV = production
```

### 2. رفع الكود إلى GitHub

```bash
# تهيئة Git (إذا لم تكن موجودة)
git init

# إضافة الملفات
git add .

# عمل commit
git commit -m "Initial commit for Vercel deployment"

# ربط مع GitHub
git remote add origin https://github.com/yourusername/your-repo-name.git

# رفع الكود
git push -u origin main
```

### 3. النشر على Vercel

#### الطريقة الأولى: عبر Vercel Dashboard
1. اذهب إلى [Vercel Dashboard](https://vercel.com/dashboard)
2. اضغط "New Project"
3. اختر GitHub repository
4. Vercel سيكتشف تلقائياً أنه Vite project
5. تأكد من إعدادات البناء:
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

#### الطريقة الثانية: عبر Vercel CLI
```bash
# تثبيت Vercel CLI
npm i -g vercel

# تسجيل الدخول
vercel login

# نشر المشروع
vercel

# للمتابعة
vercel --prod
```

## ⚙️ إعدادات إضافية

### تحسين الأداء
- تم إعداد Code Splitting في `vite.config.ts`
- تم إعداد Caching headers في `vercel.json`
- تم تحسين Bundle size

### دعم PWA
- تم إعداد Service Worker
- تم إعداد Manifest file
- دعم Offline functionality

## 🔧 استكشاف الأخطاء

### مشاكل شائعة:

1. **خطأ في البناء**:
   ```bash
   npm run build
   ```

2. **مشاكل في متغيرات البيئة**:
   - تأكد من إضافة `GEMINI_API_KEY` في Vercel
   - تأكد من إعادة النشر بعد إضافة المتغيرات

3. **مشاكل في المسارات**:
   - تأكد من أن `base: '/'` في `vite.config.ts`

## 📱 اختبار التطبيق

بعد النشر، اختبر:
- [ ] تحميل الصفحة الرئيسية
- [ ] وظائف الذكاء الاصطناعي
- [ ] تصدير التقارير
- [ ] PWA functionality
- [ ] Responsive design

## 🔄 التحديثات المستقبلية

```bash
# بعد إجراء تغييرات
git add .
git commit -m "Update description"
git push

# Vercel سيعيد النشر تلقائياً
```

## 📞 الدعم

إذا واجهت مشاكل:
1. تحقق من Vercel Function Logs
2. تحقق من Build Logs
3. تأكد من صحة متغيرات البيئة
