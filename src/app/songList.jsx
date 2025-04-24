"use client";

import { useEffect, useState } from "react";
import { fetchTracksByArtist } from "./apiService";

export default function SongList({ artistName }) {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSongs() {
      try {
        setLoading(true);
        const data = await fetchTracksByArtist(artistName);
        setSongs(data || []);
      } catch (error) {
        console.error("Error fetching songs", error);
      } finally {
        setLoading(false);
      }
    }

    fetchSongs();
  }, [artistName]);

  return (
    <div className="mt-4 bg-gray-900/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-gray-700">
      <h2 className="text-3xl font-bold mb-8 text-white text-center">
        <span className="relative">
          Top Tracks by {artistName}
          <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-pink-500"></span>
        </span>
      </h2>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-16">
          <div className="w-16 h-16 border-4 border-pink-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-pink-400 font-medium">Loading tracks...</p>
        </div>
      ) : songs.length > 0 ? (
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {songs.map((song, index) => (
            <div
              key={index}
              className="bg-gray-900 p-6 rounded-xl shadow-md hover:shadow-xl hover:shadow-pink-500/20 transition-all duration-300 border border-gray-700 transform hover:-translate-y-1"
            >
              <div className="flex justify-between items-start mb-4">
                <p className="text-xl font-bold text-white line-clamp-2">{song["Track Name"]}</p>
                <span className="bg-gray-800 text-pink-400 text-xs px-3 py-1 rounded-full font-medium">
                  {song.Popularity}/100
                </span>
              </div>
              
              <p className="text-sm text-gray-400 mb-3 italic">{song.Album}</p>
              
              <div className="flex items-center text-sm text-gray-400 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-gray-500">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
                {song["Duration (min)"]} mins
              </div>
              
              <button
                className="w-full mt-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-4 py-3 rounded-lg text-sm font-medium flex items-center justify-center transition-all duration-300"
                onClick={() => window.open(song["Spotify URL"], "_blank")}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                  <polygon points="5 3 19 12 5 21 5 3"></polygon>
                </svg>
                Play on Spotify
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-300 py-16 bg-gray-800 rounded-xl border border-gray-700">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-4 text-gray-500">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
          <p className="text-xl font-medium mb-2">
            No tracks found for {artistName}
          </p>
          <p className="text-gray-400">
            Try selecting another artist
          </p>
        </div>
      )}
    </div>
  );
}