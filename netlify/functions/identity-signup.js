<<<<<<< HEAD
// netlify/functions/identity-signup.js
const admin = require('firebase-admin');

// --- אתחול Firebase Admin ---
// הקוד הזה קורא את המפתח הסודי שהגדרנו כמשתנה סביבה ב-Netlify
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);

// מבטיח שהאתחול יקרה רק פעם אחת
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

exports.handler = async function(event, context) {
  // קורא את פרטי המשתמש מהאירוע ש-Netlify שולחת
  const { user } = JSON.parse(event.body);
  
  console.log(`User signup attempt for: ${user.email}`);

  try {
    // יוצר משתמש חדש במערכת האימות של Firebase
    const userRecord = await admin.auth().createUser({
      uid: user.id, // משתמש במזהה של Netlify בתור ה-UID ב-Firebase כדי לקשר ביניהם
      email: user.email,
      displayName: user.user_metadata.full_name,
    });
    
    console.log('Successfully created new user in Firebase:', userRecord.uid);

    // מחזיר תשובה חיובית ל-Netlify
    return {
      statusCode: 200,
      body: JSON.stringify({ message: `Firebase user created for ${user.email}` }),
    };
  } catch (error) {
    console.error('Error creating new user in Firebase:', error);
    // מחזיר תשובת שגיאה אם משהו השתבש
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to create user in Firebase.' }),
    };
  }
};
=======
// netlify/functions/identity-signup.js
const admin = require('firebase-admin');

// --- אתחול Firebase Admin ---
// הקוד הזה קורא את המפתח הסודי שהגדרנו כמשתנה סביבה ב-Netlify
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);

// מבטיח שהאתחול יקרה רק פעם אחת
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

exports.handler = async function(event, context) {
  // קורא את פרטי המשתמש מהאירוע ש-Netlify שולחת
  const { user } = JSON.parse(event.body);
  
  console.log(`User signup attempt for: ${user.email}`);

  try {
    // יוצר משתמש חדש במערכת האימות של Firebase
    const userRecord = await admin.auth().createUser({
      uid: user.id, // משתמש במזהה של Netlify בתור ה-UID ב-Firebase כדי לקשר ביניהם
      email: user.email,
      displayName: user.user_metadata.full_name,
    });
    
    console.log('Successfully created new user in Firebase:', userRecord.uid);

    // מחזיר תשובה חיובית ל-Netlify
    return {
      statusCode: 200,
      body: JSON.stringify({ message: `Firebase user created for ${user.email}` }),
    };
  } catch (error) {
    console.error('Error creating new user in Firebase:', error);
    // מחזיר תשובת שגיאה אם משהו השתבש
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to create user in Firebase.' }),
    };
  }
};
>>>>>>> cde4e390445ae54e72a1535d42dbe6fb7298f853
