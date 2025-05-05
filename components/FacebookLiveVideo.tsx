import React from "react";

interface FacebookLiveVideoProps {
  videoUrl: string; // This is the full Facebook live video URL
  width?: string;
  height?: string;
}

const FacebookLiveVideo: React.FC<FacebookLiveVideoProps> = ({
  videoUrl,
  width = "100%",
  height = "500px",
}) => {
  const encodedUrl = encodeURIComponent(videoUrl);

  return (
    <div className="w-full flex justify-center items-center my-6">
      <iframe
        src={`https://www.facebook.com/plugins/video.php?href=${encodedUrl}&show_text=false&autoplay=true`}
        width={width}
        height={height}
        style={{ border: "none", overflow: "hidden" }}
        scrolling="no"
        frameBorder="0"
        allowFullScreen
        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
      ></iframe>
    </div>
  );
};

export default FacebookLiveVideo;
