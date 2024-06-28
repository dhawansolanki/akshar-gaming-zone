"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS
import { useRouter } from "next/navigation";
import { Circles } from "react-loader-spinner";

export default function Home() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
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

  const gameDetails = {
    "Air Hockey": { price: 100, quantity: 1 },
    "Table Tennis": { price: 100, quantity: 1 },
    Chess: { price: 100, quantity: 1 },
    Carrom: { price: 100, quantity: 1 },
    Pool: { price: 300, quantity: 1 },
    "Box Cricket": { price: 100, quantity: 1 },
    Ludo: { price: 100, quantity: 1 },
    "Snakes & Ladders": { price: 100, quantity: 1 },
  };

  const morningDiscounts = {
    "Air Hockey": 0.5,
    "Table Tennis": 0.5,
    Chess: 0.5,
    Carrom: 0.5,
    Pool: 0.5,
    "Box Cricket": 0.5,
    Ludo: 0.7,
    "Snakes & Ladders": 0.7,
  };

  const nightDiscounts = {
    "Air Hockey": 0.3,
    "Table Tennis": 0.3,
    Chess: 0.3,
    Carrom: 0.3,
    Pool: 0.3,
    "Box Cricket": 0.3,
    Ludo: 0.5,
    "Snakes & Ladders": 0.5,
  };

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
    date: "",
    game: "",
    startTime: "",
    endTime: "",
  };

  const gamePrices = {
    "Air Hockey": 100,
    "Box Cricket": 100,
    Carrom: 100,
    Chess: 100,
    Ludo: 100,
    Pool: 300,
    "Snakes & Ladders": 100,
    "Table Tennis": 100,
  };

  const [discount, setDiscount] = useState(0); // 50% discount

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

  // Function to check if the selected time slot is available
  const checkAvailability = async (game: string, startTime: string) => {
    try {
      const response = await axios.post(
        "https://api.aksharenterprise.net/visitor/check-availability",
        { game, startTime }
      );
      if (response.status === 200) {
        // Time slot is available, proceed with booking
        return true;
      } else {
        // Time slot is not available
        return false;
      }
    } catch (error) {
      console.error("Error checking availability:", error);
      return false;
    }
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    // Check availability for each visitor
    const availabilityPromises = visitors.map(async (visitor) => {
      const isAvailable = await checkAvailability(
        visitor.game,
        visitor.startTime
      );
      return isAvailable;
    });

    // Wait for all availability checks to complete
    const availabilities = await Promise.all(availabilityPromises);

    // If any time slot is not available, notify user and abort submission
    if (availabilities.some((available) => !available)) {
      // Handle case where time slot is not available
      alert(
        "Selected time slot is not available. Please choose a different time."
      );
      return;
    }
    setIsLoading(true);
    try {
      const response = await axios.post(
        "https://api.aksharenterprise.net/visitor",
        { visitors, agreeToTerms, orderId, totalPrice },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        notify("Form submitted successfully", "success");
        router.push(`/payment/${orderId}`, {});
        resetForm();
      } else {
        notify("Error submitting form", "error");
      }
    } catch (error) {
      notify("Error submitting form", "error");
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
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
        const { price, quantity } = gameDetails[visitor.game];
        const [startHour] = visitor.startTime.split(":").map(Number);

        let discount = 0;

        // Determine if the selected time is morning or night
        if (startHour >= 9 && startHour < 18) {
          // Morning
          // @ts-ignore
          discount = morningDiscounts[visitor.game];
          setDiscount(discount);
        } else {
          // Night
          // @ts-ignore
          discount = nightDiscounts[visitor.game];
          setDiscount(discount);
        }

        total += price * quantity * (1 - discount);
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
                  <label className="block text-orange-600">
                    Phone No.{index == 0 ? "*" : ""}{" "}
                  </label>
                  <input
                    type="text"
                    name="phoneNo"
                    value={visitor.phoneNo}
                    onChange={(e) => handleChange(index, e)}
                    placeholder="Enter your mobile number"
                    {...(index === 0 ? { required: true } : {})}
                    className="w-full border-b-2 border-gray-300 focus:outline-none focus:border-orange-600 rounded-full px-4 py-2"
                  />
                </div>
                <div className="py-4">
                  <label className="block text-orange-600">
                    Email ID {index == 0 ? "*" : ""}{" "}
                  </label>
                  <input
                    type="email"
                    name="emailId"
                    value={visitor.emailId}
                    onChange={(e) => handleChange(index, e)}
                    placeholder="Enter your Email ID"
                    {...(index === 0 ? { required: true } : {})}
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
                  <label className="block text-orange-600">
                    Address {index == 0 ? "*" : ""}{" "}
                  </label>
                  <input
                    type="text"
                    name="addressLine1"
                    value={visitor.addressLine1}
                    onChange={(e) => handleChange(index, e)}
                    placeholder="Enter your Address line 1"
                    {...(index === 0 ? { required: true } : {})}
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
                  <label className="block text-orange-600">
                    Visiting Date *
                  </label>
                  <input
                    type="date"
                    name="date"
                    id={`date-${index}`}
                    value={new Date().toISOString().split("T")[0]}
                    disabled
                    required
                    className="w-full border-b-2 border-gray-300 focus:outline-none focus:border-orange-600 rounded-full px-4 py-2"
                  />
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
            <div className="mt-4">
              <div className="flex items-center mt-12">
                <input
                  type="checkbox"
                  name="agreeToTerms"
                  checked={agreeToTerms}
                  onChange={handleCheckboxChange}
                  required
                  className="form-checkbox text-orange-600"
                />
              </div>
              <p className="text-gray-500 text-sm">
                I affirm that I have read and understood the rules of the game
                zone and agree to abide by them. I acknowledge the inherent
                risks involved in participating in activities within the game
                zone and release the management from any liability and No
                interchange between games and person is allowed. My health is
                good, and I agree to follow staff instructions.
              </p>
            </div>
            <div>
              <button
                type="submit"
                className="w-full bg-orange-600 text-white py-3 rounded-full mt-4"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex justify-center items-center">
                    <Circles color="#fff" height={20} width={20} />
                    <span className="ml-2">Processing...</span>
                  </div>
                ) : (
                  "Proceed to Payment"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
