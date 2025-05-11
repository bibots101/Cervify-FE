import React, { useState } from "react";
import Navbar from "../components/Navbar";
import PictureUploadModal from "../components/PictureUploadModal";
const FAQs = () => {
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
        style={{ backgroundImage: "url('./Model_Interf_bg.png')" }}
        >
        <Navbar onUploadClick={openModal}/>
        <div className="max-w-4xl mx-auto px-6 py-20 bg-white/60 backdrop-blur-md rounded-2xl mt-12 shadow-lg">
            <div className="flex items-center mb-8">
            <h1 className="text-4xl font-bold text-blue-700">Frequently Asked Questions</h1>
            </div>

            <div className="space-y-6">
            <details className="bg-white p-4 rounded-xl shadow-md">
                <summary className="font-semibold cursor-pointer text-blue-600">
                What is Cervify used for?
                </summary>
                <p className="mt-2 text-sm text-gray-700">
                Cervify is a diagnostic support tool designed to analyze Pap smear images and classify cervical cells using AI.
                </p>
            </details>

            <details className="bg-white p-4 rounded-xl shadow-md">
                <summary className="font-semibold cursor-pointer text-blue-600">
                Can I use images taken with a phone?
                </summary>
                <p className="mt-2 text-sm text-gray-700">
                Yes, Cervify supports both microscope and phone images, as long as they are taken at X40 objective magnification.
                </p>
            </details>

            <details className="bg-white p-4 rounded-xl shadow-md">
                <summary className="font-semibold cursor-pointer text-blue-600">
                What do the labels like NILM and HSIL mean?
                </summary>
                <p className="mt-2 text-sm text-gray-700">
                These are medical terms used in cervical cytology. For example, NILM means “Negative for Intraepithelial Lesion or Malignancy”, and HSIL means “High-grade Squamous Intraepithelial Lesion.”
                </p>
            </details>

            <details className="bg-white p-4 rounded-xl shadow-md">
                <summary className="font-semibold cursor-pointer text-blue-600">
                Who can use Cervify?
                </summary>
                <p className="mt-2 text-sm text-gray-700">
                Cervify is designed for use by pathologists, lab technicians, researchers, and medical professionals dealing with cervical cytology.
                </p>
            </details>

            <details className="bg-white p-4 rounded-xl shadow-md">
                <summary className="font-semibold cursor-pointer text-blue-600">
                Is my data stored?
                </summary>
                <p className="mt-2 text-sm text-gray-700">
                Yes, your past uploads and classification results are stored securely and are only accessible by your account.
                </p>
            </details>
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

export default FAQs;
