import React, { useState, useEffect } from 'react'; // Added useEffect import
import ImgLoader from '../components/ImgLoader';
import { user } from '../assets'; // Assuming you have a placeholder user image
import Info from './Info';

const fetchInstagramData = async (userId) => {
  const url = `https://instagram-scraper-api2.p.rapidapi.com/v1/info?username_or_id_or_url=${userId}`;
  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': import.meta.env.VITE_KEY_RAPID_API,
      'x-rapidapi-host': 'instagram-scraper-api2.p.rapidapi.com'
    }
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) throw new Error('Network response was not ok');
    const result = await response.json();
    console.log(result.data.is_private);
    return result;
  } catch (error) {
    console.error('Error fetching Instagram data:', error);
    return null;
  }
};

const downloadImage = async (url) => {
  const corsProxy = 'https://proxy.cors.sh/';
  try {
    const response = await fetch(corsProxy + url, {
      headers: {
        'x-cors-api-key':  import.meta.env.VITE_KEY_CORS_API_KEY
      }
    });
    if (!response.ok) throw new Error('Network response was not ok');
    const blob = await response.blob();
    const imageUrl = URL.createObjectURL(blob);
    return imageUrl;
  } catch (error) {
    console.error('Error downloading image:', error);
    return null;
  }
};

const Home = ({ onLoad }) => { // Added onLoad prop
  const [userData, setUserData] = useState(null);
  const [userId, setUserId] = useState('');
  const [loading, setLoading] = useState(false);
  const [imageSrc, setImageSrc] = useState(user);
  const [currentUserId, setCurrentUserId] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = await fetchInstagramData(userId);
    setUserData(data?.data || null);

    if (data?.data?.profile_pic_url_hd) {
      const downloadedImage = await downloadImage(data.data.profile_pic_url_hd);
      setImageSrc(downloadedImage || user);
    }

    setLoading(false);
    if (userId !== currentUserId) {
      setCurrentUserId(userId);
    }
  };

  useEffect(() => { // Added useEffect to call onLoad when loading is false and userData exists
    if (!loading && userData) {
      onLoad(true); // Call onLoad with true to indicate Home has finished loading
    }
  }, [loading, userData, onLoad]);

  return (
    <div className='lg:mb-10 p-4 ' id='home'>
      <form onSubmit={handleSubmit} className="flex flex-col md:flex-row items-center justify-center mt-6 mb-3 space-y-2 md:space-y-0 md:space-x-2">
        <input
          type="text"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          placeholder="Enter Instagram user ID"
          className="p-2 border border-gray-400 rounded"
        />
        <button type="submit" className="p-2 bg-secondary hover:bg-gray-700 text-white  rounded">
          Fetch Data
        </button>
      </form>
      {loading && <div className="text-center mt-8">
        Loading . . .
      </div>}
      {userData && (
       <div className='container mx-auto p-8'>
         <div className="flex flex-col md:flex-row items-center md:items-start">
          <div className="flex flex-col items-center max-w-full md:max-w-prose px-4 m-2">
            <img
              src={imageSrc}
              alt="User Profile"
              className="w-48 md:w-60 rounded-full"
              onLoad={() => { onLoad(true); }} // Call onLoad with true when the image is fully loaded
              onError={(e) => { e.target.onerror = null; e.target.src = user; }} // Fallback image
            />
            <a href={`https://www.instagram.com/${userId}/`} className='mt-4 bg-[#D1C8C1] px-8 py-1 font-poppins font-medium hover:font-semibold'>PROFILE</a>
          </div>
          <Info userData={userData} />
        </div>
        {!userData.is_private ? <ImgLoader userId={currentUserId} /> : <h2 className='translate-x-5 translate-y-5 font-poppins font-semibold px-4 lg:px-8 text-xl text-secondary'>This Account is private</h2>}
       </div>
      )}
    </div>
  );
};

export default Home;
