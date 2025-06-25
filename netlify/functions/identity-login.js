<<<<<<< HEAD
// netlify/functions/identity-login.js
const admin = require('firebase-admin');

// --- אתחול Firebase Admin (זהה לפונקציה הקודמת) ---
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

exports.handler = async function(event, context) {
  // בודק שהבקשה אכן מגיעה ממשתמש מחובר של Netlify
  if (!context.clientContext || !context.clientContext.user) {
    return {
      statusCode: 401, // Unauthorized
      body: JSON.stringify({ error: 'Unauthorized. No user context.' }),
    };
  }
  
  const netlifyUser = context.clientContext.user;
  const firebaseUid = netlifyUser.sub; // ה-UID ב-Firebase זהה למזהה של Netlify

  try {
    // יוצר טוקן התחברות מותאם אישית ומאובטח עבור ה-UID הזה
    const firebaseToken = await admin.auth().createCustomToken(firebaseUid);
    
    console.log(`Generated Firebase token for user: ${firebaseUid}`);

    // מחזיר את הטוקן לאפליקציה בצד הלקוח
    return {
      statusCode: 200,
      body: JSON.stringify({ firebaseToken }),
    };
  } catch (error) {
    console.error('Error creating custom token:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to create Firebase token.' }),
    };
  }
};
=======
// netlify/functions/identity-login.js
const admin = require('firebase-admin');

// --- אתחול Firebase Admin (זהה לפונקציה הקודמת) ---
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

exports.handler = async function(event, context) {
  // בודק שהבקשה אכן מגיעה ממשתמש מחובר של Netlify
  if (!context.clientContext || !context.clientContext.user) {
    return {
      statusCode: 401, // Unauthorized
      body: JSON.stringify({ error: 'Unauthorized. No user context.' }),
    };
  }
  
  const netlifyUser = context.clientContext.user;
  const firebaseUid = netlifyUser.sub; // ה-UID ב-Firebase זהה למזהה של Netlify

  try {
    // יוצר טוקן התחברות מותאם אישית ומאובטח עבור ה-UID הזה
    const firebaseToken = await admin.auth().createCustomToken(firebaseUid);
    
    console.log(`Generated Firebase token for user: ${firebaseUid}`);

    // מחזיר את הטוקן לאפליקציה בצד הלקוח
    return {
      statusCode: 200,
      body: JSON.stringify({ firebaseToken }),
    };
  } catch (error) {
    console.error('Error creating custom token:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to create Firebase token.' }),
    };
  }
};
>>>>>>> cde4e390445ae54e72a1535d42dbe6fb7298f853
