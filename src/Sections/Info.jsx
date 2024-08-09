import React from 'react';

const Info = ({ userData }) => {
  const { username, biography } = userData;
  console.log(userData);
  
  return (
    <div className='p-0 m-0 flex flex-col items-start mt-6 md:mt-0 md:ml-3' id='info'>
      <div className="text-wrap px-4">
        <h2 className='py-2 font-bold font-poppins text-lg md:text-2xl md:flex md:items-center'>
          Username: <pre>{` ${username}`}</pre>
        </h2>
        <div className='flex space-x-4'>
        <h2 className='py-2 font-bold font-poppins text-lg md:text-2xl md:flex md:items-center'>
          Followers: <pre className='font-semibold'>{` ${userData.follower_count}`}</pre>
        </h2>
        <h2 className='py-2 font-bold font-poppins text-lg md:text-2xl md:flex md:items-center'>
          Following: <pre className='font-semibold'>{` ${userData.following_count}`}</pre>
        </h2>
        </div>
        <h2 className='py-2 font-bold font-poppins text-lg md:text-2xl md:flex md:items-center'>
          Posts: <pre className='font-semibold'>{` ${userData.media_count}`}</pre>
        </h2>
        <h2 className='py-2 text-wrap max-w-prose font-bold font-poppins text-lg md:text-2xl'>
          About: <p className='font-semibold'>{` ${biography}`}</p>
        </h2>        
      </div>
    </div>
  );
};

export default Info;
