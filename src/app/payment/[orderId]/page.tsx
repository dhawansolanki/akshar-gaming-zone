"use client";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useEffect, useState } from "react";

interface OrderProps {
  params: { orderId: string };
}

interface ResponseData {
  totalPrice: number;
  name?: string;
  emailId?: string;
  phoneNo?: string;
  orderId?: string;
  userId?: string;
  addressLine1?: string;
  addressLine2?: string;
  addressLine3?: string;
}

const Home: React.FC<OrderProps> = ({ params: { orderId } }) => {
  const [data, setData] = useState<ResponseData | null>(null);

  const handleOrder = async (orderId: string) => {
    try {
      const response = await axios.post<ResponseData>(
        `https://api.aksharenterprise.net/visitor/payment/${orderId}`
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

  const razorpayPayment = async () => {
    const orderDetails = await createOrder(pricePayable);
    try {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      script.onload = () => {
        const options = {
          key: "rzp_test_BcUc1fkMKdXXBc",
          amount: pricePayable * 100, // in paisa
          currency: "INR",
          name: "Akshar Enterprise",
          order_id: orderDetails.orderId,
          description: "Akshar Game Zone",
          handler: function (response: any) {
            console.log(response);
          },
          prefill: {
            name: data?.name || "",
            email: data?.emailId || "",
            contact: data?.phoneNo || "",
          },
          notes: {
            orderId: data?.orderId || "",
            userId: data?.userId || "",
            addressLine1: data?.addressLine1 || "",
            addressLine2: data?.addressLine2 || "",
            addressLine3: data?.addressLine3 || "",
          },
          theme: {
            color: "#EF4823",
          },
        };
        const paymentObject = new (window as any).Razorpay(options);
        paymentObject.open();
      };
      document.body.appendChild(script);
    } catch (error) {
      console.log("Failed to Load Razorpay Script.");
    }
  };

  const createOrder = async (amount: number)=> {
    try{
      const response = await axios.post("httpS://api.aksharenterprise.net/razorpay/visitor/order/create", {
        amount: amount
      });
      return response.data;
    }catch(error){
      console.log(error);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-orange-600">
      <div className="p-8 rounded-lg shadow-lg max-w-sm w-full">
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
        <div className="space-y-4">
          <button
            onClick={razorpayPayment}
            className="w-full py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100"
          >
            Pay Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
