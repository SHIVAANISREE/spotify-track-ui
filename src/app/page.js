"use client";

import { useState, useRef, useEffect } from "react";
import SongList from "./songList";

const artistsData = [
  { name: "A.R. Rahman", image: "/artists/A.R. Rahman.jpg" },
  { name: "Shankar Mahadevan", image: "/artists/Shankar Mahadevan.jpg" },
  { name: "Anirudh Ravichander", image: "/artists/Anirudh Ravichander.jpg" },
  { name: "Shreya Ghoshal", image: "/artists/Shreya Ghoshal.jpg" },
  { name: "Chinmayi", image: "/artists/Chinmayi.jpg" },
  { name: "S. P. Balasubrahmanyam", image: "/artists/S. P. Balasubrahmanyam.jpg" },
  { name: "K. S. Chithra", image: "/artists/K. S. Chithra.jpg" },
  { name: "G. V. Prakash", image: "/artists/G. V. Prakash.jpg" },
  { name: "Hariharan", image: "/artists/Hariharan.webp" },
  { name: "S. P. B. Charan", image: "/artists/S. P. B. Charan.jpg" },
  { name: "Sid Sriram", image: "/artists/Sid Sriram.webp" },
  { name: "Karthik", image: "/artists/Karthik.jpg" },
  { name: "Yuvan Shankar Raja", image: "/artists/Yuvan Shankar Raja.jpg" },
  { name: "Ilaiyaraaja", image: "/artists/Ilaiyaraaja.jpg" },
  { name: "Sujatha", image: "/artists/Sujatha.jpg" },
  { name: "Shweta Mohan", image: "/artists/Shweta Mohan.jpg" },
];

export default function Home() {
  const [selectedArtist, setSelectedArtist] = useState(null);
  const scrollRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  // Check if scroll arrows should be displayed
  const checkScrollPosition = () => {
    if (!scrollRef.current) return;
    
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setShowLeftArrow(scrollLeft > 0);
    setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
  };

  useEffect(() => {
    const scrollElement = scrollRef.current;
    if (scrollElement) {
      scrollElement.addEventListener('scroll', checkScrollPosition);
      // Check initially
      checkScrollPosition();
      return () => scrollElement.removeEventListener('scroll', checkScrollPosition);
    }
  }, []);

  const scrollCarousel = (direction) => {
    if (!scrollRef.current) return;
    
    const scrollAmount = 300; // Adjust as needed
    const newPosition = scrollRef.current.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount);
    scrollRef.current.scrollTo({
      left: newPosition,
      behavior: 'smooth'
    });
  };

  return (
    <div className="min-h-screen bg-gray-800 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold mb-12 text-center text-white tracking-tight">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
            🎵 Top Indian Artists
          </span>
        </h1>

        {/* Artist Carousel with Custom Scroll Controls */}
        <div className="relative mb-12">
          {showLeftArrow && (
            <button 
              onClick={() => scrollCarousel('left')}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-gray-900/70 hover:bg-gray-900 rounded-full p-3 shadow-lg text-pink-400"
              aria-label="Scroll left"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6"/>
              </svg>
            </button>
          )}
          
          <div 
            ref={scrollRef} 
            className="flex space-x-6 overflow-x-auto pb-6 pt-4 px-2 scrollbar-hide"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {artistsData.map((artist) => (
              <div
                key={artist.name}
                className={`min-w-[200px] cursor-pointer flex-shrink-0 transition-all duration-300 ${
                  selectedArtist === artist.name ? 'ring-2 ring-pink-500 scale-105' : ''
                }`}
                onClick={() => setSelectedArtist(artist.name)}
              >
                <div className="bg-gray-900 rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl hover:shadow-pink-500/20 transition duration-300">
                  <div className="h-56 overflow-hidden">
                    <img
                      src={artist.image}
                      alt={artist.name}
                      className="h-full w-full object-cover transform hover:scale-110 transition duration-700"
                    />
                  </div>
                  <div className="p-4 text-center font-medium text-gray-200">
                    {artist.name}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {showRightArrow && (
            <button 
              onClick={() => scrollCarousel('right')}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-gray-900/70 hover:bg-gray-900 rounded-full p-3 shadow-lg text-pink-400"
              aria-label="Scroll right"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6"/>
              </svg>
            </button>
          )}
        </div>

        {selectedArtist && (
          <div className="mt-8 animate-fadeIn">
            <SongList artistName={selectedArtist} />
          </div>
        )}
        
        {!selectedArtist && (
          <div className="text-center text-gray-300 mt-12 p-10 bg-gray-900/50 backdrop-blur-sm rounded-xl shadow-md border border-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-4 text-pink-400">
              <path d="M9 18V5l12-2v13"></path>
              <circle cx="6" cy="18" r="3"></circle>
              <circle cx="18" cy="16" r="3"></circle>
            </svg>
            <p className="text-xl font-medium mb-2">Select an artist to explore their music</p>
            <p className="text-gray-400">Discover top tracks from renowned Indian artists</p>
          </div>
        )}
      </div>
    </div>
  );
}