"use client";

import { useState } from "react";

import QRCodeStyled, { QRCode } from "./components/QRCodeGenerator";
import QRCodeInfoBar from "./qrcode/components/QRCodeCreator";

export default function HomePage() {
  const [qrcode, setQrcode] = useState<QRCode>({
    url: "https://www.example.com",
    size: 500,
    bgColor: "#ffffff",
    dotsColor: "#1e3a8a",
    dotsGradientEnabled: true,
    dotsGradientStartColor: "#8ba7c4",
    dotsGradientEndColor: "#002951",
    cornersSquareColor: "#f59e0b",
    cornersDotColor: "#facc15",
    dotsType: "extra-rounded",
    cornersSquareType: "extra-rounded",
    cornersDotType: "dot",
    icon: "tg-color",
    customIcon: null,
    margin: 10,
    iconPadding: 6,
    transparentBg: false,
    downloadFormat: "png",
  });

  const [generate, setGenerate] = useState<boolean>(false);
  const [qrcodeGenerate, setQrcodeGenerate] = useState<QRCode>(qrcode);

  const handleGenerate = () => {
    setQrcodeGenerate(qrcode);
    setGenerate(true);
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top,_rgba(245,158,11,0.16),_transparent_24%),radial-gradient(circle_at_top_left,_rgba(139,167,196,0.18),_transparent_32%),linear-gradient(180deg,_#061126_0%,_#0c1d3c_48%,_#13213e_100%)] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8">
        <section className="grid gap-8 xl:grid-cols-[minmax(0,1.2fr)_minmax(340px,420px)]">
          <QRCodeInfoBar
            qrcode={qrcode}
            setQrcode={setQrcode}
            loading={false}
            handleGenerate={handleGenerate}
          />
          <QRCodeStyled qrcode={generate ? qrcodeGenerate : qrcode} />
        </section>
      </div>
    </main>
  );
}
