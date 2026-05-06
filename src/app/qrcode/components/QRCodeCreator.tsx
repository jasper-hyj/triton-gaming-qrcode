import { QRCode } from "@/app/components/QRCodeGenerator";

const dotStyles: Array<QRCode["dotsType"]> = [
  "rounded",
  "dots",
  "square",
  "extra-rounded",
  "classy",
  "classy-rounded",
];

const cornerSquareStyles: Array<QRCode["cornersSquareType"]> = ["extra-rounded", "square", "dot"];
const cornerDotStyles: Array<QRCode["cornersDotType"]> = ["dot", "square"];

type QRCodeInfoBarProps = {
  qrcode: QRCode;
  setQrcode: (qrcode: QRCode) => void;
  loading: boolean;
  handleGenerate: () => void;
};

function updateCustomIcon(file: File | undefined, qrcode: QRCode, setQrcode: (qrcode: QRCode) => void) {
  if (!file) {
    setQrcode({
      ...qrcode,
      customIcon: null,
      icon: qrcode.icon === "custom" ? "none" : qrcode.icon,
    });
    return;
  }

  const reader = new FileReader();
  reader.onload = () => {
    setQrcode({
      ...qrcode,
      customIcon: typeof reader.result === "string" ? reader.result : null,
      icon: "custom",
    });
  };
  reader.readAsDataURL(file);
}

export default function QRCodeInfoBar({
  qrcode,
  setQrcode,
  loading,
  handleGenerate,
}: QRCodeInfoBarProps) {
  return (
    <div className="rounded-[32px] border border-amber-300/15 bg-[linear-gradient(180deg,_rgba(8,20,45,0.92),_rgba(15,32,67,0.82))] p-6 shadow-[0_24px_60px_rgba(4,10,25,0.5)] backdrop-blur sm:p-8">
      <div className="flex flex-col gap-2">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#facc15]">Triton Gaming QR Studio</p>
        <h2 className="text-3xl font-semibold text-white">Compose your QR code</h2>
        <p className="max-w-2xl text-sm leading-6 text-slate-300">
          Tune the payload, size, module styling, and icon treatment. Triton Gaming logo presets stay available,
          and you can also upload a custom center icon.
        </p>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-2">
        <div className="space-y-6">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-200" htmlFor="url">
              Destination URL or text
            </label>
            <input
              id="url"
              type="text"
              value={qrcode.url}
              onChange={(e) => setQrcode({ ...qrcode, url: e.target.value })}
              placeholder="https://example.com"
              className="w-full rounded-2xl border border-[#8ba7c4]/20 bg-[#061126]/85 px-4 py-3 text-slate-100 shadow-inner outline-none transition placeholder:text-slate-500 focus:border-[#f59e0b]"
              disabled={loading}
            />
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-200" htmlFor="size">
                Size (px)
              </label>
              <input
                id="size"
                type="number"
                min="160"
                max="1200"
                step="20"
                value={qrcode.size}
                onChange={(e) =>
                  setQrcode({
                    ...qrcode,
                    size: Number.isNaN(Number.parseInt(e.target.value, 10))
                      ? 0
                      : Number.parseInt(e.target.value, 10),
                  })
                }
                className="w-full rounded-2xl border border-[#8ba7c4]/20 bg-[#061126]/85 px-4 py-3 text-slate-100 outline-none transition focus:border-[#f59e0b]"
                disabled={loading}
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-200" htmlFor="margin">
                Outer margin
              </label>
              <input
                id="margin"
                type="number"
                min="0"
                max="64"
                step="2"
                value={qrcode.margin}
                onChange={(e) =>
                  setQrcode({
                    ...qrcode,
                    margin: Number.isNaN(Number.parseInt(e.target.value, 10))
                      ? 0
                      : Number.parseInt(e.target.value, 10),
                  })
                }
                className="w-full rounded-2xl border border-[#8ba7c4]/20 bg-[#061126]/85 px-4 py-3 text-slate-100 outline-none transition focus:border-[#f59e0b]"
                disabled={loading}
              />
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-200" htmlFor="bgColor">
                Background
              </label>
              <input
                id="bgColor"
                type="color"
                value={qrcode.bgColor}
                onChange={(e) => setQrcode({ ...qrcode, bgColor: e.target.value })}
                className="h-12 w-full cursor-pointer rounded-2xl border border-[#8ba7c4]/20 bg-[#061126]/85 p-2"
                disabled={loading}
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-200" htmlFor="dotsColor">
                Main module base
              </label>
              <input
                id="dotsColor"
                type="color"
                value={qrcode.dotsColor}
                onChange={(e) => setQrcode({ ...qrcode, dotsColor: e.target.value })}
                className="h-12 w-full cursor-pointer rounded-2xl border border-[#8ba7c4]/20 bg-[#061126]/85 p-2"
                disabled={loading}
              />
            </div>
          </div>

          <div className="rounded-[28px] border border-[#8ba7c4]/20 bg-[#061126]/65 p-5">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-slate-100">TG radial gradient</p>
                <p className="mt-1 text-xs leading-5 text-slate-400">
                  Keep the original Triton Gaming module gradient as the default look.
                </p>
              </div>
              <label className="inline-flex items-center gap-3 text-sm text-slate-200">
                <input
                  type="checkbox"
                  checked={qrcode.dotsGradientEnabled}
                  onChange={(e) =>
                    setQrcode({
                      ...qrcode,
                      dotsGradientEnabled: e.target.checked,
                    })
                  }
                  className="h-4 w-4 rounded border-white/20 bg-slate-900 text-[#f59e0b]"
                  disabled={loading}
                />
                Enabled
              </label>
            </div>

            {qrcode.dotsGradientEnabled && (
              <div className="mt-4 grid gap-6 sm:grid-cols-2">
                <div>
                  <label
                    className="mb-2 block text-sm font-medium text-slate-200"
                    htmlFor="dotsGradientStartColor"
                  >
                    Gradient start
                  </label>
                  <input
                    id="dotsGradientStartColor"
                    type="color"
                    value={qrcode.dotsGradientStartColor}
                    onChange={(e) =>
                      setQrcode({
                        ...qrcode,
                        dotsGradientStartColor: e.target.value,
                      })
                    }
                    className="h-12 w-full cursor-pointer rounded-2xl border border-[#8ba7c4]/20 bg-[#061126]/85 p-2"
                    disabled={loading}
                  />
                </div>
                <div>
                  <label
                    className="mb-2 block text-sm font-medium text-slate-200"
                    htmlFor="dotsGradientEndColor"
                  >
                    Gradient end
                  </label>
                  <input
                    id="dotsGradientEndColor"
                    type="color"
                    value={qrcode.dotsGradientEndColor}
                    onChange={(e) =>
                      setQrcode({
                        ...qrcode,
                        dotsGradientEndColor: e.target.value,
                      })
                    }
                    className="h-12 w-full cursor-pointer rounded-2xl border border-[#8ba7c4]/20 bg-[#061126]/85 p-2"
                    disabled={loading}
                  />
                </div>
              </div>
            )}
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-200" htmlFor="cornersSquareColor">
                Corner frame color
              </label>
              <input
                id="cornersSquareColor"
                type="color"
                value={qrcode.cornersSquareColor}
                onChange={(e) => setQrcode({ ...qrcode, cornersSquareColor: e.target.value })}
                className="h-12 w-full cursor-pointer rounded-2xl border border-[#8ba7c4]/20 bg-[#061126]/85 p-2"
                disabled={loading}
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-200" htmlFor="cornersDotColor">
                Corner dot color
              </label>
              <input
                id="cornersDotColor"
                type="color"
                value={qrcode.cornersDotColor}
                onChange={(e) => setQrcode({ ...qrcode, cornersDotColor: e.target.value })}
                className="h-12 w-full cursor-pointer rounded-2xl border border-[#8ba7c4]/20 bg-[#061126]/85 p-2"
                disabled={loading}
              />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-200" htmlFor="dotsType">
                Module shape
              </label>
              <select
                id="dotsType"
                value={qrcode.dotsType}
                onChange={(e) =>
                  setQrcode({ ...qrcode, dotsType: e.target.value as QRCode["dotsType"] })
                }
                className="w-full rounded-2xl border border-[#8ba7c4]/20 bg-[#061126]/85 px-4 py-3 text-slate-100 outline-none transition focus:border-[#f59e0b]"
                disabled={loading}
              >
                {dotStyles.map((style) => (
                  <option key={style} value={style}>
                    {style}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-200" htmlFor="icon">
                Center icon preset
              </label>
              <select
                id="icon"
                value={qrcode.icon}
                onChange={(e) =>
                  setQrcode({
                    ...qrcode,
                    icon: e.target.value as QRCode["icon"],
                    customIcon: e.target.value === "custom" ? qrcode.customIcon : qrcode.customIcon,
                  })
                }
                className="w-full rounded-2xl border border-[#8ba7c4]/20 bg-[#061126]/85 px-4 py-3 text-slate-100 outline-none transition focus:border-[#f59e0b]"
                disabled={loading}
              >
                <option value="tg-color">TG logo</option>
                <option value="tg-minimal">TG logo small</option>
                <option value="none">No icon</option>
                <option value="custom">Custom upload</option>
              </select>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-200" htmlFor="cornersSquareType">
                Corner frame style
              </label>
              <select
                id="cornersSquareType"
                value={qrcode.cornersSquareType}
                onChange={(e) =>
                  setQrcode({
                    ...qrcode,
                    cornersSquareType: e.target.value as QRCode["cornersSquareType"],
                  })
                }
                className="w-full rounded-2xl border border-[#8ba7c4]/20 bg-[#061126]/85 px-4 py-3 text-slate-100 outline-none transition focus:border-[#f59e0b]"
                disabled={loading}
              >
                {cornerSquareStyles.map((style) => (
                  <option key={style} value={style}>
                    {style}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-200" htmlFor="cornersDotType">
                Corner dot style
              </label>
              <select
                id="cornersDotType"
                value={qrcode.cornersDotType}
                onChange={(e) =>
                  setQrcode({
                    ...qrcode,
                    cornersDotType: e.target.value as QRCode["cornersDotType"],
                  })
                }
                className="w-full rounded-2xl border border-[#8ba7c4]/20 bg-[#061126]/85 px-4 py-3 text-slate-100 outline-none transition focus:border-[#f59e0b]"
                disabled={loading}
              >
                {cornerDotStyles.map((style) => (
                  <option key={style} value={style}>
                    {style}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-200" htmlFor="customIcon">
              Custom icon upload
            </label>
            <input
              id="customIcon"
              type="file"
              accept="image/png,image/jpeg,image/svg+xml,image/webp"
              onChange={(e) => updateCustomIcon(e.target.files?.[0], qrcode, setQrcode)}
              className="block w-full rounded-2xl border border-dashed border-[#8ba7c4]/25 bg-[#061126]/70 px-4 py-3 text-sm text-slate-300 file:mr-4 file:rounded-full file:border-0 file:bg-[#f59e0b] file:px-4 file:py-2 file:text-sm file:font-semibold file:text-slate-950 hover:file:bg-[#facc15]"
              disabled={loading}
            />
            <p className="mt-2 text-xs leading-5 text-slate-400">
              Uploading an image automatically switches the QR code to the custom icon option.
            </p>
          </div>

          <div className="rounded-[28px] border border-[#f59e0b]/20 bg-[#f59e0b]/10 p-5 text-sm leading-6 text-amber-100">
            Keep contrast high between the background and modules to preserve scan reliability.
          </div>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-4">
        <button
          onClick={handleGenerate}
          disabled={loading || !qrcode.url.trim() || qrcode.size <= 0}
          className="inline-flex items-center justify-center rounded-full bg-[#f59e0b] px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-[#facc15] disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-400"
        >
          Refresh preview
        </button>
        <span className="text-sm text-slate-400">
          Preview updates instantly. Use refresh to lock the current configuration before download.
        </span>
      </div>
    </div>
  );
}
