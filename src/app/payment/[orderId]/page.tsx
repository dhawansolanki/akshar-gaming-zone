"use client";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import React, { useEffect, useState } from "react";

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
  status?: string;
}

const Home: React.FC<OrderProps> = ({ params: { orderId } }) => {
  const [data, setData] = useState<ResponseData | null>(null);
  const [isPaymentSuccess, setIsPaymentSuccess] = useState(false);

  const notify = (message: string, type: string) => {
    if (type === "success") {
      toast.success(message);
    } else {
      toast.error(message);
    }
  };

  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        const response = await axios.post<ResponseData>(
          `https://api.aksharenterprise.net/visitor/payment/${orderId}`
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching order data:", error);
      }
    };
    fetchOrderData();
  }, [orderId]);

  const amount = data?.totalPrice || 0;
  const gst = 0;
  const pricePayable = amount + gst;

  const handlePaymentSuccess = async (response: any) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      response;
    try {
      const data = await axios.post(
        "https://api.aksharenterprise.net/visitor/payment/verify/update",
        { orderId, razorpay_order_id, razorpay_payment_id, razorpay_signature }
      );
      if (data.status == 200) {
        notify(data?.data?.message, "success");
        setIsPaymentSuccess(true);
      } else {
        notify("Payment Failed.", "error");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const createOrder = async (amount: number) => {
    try {
      const response = await axios.post(
        "https://api.aksharenterprise.net/razorpay/visitor/order/create",
        { amount }
      );
      return response.data;
    } catch (error) {
      console.log("Failed to create Razorpay order:", error);
      throw error; // Propagate error for handling
    }
  };

  const razorpayPayment = async () => {
    try {
      const orderDetails = await createOrder(pricePayable);
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
          handler: handlePaymentSuccess,
          prefill: {
            name: data?.name ?? "",
            email: data?.emailId ?? "",
            contact: data?.phoneNo ?? "",
          },
          notes: {
            orderId: data?.orderId ?? "",
            userId: data?.userId ?? "",
            addressLine1: data?.addressLine1 ?? "",
            addressLine2: data?.addressLine2 ?? "",
            addressLine3: data?.addressLine3 ?? "",
          },
          theme: { color: "#EF4823" },
        };
        const paymentObject = new (window as any).Razorpay(options);
        paymentObject.open();
      };
      document.body.appendChild(script);
    } catch (error) {
      console.log("Failed to initialize Razorpay:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-orange-600">
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
      <div className="p-8 rounded-lg shadow-lg max-w-sm w-full">
        <h1 className="text-xl text-center p-8">
          {isPaymentSuccess == true || data?.status === "PAID"
            ? ""
            : "Payment is Pending"}
        </h1>
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
          {isPaymentSuccess == true || data?.status === "PAID" ? (
            <button className="w-full py-2 bg-white border border-gray-300 rounded-lg text-[#336145] hover:bg-gray-100">
              PAID
            </button>
          ) : (
            <button
              onClick={razorpayPayment}
              className="w-full py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100"
            >
              Pay Now
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
