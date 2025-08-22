"use client";

import { SetStateAction, useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { Button } from "@/components/ui/button";

export default function Qrcode() {
  const [scannedResult, setScannedResult] = useState<string | null>(null);
  const [cameraStarted, setCameraStarted] = useState(false);
  const scannerRef = useRef<HTMLDivElement>(null);
  const html5QrCodeRef = useRef<Html5Qrcode | null>(null);

  const startScanner = async () => {
    if (!scannerRef.current) return;

    const config = { fps: 10, qrbox: 250 };

    try {
      const cameraId = (await Html5Qrcode.getCameras())[0]?.id;
      if (!cameraId) {
        alert("No camera found");
        return;
      }

      const html5QrCode = new Html5Qrcode(scannerRef.current.id);
      html5QrCodeRef.current = html5QrCode;

      await html5QrCode.start(
        cameraId,
        config,
        (decodedText: SetStateAction<string | null>) => {
          setScannedResult(decodedText);
          stopScanner(); // Auto-stop after successful scan
        },
        (_error: any) => {
          // console.warn("QR scan error:", error);
        }
      );
      setCameraStarted(true);
    } catch (error) {
      console.error("Failed to start scanner:", error);
    }
  };

  const stopScanner = () => {
    html5QrCodeRef.current?.stop().then(() => {
      html5QrCodeRef.current?.clear();
      setCameraStarted(false);
    });
  };

  useEffect(() => {
    return () => {
      stopScanner(); // Cleanup on unmount
    };
  }, []);

  return (
    <div className="flex flex-col items-center p-6 gap-4 w-full max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-center text-purple-700">QR Code Scanner</h2>

      <div
        id="qr-scanner"
        ref={scannerRef}
        className="w-full rounded-xl border-2 border-purple-300 aspect-square bg-black"
      />

      <div className="flex gap-4">
        {!cameraStarted ? (
          <Button onClick={startScanner} className="bg-purple-600 hover:bg-purple-700">
            Start Camera
          </Button>
        ) : (
          <Button onClick={stopScanner} variant="destructive">
            Stop Camera
          </Button>
        )}
      </div>

      {scannedResult && (
        <div className="mt-4 p-3 bg-purple-100 text-purple-800 rounded-lg w-full text-center break-all">
          <strong>Scanned:</strong> {scannedResult}
        </div>
      )}
    </div>
  );
}

