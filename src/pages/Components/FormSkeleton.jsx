import React from 'react'

export default function FormSkeleton() {
  return (
    <div className='flex gap-6 flex-col mt-6'>
        <div className="h-full w-full bg-gray-100 animate-pulse rounded-lg p-6">
        </div>
        <div className="h-full w-full bg-gray-100 animate-pulse rounded-lg p-6">
        </div>
        <div className='flex justify-between'>
            <div className="h-full w-24  bg-gray-100 animate-pulse rounded-lg p-6">
            </div>
            <div className="h-full w-24 bg-gray-100 animate-pulse rounded-lg p-6">
            </div>
            <div className="h-full w-24 bg-gray-100 animate-pulse rounded-lg p-6">
            </div>
        </div>
        <div className="h-full w-full bg-gray-100 animate-pulse rounded-lg p-6">
        </div>
        <div className="h-full w-full bg-gray-100 animate-pulse rounded-lg p-6">
        </div>
        <div className="h-full w-full bg-gray-100 animate-pulse rounded-lg p-6">
        </div>
    </div>
  )
}
