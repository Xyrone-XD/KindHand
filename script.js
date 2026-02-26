import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { 
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  RecaptchaVerifier,
  signInWithPhoneNumber
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyASnava6wz8tHnNXoUg-TvHvr0c-Dbvxic",
  authDomain: "kindhand-9413f.firebaseapp.com",
  projectId: "kindhand-9413f",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// ✅ Email Login
window.login = async function() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    await signInWithEmailAndPassword(auth, email, password);
    alert("Login Successful!");
  } catch (error) {
    alert(error.message);
  }
};

// ✅ Google Login
window.googleLogin = async function() {
  const provider = new GoogleAuthProvider();
  try {
    await signInWithPopup(auth, provider);
    alert("Google Login Success!");
  } catch (error) {
    alert(error.message);
  }
};

// ✅ Setup reCAPTCHA ONCE
window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
  size: 'invisible'
});

// ✅ Phone Login
window.phoneLogin = async function() {
  const phoneNumber = prompt("Enter phone number with +91");

  try {
    const confirmation = await signInWithPhoneNumber(
      auth,
      phoneNumber,
      window.recaptchaVerifier
    );

    const otp = prompt("Enter OTP");
    await confirmation.confirm(otp);

    alert("Phone Login Success!");
  } catch (error) {
    alert(error.message);
  }
};
