"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export default function Home() {
  const router = useRouter();
  const initialMember = {
    userId: cookies.get("userId") || uuidv4(),
    phoneNo: "",
    emailId: "",
    name: "",
  };

  const [members, setMembers] = useState([]);
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  useEffect(() => {
    const userId = cookies.get("userId");
    const identifier = cookies.get("identifier");
    const token = cookies.get("token");
    if (!userId || !identifier || !token) {
      router.push("/login");
      return;
    }

    const fetchUserDetails = async () => {
      try {
        const userResponse = await axios.get(
          `https://api.aksharenterprise.net/user/${userId}`
        );
        const userData = userResponse.data;

        const childrenResponse = await axios.post(
          "https://api.aksharenterprise.net/member/group",
          {
            parentId: userId,
          }
        );
        const childMemberData = childrenResponse.data;

        const parentMember = {
          userId: userData.userId,
          phoneNo: userData.phoneNo,
          emailId: userData.emailId,
          name: userData.name,
          fetchedFromApi: true,
        };

        const childMembers = childMemberData.map((child: any) => ({
          userId: child.userId,
          phoneNo: child.phoneNo,
          emailId: child.emailId,
          name: child.name,
          fetchedFromApi: true,
        }));
        // @ts-ignore
        setMembers([parentMember, ...childMembers]);
      } catch (error) {
        console.error(
          "Error fetching user details or children members:",
          error
        );
      }
    };

    fetchUserDetails();
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
      // @ts-ignore
      ...members,
      // @ts-ignore
      {
        userId: uuidv4(),
        phoneNo: "",
        emailId: "",
        name: "",
        fetchedFromApi: false,
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
        "https://api.aksharenterprise.net/member",
        {
          members,
          agreeToTerms,
        }
      );
      if (response.status === 200) {
        notify("Form submitted successfully!");
        window.location.reload();
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
                    // @ts-ignore
                    value={member.phoneNo}
                    onChange={(e) => handleMemberChange(index, e)}
                    // @ts-ignore
                    readOnly={member.fetchedFromApi} // Make field readonly if fetched from API
                    placeholder="Enter your mobile number"
                    className="w-full border-b-2 border-gray-300 focus:outline-none focus:border-orange-600 rounded-full px-4 py-2"
                  />
                </div>
                <div className="py-4">
                  <label className="block text-orange-600">Email ID</label>
                  <input
                    type="email"
                    name="emailId"
                    // @ts-ignore
                    value={member.emailId}
                    onChange={(e) => handleMemberChange(index, e)}
                    // @ts-ignore
                    readOnly={member.fetchedFromApi} // Make field readonly if fetched from API
                    placeholder="Enter your Email ID"
                    className="w-full border-b-2 border-gray-300 focus:outline-none focus:border-orange-600 rounded-full px-4 py-2"
                  />
                </div>
                <div className="py-4">
                  <label className="block text-orange-600">Name</label>
                  <input
                    type="text"
                    name="name"
                    // @ts-ignore
                    value={member.name}
                    onChange={(e) => handleMemberChange(index, e)}
                    // @ts-ignore
                    readOnly={member.fetchedFromApi} // Make field readonly if fetched from API
                    placeholder="Enter your Name"
                    className="w-full border-b-2 border-gray-300 focus:outline-none focus:border-orange-600 rounded-full px-4 py-2"
                  />
                </div>
              </div>
            ))}
            <div className="py-4">
              <button
                type="button"
                className="w-full bg-orange-600 text-white py-2 rounded-full mt-4"
                onClick={handleAddMember}
              >
                + Add New Member
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
                Save Member
              </button>
            </div>
            <div>
              <button
                onClick={() => {
                  window.location.href = "/ticket";
                }}
                className="w-full bg-orange-600 text-white py-3 rounded-full mt-4"
              >
                Proceed to Ticket Counter
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
