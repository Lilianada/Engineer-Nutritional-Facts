import React, { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import {
  TwitterIcon,
  FacebookIcon,
  LinkedinIcon,
  WhatsappIcon,
  RedditIcon,
} from 'react-share';

interface LabelActionBarProps {
  labelRef: React.RefObject<HTMLDivElement | null>;
  headerText: string;
}

const DownloadIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
  </svg>
);

const ShareIcon = () => (
   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12s-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6.016l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
  </svg>
);

const LabelActionBar: React.FC<LabelActionBarProps> = ({ labelRef, headerText }) => {
  const [isShareDropdownOpen, setIsShareDropdownOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  // Dedicated hidden export container
  const exportContainerRef = useRef<HTMLDivElement>(null);



  const handleDownload = async () => {
    setIsProcessing(true);

    try {
      if (!labelRef.current) {
        console.error("Label reference is null");
        return;
      }

      const element = labelRef.current;
      const width = element.offsetWidth;
      const height = element.offsetHeight;

      // Increase the scale for higher resolution
      const canvas = await html2canvas(element, {
        useCORS: true,
        backgroundColor: null,
        scale: 5, // Increased scale for better text quality
        logging: false,
        width: 480,
        height: 560,
      });

      const dataURL = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = dataURL;
      link.download = `${headerText.toLowerCase().replace(/\s+/g, '-')}-facts.png`
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error generating or downloading the image:", error);
    } finally {
      setIsProcessing(false);
    }
  };



  // Share (Web Share API for image, fallback to social links)
  const handleShare = async (platform: string) => {
    setIsProcessing(true);
    setIsShareDropdownOpen(false);
    if (!labelRef.current) {
      setIsProcessing(false);
      return;
    }
    try {
      const canvas = await html2canvas(labelRef.current, {
        useCORS: true,
        backgroundColor: null,
        scale: 2,
      });
      const dataUrl = canvas.toDataURL('image/png');
      const response = await fetch(dataUrl);
      const blob = await response.blob();
      const file = new File([blob], `${headerText.toLowerCase().replace(/\s+/g, '-')}-facts.png`, { type: blob.type });
      if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          title: `My ${headerText} Facts`,
          text: `Check out my ${headerText} Nutritional Facts! Made in LilysLab.xyz.`,
          files: [file],
        });
      } else {
        // fallback: open social link with current URL
        const shareUrl = window.location.href;
        const shareTitle = `Check out my ${headerText} Nutritional Facts!`;
        let url = '';
        switch (platform) {
          case 'Twitter':
            url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareTitle)}&url=${encodeURIComponent(shareUrl)}`;
            break;
          case 'Facebook':
            url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
            break;
          case 'LinkedIn':
            url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
            break;
          case 'WhatsApp':
            url = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareTitle + ' ' + shareUrl)}`;
            break;
          case 'Reddit':
            url = `https://www.reddit.com/submit?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(shareTitle)}`;
            break;
          default:
            break;
        }
        if (url) window.open(url, '_blank', 'noopener,noreferrer');
        else alert('Sharing not supported.');
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Error sharing label', err);
      alert('Sharing failed.');
    }
    setIsProcessing(false);
  };

  return (
    <div className="flex justify-end items-center space-x-2">
      {/* Download PNG (from HTML) Button */}
      <button
        onClick={handleDownload}
        disabled={isProcessing}
        className="bg-white bg-opacity-70 hover:bg-blue-300 text-gray-700 px-3 py-1 rounded shadow-md text-sm font-bold flex items-center gap-1"
        title="Download as PNG (HTML)"
      >
        <DownloadIcon  />
      </button>
      {/* <div className="relative">
        <button
          onClick={() => setIsShareDropdownOpen((prev) => !prev)}
          disabled={isProcessing}
          className="p-1.5 bg-white bg-opacity-70  hover:bg-blue-300 rounded px-3 py-1 text-gray-700 hover:bg-opacity-100 hover:text-black focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500 transition disabled:opacity-50"
          aria-label="Share label"
          title="Share"
          type="button"
        >
          <ShareIcon />
        </button>
        {isShareDropdownOpen && (
          <div className="absolute top-full right-0 mt-1 w-auto bg-white rounded-md shadow-lg p-2 z-30 flex space-x-2">
            <button onClick={() => handleShare('Twitter')} disabled={isProcessing} className="transition-transform duration-150 ease-in-out hover:scale-110" title="Share on Twitter"><TwitterIcon size={32} round /></button>
            <button onClick={() => handleShare('Facebook')} disabled={isProcessing} className="transition-transform duration-150 ease-in-out hover:scale-110" title="Share on Facebook"><FacebookIcon size={32} round /></button>
            <button onClick={() => handleShare('LinkedIn')} disabled={isProcessing} className="transition-transform duration-150 ease-in-out hover:scale-110" title="Share on LinkedIn"><LinkedinIcon size={32} round /></button>
            <button onClick={() => handleShare('WhatsApp')} disabled={isProcessing} className="transition-transform duration-150 ease-in-out hover:scale-110" title="Share on WhatsApp"><WhatsappIcon size={32} round /></button>
            <button onClick={() => handleShare('Reddit')} disabled={isProcessing} className="transition-transform duration-150 ease-in-out hover:scale-110" title="Share on Reddit"><RedditIcon size={32} round /></button>
          </div>
        )}
      </div> */}
      {/* Hidden export container for clean PNG export */}
      <div ref={exportContainerRef} style={{ position: 'fixed', left: '-9999px', top: 0, width: 0, height: 0, overflow: 'hidden', pointerEvents: 'none', background: 'white' }} />
    </div>
  );
};

export default LabelActionBar;
