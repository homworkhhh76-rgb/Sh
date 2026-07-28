# نظام نقطة الشحن وبيع العصير — Firestore v9

تم تحويل قاعدة البيانات بالكامل من API كاش توب القديم إلى **Cloud Firestore** في مشروع Firebase:

- Project ID: `nerrt-1c997`
- Firestore root: `juicePOSData/main`
- لا يوجد أي اعتماد على `cash-top-api-2026.vercel.app` أو Realtime Database.

## طريقة المزامنة

التطبيق **Local First**:

1. أي بيع/تعديل/حذف/سداد/مخزون/مستخدم يُحفظ فوراً على الجهاز.
2. العملية تدخل طابور مزامنة محلي.
3. عند توفر الإنترنت تُرفع العمليات إلى Firestore في دفعات atomic batches.
4. إذا انقطع الاتصال أو فشلت الصلاحيات لا يتجمد زر الحفظ؛ تبقى البيانات محلياً ويعاد الرفع تلقائياً.
5. عند أول اتصال بقاعدة Firestore الجديدة، إذا كانت المجموعات فارغة، يتم رفع النسخة المحلية الحالية إليها تلقائياً.

Firestore المستخدم في الكود هو **Firestore Lite** عبر CDN لأنه REST-only وأخف، بينما التخزين الأوفلاين وإعادة المحاولة يديرهما التطبيق نفسه.

## المجموعات

داخل `juicePOSData/main`:

- `users`
- `inventory`
- `customers`
- `transactions`
- `expenses`
- `settlements`
- `inventoryMovements`
- `settings`

## قواعد Firestore

ارفع محتوى `firestore.rules` من Firebase Console > Firestore Database > Rules ثم Publish.

القواعد المرفقة تفتح القراءة والكتابة فقط داخل `juicePOSData` لأن النسخة الحالية لا تستخدم Firebase Authentication. صلاحيات المستخدمين داخل واجهة البرنامج ما زالت تعمل، لكنها ليست بديلاً عن Auth على مستوى الخادم.

## تسجيل الدخول

- المدير: `admin`
- كلمة المرور الافتراضية: `78789852`
- المستخدمون الآخرون وكلمات المرور المشفرة والصلاحيات يتزامنون عبر مجموعة `users`.

## PWA والكاش

- إصدار الكاش: `juice-pos-v9-firestore`
- Cache First لواجهة التطبيق والملفات الثابتة.
- طلبات Firestore لا تدخل كاش Service Worker.
- ملفات Firebase SDK الخارجية تُخزن في Runtime Cache بعد أول تحميل، لتحسين فتح التطبيق لاحقاً.

## الملفات

المشروع مسطح بدون مجلدات داخل ZIP.
