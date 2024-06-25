"use client";
import { useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()
  const initialVisitor = {
    userId: uuidv4(),
    name: "",
    phoneNo: "",
    emailId: "",
    addressLine1: "",
    addressLine2: "",
    addressLine3: "",
    dob: "",
    anniversaryDate: "",
    password: "",
  };

  const [visitor, setVisitor] = useState(initialVisitor);
  const [agreeToTerms, setAgreeToTerms] = useState(false);

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

  const handleCheckboxChange = (e: any) => {
    setAgreeToTerms(e.target.checked);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://api.aksharenterprise.net/user/signup",
        {
          ...visitor
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        notify("Form submitted successfully", "success");
        resetForm();
        router.push('/login')
      } else {
        notify("Error submitting form", "error");
      }
    } catch (error) {
      //@ts-ignore
      const message = error?.response.data.error || "Something Went Wrong.";
      notify(message, "error");
      console.error("Error:", error);
    }
  };

  const resetForm = () => {
    setVisitor(initialVisitor);
    setAgreeToTerms(false);
  };

  return (
    <div className="min-w-screen min-h-screen bg-white flex items-center flex-col justify-between">
      <div className="bg-white text-gray-800 overflow-hidden relative flex-grow">
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
              <h2 className="text-xl font-bold text-orange-600 mb-2">Signup</h2>
              <div className="py-4">
                <label className="block text-orange-600">Name</label>
                <input
                  type="text"
                  name="name"
                  value={visitor.name}
                  onChange={handleChange}
                  placeholder="Enter your Name"
                  className="w-full border-b-2 border-gray-300 focus:outline-none focus:border-orange-600 rounded-full px-4 py-2"
                />
              </div>
              <div className="py-4">
                <label className="block text-orange-600">Phone No.</label>
                <input
                  type="text"
                  name="phoneNo"
                  value={visitor.phoneNo}
                  onChange={handleChange}
                  placeholder="Enter your mobile number"
                  className="w-full border-b-2 border-gray-300 focus:outline-none focus:border-orange-600 rounded-full px-4 py-2"
                />
              </div>
              <div className="py-4">
                <label className="block text-orange-600">Email ID</label>
                <input
                  type="email"
                  name="emailId"
                  value={visitor.emailId}
                  onChange={handleChange}
                  placeholder="Enter your Email ID"
                  className="w-full border-b-2 border-gray-300 focus:outline-none focus:border-orange-600 rounded-full px-4 py-2"
                />
              </div>
              <div className="py-4">
                <label className="block text-orange-600">Address</label>
                <input
                  type="text"
                  name="addressLine1"
                  value={visitor.addressLine1}
                  onChange={handleChange}
                  placeholder="Enter your Address line 1"
                  className="w-full border-b-2 border-gray-300 focus:outline-none focus:border-orange-600 rounded-full px-4 py-2"
                />
                <input
                  type="text"
                  name="addressLine2"
                  value={visitor.addressLine2}
                  onChange={handleChange}
                  placeholder="Enter your Address line 2"
                  className="w-full mt-2 border-b-2 border-gray-300 focus:outline-none focus:border-orange-600 rounded-full px-4 py-2"
                />
                <input
                  type="text"
                  name="addressLine3"
                  value={visitor.addressLine3}
                  onChange={handleChange}
                  placeholder="Enter your Address line 3"
                  className="w-full mt-2 border-b-2 border-gray-300 focus:outline-none focus:border-orange-600 rounded-full px-4 py-2"
                />
              </div>
              <div className="flex space-x-4">
                <div className="py-4">
                  <label className="block text-orange-600">DOB</label>
                  <input
                    type="date"
                    name="dob"
                    value={visitor.dob}
                    onChange={handleChange}
                    className="w-full border-b-2 border-gray-300 focus:outline-none focus:border-orange-600 rounded-full px-4 py-2"
                  />
                </div>
                <div className="py-4">
                  <label className="block text-orange-600">
                    Anniversary Date
                  </label>
                  <input
                    type="date"
                    name="anniversaryDate"
                    value={visitor.anniversaryDate}
                    onChange={handleChange}
                    className="w-full border-b-2 border-gray-300 focus:outline-none focus:border-orange-600 rounded-full px-4 py-2"
                  />
                </div>
              </div>
              <div className="py-4">
                <label className="block text-orange-600">Password</label>
                <input
                  type="password"
                  name="password"
                  value={visitor.password}
                  onChange={handleChange}
                  placeholder="Enter your Password"
                  className="w-full border-b-2 border-gray-300 focus:outline-none focus:border-orange-600 rounded-full px-4 py-2"
                />
              </div>
            </div>
            <div className="mt-4">
              <div className="flex items-center mt-12">
                <input
                  type="checkbox"
                  name="agreeToTerms"
                  checked={agreeToTerms}
                  onChange={handleCheckboxChange}
                  className="form-checkbox text-orange-600"
                />
              </div>
              <p className="text-gray-500 text-sm">
                I affirm that I have read and understood the rules of the game
                zone and agree to abide by them. I acknowledge the inherent
                risks involved in participating in activities within the game
                zone and release the management from any liability. My health is
                good, and I agree to follow staff instructions.
              </p>
            </div>
            <div>
              <a className="text-orange-600" href="/login">
                Already have an Account? Login
              </a>
              <button
                type="submit"
                className="w-full bg-orange-600 text-white py-3 rounded-full mt-4"
              >
                Create an Account
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
