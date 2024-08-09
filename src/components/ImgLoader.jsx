import React, { useState, useEffect } from 'react';
import { left,right } from '../assets';

const fetchInstagramData = async (userId) => {
  const url = `https://instagram-scraper-api2.p.rapidapi.com/v1.2/posts?username_or_id_or_url=${userId}`;
  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': 'dd63d613a8mshdfcd6c0c6021f89p1c6202jsn84b471023ef5',
      'x-rapidapi-host': 'instagram-scraper-api2.p.rapidapi.com'
    }
  };

  try {
    console.log("Fetch Instagram data called:");
    const response = await fetch(url, options);
    if (!response.ok) throw new Error('Network response was not ok');
    const result = await response.json();
    console.log("Logging insta posts api results: \n", result);
    return result;
  } catch (error) {
    console.error('Error fetching Instagram data:', error);
    return null;
  }
};

const downloadPosts = async (url) => {
  console.log("Downloading image from URL: ", url);
  const corsProxy = 'https://proxy.cors.sh/';
  try {
    const response = await fetch(corsProxy + url, {
      headers: {
        'x-cors-api-key': 'temp_94c8dd305abd2c94015e3a41b09eae70'
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

const ImgLoader = ({ userId }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imageUrls, setImageUrls] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await fetchInstagramData(userId);
      setPosts(data?.data.items || []);
      setLoading(false);
    };

    fetchData();
  }, [userId]);

  useEffect(() => {
    const fetchImages = async () => {
      if (posts.length > 0) {
        const urls = await Promise.all(
          posts.map(async post => {
            const url = post.thumbnail_url || post.video_url;
            return await downloadPosts(url);
          })
        );
        setImageUrls(urls);
      }
    };

    if (!loading) {
      fetchImages();
    }
  }, [posts, loading]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % imageUrls.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + imageUrls.length) % imageUrls.length);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full flex flex-col items-center mx-4 my-6" id='posts'>
      {imageUrls.length > 0 ? (
        <>
          <div className="flex justify-between w-full mt-4">
            <button onClick={handlePrev} className="py-2 rounded">
              <img src={left} className='w-20'/>
            </button>
            <img className="w-fit " src={imageUrls[currentIndex]} alt={`Instagram post ${currentIndex}`} />

            <button onClick={handleNext} className="px-4 py-2 rounded">
              <img src={right} className='w-20'/>
            </button>
          </div>
        </>
      ) : (
        <p>No images available</p>
      )}
    </div>
  );
};

export default ImgLoader;
