import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { 
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  RecaptchaVerifier,
  signInWithPhoneNumber
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// 🔹 Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyASnava6wz8tHnNXoUg-TvHvr0c-Dbvxic",
  authDomain: "kindhand-9413f.firebaseapp.com",
  projectId: "kindhand-9413f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// ✅ Email/Password Login
window.emailLogin = async function() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    alert(`Welcome ${userCredential.user.email}`);
    // Redirect to home page
    window.location.href = "home.html";
  } catch (err) {
    alert(err.message);
  }
};

// ✅ Google Login
window.googleLogin = async function() {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    alert(`Welcome ${result.user.displayName}`);
    window.location.href = "home.html";
  } catch (err) {
    alert(err.message);
  }
};

// ✅ Phone Login
window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
  size: 'invisible'
});

window.phoneLogin = async function() {
  const phone = prompt("Enter phone number with country code, e.g +91XXXXXXXXXX");
  try {
    const confirmationResult = await signInWithPhoneNumber(auth, phone, window.recaptchaVerifier);
    const otp = prompt("Enter OTP sent to your phone");
    await confirmationResult.confirm(otp);
    alert("Phone login successful!");
    window.location.href = "home.html";
  } catch (err) {
    alert(err.message);
  }
};
