export async function fetchTracksByArtist(artistName) {
    try {
      const res = await fetch(`http://localhost:8000/fetch-track-by-artist?artist_name=${artistName}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      const data = await res.json();
      return data.top_tracks || [];
    } catch (err) {
      console.error("Error fetching tracks:", err);
      return [];
    }
  }
  