import Image from "next/image";

export default function Home() {
  return (
    <div className="min-w-screen min-h-screen bg-white flex items-center flex-col justify-between">
    <div className="bg-white text-gray-800 overflow-hidden relative flex-grow">
      <div className="bg-white w-full overflow-y-auto">
            <div className="mb-5" style={{"background":"url(/member2.png)", "backgroundRepeat":"no-repeat", backgroundPosition:"right", backgroundPositionY:"0%"}}>
              <img src="/member1.png" className="w-100" />
            </div>
            <form className="space-y-4 px-5 pt-6 pb-20" >
              <div>
                <label className="block text-orange-600">Phone No.</label>
                <input type="text" placeholder="Enter your mobile number" className="w-full border-b-2 border-gray-300 focus:outline-none focus:border-orange-600" />
              </div>
              <div>
                <label className="block text-orange-600">Email ID</label>
                <input type="email" placeholder="Enter your Email ID" className="w-full border-b-2 border-gray-300 focus:outline-none focus:border-orange-600" />
              </div>
              <div>
                <label className="block text-orange-600">Name</label>
                <input type="text" placeholder="Enter your Name" className="w-full border-b-2 border-gray-300 focus:outline-none focus:border-orange-600" />
              </div>
              <div>
                <label className="block text-orange-600">Address</label>
                <input type="text" placeholder="Enter your Address line 1" className="w-full border-b-2 border-gray-300 focus:outline-none focus:border-orange-600" />
                <input type="text" placeholder="Enter your Address line 2" className="w-full mt-2 border-b-2 border-gray-300 focus:outline-none focus:border-orange-600" />
                <input type="text" placeholder="Enter your Address line 3" className="w-full mt-2 border-b-2 border-gray-300 focus:outline-none focus:border-orange-600" />
              </div>
              <div className="flex space-x-4">
                <div>
                  <label className="block text-orange-600">DOB</label>
                  <input type="date" placeholder="Enter your DOB" className="w-full border-b-2 border-gray-300 focus:outline-none focus:border-orange-600" />
                </div>
                <div>
                  <label className="block text-orange-600">Anniversary Date</label>
                  <input type="date" placeholder="Enter your Anniversary date" className="w-full border-b-2 border-gray-300 focus:outline-none focus:border-orange-600" />
                </div>
              </div>
              <div>
                <label className="block text-orange-600">Select Game</label>
                <select className="w-full border-b-2 border-gray-300 focus:outline-none focus:border-orange-600">
                  <option>Carrom</option>
                  <option>Chess</option>
                  <option>Table Tennis</option>
                  <option>Badminton</option>
                </select>
              </div>
              <div>
                <button type="button" className="w-full bg-orange-600 text-white py-2 rounded-full mt-4">+ Add Member</button>
              </div>
              <div className="mt-4">
                <div className="flex items-center mt-2">
                  <input type="checkbox" className="form-checkbox text-orange-600" />
                </div>
                <p className="text-gray-500 text-sm">
                  I affirm that I have read and understood the rules of the game zone and agree to abide by them.
                  I acknowledge the inherent risks involved in participating in activities within the game zone and release the management from any liability.
                  My health is good, and I agree to follow staff instructions.
                </p>
              </div>
              <div>
                <button type="submit" className="w-full bg-orange-600 text-white py-3 rounded-full mt-4">Proceed to Payment</button>
              </div>
            </form>
          </div>
        </div>
      </div>
  );
}
