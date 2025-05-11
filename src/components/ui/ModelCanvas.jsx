import React, {
  useEffect,
  useRef,
  useState,
} from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import jsPDF from "jspdf";

const ModelCanvas = ({ hoveredInfo, setHoveredInfo,panTargetIndex }) => {
  const [predictions, setPredictions] = useState([]);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [originalSize, setOriginalSize] = useState({ width: 1, height: 1 });
  const [showBoxes, setShowBoxes] = useState(true);
  
  const username = localStorage.getItem("cervify_username");
  const canvasHoverTriggeredRef = useRef(false);
  const canvasRef = useRef(null);
  const imageRef = useRef(null);
  const transformRef = useRef();
  const hoveredIndex = hoveredInfo?.index;
  const hoverSource = hoveredInfo?.source;

  const wrapperRef = useRef(null);
  const transformApiRef = useRef(null);

  const handleInit = (api) => {
    transformApiRef.current = api;
    transformRef.current = api;
  };


  useEffect(() => {
    const predictionData = JSON.parse(localStorage.getItem("cervify_prediction"));
    const imageFilename = localStorage.getItem("cervify_uploaded_image");
    if (Array.isArray(predictionData) && imageFilename) {
      setPredictions(predictionData);
      setUploadedImage(`http://127.0.0.1:8000/get_image/${imageFilename}?username=${username}`);
    }
  }, []);

  useEffect(() => {
    if (!uploadedImage) return;

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = uploadedImage;

    img.onload = () => {
      imageRef.current = img;
      setOriginalSize({ width: img.width, height: img.height });
      setTimeout(fitImageToCanvas, 50);
    };
  }, [uploadedImage]);

  useEffect(() => {
    const drawCanvas = () => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      const img = imageRef.current;
      if (!canvas || !ctx || !img) return;

      canvas.width = img.width;
      canvas.height = img.height;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      if (!showBoxes) return;

      predictions.forEach((pred, index) => {
        const { x1, y1, x2, y2, label } = pred;
        const isHovered = hoveredIndex === index;

        ctx.fillStyle = isHovered
          ? "rgba(255, 255, 0, 0.05)"
          : label.toLowerCase() === "nilm"
          ? "rgba(128, 128, 128, 0.05)"
          : "rgba(255, 0, 0, 0.05)";

        ctx.strokeStyle = isHovered
          ? "yellow"
          : label.toLowerCase() === "nilm"
          ? "rgba(71, 71, 71, 0.5)"
          : "red";

        ctx.lineWidth = isHovered ? 12 : 8;
        const width = x2 - x1;
        const height = y2 - y1;

        ctx.fillRect(x1, y1, width, height);
        ctx.beginPath();
        ctx.rect(x1, y1, width, height);
        ctx.stroke();
      }
    );
    };

    if (canvasRef.current && imageRef.current) {
      drawCanvas();
    }
  }, [predictions, hoveredIndex, originalSize, showBoxes, hoveredInfo?.index]);

  useEffect(() => {
    if (hoveredIndex !== null && hoverSource === "canvas") {
      const element = document.getElementById(`prediction-${hoveredInfo.index}`);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
        element.classList.add("ring-4", "ring-yellow-400", "bg-yellow-100");
        setTimeout(() => {
          element.classList.remove("ring-4", "ring-yellow-400", "bg-yellow-100");
        }, 1000);
      }
      canvasHoverTriggeredRef.current = false;
    }
  }, [hoverSource, hoveredIndex, hoveredInfo.index]);

useEffect(() => {
  if (panTargetIndex === null) return;

  const api = transformApiRef.current;
  const wrapper = wrapperRef.current;
  const pred = predictions[panTargetIndex];
  const canvas = canvasRef.current;

  if (!api || !pred || !canvas || !wrapper) return;

  const { x1, y1, x2, y2 } = pred;
  const centerX = (x1 + x2) / 2;
  const centerY = (y1 + y2) / 2;

  const wrapperWidth = wrapper.offsetWidth;
  const wrapperHeight = wrapper.offsetHeight;

  const boxWidth = x2 - x1;
  const boxHeight = y2 - y1;
  const scaleX = wrapperWidth / boxWidth;
  const scaleY = wrapperHeight / boxHeight;
  const zoomScale = Math.min(scaleX, scaleY) * 0.9;


  // Offset to center the target point in the viewport
  const offsetX = -(centerX * zoomScale - wrapperWidth / 2);
  const offsetY = -(centerY * zoomScale - wrapperHeight / 2);

  api.setTransform(offsetX, offsetY, zoomScale, 400);
}, [panTargetIndex, predictions, originalSize]);

  const handleMouseMove = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const scaleX = originalSize.width / rect.width;
    const scaleY = originalSize.height / rect.height;
    const mouseX = (e.clientX - rect.left) * scaleX;
    const mouseY = (e.clientY - rect.top) * scaleY;

    let found = false;
    for (let i = 0; i < predictions.length; i++) {
      const { x1, y1, x2, y2 } = predictions[i];
      if (mouseX >= x1 && mouseX <= x2 && mouseY >= y1 && mouseY <= y2) {
        if (hoveredIndex !== i) {
          canvasHoverTriggeredRef.current = true;
          setHoveredInfo({ index: i, source: "canvas" });
        }
        found = true;
        break;
      }
    }

    if (!found && hoveredIndex !== null) {
      canvasHoverTriggeredRef.current = false;
      setHoveredInfo({ index: null, source: "canvas" });
    }
  };

  const handleMouseLeave = () => {
    canvasHoverTriggeredRef.current = false;
    setHoveredInfo({ index: null, source: "canvas" });

  };

const handleDownloadPDF = async () => {
    const img = imageRef.current;
    const fullCanvas = document.createElement("canvas");
    fullCanvas.width = img.naturalWidth || img.width;
    fullCanvas.height = img.naturalHeight || img.height;

    const fullCtx = fullCanvas.getContext("2d");
    fullCtx.drawImage(img, 0, 0, fullCanvas.width, fullCanvas.height);
    const imgData = fullCanvas.toDataURL("image/jpeg", 1.0);

    const logoImg = await new Promise((resolve) => {
      const logo = new Image();
      logo.src = "./Logo.png";
      logo.onload = () => resolve(logo);
    });

    const username = localStorage.getItem("cervify_username") || "Unknown User";
    const now = new Date();
    const formattedDate = now.toLocaleString("fr-FR").replace(",", " -");

    const pdf = new jsPDF("p", "px", "a4");
    const pageWidth = pdf.internal.pageSize.getWidth();
    let y = 30;

    pdf.addImage(logoImg, "PNG", 20, 10, 89, 37);
    pdf.setFontSize(12);
    pdf.text(`User: ${username}`, pageWidth - 180, y);
    pdf.text(`Downloaded on: ${formattedDate}`, pageWidth - 180, y + 15);

    const fixedImgWidth = 250;
    const fixedImgHeight = 250;
    const imgX = (pageWidth - fixedImgWidth) / 2;

    y += 50;
    pdf.addImage(imgData, "JPEG", imgX, y, fixedImgWidth, fixedImgHeight);
    y += fixedImgHeight + 30;

    pdf.setFontSize(10);
    pdf.setFillColor(220, 220, 220);
    pdf.rect(20, y, pageWidth - 40, 20, "F");
    pdf.text("Cropped", 25, y + 14);
    pdf.text("Label", 120, y + 14);
    pdf.text("Confidence", 220, y + 14);
    y += 25;

    for (let i = 0; i < predictions.length; i++) {
      const { x1, y1: ytop, x2, y2, label, confidence } = predictions[i];
      const width = x2 - x1;
      const height = y2 - ytop;

      const cropCanvas = document.createElement("canvas");
      cropCanvas.width = width;
      cropCanvas.height = height;
      const cropCtx = cropCanvas.getContext("2d");
      cropCtx.drawImage(img, x1, ytop, width, height, 0, 0, width, height);
      const cropDataUrl = cropCanvas.toDataURL("image/jpeg", 1.0);

      const rowHeight = 65;
      const bottomMargin = 40;
      const pageHeight = pdf.internal.pageSize.getHeight();

      if (y + rowHeight + bottomMargin > pageHeight) {
        pdf.addPage();
        y = 30;

        pdf.setFontSize(10);
        pdf.setFillColor(220, 220, 220);
        pdf.rect(20, y, pageWidth - 40, 20, "F");
        pdf.text("Cropped", 25, y + 14);
        pdf.text("Label", 120, y + 14);
        pdf.text("Confidence", 220, y + 14);
        y += 25;
      }

      const bgColor = i % 2 === 0 ? [255, 255, 255] : [240, 240, 240];
      pdf.setFillColor(...bgColor);
      pdf.rect(20, y, pageWidth - 40, 60, "F");

      pdf.addImage(cropDataUrl, "JPEG", 25, y + 5, 60, 50);
      pdf.text(`${label}`, 120, y + 30);
      pdf.text(`${(confidence * 100).toFixed(2)}%`, 220, y + 30);
      y += 65;
    }

    const safeDate = formattedDate.replace(/[/:]/g, "-");
    const filename = `Cervify_Report_${safeDate}.pdf`;

    if (window.electronAPI?.savePdfWithDialog) {
      window.electronAPI.savePdfWithDialog(pdf.output("datauristring"));
    } else {
      pdf.save(filename);
    }
  };

  const fitImageToCanvas = () => {
    const api = transformApiRef.current;
    const wrapper = wrapperRef.current;
    const img = imageRef.current;

    if (!api || !wrapper || !img) return;

    const wrapperWidth = wrapper.offsetWidth;
    const wrapperHeight = wrapper.offsetHeight;

    const scaleX = wrapperWidth / img.width;
    const scaleY = wrapperHeight / img.height;

    const scale = Math.min(scaleX, scaleY);

    const offsetX = -(img.width * scale - wrapperWidth) / 2;
    const offsetY = -(img.height * scale - wrapperHeight) / 2;

    api.setTransform(offsetX, offsetY, scale, 300);
  };

  const calculateMinScale = () => {
    const wrapper = wrapperRef.current;
    const img = imageRef.current;
    if (!wrapper || !img) return 1;

    const wrapperWidth = wrapper.offsetWidth;
    const wrapperHeight = wrapper.offsetHeight;
    const scaleX = wrapperWidth / img.width;
    const scaleY = wrapperHeight / img.height;
    return Math.min(scaleX, scaleY);
  };

  return (
    <div className="p-[2px] rounded-2xl bg-gradient-to-r from-blue-300 to-white-300 ring-2 ring-blue-300 overflow-hidden">
      <div className="rounded-2xl bg-gray-50/10 backdrop-blur-md p-4 min-h-[600px] flex flex-col items-center">
        <div className="flex justify-between w-[900px] mb-2 px-2 z-10">
          <div className="flex space-x-2">
            <button
              onClick={() => transformRef.current?.zoomOut()}
              className="bg-purple-500 text-white px-3 py-2 rounded-md shadow hover:bg-purple-600"
            >
              −
            </button>
            <button
              onClick={() => transformRef.current?.zoomIn()}
              className="bg-purple-500 text-white px-3 py-2 rounded-md shadow hover:bg-purple-600"
            >
              +
            </button>
            <button
              onClick={fitImageToCanvas}
              className="bg-purple-500 text-white px-3 py-2 rounded-md shadow hover:bg-blue-600"
            >
              Reset View
            </button>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setShowBoxes((prev) => !prev)}
              className="bg-blue-500 text-white px-3 py-2 rounded-md shadow hover:bg-gray-800"
            >
              {showBoxes ? "Hide Results" : "Show Results"}
            </button>
            <button
              onClick={handleDownloadPDF}
              className="bg-blue-500 text-white px-3 py-2 rounded-md shadow hover:bg-green-700"
            >
              Download PDF
            </button>
          </div>
        </div>
        {uploadedImage && (
        <div 
          ref={wrapperRef}
          style={{
          width: "900px",
          height: "600px",
          overflow: "hidden",
        }}>
        <TransformWrapper
          onInit={handleInit}
          minScale={calculateMinScale()}
          maxScale={5}
          limitToBounds={true}
          centerOnInit={false}
          centerZoomedOut={false}
          panning={{ velocityDisabled: true }}
          wheel={{ step: 50 }}
        >
          <TransformComponent wrapperStyle={{ width: "100%", height: "100%" }}>
            <div
              style={{
                width: originalSize.width,
                height: originalSize.height,
                position: "relative",
              }}
            >
              <canvas
                ref={canvasRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                width={originalSize.width}
                height={originalSize.height}
                style={{
                  borderRadius: "12px",
                  boxShadow: "0 0 10px rgba(0,0,0,0.2)",
                  cursor: "crosshair",
                  display: "block",
                }}
              />
            </div>
          </TransformComponent>
        </TransformWrapper>

          </div>
        )}
      </div>
    </div>
  );
};

export default ModelCanvas;
