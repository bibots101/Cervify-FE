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
    };

    return (
        <div
            className="min-h-screen bg-cover bg-center text-gray-800 py-20"
            style={{ backgroundImage: "url('./Backgound_style.png')" }}
        >
        <Navbar onUploadClick={openModal}/>
        <div className="max-w-4xl mx-auto px-6 py-10 bg-white/60 backdrop-blur-md rounded-2xl shadow-lg">
            <div className="flex items-center justify-center mb-8">
                <h1 className="text-4xl font-bold text-blue-700">About</h1>
                <img
                    src="./Logo.png"
                    alt="Cervify Logo"
                    className="h-17 w-42 ml-4"
                />
            </div>

            <p className="mb-4 text-lg">
            <strong>Cervify</strong> is an AI-powered Computer-Aided Detection (CAD) system designed to help healthcare professionals analyze <strong>Cytology Slides from Pap Smear tests</strong>. It leverages a multi-stage machine learning pipeline and a clean, interactive user interface.
            </p>

            <h2 className="text-2xl font-semibold mt-10 mb-3 text-purple-700">Our Mission</h2>
            <p><strong>Cervify</strong> aims to:</p>
            <ul className="list-disc mt-1 ml-6 space-y-2 text-gray-700">
                <li>Accelerate early detection of cervical lesions and precancerous cells.</li>
                <li>Reduce diagnostic subjectivity.</li>
                <li>Support cytopathologists, especially in low-resource settings.</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-10 mb-3 text-blue-700">How It Works</h2>
            <p>The system processes medical images through several automated stages:</p>
            <ul className="list-decimal mt-1 ml-6 space-y-2 text-gray-700">
                <li>Image Upload & Secure Encryption</li>
                <li>Preprocessing</li>
                <li>Cell Segmentation</li>
                <li>Feature Extraction & Dimensionality Reduction</li>
                <li>Two-Stage Classification</li>
                <li>Interactive Visualization</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-10 mb-3 text-purple-700">Always Evolving</h2>
            <p>Cervify is a growing project with planned features including:</p>
            <ul className="list-disc mt-1 ml-6 space-y-2 text-gray-700">
                <li>Support for cell detection in video recordings.</li>
                <li>An embedded learning module for medical students.</li>
                <li>And a cloud-based API for hospital integrations.</li>
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
