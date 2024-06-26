"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS

export default function Home() {
  const gameOptions = [
    { name: "Air Hockey", duration: 15 },
    { name: "Box Cricket", duration: 20 },
    { name: "Carrom", duration: 60 },
    { name: "Chess", duration: 60 },
    { name: "Ludo", duration: 60 },
    { name: "Pool", duration: 60 },
    { name: "Snakes & Ladders", duration: 60 },
    { name: "Table Tennis", duration: 60 },
  ];

  const initialVisitor = {
    userId: uuidv4(),
    phoneNo: "",
    emailId: "",
    name: "",
    addressLine1: "",
    addressLine2: "",
    addressLine3: "",
    dob: "",
    anniversaryDate: "",
    game: "",
    startTime: "",
    endTime: "",
  };

  const gamePrices = {
    "Air Hockey": 100,
    "Box Cricket": 200,
    Carrom: 50,
    Chess: 75,
    Ludo: 30,
    Pool: 150,
    "Snakes & Ladders": 40,
    "Table Tennis": 100,
  };

  const discount = 0.5; // 50% discount

  const [visitors, setVisitors] = useState([initialVisitor]);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    setOrderId(uuidv4());
    const today = new Date().toISOString().split("T")[0];
    visitors.forEach((visitor, index) => {
      //@ts-ignore
      document.getElementById(`dob-${index}`).setAttribute("max", today);
      //@ts-ignore
      document
        .getElementById(`anniversaryDate-${index}`)
        .setAttribute("max", today);
    });
  }, [visitors]);

  useEffect(() => {
    calculateTotalPrice();
  }, [visitors]);

  const notify = (message: string, type: string) => {
    if (type === "success") {
      toast.success(message);
    } else {
      toast.error(message);
    }
  };

  const handleChange = (index: number, e: any) => {
    const { name, value } = e.target;
    let newEndTime = visitors[index].endTime;

    if (name === "startTime") {
      const gameName = visitors[index].game;
      const selectedGame = gameOptions.find((game) => game.name === gameName);

      if (selectedGame) {
        const durationInMinutes = selectedGame.duration;
        const [hours, minutes] = value.split(":").map(Number);

        // Calculate end time
        const endTimeHours =
          hours + Math.floor((minutes + durationInMinutes) / 60);
        const endTimeMinutes = (minutes + durationInMinutes) % 60;

        // Format end time
        newEndTime = `${String(endTimeHours).padStart(2, "0")}:${String(
          endTimeMinutes
        ).padStart(2, "0")}`;
      }
    }

    const newVisitors = [...visitors];
    newVisitors[index] = {
      ...newVisitors[index],
      [name]: value,
      endTime: newEndTime,
    };

    setVisitors(newVisitors);
  };

  const handleAddVisitor = () => {
    setVisitors([...visitors, { ...initialVisitor, userId: uuidv4() }]);
  };

  const handleCheckboxChange = (e: any) => {
    setAgreeToTerms(e.target.checked);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://api.aksharenterprise.net/visitor",
        { visitors, agreeToTerms, orderId },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        notify("Form submitted successfully", "success");
        resetForm();
      } else {
        notify("Error submitting form", "error");
      }
    } catch (error) {
      notify("Error submitting form", "error");
      console.error("Error:", error);
    }
  };

  const resetForm = () => {
    setVisitors([initialVisitor]);
    setAgreeToTerms(false);
    setOrderId(uuidv4());
  };

  const calculateTotalPrice = () => {
    let total = 0;
    visitors.forEach((visitor) => {
      if (visitor.game) {
        // @ts-ignore
        total += gamePrices[visitor.game] * (1 - discount);
      }
    });
    setTotalPrice(total);
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
            {visitors.map((visitor, index) => (
              <div key={index}>
                <h2 className="text-xl font-bold text-orange-600 mb-2">
                  {`Visitor ${index + 1}`}
                </h2>
                <div className="py-4">
                  <label className="block text-orange-600">Phone No. *</label>
                  <input
                    type="text"
                    name="phoneNo"
                    value={visitor.phoneNo}
                    onChange={(e) => handleChange(index, e)}
                    placeholder="Enter your mobile number"
                    required
                    className="w-full border-b-2 border-gray-300 focus:outline-none focus:border-orange-600 rounded-full px-4 py-2"
                  />
                </div>
                <div className="py-4">
                  <label className="block text-orange-600">Email ID *</label>
                  <input
                    type="email"
                    name="emailId"
                    value={visitor.emailId}
                    onChange={(e) => handleChange(index, e)}
                    placeholder="Enter your Email ID"
                    required
                    className="w-full border-b-2 border-gray-300 focus:outline-none focus:border-orange-600 rounded-full px-4 py-2"
                  />
                </div>
                <div className="py-4">
                  <label className="block text-orange-600">Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={visitor.name}
                    onChange={(e) => handleChange(index, e)}
                    placeholder="Enter your Name"
                    required
                    className="w-full border-b-2 border-gray-300 focus:outline-none focus:border-orange-600 rounded-full px-4 py-2"
                  />
                </div>
                <div className="py-4">
                  <label className="block text-orange-600">Address *</label>
                  <input
                    type="text"
                    name="addressLine1"
                    value={visitor.addressLine1}
                    onChange={(e) => handleChange(index, e)}
                    placeholder="Enter your Address line 1"
                    required
                    className="w-full border-b-2 border-gray-300 focus:outline-none focus:border-orange-600 rounded-full px-4 py-2"
                  />
                  <input
                    type="text"
                    name="addressLine2"
                    value={visitor.addressLine2}
                    onChange={(e) => handleChange(index, e)}
                    placeholder="Enter your Address line 2"
                    className="w-full mt-2 border-b-2 border-gray-300 focus:outline-none focus:border-orange-600 rounded-full px-4 py-2"
                  />
                  <input
                    type="text"
                    name="addressLine3"
                    value={visitor.addressLine3}
                    onChange={(e) => handleChange(index, e)}
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
                      id={`dob-${index}`}
                      value={visitor.dob}
                      onChange={(e) => handleChange(index, e)}
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
                      id={`anniversaryDate-${index}`}
                      value={visitor.anniversaryDate}
                      onChange={(e) => handleChange(index, e)}
                      className="w-full border-b-2 border-gray-300 focus:outline-none focus:border-orange-600 rounded-full px-4 py-2"
                    />
                  </div>
                </div>
                <div className="py-4">
                  <label className="block text-orange-600">Select Game *</label>
                  <select
                    name="game"
                    value={visitor.game}
                    onChange={(e) => handleChange(index, e)}
                    required
                    className="w-full border-b-2 border-gray-300 focus:outline-none focus:border-orange-600 rounded-full px-4 py-2"
                  >
                    <option value="">Select a Game</option>
                    {gameOptions.map((option, idx) => (
                      <option key={idx} value={option.name}>
                        {option.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="py-4">
                  <label className="block text-orange-600">Start Time *</label>
                  <input
                    type="time"
                    name="startTime"
                    value={visitor.startTime}
                    onChange={(e) => handleChange(index, e)}
                    required
                    className="w-full border-b-2 border-gray-300 focus:outline-none focus:border-orange-600 rounded-full px-4 py-2"
                  />
                </div>
                <div className="py-4">
                  <label className="block text-orange-600">End Time</label>
                  <input
                    type="time"
                    name="endTime"
                    value={visitor.endTime}
                    readOnly // Prevent user input
                    className="w-full border-b-2 border-gray-300 focus:outline-none focus:border-orange-600 rounded-full px-4 py-2"
                  />
                </div>
              </div>
            ))}
            <div>
              <button
                type="button"
                onClick={handleAddVisitor}
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
            <div className="my-8">
              <h2 className="text-xl font-bold text-orange-600 mb-4">
                Your Total
              </h2>
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr>
                    <th className="border-b-2 border-orange-600 pb-2">Game</th>
                    <th className="border-b-2 border-orange-600 pb-2">Price</th>
                    <th className="border-b-2 border-orange-600 pb-2">
                      Discount
                    </th>
                    <th className="border-b-2 border-orange-600 pb-2">
                      Player
                    </th>
                    <th className="border-b-2 border-orange-600 pb-2">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {visitors.map(
                    (visitor, index) =>
                      visitor.game && (
                        <tr key={index}>
                          <td className="py-2">{visitor.game}</td>
                          <td className="py-2">
                            {
                              // @ts-ignore
                              gamePrices[visitor.game]
                            }
                          </td>
                          <td className="py-2">{discount * 100}%</td>
                          <td className="py-2">1</td>
                          <td className="py-2">
                            {
                              // @ts-ignore
                              gamePrices[visitor.game] * (1 - discount)
                            }
                          </td>
                        </tr>
                      )
                  )}
                  <tr>
                    <td colSpan={4} className="text-right font-bold py-2">
                      Payable amount
                    </td>
                    <td className="py-2">{totalPrice}</td>
                  </tr>
                </tbody>
              </table>
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
