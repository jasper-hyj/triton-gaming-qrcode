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
  icon:
    | "tg-color"
    | "tg-minimal"
    | "link"
    | "website"
    | "email"
    | "phone"
    | "location"
    | "wifi"
    | "none"
    | "custom";
  customIcon: string | null;
  margin: number;
  iconPadding: number;
  transparentBg: boolean;
  downloadFormat: "png" | "jpeg";
};

type QRcodeStyledProp = {
  qrcode: QRCode;
};

const iconMap: Record<Exclude<QRCode["icon"], "custom">, string | StaticImageData | undefined> = {
  "tg-color": tgLogo,
  "tg-minimal": tgLogo,
  link: "data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%23002951%22%20stroke-width%3D%222.2%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpath%20d%3D%22M10%2014L7%2017a3%203%200%201%201-4-4l3-3a3%203%200%200%201%204%200%22/%3E%3Cpath%20d%3D%22M14%2010l3-3a3%203%200%201%201%204%204l-3%203a3%203%200%200%201-4%200%22/%3E%3Cpath%20d%3D%22M8.5%2015.5l7-7%22/%3E%3C/svg%3E",
  website: "data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%23002951%22%20stroke-width%3D%222.2%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Ccircle%20cx%3D%2212%22%20cy%3D%2212%22%20r%3D%229%22/%3E%3Cpath%20d%3D%22M3%2012h18%22/%3E%3Cpath%20d%3D%22M12%203a15%2015%200%200%201%200%2018%22/%3E%3Cpath%20d%3D%22M12%203a15%2015%200%200%200%200%2018%22/%3E%3C/svg%3E",
  email: "data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%23002951%22%20stroke-width%3D%222.2%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Crect%20x%3D%223%22%20y%3D%226%22%20width%3D%2218%22%20height%3D%2212%22%20rx%3D%222%22/%3E%3Cpath%20d%3D%22M4%208l8%206%208-6%22/%3E%3C/svg%3E",
  phone: "data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%23002951%22%20stroke-width%3D%222.2%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpath%20d%3D%22M8.8%203h6.4a1.8%201.8%200%200%201%201.8%201.8v14.4a1.8%201.8%200%200%201-1.8%201.8H8.8A1.8%201.8%200%200%201%207%2019.2V4.8A1.8%201.8%200%200%201%208.8%203Z%22/%3E%3Cpath%20d%3D%22M10%206h4%22/%3E%3Ccircle%20cx%3D%2212%22%20cy%3D%2217%22%20r%3D%220.8%22%20fill%3D%22%23002951%22%20stroke%3D%22none%22/%3E%3C/svg%3E",
  location: "data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%23002951%22%20stroke-width%3D%222.2%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpath%20d%3D%22M12%202a7%207%200%200%201%207%207c0%205-7%2013-7%2013S5%2014%205%209a7%207%200%200%201%207-7Z%22/%3E%3Ccircle%20cx%3D%2212%22%20cy%3D%229%22%20r%3D%222.5%22/%3E%3C/svg%3E",
  wifi: "data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%23002951%22%20stroke-width%3D%222.2%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpath%20d%3D%22M3.5%209a13%2013%200%200%201%2017%200%22/%3E%3Cpath%20d%3D%22M6.5%2012.5a9%209%200%200%201%2011%200%22/%3E%3Cpath%20d%3D%22M9.8%2016a4.2%204.2%200%200%201%204.4%200%22/%3E%3Ccircle%20cx%3D%2212%22%20cy%3D%2219%22%20r%3D%221.2%22%20fill%3D%22%23002951%22%20stroke%3D%22none%22/%3E%3C/svg%3E",
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

  if (icon === "tg-color") {
    return 0.4;
  }

  if (icon === "tg-minimal") {
    return 0.28;
  }

  if (icon === "custom") {
    return 0.34;
  }

  return 0.3;
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
          margin: qrcode.iconPadding,
        },

        dotsOptions: {
          color: qrcode.dotsColor,
          type: qrcode.dotsType,
          gradient: getDotsGradient(qrcode),
        },

        backgroundOptions: {
          color: qrcode.transparentBg ? "#00000000" : qrcode.bgColor,
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
        backgroundOptions: { color: qrcode.transparentBg ? "#00000000" : qrcode.bgColor },
        imageOptions: {
          crossOrigin: "anonymous",
          hideBackgroundDots: true,
          imageSize: getImageSize(qrcode.icon),
          margin: qrcode.iconPadding,
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
      extension: qrcode.downloadFormat,
    });
  };

  return (
    <aside className="flex flex-col gap-6 rounded-[32px] border border-[#f59e0b]/15 bg-[linear-gradient(180deg,_rgba(7,17,38,0.94),_rgba(10,28,61,0.88))] p-6 shadow-[0_18px_50px_rgba(2,6,23,0.45)] backdrop-blur">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#facc15]">Preview</p>
        <h2 className="mt-2 text-2xl font-semibold text-white">Live output</h2>
        <p className="mt-2 text-sm leading-6 text-slate-300">
          The preview reflects your current settings. Download PNG or JPEG when you are ready.
        </p>
      </div>

      <div className="flex min-h-[360px] items-center justify-center rounded-[28px] border border-[#8ba7c4]/20 bg-[linear-gradient(135deg,_rgba(0,41,81,0.96),_rgba(11,31,67,0.88))] p-4 sm:p-6">
        <div
          className="flex w-full max-w-full items-center justify-center overflow-hidden rounded-[24px] p-4 shadow-[0_12px_40px_rgba(15,23,42,0.28)]"
          style={qrcode.transparentBg ? { backgroundImage: "repeating-conic-gradient(#ccc 0% 25%, #fff 0% 50%)", backgroundSize: "20px 20px" } : { backgroundColor: "white" }}
        >
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
        Download {qrcode.downloadFormat.toUpperCase()}
      </button>
    </aside>
  );
};

export default QRCodeStyled;
