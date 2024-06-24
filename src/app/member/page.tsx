"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  const [members, setMembers] = useState([
    {
      userId: uuidv4(),
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
      table: 1,
      timeSlot: "6:00 pm to 7:00 pm",
    },
  ]);

  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [orderId, setOrderId] = useState("");

  useEffect(() => {
    setOrderId(uuidv4());
  }, []);

  const notify = (message: string) => toast(message);

  const handleMemberChange = (index: number, e: any) => {
    const { name, value } = e.target;
    const updatedMembers = [...members];
    // @ts-ignore
    updatedMembers[index][name] = value;
    setMembers(updatedMembers);
  };

  const handleAddMember = () => {
    setMembers([
      ...members,
      {
        userId: uuidv4(),
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
        table: 1,
        timeSlot: "6:00 pm to 7:00 pm",
      },
    ]);
  };

  const handleAgreeToTermsChange = (e: any) => {
    setAgreeToTerms(e.target.checked);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://akshar-gaming-zone-backend.vercel.app/member",
        {
          members,
          agreeToTerms,
          orderId,
        }
      );
      if (response.status === 200) {
        notify("Form submitted successfully!");
        // Reset form after successful submission if needed
        setMembers([
          {
            userId: uuidv4(),
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
            table: 1,
            timeSlot: "6:00 pm to 7:00 pm",
          },
        ]);
        setAgreeToTerms(false);
      } else {
        notify("Error submitting form!");
      }
    } catch (error) {
      notify("Something Went Wrong!");
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
            {members.map((member, index) => (
              <div key={index}>
                <h2 className="text-xl font-bold text-orange-600 mb-2">
                  {`Member ${index + 1}`}
                </h2>
                <div className="py-4">
                  <label className="block text-orange-600">Phone No.</label>
                  <input
                    type="text"
                    name="phoneNo"
                    value={member.phoneNo}
                    onChange={(e) => handleMemberChange(index, e)}
                    placeholder="Enter your mobile number"
                    className="w-full border-b-2 border-gray-300 focus:outline-none focus:border-orange-600 rounded-full px-4 py-2"
                  />
                </div>
                <div className="py-4">
                  <label className="block text-orange-600">Email ID</label>
                  <input
                    type="email"
                    name="emailId"
                    value={member.emailId}
                    onChange={(e) => handleMemberChange(index, e)}
                    placeholder="Enter your Email ID"
                    className="w-full border-b-2 border-gray-300 focus:outline-none focus:border-orange-600 rounded-full px-4 py-2"
                  />
                </div>
                <div className="py-4">
                  <label className="block text-orange-600">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={member.name}
                    onChange={(e) => handleMemberChange(index, e)}
                    placeholder="Enter your Name"
                    className="w-full border-b-2 border-gray-300 focus:outline-none focus:border-orange-600 rounded-full px-4 py-2"
                  />
                </div>
                <div className="py-4">
                  <label className="block text-orange-600">Address</label>
                  <input
                    type="text"
                    name="addressLine1"
                    value={member.addressLine1}
                    onChange={(e) => handleMemberChange(index, e)}
                    placeholder="Enter your Address line 1"
                    className="w-full border-b-2 border-gray-300 focus:outline-none focus:border-orange-600 rounded-full px-4 py-2"
                  />
                  <input
                    type="text"
                    name="addressLine2"
                    value={member.addressLine2}
                    onChange={(e) => handleMemberChange(index, e)}
                    placeholder="Enter your Address line 2"
                    className="w-full mt-2 border-b-2 border-gray-300 focus:outline-none focus:border-orange-600 rounded-full px-4 py-2"
                  />
                  <input
                    type="text"
                    name="addressLine3"
                    value={member.addressLine3}
                    onChange={(e) => handleMemberChange(index, e)}
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
                      value={member.dob}
                      onChange={(e) => handleMemberChange(index, e)}
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
                      value={member.anniversaryDate}
                      onChange={(e) => handleMemberChange(index, e)}
                      className="w-full border-b-2 border-gray-300 focus:outline-none focus:border-orange-600 rounded-full px-4 py-2"
                    />
                  </div>
                </div>
                <div className="py-4">
                  <label className="block text-orange-600">
                    Select the ID Proof
                  </label>
                  <select
                    name="idProof"
                    value={member.idProof}
                    onChange={(e) => handleMemberChange(index, e)}
                    className="w-full border-b-2 border-gray-300 focus:outline-none focus:border-orange-600 rounded-full px-4 py-2"
                  >
                    <option>Pan Card</option>
                    <option>Aadhar Card</option>
                    <option>Passport</option>
                    <option>Driver&apos;s License</option>
                  </select>
                </div>
                <div className="py-4">
                  <label className="block text-orange-600">
                    Enter ID number
                  </label>
                  <input
                    type="text"
                    name="idNumber"
                    value={member.idNumber}
                    onChange={(e) => handleMemberChange(index, e)}
                    placeholder="Enter your ID number"
                    className="w-full border-b-2 border-gray-300 focus:outline-none focus:border-orange-600 rounded-full px-4 py-2"
                  />
                </div>
                <div className="py-4">
                  <label className="block text-orange-600">Select Game</label>
                  <select
                    name="game"
                    value={member.game}
                    onChange={(e) => handleMemberChange(index, e)}
                    className="w-full border-b-2 border-gray-300 focus:outline-none focus:border-orange-600 rounded-full px-4 py-2"
                  >
                    <option>Carrom</option>
                    <option>Chess</option>
                    <option>Table Tennis</option>
                    <option>Badminton</option>
                  </select>
                </div>
                <div className="py-4">
                  <label className="block text-orange-600">Select Table</label>
                  <select
                    name="table"
                    value={member.table}
                    onChange={(e) => handleMemberChange(index, e)}
                    className="w-full border-b-2 border-gray-300 focus:outline-none focus:border-orange-600 rounded-full px-4 py-2"
                  >
                    <option>1</option>
                    <option>2</option>
                  </select>
                </div>
                <div className="py-4">
                  <label className="block text-orange-600">Time Slot</label>
                  <select
                    name="timeSlot"
                    value={member.timeSlot}
                    onChange={(e) => handleMemberChange(index, e)}
                    className="w-full border-b-2 border-gray-300 focus:outline-none focus:border-orange-600 rounded-full px-4 py-2"
                  >
                    <option>6:00 pm to 7:00 pm</option>
                    <option>7:00 pm to 8:00 pm</option>
                    <option>8:00 pm to 9:00 pm</option>
                  </select>
                </div>
              </div>
            ))}
            <div className="py-4">
              <button
                type="button"
                className="w-full bg-orange-600 text-white py-2 rounded-full mt-4"
                onClick={handleAddMember}
              >
                + Add Member
              </button>
            </div>
            <div className="mt-4">
              <div className="flex items-center mt-2">
                <input
                  type="checkbox"
                  name="agreeToTerms"
                  checked={agreeToTerms}
                  onChange={handleAgreeToTermsChange}
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
