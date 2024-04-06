import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const [className, setClassName] = useState("");
  const [classId, setClassId] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();
  const [classNameError, setClassNameError] = useState(false);

  const generateRandomCode = () => {
    return Math.random().toString(36).toUpperCase().substr(2, 8);
  };

  const joinRoom = async () => {
    navigate(`/class?classId=${classId}`);
  };

  const isFormValid = () => {
    return className !== "";
  };

  const handleCreateAndJoin = async () => {
    try {
      // Send a request to the server to join the class using the class identifier

      if (!isFormValid()) {
        setClassNameError(true);
        return;
      }
      const newClassId = await generateRandomCode();
      setClassId(newClassId);
      setShowModal(false);
      navigate(`/class?classId=${newClassId}`, { state: { className } });
    } catch (error) {
      console.error("Failed to join the class:", error);
    }
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(classId);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div>
      <div className="flex flex-col-reverse md:flex-row">
        <div className="w-full md:w-1/2 ">
          <div className="p-10 sm:pt-40">
            <div className="text-5xl font-bold text-green-600">
              Elevate your online learning experience to new heights!
            </div>
            <div className="pt-5 text-gray-700">
              Take your online learning to the next level with our dynamic
              platform. Elevate your skills, connect with experts, and achieve
              your goals faster than ever before.
            </div>

            <div className="mt-8 flex flex-col md:flex-row md:items-center">
              {true && (
                <button
                  onClick={() => setShowModal(true)}
                  className="bg-[#7D6EEB] text-white font-bold py-2 px-4 rounded mb-4 md:mb-0 md:mr-4"
                >
                  + Create Class
                </button>
              )}
              <div className="flex items-center">
                <input
                  type="text"
                  placeholder="Enter Code"
                  value={classId}
                  onChange={(e) => setClassId(e.target.value)}
                  className="p-2 border border-[#7D6EEB] focus:outline-none focus:border-[#7D6EEB] rounded mr-4 mb-4 md:mb-0 w-full md:w-auto"
                />
                <button
                  onClick={() => joinRoom()}
                  className={`${classId ? "text-[#7D6EEB]" : "text-[#D9D9D9]"}`}
                >
                  Join
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/2">
          <img
            src="https://res.cloudinary.com/duaruezxe/image/upload/v1712398277/classCast/pje96y0sams28wffijzv.png"
            alt="Description"
            className="w-full h-auto relative sm:-top-20"
          />
        </div>
      </div>

      {showModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-opacity-50 bg-black flex items-center justify-center">
          <div className="relative bg-white p-8 rounded shadow-lg w-96">
            <h2
              className="text-2xl font-bold mb-4"
              style={{ color: "#7D6EEB" }}
            >
              Create a Class
            </h2>
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-3 text-red-500"
            >
              x
            </button>

            <div className="mb-4">
              <input
                type="text"
                placeholder="Enter Class Name"
                value={className}
                required
                onFocus={() => {
                  if (className !== "") setClassNameError(false);
                }}
                onBlur={() => {
                  if (className === "") setClassNameError(true);
                }}
                onChange={(e) => {
                  if (classNameError && className !== "") {
                    setClassNameError(false);
                  }
                  setClassName(e.target.value);
                }}
                className={`p-1 border-b ${
                  classNameError ? "border-b-red-600" : "border-b-[#B4B4B4]"
                }  focus:outline-none focus:border-b-[#7D6EEB] w-full`}
              />

              {classNameError && (
                <span className=" text-red-600 text-sm">Required</span>
              )}
            </div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <span className="text-[#7D6EEB] mr-2">Code:</span>
                <span className="border p-2">{classId}</span>
                <button onClick={handleCopyToClipboard} className="ml-2">
                  {copied ? "Copied" : "📋"}
                </button>
              </div>
            </div>

            <button
              onClick={handleCreateAndJoin}
              className="bg-[#7D6EEB] text-white font-bold py-2 px-4 rounded"
            >
              Create & Join
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingPage;
