// إعدادات Firebase التي زودتني بها لهذا النظام.
// قاعدة البيانات المستخدمة: Cloud Firestore (default database).
export const firebaseConfig = {
  apiKey: "AIzaSyCVeONuBxpEqgypFcgThCap_k2HKNCIdUQ",
  authDomain: "nerrt-1c997.firebaseapp.com",
  projectId: "nerrt-1c997",
  storageBucket: "nerrt-1c997.firebasestorage.app",
  messagingSenderId: "160695021429",
  appId: "1:160695021429:web:b0318bcee88d101cf96d3c",
  measurementId: "G-JW66N7Y143"
};

// عزل بيانات هذا التطبيق داخل Firestore.
// المسار: juicePOSData/main/{collection}/{documentId}
export const FIRESTORE_SYNC = {
  rootCollection: "juicePOSData",
  tenantId: "main"
};

export const DEFAULT_ADMIN_PASSWORD = "78789852";
