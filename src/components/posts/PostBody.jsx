import { useState } from "react";

const PostBody = ({ poster, content }) => {
  const [isFullScreen, setIsFullScreen] = useState(false);

  const openFullScreen = () => {
    setIsFullScreen(true);
  };

  const closeFullScreen = () => {
    setIsFullScreen(false);
  };

  // Handle ESC key to close modal
  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      closeFullScreen();
    }
  };

  return (
    <>
      <div className="border-b border-[#3F3F3F] py-4 lg:py-5 lg:text-xl">
        {/* If Post has Image, Render this block */}
        <div className="flex items-center justify-center overflow-hidden">
          {poster && (
            <img
              src={`${import.meta.env.VITE_SERVER_BASE_URL}/${poster}`}
              alt="Post Image"
              className="h-64 w-full rounded-lg lg:h-96 lg:w-3/4 object-contain cursor-pointer hover:opacity-90 transition-opacity"
              onClick={openFullScreen}
            />
          )}
        </div>
        <p className="mb-4">{content ?? <span>No content available</span>}</p>
      </div>

      {/* Full Screen Modal */}
      {isFullScreen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 p-4"
          onClick={closeFullScreen}
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          <div className="relative max-w-screen max-h-screen">
            {/* Close button */}
            <button
              className="absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black bg-opacity-50 text-white hover:bg-opacity-70 transition-all cursor-pointer"
              onClick={closeFullScreen}
              aria-label="Close full screen"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Full screen image */}
            <img
              src={`${import.meta.env.VITE_SERVER_BASE_URL}/${poster}`}
              alt="Post Image - Full Screen"
              className="max-w-full max-h-full object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking on image
            />
          </div>
        </div>
      )}
    </>
  );
};

export default PostBody;
