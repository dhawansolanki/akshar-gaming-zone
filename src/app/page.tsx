import Image from "next/image";

export default function Home() {
  return (
    <>
      <div className="min-w-screen min-h-screen bg-gray-200 flex items-center justify-center px-5 py-5">
        <div
          className="bg-white text-gray-800 rounded-xl shadow-lg overflow-hidden relative flex"
          style={{ width: "100%;height:100%" }}
        >
          <div className="bg-white h-full w-full px-5 pt-6 pb-20 overflow-y-auto">
            <div className="mb-5">
              <img src="/home1.png" className="mx-auto" />

              <div className="text-center mb-3">
                <p className="text-sm text-gray-500 uppercase font-bold">
                  Welcome to
                </p>
                <h1 className="text-3xl font-bold">Akshar Game Zone</h1>
              </div>
            </div>
          </div>
          <div className="bg-white absolute bottom-0 w-full border-t border-gray-200 flex">
            <br />
            <a
              href="/member"
              className="flex flex-grow items-center justify-center p-2 text-indigo-500 hover:text-indigo-500"
            >
              <div className="text-center">
                <div className="rounded-full bg-indigo-500 text-white text-xs py-1 pl-2 pr-3 leading-none">
                  <i className="mdi mdi-fire text-base align-middle"></i>{" "}
                  <span className="align-middle">Member Form</span>
                </div>
              </div>
            </a>
            <a
              href="/visitor"
              className="flex flex-grow items-center justify-center p-2 text-gray-500 hover:text-indigo-500"
            >
              <div className="text-center">
                <div className="rounded-full bg-indigo-500 text-white text-xs py-1 pl-2 pr-3 leading-none">
                  <i className="mdi mdi-fire text-base align-middle"></i>{" "}
                  <span className="align-middle">Visitor Form</span>
                </div>
              </div>
            </a>
            <a
              href="/"
              className="flex flex-grow items-center justify-center p-2 text-gray-500 hover:text-indigo-500"
            >
              <div className="text-center">
                <div className="rounded-full bg-indigo-500 text-white text-xs py-1 pl-2 pr-3 leading-none">
                  <i className="mdi mdi-fire text-base align-middle"></i>{" "}
                  <span className="align-middle">Home Page</span>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
