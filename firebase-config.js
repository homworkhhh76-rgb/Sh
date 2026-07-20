// نفس إعداد اتصال قاعدة البيانات المستخدم في برنامج كاش توب العامل.
// المزامنة تتم عبر REST API وسيط متوافق مع نمط Realtime Database، بدون Firebase Auth أو Firestore SDK.
export const firebaseConfig = {
  apiKey: "AIzaSyBM-xAF2lf0cspTu1-7HAXxyoORGGZsxA8",
  authDomain: "toppo-14392.firebaseapp.com",
  databaseURL: "https://cash-top-api-2026.vercel.app/api/rtdb",
  projectId: "toppo-14392",
  storageBucket: "toppo-14392.firebasestorage.app",
  messagingSenderId: "124300854330",
  appId: "1:124300854330:web:47e832cd565a0ef5c32103",
  measurementId: "G-Q8H7CZRMTC"
};

export const CASH_TOP_SYNC = {
  companyKey: "COMPANY001",
  branchId: "main",
  appNode: "juicePOS"
};

export const DEFAULT_ADMIN_PASSWORD = "78789852";
