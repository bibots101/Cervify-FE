import React, { useEffect, useState } from "react";
import { TrashIcon } from "@heroicons/react/24/outline";
import { getHistory, deleteImage} from "../../services/api";

const ImageSelector = ({ onUploadClick }) => {
  const [images, setImages] = useState([]);
  const [fullHistory, setFullHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const username = localStorage.getItem("cervify_username");
  const currentImage = localStorage.getItem("cervify_uploaded_image");
  const [validImages, setValidImages] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      if (!username) return;

      try {
        const historyData = await getHistory(username);
        const uniquePaths = [
          ...new Set(historyData.history.map((item) => item.image_path)),
        ];
        setImages(uniquePaths);
        setFullHistory(historyData.history);
        setValidImages(uniquePaths);
      } catch (error) {
        console.error("Error fetching history:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [username]);

  const handleImageClick = (imagePath) => {
    const filename = imagePath.split("/").pop();
    const matchedPredictions = fullHistory.filter(
      (item) => item.image_path === imagePath
    );

    if (matchedPredictions.length > 0) {
      localStorage.setItem("cervify_uploaded_image", filename);
      localStorage.setItem("cervify_prediction", JSON.stringify(matchedPredictions));
      window.location.reload();
    }
  };
  const handleDelete = async (imagePath) => {
    const filename = imagePath.split("/").pop();
    try {
      if (!window.confirm("Are you sure you want to delete this image?")) return;
      await deleteImage(filename, username);
      setImages((prev) => prev.filter((img) => img !== imagePath));
      setValidImages((prev) => prev.filter((img) => img !== imagePath));

      localStorage.setItem("cervify_uploaded_image", null);
      localStorage.setItem("cervify_prediction", null);
      if (currentImage == filename) {
        let nextimg = validImages.filter((img) => img !== imagePath);
        if (nextimg.length > 0){
          handleImageClick(nextimg[0]);
        }
      }
      window.location.reload();

    } catch (err) {
      console.error("Failed to delete image:", err.message);
      alert("Failed to delete image.");
    }
  };
  return (
    <div className="bg-gray-50/20 backdrop-blur-lg shadow-lg p-4 rounded-xl">
      <div className="flex gap-6 justify-start items-center flex-wrap">
        <button
          onClick={onUploadClick}
          className="bg-transparent border-2 border-dashed border-purple-500 w-24 h-24 rounded-xl flex items-center justify-center text-purple-500 text-4xl hover:bg-blue-200 transition-colors duration-200"
        >
          +
        </button>

        {loading ? (
          <p className="text-gray-600 text-sm">Loading history...</p>
        ) : validImages.length > 0 ? (
          validImages.map((path, idx) => {
            const filename = path.split("/").pop();
            const imageUrl = `http://127.0.0.1:8000/get_image/${filename}?username=${username}`;
            
            return (
              <div key={idx} className="relative w-24 h-24 group">
                
                <img
                  src={imageUrl}
                  alt={`Upload ${idx}`}
                  onClick={() => handleImageClick(path)}
                  className="w-full h-full rounded-xl object-cover cursor-pointer hover:ring-4 hover:ring-blue-300 transition"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                    setValidImages((prev) => prev.filter((p) => p !== path));
                    console.warn(`Skipped corrupted/broken image: ${filename}`);
                  }}
                />
    
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(path);
                  }}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 text-xs opacity-80 hover:opacity-100"
                  title="Delete image"
                >
                  <TrashIcon 
                    className="h-6 w-6 text-white-500"
                    aria-hidden="true"
                  />
                </button>
              </div>
            );
          })
        ) : (
          <p className="text-gray-600 text-sm">No previous uploads found.</p>
        )}
      </div>
    </div>
  );
};

export default ImageSelector;
