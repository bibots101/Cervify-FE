import React, { useState } from "react";
import Navbar from "../components/Navbar";
import PictureUploadModal from "../components/PictureUploadModal";
const About = () => {
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
            className="min-h-screen bg-cover bg-center text-gray-800 py-20"
            style={{ backgroundImage: "url('./Backgound_style.png')" }}
        >
        <Navbar onUploadClick={openModal}/>
        <div className="max-w-4xl mx-auto px-6 py-20 bg-white/60 backdrop-blur-md rounded-2xl shadow-lg">
            <div className="flex items-center mb-8">
                <h1 className="text-4xl font-bold text-blue-700">About</h1>
                <img
                    src="./Logo.png"
                    alt="Cervify Logo"
                    className="h-17 w-42 ml-4"
                />
            </div>

            <p className="mb-4 text-lg">
            <strong>Cervify</strong> is an intelligent diagnostic support tool designed to help healthcare professionals analyze <strong>Pap smear images</strong>. It leverages advanced deep learning models to detect and classify cervical cell types with visual feedback and confidence levels.
            </p>

            <p className="mb-4">
            Cervify streamlines the diagnosis workflow, reducing the manual workload for pathologists and improving early detection of cervical abnormalities. It is ideal for clinics, laboratories, and medical researchers.
            </p>

            <h2 className="text-2xl font-semibold mt-10 mb-3 text-purple-700">Technologies Used</h2>
            <ul className="list-disc ml-6 space-y-2 text-gray-700">
                <li>YOLOv11 for cervical cell segmentation</li>
                <li>DINOv2 + PCA for feature extraction</li>
                <li>SVM and MLP classifiers for layered diagnosis</li>
                <li>FastAPI & SQLite for backend & data handling</li>
                <li>React + TailwindCSS + Electron for the frontend & desktop integration</li>
            </ul>
            <p className="mt-10 text-center text-sm text-gray-600 italic">
                Made by <strong>Yasmin Chlif</strong> & <strong>Wassim Lourimi</strong>
            </p>
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

export default About;
