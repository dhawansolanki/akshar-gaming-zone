import Image from "next/image";

export default function Home() {
  return (
      <div className="min-h-screen bg-white flex flex-col justify-between">
        <div className="bg-white text-gray-800 overflow-hidden relative flex-grow">
          <div className="bg-white w-full overflow-y-auto">
            <div className="mb-5">
              <img src="/home1.png" className="mx-auto" />
            </div>
          </div>
          <div className="text-center mb-12">
            <p className="text-sm text-[#97D1CF] uppercase font-bold">
              Welcome to
            </p>
            <h1 className="text-3xl text-[#EF4823] font-bold">
              Akshar Game Zone
            </h1>
          </div>
        </div>
        <div className="bg-white w-full flex items-start py-20">
          <div className="w-full flex">
            <a
              href="/member"
              className="flex-1 flex items-start justify-center p-2 text-indigo-500 hover:text-indigo-500"
            >
              <div className="text-center w-full">
                <div className="rounded-full w-full bg-[#FCB52D] text-black text-xs py-1 pl-2 pr-3 leading-none">
                  <i className="mdi mdi-fire text-base align-middle"></i>{" "}
                  <span className="align-middle">Member Form</span>
                </div>
              </div>
            </a>
            <a
              href="/visitor"
              className="flex-1 flex items-start justify-center p-2 text-gray-500 hover:text-indigo-500"
            >
              <div className="text-center w-full">
                <div className="rounded-full w-full bg-[#FCB52D] text-black text-xs py-1 pl-2 pr-3 leading-none">
                  <i className="mdi mdi-fire text-base align-middle"></i>{" "}
                  <span className="align-middle">Visitor Form</span>
                </div>
              </div>
            </a>
            <a
              href="/"
              className="flex-1 flex items-start justify-center p-2 text-gray-500 hover:text-indigo-500"
            >
              <div className="text-center w-full">
                <div className="rounded-full w-full bg-[#FCB52D] text-black text-xs py-1 pl-2 pr-3 leading-none">
                  <i className="mdi mdi-fire text-base align-middle"></i>{" "}
                  <span className="align-middle">Home Page</span>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
  );
}
