import { useState, useRef } from "react";

/**
 * Hook for camera capture functionality
 * Manages video stream, canvas capture, and photo state
 * @returns {object} - { showCamera, capturedImage, videoRef, canvasRef, openCamera, capturePhoto, closeCamera, removePhoto }
 */
export function useCamera() {
  const [showCamera, setShowCamera] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  /**
   * Open camera and request media stream
   */
  const openCamera = async () => {
    try {
      setShowCamera(true);
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } else {
        console.error("Camera not supported on this device");
        setShowCamera(false);
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
      setShowCamera(false);
    }
  };

  /**
   * Capture photo from video stream to canvas
   * Returns base64 image data URL
   */
  const capturePhoto = () => {
    try {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      
      if (video && canvas) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext("2d");
        
        if (ctx) {
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          const dataUrl = canvas.toDataURL("image/png");
          setCapturedImage(dataUrl);
          
          // Stop camera after capture
          closeCamera();
          return dataUrl;
        }
      }
    } catch (error) {
      console.error("Error capturing photo:", error);
    }
    return null;
  };

  /**
   * Close camera and stop media stream
   */
  const closeCamera = () => {
    try {
      setShowCamera(false);
      const video = videoRef.current;
      if (video && video.srcObject) {
        const tracks = video.srcObject.getTracks();
        tracks.forEach((track) => track.stop());
        video.srcObject = null;
      }
    } catch (error) {
      console.error("Error closing camera:", error);
    }
  };

  /**
   * Remove captured image and reset state
   */
  const removePhoto = () => {
    setCapturedImage(null);
  };

  return {
    showCamera,
    capturedImage,
    videoRef,
    canvasRef,
    openCamera,
    capturePhoto,
    closeCamera,
    removePhoto,
  };
}
