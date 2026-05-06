"use client";

import { useEffect, useRef } from "react";
import QRCodeStyling from "qr-code-styling";
import type { StaticImageData } from "next/image";

import tgLogo from "@/img/TG Color Logo.png";

export type QRCode = {
  url: string;
  bgColor: string;
  size: number;
  dotsColor: string;
  dotsGradientEnabled: boolean;
  dotsGradientStartColor: string;
  dotsGradientEndColor: string;
  cornersSquareColor: string;
  cornersDotColor: string;
  dotsType: "square" | "dots" | "rounded" | "extra-rounded" | "classy" | "classy-rounded";
  cornersSquareType: "dot" | "square" | "extra-rounded";
  cornersDotType: "dot" | "square";
  icon: "tg-color" | "tg-minimal" | "none" | "custom";
  customIcon: string | null;
  margin: number;
};

type QRcodeStyledProp = {
  qrcode: QRCode;
};

const iconMap: Record<Exclude<QRCode["icon"], "custom">, string | StaticImageData | undefined> = {
  "tg-color": tgLogo,
  "tg-minimal": tgLogo,
  none: undefined,
};

function resolveAssetUrl(source: string | StaticImageData | undefined) {
  if (!source) {
    return undefined;
  }

  return typeof source === "string" ? source : source.src;
}

function getIconSource(qrcode: QRCode) {
  if (qrcode.icon === "custom") {
    return qrcode.customIcon ?? undefined;
  }

  return resolveAssetUrl(iconMap[qrcode.icon]);
}

function getImageSize(icon: QRCode["icon"]) {
  if (icon === "none") {
    return 0;
  }

  return icon === "tg-minimal" ? 0.28 : 0.4;
}

function getDotsGradient(qrcode: QRCode) {
  if (!qrcode.dotsGradientEnabled) {
    return undefined;
  }

  return {
    type: "radial" as const,
    colorStops: [
      { offset: 0, color: qrcode.dotsGradientStartColor },
      { offset: 1, color: qrcode.dotsGradientEndColor },
    ],
  };
}

const QRCodeStyled = ({ qrcode }: QRcodeStyledProp) => {
  const qrRef = useRef<HTMLDivElement>(null);
  const qrCodeRef = useRef<QRCodeStyling | null>(null);

  useEffect(() => {
    const image = getIconSource(qrcode);

    if (!qrCodeRef.current) {
      qrCodeRef.current = new QRCodeStyling({
        width: qrcode.size,
        height: qrcode.size,
        type: "canvas",
        data: qrcode.url,
        image,
        margin: qrcode.margin,

        qrOptions: {
          mode: "Byte",
          errorCorrectionLevel: "H",
        },

        imageOptions: {
          crossOrigin: "anonymous",
          hideBackgroundDots: true,
          imageSize: getImageSize(qrcode.icon),
          margin: 0,
        },

        dotsOptions: {
          color: qrcode.dotsColor,
          type: qrcode.dotsType,
          gradient: getDotsGradient(qrcode),
        },

        backgroundOptions: {
          color: qrcode.bgColor,
        },

        cornersSquareOptions: {
          type: qrcode.cornersSquareType,
          color: qrcode.cornersSquareColor,
        },

        cornersDotOptions: {
          type: qrcode.cornersDotType,
          color: qrcode.cornersDotColor,
        },
      });
    }

    if (qrRef.current && qrcode) {
      qrRef.current.innerHTML = "";
      qrCodeRef.current?.update({
        data: qrcode.url,
        image,
        width: qrcode.size,
        height: qrcode.size,
        margin: qrcode.margin,
        backgroundOptions: { color: qrcode.bgColor },
        imageOptions: {
          crossOrigin: "anonymous",
          hideBackgroundDots: true,
          imageSize: getImageSize(qrcode.icon),
          margin: 0,
        },
        dotsOptions: {
          color: qrcode.dotsColor,
          type: qrcode.dotsType,
          gradient: getDotsGradient(qrcode),
        },
        cornersSquareOptions: {
          color: qrcode.cornersSquareColor,
          type: qrcode.cornersSquareType,
        },
        cornersDotOptions: {
          color: qrcode.cornersDotColor,
          type: qrcode.cornersDotType,
        },
      });
      qrCodeRef.current?.append(qrRef.current);
    }
  }, [qrcode]);

  const handleDownload = async () => {
    if (!qrCodeRef.current) return;
    await qrCodeRef.current.download({
      name: `${qrcode.url}-${qrcode.size}x${qrcode.size}`,
      extension: "png",
    });
  };

  return (
    <aside className="flex flex-col gap-6 rounded-[32px] border border-[#f59e0b]/15 bg-[linear-gradient(180deg,_rgba(7,17,38,0.94),_rgba(10,28,61,0.88))] p-6 shadow-[0_18px_50px_rgba(2,6,23,0.45)] backdrop-blur">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#facc15]">Preview</p>
        <h2 className="mt-2 text-2xl font-semibold text-white">Live output</h2>
        <p className="mt-2 text-sm leading-6 text-slate-300">
          The preview reflects your current settings. Download a PNG when you are ready.
        </p>
      </div>

      <div className="flex min-h-[360px] items-center justify-center rounded-[28px] border border-[#8ba7c4]/20 bg-[linear-gradient(135deg,_rgba(0,41,81,0.96),_rgba(11,31,67,0.88))] p-4 sm:p-6">
        <div className="flex w-full max-w-full items-center justify-center overflow-hidden rounded-[24px] bg-white p-4 shadow-[0_12px_40px_rgba(15,23,42,0.28)]">
          <div
            ref={qrRef}
            className="flex w-full max-w-full items-center justify-center [&>canvas]:h-auto [&>canvas]:max-w-full [&>svg]:h-auto [&>svg]:max-w-full"
          />
        </div>
      </div>

      <div className="grid gap-3 text-sm text-slate-300 sm:grid-cols-2">
        <div className="rounded-2xl border border-[#8ba7c4]/20 bg-white/5 p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Canvas</p>
          <p className="mt-2 text-lg font-semibold text-white">{qrcode.size}px</p>
        </div>
        <div className="rounded-2xl border border-[#f59e0b]/20 bg-white/5 p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Icon</p>
          <p className="mt-2 text-lg font-semibold capitalize text-white">{qrcode.icon.replace("-", " ")}</p>
        </div>
      </div>

      <button
        onClick={handleDownload}
        disabled={!qrcode.url.trim()}
        className="inline-flex items-center justify-center rounded-full bg-[#f59e0b] px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-[#facc15] disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-400"
      >
        Download PNG
      </button>
    </aside>
  );
};

export default QRCodeStyled;
