import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { useAuth } from "../contexts/authContext/Index";
import { auth } from "../firebase/firebase";

function NumberOtp() {
  const { userLoggedIn } = useAuth();
  const [showOTP, setShowOTP] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [otp, setOtp] = useState("");
  const [number, setNumber] = useState("");
  
  // Clean up RecaptchaVerifier on component unmount
  useEffect(() => {
    return () => {
      if (window.recaptchaVerifier) {
        window.recaptchaVerifier.clear();
        window.recaptchaVerifier = null;
      }
    };
  }, []);

  function onCaptchVerify() {
    if (!window.recaptchaVerifier) {
      try {
        window.recaptchaVerifier = new RecaptchaVerifier(
          auth,
          "recaptcha-container",
          {
            size: "invisible",
            callback: () => {
              onSignup();
            },
            "expired-callback": () => {
              setError("reCAPTCHA expired. Please try again.");
              setLoading(false);
            },
          }
        );
      } catch (error) {
        setError("Error initializing reCAPTCHA. Please refresh the page.");
        setLoading(false);
      }
    }
  }

  function validatePhoneNumber(phoneNumber) {
    // Basic validation for Nepal phone numbers
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phoneNumber);
  }

  async function onSignup() {
    try {
      setError("");
      setLoading(true);

      if (!validatePhoneNumber(number)) {
        throw new Error("Please enter a valid 10-digit phone number");
      }

      onCaptchVerify();
      const appVerifier = window.recaptchaVerifier;
      const formatNumber = "+977" + number;

      const confirmationResult = await signInWithPhoneNumber(auth, formatNumber, appVerifier);
      window.confirmationResult = confirmationResult;
      setShowOTP(true);
      alert("OTP sent successfully!");
    } catch (error) {
      console.error("Error sending OTP:", error);
      setError(error.message || "Error sending OTP. Please try again.");
      
      // Reset reCAPTCHA on error
      if (window.recaptchaVerifier) {
        window.recaptchaVerifier.clear();
        window.recaptchaVerifier = null;
      }
    } finally {
      setLoading(false);
    }
  }

  async function onOTPVerify() {
    try {
      setError("");
      setLoading(true);

      if (!otp || otp.length !== 6) {
        throw new Error("Please enter a valid 6-digit OTP");
      }

      const result = await window.confirmationResult.confirm(otp);
      console.log("User verified:", result.user);
      // Handle successful verification here
    } catch (error) {
      console.error("Error verifying OTP:", error);
      setError(error.message || "Invalid OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div id="recaptcha-container"></div>
      {userLoggedIn && <Navigate to="/" replace={true} />}
      
      <div className="flex items-center justify-center min-h-screen bg-white-500">
        <div className="flex justify-center flex-col space-y-3 w-full max-w-md px-4">
          <h1 className="text-2xl font-bold text-center">One-time Login</h1>
          
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded">
              {error}
            </div>
          )}

          {showOTP ? (
            <>
              <input
                type="tel"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                placeholder="Enter 6-digit OTP"
                maxLength={6}
                className="border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-red-500 focus:outline-none"
              />
              <button
                onClick={onOTPVerify}
                disabled={loading || otp.length !== 6}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition disabled:opacity-50"
              >
                {loading ? "Verifying..." : "Verify OTP"}
              </button>
            </>
          ) : (
            <>
              <input
                type="tel"
                value={number}
                onChange={(e) => setNumber(e.target.value.replace(/\D/g, ""))}
                placeholder="Enter 10-digit phone number"
                maxLength={10}
                className="border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-red-500 focus:outline-none"
              />
              <button
                onClick={onSignup}
                disabled={loading || number.length !== 10}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition disabled:opacity-50"
              >
                {loading ? "Sending..." : "Send OTP"}
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default NumberOtp;