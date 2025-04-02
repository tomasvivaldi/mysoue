import React, { useState, useEffect } from "react";
import QRCode from "qrcode";
import { useTranslations } from "next-intl";

interface ShareWishlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistId: string;
  shareToken?: string;
  onGenerateShareLink: (wishlistId: string) => void;
}

// Helper function to convert a data URL to a File object
const dataUrlToFile = (dataUrl: string, filename: string): File => {
  const arr = dataUrl.split(",");
  const mimeMatch = arr[0].match(/:(.*?);/);
  const mime = mimeMatch ? mimeMatch[1] : "image/png";
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
};

const ShareWishlistModal: React.FC<ShareWishlistModalProps> = ({
  isOpen,
  onClose,
  wishlistId,
  shareToken: initialShareToken,
  onGenerateShareLink,
}) => {
  const t = useTranslations("ShareWishlistModal");
  const [copied, setCopied] = useState(false);
  const [shareToken, setShareToken] = useState<string | undefined>(initialShareToken);
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    console.log("Share token when opening modal:", initialShareToken);
    setShareToken(initialShareToken);
  }, [initialShareToken]);

  const shareLink = shareToken
    ? `${window.location.origin}/shared/${shareToken}`
    : "";

  // Generate QR code data URL when shareLink changes
  useEffect(() => {
    if (shareLink) {
      QRCode.toDataURL(shareLink)
        .then((dataUrl: string) => {
          setQrCodeDataUrl(dataUrl);
        })
        .catch((err: any) => {
          console.error("Failed to generate QR Code", err);
        });
    }
  }, [shareLink]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleGenerateLink = async () => {
    setIsGenerating(true);
    try {
      await onGenerateShareLink(wishlistId);
    } catch (error) {
      console.error("Error generating link:", error);
    }
    setIsGenerating(false);
  };

  const handleShareToSocial = async () => {
    if (navigator.share) {
      try {
        // Optionally, share the QR code image if available and supported
        if (qrCodeDataUrl) {
          const file = dataUrlToFile(qrCodeDataUrl, "qrcode.png");
          if (navigator.canShare && navigator.canShare({ files: [file] })) {
            await navigator.share({
              files: [file],
              title: t("share_qr_title"),
              text: t("share_qr_text"),
              url: shareLink,
            });
            return;
          }
        }
        // Fallback: share the link
        await navigator.share({
          title: t("share_wishlist_title"),
          text: t("share_wishlist_text"),
          url: shareLink,
        });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      alert(t("sharing_not_supported"));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative w-[90%] sm:w-[70%] lg:w-[40%] bg-[#A5282C] text-white rounded-lg shadow-lg p-8 max-h-[80vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-gray-300 text-xl"
        >
          &times;
        </button>

        {/* Modal Content */}
        <div className="text-center flex flex-col">
          <h2 className="text-2xl font-bold mb-6">{t("share_wishlist")}</h2>

          {shareToken ? (
            <>
              <p className="mb-4">{t("copy_link_message")}</p>
              {/* QR Code Display */}
              {qrCodeDataUrl && (
                <div className="mb-4">
                  <img
                    src={qrCodeDataUrl}
                    alt="QR Code"
                    className="mx-auto rounded-lg"
                  />
                </div>
              )}
              <div className="flex items-center border border-white rounded-lg px-4 py-2 bg-white/20">
                <input
                  type="text"
                  value={shareLink}
                  readOnly
                  className="w-full outline-none bg-transparent text-white"
                />
                <button
                  onClick={handleCopyLink}
                  className="ml-2 bg-white text-[#A5282C] px-4 py-1 rounded-lg hover:bg-gray-200 transition"
                >
                  {copied ? t("copied") : t("copy")}
                </button>
              </div>

              {/* Social Share Button */}
              <div className="mt-4">
                <button
                  onClick={handleShareToSocial}
                  className="w-fit mx-auto bg-white text-[#A5282C] py-2 px-8 rounded-full font-medium hover:bg-gray-200 transition"
                >
                  {t("share_to_socials")}
                </button>
              </div>
            </>
          ) : (
            <>
              <p className="mb-4">{t("generate_link_message")}</p>
              <button
                onClick={handleGenerateLink}
                disabled={isGenerating}
                className="w-fit mx-auto bg-white text-[#A5282C] py-2 px-8 rounded-full font-medium hover:bg-gray-200 transition"
              >
                {isGenerating ? t("loading") : t("generate_link")}
              </button>
            </>
          )}

          {/* Go Back Button */}
          <button
            onClick={onClose}
            className="mt-4 text-white hover:text-gray-300 text-lg"
          >
            {t("go_back")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShareWishlistModal;