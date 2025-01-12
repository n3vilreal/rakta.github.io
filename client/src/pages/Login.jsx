import React, { useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

function Login() {

    const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    nnidNumber: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add validation or form submission logic here
    console.log(formData);
  };

  const toggelPassword = () =>{
        setShowPassword(!showPassword);
  }

  return (
    <div className="h-screen w-screen bg-red-300 flex items-center justify-center">
      <form
        className="bg-white p-6 rounded shadow-md w-full max-w-md"
        onSubmit={handleSubmit}
      >
        <h1 className="text-xl font-bold mb-4">Login</h1>
        <div className="mb-4">
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Full name"
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        
        <div className="mb-4">
          <input
            type="number"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            placeholder="Phone Number"
            className="w-full px-3 py-2 border rounded no-spinners"
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            name="NID Number"
            value={formData.nnidNumber}
            onChange={handleChange}
            placeholder="NID Number"
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className=" w-full px-3 py-2 border rounded mb-4 flex items-center justify-betwee">
          <input
            type={(showPassword ? "text"  : "password" )}
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full focus:outline-none"
          />
          <p  onClick={toggelPassword}>
                {(showPassword ? <FaEye /> : <FaEyeSlash />)}
            </p>
        </div>
        <div className=" w-full px-3 py-2 border rounded mb-4 flex items-center justify-between">
          <input
            type={(showPassword ? "text"  : "password" )}
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm Password"
            className="w-full focus:outline-none"
          />
            <p  onClick={toggelPassword}>
                {(showPassword ? <FaEye /> : <FaEyeSlash />)}
            </p>
        </div>
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
        >
          Sign In
        </button>
      </form>
    </div>
  );
}

export default Login;
