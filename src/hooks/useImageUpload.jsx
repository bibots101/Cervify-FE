import { useNavigate } from "react-router-dom";
import { predictImage, getPipelineProgress } from "../services/api";

export const useImageUpload = ({
  setLoading,
  setProgress,
  setMessage,
  setFadeOut,
  setErrorMessage,
  onPredictionComplete,
}) => {
  const navigate = useNavigate();

  const handleUpload = async (type, onSelectType, closeModal) => {
    try {
      if (onSelectType) onSelectType(type);
      if (closeModal) closeModal();

      const fileInput = document.createElement("input");
      fileInput.type = "file";
      fileInput.accept = "image/*";
      fileInput.click();

      fileInput.onchange = async () => {
        const file = fileInput.files[0];
        if (!file) return;
        const username = localStorage.getItem("cervify_username");
        const imageName = file.name.split(".").slice(0, -1).join(".");
        setLoading(true);
        setProgress(5);
        setMessage("Uploading image...");

        const predictionPromise = predictImage(file, username,type);

        const pollingInterval = setInterval(async () => {
          try {
            const data = await getPipelineProgress(`${imageName}.json`);
            setProgress(data.percentage);
            setMessage(data.status);
            if (data.percentage >= 100) clearInterval(pollingInterval);
          } catch (err) {
            console.error("Polling error:", err);
          }
        }, 1000);

        let predictionResult = null;
        try {
          predictionResult = await predictionPromise;
        } catch (error) {
          clearInterval(pollingInterval);
          setProgress(100);
          setMessage("Error during prediction.");
          setFadeOut(true);

          setTimeout(() => {
            setLoading(false);
            setFadeOut(false);
            setErrorMessage(error.message || "Prediction failed.");
          }, 1200);
          return;
        }

        clearInterval(pollingInterval);
        setProgress(100);
        setMessage("Finalizing...");

        setTimeout(() => {
          setFadeOut(true);
          setTimeout(() => {
            setLoading(false);
            setFadeOut(false);

            localStorage.setItem("cervify_prediction", JSON.stringify(predictionResult.prediction));
            localStorage.setItem("cervify_uploaded_image", file.name);

            if (onPredictionComplete) {
              onPredictionComplete(predictionResult.prediction, file.name);
            } else {
              navigate("/model");
              window.location.reload();

            }
          }, 1000);
        }, 500);
      };
    } catch (err) {
      const msg = "Something went wrong. Please try again. " + err.message;
      setErrorMessage(msg);
      alert(msg);
      setLoading(false);
    }
  };

  return handleUpload;
};
