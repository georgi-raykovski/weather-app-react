import React from 'react';
import Skeleton from 'react-loading-skeleton';

export const SkeletonCard = () => {
  return (
    <div className='grid custom-grid forecast-card p-2 rounded items-center lg:w-1/6 gap-2'>
      <Skeleton containerClassName='flex-1' />
      <div className='border-r lg:border-t lg:border-r-0 border-white self-stretch lg:h-auto lg:w-full opacity-30' />
      <Skeleton containerClassName='flex-1' />
      <Skeleton containerClassName='flex-1' />
      <div className='border-r lg:border-t lg:border-r-0 border-white self-stretch lg:h-auto lg:w-full opacity-30' />
      <div className='flex items-center justify-center lg:flex-col gap-2'>
        <Skeleton containerClassName='flex-1' />
        <Skeleton
          containerClassName='flex-1 self-center'
          circle
          height={45}
          width={45}
        />
      </div>
    </div>
  );
};
