import React from 'react';
import Skeleton from 'react-loading-skeleton';

export const SkeletonCard = () => {
  return (
    <div className='flex flex-col forecast-card p-4 w-1/6'>
      <Skeleton containerClassName='flex-1' />
      <div className='border-t border-white w-full my-2 opacity-30' />
      <Skeleton containerClassName='flex-1' />
      <Skeleton containerClassName='flex-1' />
      <div className='border-t border-white w-full my-2 opacity-30' />
      <Skeleton containerClassName='flex-1' />
      <Skeleton containerClassName='flex-1 self-center' circle height={50} width={50}/>
    </div>
  );
};
