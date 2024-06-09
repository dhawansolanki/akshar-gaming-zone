"use client";
import { useState } from "react";
import axios from "axios";
import { table } from "console";

export default function Home() {
  const [members, setMembers] = useState([
    {
      phoneNo: "",
      emailId: "",
      name: "",
      addressLine1: "",
      addressLine2: "",
      addressLine3: "",
      dob: "",
      anniversaryDate: "",
      game: "Carrom",
      table: 1,
    },
  ]);

  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const handleChange = (index: number, e: any) => {
    const { name, value } = e.target;
    const newMembers = [...members];
    newMembers[index] = {
      ...newMembers[index],
      [name]: value,
    };
    setMembers(newMembers);
  };

  const handleAddMember = () => {
    setMembers([
      ...members,
      {
        phoneNo: "",
        emailId: "",
        name: "",
        addressLine1: "",
        addressLine2: "",
        addressLine3: "",
        dob: "",
        anniversaryDate: "",
        game: "Carrom",
        table: 1,
      },
    ]);
  };

  const handleCheckboxChange = (e: any) => {
    setAgreeToTerms(e.target.checked);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      // Group visitors by their respective groups
      const groupedVisitors = members.map((member) => [member]);

      const response = await axios.post(
        "http://localhost:5050/visitor",
        { visitors: groupedVisitors, agreeToTerms }, // Send visitors grouped by their respective groups
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

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
            {members.map((member, index) => (
              <div key={index}>
                <h2 className="text-xl font-bold text-orange-600 mb-2">
                  {`Visitor ${index + 1}`}
                </h2>
                <div>
                  <label className="block text-orange-600">Phone No.</label>
                  <input
                    type="text"
                    name="phoneNo"
                    value={member.phoneNo}
                    onChange={(e) => handleChange(index, e)}
                    placeholder="Enter your mobile number"
                    className="w-full border-b-2 border-gray-300 focus:outline-none focus:border-orange-600"
                  />
                </div>
                <div>
                  <label className="block text-orange-600">Email ID</label>
                  <input
                    type="email"
                    name="emailId"
                    value={member.emailId}
                    onChange={(e) => handleChange(index, e)}
                    placeholder="Enter your Email ID"
                    className="w-full border-b-2 border-gray-300 focus:outline-none focus:border-orange-600"
                  />
                </div>
                <div>
                  <label className="block text-orange-600">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={member.name}
                    onChange={(e) => handleChange(index, e)}
                    placeholder="Enter your Name"
                    className="w-full border-b-2 border-gray-300 focus:outline-none focus:border-orange-600"
                  />
                </div>
                <div>
                  <label className="block text-orange-600">Address</label>
                  <input
                    type="text"
                    name="addressLine1"
                    value={member.addressLine1}
                    onChange={(e) => handleChange(index, e)}
                    placeholder="Enter your Address line 1"
                    className="w-full border-b-2 border-gray-300 focus:outline-none focus:border-orange-600"
                  />
                  <input
                    type="text"
                    name="addressLine2"
                    value={member.addressLine2}
                    onChange={(e) => handleChange(index, e)}
                    placeholder="Enter your Address line 2"
                    className="w-full mt-2 border-b-2 border-gray-300 focus:outline-none focus:border-orange-600"
                  />
                  <input
                    type="text"
                    name="addressLine3"
                    value={member.addressLine3}
                    onChange={(e) => handleChange(index, e)}
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
                      value={member.dob}
                      onChange={(e) => handleChange(index, e)}
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
                      value={member.anniversaryDate}
                      onChange={(e) => handleChange(index, e)}
                      className="w-full border-b-2 border-gray-300 focus:outline-none focus:border-orange-600"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-orange-600">Select Game</label>
                  <select
                    name="game"
                    value={member.game}
                    onChange={(e) => handleChange(index, e)}
                    className="w-full border-b-2 border-gray-300 focus:outline-none focus:border-orange-600"
                  >
                    <option>Carrom</option>
                    <option>Chess</option>
                    <option>Table Tennis</option>
                    <option>Badminton</option>
                  </select>
                </div>
                <div>
                  <label className="block text-orange-600">Select Table</label>
                  <select
                    name="table"
                    value={member.table}
                    onChange={(e) => handleChange(index, e)}
                    className="w-full border-b-2 border-gray-300 focus:outline-none focus:border-orange-600"
                  >
                    <option>1</option>
                    <option>2</option>
                  </select>
                </div>
              </div>
            ))}
            <div>
              <button
                type="button"
                onClick={handleAddMember}
                className="w-full bg-orange-600 text-white py-2 rounded-full mt-4"
              >
                + Add Visitor
              </button>
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
