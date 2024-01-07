import React from 'react';
import Skeleton from 'react-loading-skeleton';
import { SkeletonCard } from './SkeletonCard';

export const SkeletonComponent = () => {
  return (
    <>
      <div className='max-w-sm mt-8'>
      <h2 className='text-xl mb-2'>Current Weather</h2>
        <div className='flex gap-8'>
          <div className='flex-1'>
            <Skeleton containerClassName='flex-1' />
            <div className='flex gap-1'>
              <Skeleton containerClassName='flex-1 self-center' />
              <Skeleton circle width={50} height={50} />
            </div>
          </div>
          <Skeleton containerClassName='flex-1 h-full' height={60} />
        </div>
      </div>
      <div className='mt-8 flex flex-col gap-2'>
        <h2 className='text-xl'>5-Day Weather Forecast</h2>
        <div className='flex justify-between mt-2'>
          {Array.from({ length: 5 }).map((_, idx) => (
            <SkeletonCard key={idx} />
          ))}
        </div>
      </div>
    </>
  );
};
