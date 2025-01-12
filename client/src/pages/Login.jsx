import React, { useState } from 'react';
import SignIn from '../layout/SignIn';
import SignUp from '../layout/SignUp';
import Navbar from '../components/Navbar';

export default function LogIn() {
  const [isSignUp, setIsSignUp] = useState(true);

  const handelToggle = () => {
    setIsSignUp(!isSignUp);
  };

  return (
    <>
    <Navbar/>

    <div className="relative overflow-hidden">
        {isSignUp ? (
          <SignUp handelToggle={handelToggle} />
        ) : (
          <SignIn handelToggle={handelToggle} />
        )}
    </div>
    </>
  );
}
