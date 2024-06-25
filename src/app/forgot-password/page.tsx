"use client";
import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS

export default function Home() {
  const initialVisitor = {
    identifier: "", // Changed to identifier to accept phoneNo or emailId
    password: "",
  };

  const [visitor, setVisitor] = useState(initialVisitor);

  const notify = (message: string, type: string) => {
    if (type === "success") {
      toast.success(message);
    } else {
      toast.error(message);
    }
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setVisitor((prevVisitor) => ({
      ...prevVisitor,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://api.aksharenterprise.net/user/forgotpassword",
        {
          ...visitor,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        notify("Logged in successfully", "success");
        resetForm();
        // Redirect or handle successful login action here
      }
    } catch (error) {
      const message =
      //@ts-ignore
        error?.response?.data?.error ||
        "Something went wrong. Please try again.";
      notify(message, "error");
      console.error("Error:", error);
    }
  };

  const resetForm = () => {
    setVisitor(initialVisitor);
  };

  return (
    <div className="min-w-screen min-h-screen bg-white flex items-center flex-col justify-between">
      <div className="bg-white text-gray-800 overflow-hidden relative flex-grow w-full">
        <div className="bg-white w-full overflow-y-auto">
          <form className="space-y-4 px-5 pt-6 pb-20" onSubmit={handleSubmit}>
            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
            <div>
              <h2 className="text-xl font-bold text-orange-600 mb-2">
                Forgot Password
              </h2>
              <div className="py-4">
                <label className="block text-orange-600">Email</label>
                <input
                  type="email"
                  name="identifier" // Changed to identifier
                  value={visitor.identifier}
                  onChange={handleChange}
                  placeholder="Enter your registered email"
                  className="w-full border-b-2 border-gray-300 focus:outline-none focus:border-orange-600 rounded-full px-4 py-2"
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="w-full bg-orange-600 text-white py-3 rounded-full mt-4"
              >
                Send OTP
              </button>
            </div>
            <hr />
            <div className="text-center ">
              <p className="py-4">OR</p>
              <hr />
              <br />
              <a className="text-orange-600" href="/login">
                Go Back to Login
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
