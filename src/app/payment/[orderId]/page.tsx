"use client";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useEffect, useState } from "react";

interface OrderProps {
  params: { orderId: string };
}

interface ResponseData {
  totalPrice: number;
}

const Home: React.FC<OrderProps> = ({ params: { orderId } }) => {
  const [data, setData] = useState<ResponseData | null>(null);

  const handleOrder = async (orderId: string) => {
    try {
      const response = await axios.post<ResponseData>(
        `http://localhost:5050/visitor/payment/${orderId}`
      );
      setData(response.data);
    } catch (error) {
      console.error("Error fetching order data:", error);
    }
  };

  useEffect(() => {
    handleOrder(orderId);
  }, [orderId]);

  const amount = data?.totalPrice || 0;
  const gst = 0;
  const pricePayable = amount + gst;

  return (
    <div className="min-h-screen flex items-center justify-center bg-orange-600">
      <div className="p-8 rounded-lg shadow-lg max-w-sm w-full">
        <img
          src="/payment_qr.jpeg"
          alt="Payment QR Code"
          className="h-200 w-auto"
        />
        <br />
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-bold">Your Total</h1>
        </div>
        <div className="bg-white text-orange-600 p-4 rounded-lg mb-6">
          <div className="flex justify-between mb-2">
            <span className="font-medium">Amount</span>
            <span className="font-medium">{amount}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="font-medium">GST</span>
            <span className="font-medium">{gst}</span>
          </div>
          <div className="flex justify-between font-bold">
            <span>Total</span>
            <span>{pricePayable}</span>
          </div>
        </div>
        <h2 className="text-lg font-semibold mb-4">
          On Payment Verification you will receive tickets on your registered
          email or you will be contacted by our admin.
        </h2>
        {/* Uncomment and implement payment options if needed */}
        {/* <div className="space-y-4">
          <button className="w-full py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100">
            UPI/BHIM
          </button>
          <button className="w-full py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100">
            CREDIT/DEBIT CARD
          </button>
          <button className="w-full py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100">
            CASH
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default Home;
