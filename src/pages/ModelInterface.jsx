import React, { useState } from "react";
import Navbar from "../components/Navbar";
import ModelCanvas from "../components/ui/ModelCanvas";
import ResultPanel from "../components/ui/ResultPanel";
import ImageSelector from "../components/ui/ImageSelector";
import PictureUploadModal from "../components/PictureUploadModal";

const ModelInterface = () => {
  const [hoveredInfo, setHoveredInfo] = useState({ index: null, source: null });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pictureType, setPictureType] = useState(null);
  const [panTargetIndex, setPanTargetIndex] = useState(null);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const handleSelectType = (type) => setPictureType(type);

  return (
    <div
      className="h-screen w-screen flex flex-col overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: "url('./Model_Interf_bg.png')" }}
    >
      {/* Header/Navbar */}
      <header className="w-full h-16 z-20 flex-shrink-0">
        <Navbar onUploadClick={openModal} />
      </header>

      {/* Main layout */}
      <main className="flex-1 flex flex-col px-4 md:px-8 pt-4 pb-4 z-10 overflow-hidden min-h-0">
        {/* Canvas + Results */}
        <div className="flex flex-col lg:flex-row gap-4 items-start justify-center w-full h-full overflow-hidden">
          {/* Canvas Area */}
          <div className="flex-grow w-full h-[70vh] lg:h-full max-w-full overflow-hidden z-10">
            <ModelCanvas
              hoveredInfo={hoveredInfo}
              setHoveredInfo={setHoveredInfo}
              panTargetIndex={panTargetIndex}
            />
          </div>

          {/* Result Panel */}
          <div className="w-full lg:w-[25vw] flex-shrink-0 h-[70vh] lg:h-full overflow-hidden">
            <div className="bg-gray-50/20 backdrop-blur-lg shadow-lg p-2 rounded-2xl ring-2 ring-blue-300 bg-gradient-to-r from-gray-100 to-blue-50 h-full overflow-auto">
              <ResultPanel
                hoveredInfo={hoveredInfo}
                setHoveredInfo={setHoveredInfo}
                setPanTargetIndex={setPanTargetIndex}
              />
            </div>
          </div>
        </div>

        {/* Image Selector */}
        <div className="mt-2 flex-shrink-0">
          <ImageSelector onUploadClick={openModal} />
        </div>
      </main>

      {/* Upload Modal */}
      <PictureUploadModal
        isOpen={isModalOpen}
        closeModal={closeModal}
        onSelectType={handleSelectType}
      />

      {/* Selected Type Banner */}
      {pictureType && (
        <div className="absolute bottom-4 left-4 p-2 bg-white rounded shadow">
          <p className="text-sm text-gray-800">
            Selected type: <span className="font-semibold">{pictureType}</span>
          </p>
        </div>
      )}
    </div>
  );
};

export default ModelInterface;
