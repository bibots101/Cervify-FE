import React, { useState } from "react";
import Navbar from "../components/Navbar";
import PictureUploadModal from "../components/PictureUploadModal";

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pictureType, setPictureType] = useState(null);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleSelectType = (type) => {
    setPictureType(type);
    console.log("User selected:", type);
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col relative"
      style={{ backgroundImage: "url('./Backgound_style.png')" }}
    >
      <Navbar onUploadClick={openModal} />

      <div className="flex flex-1 items-center justify-center px-6">
        <div className="flex flex-col lg:flex-row items-center justify-between w-full max-w-[1200px] gap-16">
          <div className="text-center lg:text-left w-full lg:w-1/2">
            <img
              src="./Logo+caption.png"
              alt="Cervify logo"
              className="w-full max-w-[800px] h-auto mb-4"
            />
          </div>

          <div className="bg-white/30 backdrop-blur-md p-10 rounded-2xl border border-blue-400 shadow-xl w-full max-w-md text-center">
            <button
              onClick={openModal}
              className="px-8 py-4 text-lg text-white bg-blue-700 rounded-full font-semibold hover:bg-blue-800 hover:shadow-[0_0_12px_#3b82f6] transition w-full"
            >
              Upload photo
            </button>
            <p className="text-sm mt-4 italic text-gray-700">
              Make sure it is Obj x40 when uploading.
            </p>
          </div>
        </div>
      </div>

      <PictureUploadModal
        isOpen={isModalOpen}
        closeModal={closeModal}
        onSelectType={handleSelectType}
      />

      {pictureType && (
        <div className="absolute bottom-4 left-4 p-2 bg-white rounded shadow text-sm text-gray-800">
          Selected type: <span className="font-semibold">{pictureType}</span>
        </div>
      )}
    </div>
  );
};

export default Home;
