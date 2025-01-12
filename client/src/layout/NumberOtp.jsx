import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { useAuth } from "../contexts/authContext/Index";
import { auth } from "../firebase/firebase";

function NumberOtp() {
  const { userLoggedIn } = useAuth();
  const [showOTP, setShowOTP] = useState(false);
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState("");
  const [number, setNumber] = useState("");

  // Ensure app verification is disabled for testing only
  auth.settings.appVerificationDisabledForTesting = true;

  function onCaptchVerify() {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {
            onSignup();
          },
          "expired-callback": () => {},
        }
      );
    }
  }

  function onSignup() {
    setLoading(true);
    onCaptchVerify();

    const appVerifier = window.recaptchaVerifier;

    const formatNumber = "+977" + number;

    signInWithPhoneNumber(auth, formatNumber, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setLoading(false);
        setShowOTP(true);
        // toast.success("OTP sent successfully!");
        console.log("OTP sent successfully!");
        alert("OTP sent successfully!");
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }

  function onOTPVerify() {
    setLoading(true);
    window.confirmationResult
      .confirm(otp)
      .then(async (res) => {
        console.log(res);
        setUser(res.user);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }

  return (
    <>
      <div id="recaptcha-container"></div>
      {userLoggedIn && <Navigate to={"/"} replace={true} />}
      {showOTP ? (
        <>
          {/* OTP Section */}
          <div className="flex items-center justify-center min-h-screen bg-white-500">
            <div className="flex justify-center flex-col space-y-3">
              <h1>One-time Login!</h1>
              <input
                type="tel"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="OTP"
                maxLength={6}
                className="border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-red-500 focus:outline-none"
              />
              <button
                onClick={onOTPVerify}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
              >
                CONFIRM
              </button>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="flex items-center justify-center min-h-screen bg-white-500">
            <div className="flex justify-center flex-col space-y-3">
              <h1>One-time Login!</h1>
              <input
                type="tel"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                placeholder="Enter a number"
                maxLength={10}
                className="border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-red-500 focus:outline-none"
              />
              <button
                onClick={onSignup}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
              >
                Send
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default NumberOtp;
