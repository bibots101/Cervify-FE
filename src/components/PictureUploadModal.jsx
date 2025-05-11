import React, { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { DevicePhoneMobileIcon } from "@heroicons/react/24/outline";
import { Microscope } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ProgressLoadingScreen from "../assets/ProgressLoadingScreen";
import { useImageUpload } from "../hooks/useImageUpload";

const PictureUploadModal = ({ isOpen, closeModal, onSelectType }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [progressMessage, setProgressMessage] = useState("Initializing...");
  const [fadeOut, setFadeOut] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleUpload = useImageUpload({
    setLoading,
    setProgress,
    setMessage: setProgressMessage,
    setFadeOut,
    setErrorMessage,
    onPredictionComplete: (prediction, filename) => {
      localStorage.setItem("cervify_prediction", JSON.stringify(prediction));
      localStorage.setItem("cervify_uploaded_image", filename);
      navigate("/model");
      window.location.reload();
    },
  });

  if (loading) {
    return (
      <ProgressLoadingScreen
        progress={progress}
        message={progressMessage}
        fadeOut={fadeOut}
      />
    );
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title className="text-lg font-medium leading-6 text-gray-900">
                  Image Requirements
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    The image must be captured at X40Obj. Please select whether it's a phone or microscope image.
                  </p>
                </div>

                {errorMessage && (
                  <div className="mt-4 bg-red-100 text-red-700 text-sm p-2 rounded">
                    {errorMessage}
                  </div>
                )}

                <div className="mt-4 flex justify-around space-x-4">
                  <button
                    onClick={() => handleUpload("phone", onSelectType, closeModal)}
                    className="inline-flex items-center rounded-md bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none"
                  >
                    <DevicePhoneMobileIcon className="h-6 w-6 mr-2" />
                    Phone
                  </button>
                  <button
                    onClick={() => handleUpload("microscope", onSelectType, closeModal)}
                    className="inline-flex items-center rounded-md bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none"
                  >
                    <Microscope className="h-6 w-6 mr-2" />
                    Microscope
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default PictureUploadModal;
