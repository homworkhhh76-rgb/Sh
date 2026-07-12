كاش توب — إصدار Firebase + Offline

الملفات كلها في مستوى واحد بدون مجلدات.

المزايا:
- يعمل محلياً بدون إنترنت، بما في ذلك إعادة تحميل الرابط بعد تثبيت الـ PWA.
- كل تغيير يُضاف إلى قائمة مزامنة محلية ولا يُحذف منها إلا بعد نجاح الرفع إلى Firebase.
- مزامنة الزبائن، الأرصدة، العمليات، المخزون، الأجهزة، المستخدمين وPIN.
- المديونية باللون الأحمر والرصيد الموجب باللون الأخضر.
- الدفعة يمكن أن تتجاوز المديونية ويتحول الفرق إلى رصيد موجب.
- طرق الدفع: بنك، محفظة، جوال بي.
- الحذف متاح للمدير فقط.

إعداد Firebase:
1) فعّل Realtime Database في مشروع Firebase.
2) فعّل Anonymous Authentication من Authentication > Sign-in method.
3) انشر firebase-rules.json أو نفّذ:
   firebase deploy --only database
4) للنشر على Firebase Hosting:
   firebase deploy --only hosting

ملف إعداد المشروع:
firebase-config.js

مسار بيانات التطبيق:
cashTopChargeApp/v3/state
