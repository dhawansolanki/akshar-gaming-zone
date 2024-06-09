"use client";
import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [formData, setFormData] = useState({
    phoneNo: "",
    emailId: "",
    name: "",
    addressLine1: "",
    addressLine2: "",
    addressLine3: "",
    dob: "",
    anniversaryDate: "",
    idProof: "Pan Card",
    idNumber: "",
    game: "Carrom",
    timeSlot: "6:00 pm to 7:00 pm",
    agreeToTerms: false,
  });

  const handleChange = (e:any) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5050/member", formData);
      if (response.status === 200) {
        console.log("Form submitted successfully");
      } else {
        console.log("Error submitting form");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="min-w-screen min-h-screen bg-white flex items-center flex-col justify-between">
      <div className="bg-white text-gray-800 overflow-hidden relative flex-grow">
        <div className="bg-white w-full overflow-y-auto">
          <div
            className="mb-5"
            style={{
              background: "url(/form2.png)",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right",
              backgroundPositionY: "0%",
            }}
          >
            <img src="/form1.png" className="w-100" />
          </div>
          <form className="space-y-4 px-5 pt-6 pb-20" onSubmit={handleSubmit}>
            <div>
              <label className="block text-orange-600">Phone No.</label>
              <input
                type="text"
                name="phoneNo"
                value={formData.phoneNo}
                onChange={handleChange}
                placeholder="Enter your mobile number"
                className="w-full border-b-2 border-gray-300 focus:outline-none focus:border-orange-600"
              />
            </div>
            <div>
              <label className="block text-orange-600">Email ID</label>
              <input
                type="email"
                name="emailId"
                value={formData.emailId}
                onChange={handleChange}
                placeholder="Enter your Email ID"
                className="w-full border-b-2 border-gray-300 focus:outline-none focus:border-orange-600"
              />
            </div>
            <div>
              <label className="block text-orange-600">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your Name"
                className="w-full border-b-2 border-gray-300 focus:outline-none focus:border-orange-600"
              />
            </div>
            <div>
              <label className="block text-orange-600">Address</label>
              <input
                type="text"
                name="addressLine1"
                value={formData.addressLine1}
                onChange={handleChange}
                placeholder="Enter your Address line 1"
                className="w-full border-b-2 border-gray-300 focus:outline-none focus:border-orange-600"
              />
              <input
                type="text"
                name="addressLine2"
                value={formData.addressLine2}
                onChange={handleChange}
                placeholder="Enter your Address line 2"
                className="w-full mt-2 border-b-2 border-gray-300 focus:outline-none focus:border-orange-600"
              />
              <input
                type="text"
                name="addressLine3"
                value={formData.addressLine3}
                onChange={handleChange}
                placeholder="Enter your Address line 3"
                className="w-full mt-2 border-b-2 border-gray-300 focus:outline-none focus:border-orange-600"
              />
            </div>
            <div className="flex space-x-4">
              <div>
                <label className="block text-orange-600">DOB</label>
                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  className="w-full border-b-2 border-gray-300 focus:outline-none focus:border-orange-600"
                />
              </div>
              <div>
                <label className="block text-orange-600">
                  Anniversary Date
                </label>
                <input
                  type="date"
                  name="anniversaryDate"
                  value={formData.anniversaryDate}
                  onChange={handleChange}
                  className="w-full border-b-2 border-gray-300 focus:outline-none focus:border-orange-600"
                />
              </div>
            </div>
            <div>
              <label className="block text-orange-600">Select the ID Proof</label>
              <select
                name="idProof"
                value={formData.idProof}
                onChange={handleChange}
                className="w-full border-b-2 border-gray-300 focus:outline-none focus:border-orange-600"
              >
                <option>Pan Card</option>
                <option>Aadhar Card</option>
                <option>Passport</option>
                <option>Driver's License</option>
              </select>
            </div>
            <div>
              <label className="block text-orange-600">Enter ID number</label>
              <input
                type="text"
                name="idNumber"
                value={formData.idNumber}
                onChange={handleChange}
                placeholder="Enter your ID number"
                className="w-full border-b-2 border-gray-300 focus:outline-none focus:border-orange-600"
              />
            </div>
            <div>
              <label className="block text-orange-600">Select Game</label>
              <select
                name="game"
                value={formData.game}
                onChange={handleChange}
                className="w-full border-b-2 border-gray-300 focus:outline-none focus:border-orange-600"
              >
                <option>Carrom</option>
                <option>Chess</option>
                <option>Table Tennis</option>
                <option>Badminton</option>
              </select>
            </div>
            <div>
              <label className="block text-orange-600">Time Slot</label>
              <select
                name="timeSlot"
                value={formData.timeSlot}
                onChange={handleChange}
                className="w-full border-b-2 border-gray-300 focus:outline-none focus:border-orange-600"
              >
                <option>6:00 pm to 7:00 pm</option>
                <option>7:00 pm to 8:00 pm</option>
                <option>8:00 pm to 9:00 pm</option>
              </select>
            </div>
            <div>
              <button
                type="button"
                className="w-full bg-orange-600 text-white py-2 rounded-full mt-4"
              >
                + Add Member
              </button>
            </div>
            <div className="mt-4">
              <div className="flex items-center mt-2">
                <input
                  type="checkbox"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleChange}
                  className="form-checkbox text-orange-600"
                />
              </div>
              <p className="text-gray-500 text-sm">
                I affirm that I have read and understood the rules of the game
                zone and agree to abide by them. I acknowledge the inherent
                risks involved in participating in activities within the game
                zone and release the management from any liability. My health
                is good, and I agree to follow staff instructions.
              </p>
            </div>
            <div>
              <button
                type="submit"
                className="w-full bg-orange-600 text-white py-3 rounded-full mt-4"
              >
                Proceed to Payment
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
