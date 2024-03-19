import React from 'react'

export default function NavbarSkeleton() {
  return (
    <div className='flex gap-3'>
        <div className="h-full w-24 bg-gray-100 animate-pulse rounded-lg p-3">
        </div>
        <div className="h-full w-24 bg-gray-100 animate-pulse rounded-lg p-3">
        </div>
        <div className="h-full w-24 bg-gray-100 animate-pulse rounded-lg p-3">
        </div>
        <div className="h-full w-24 bg-gray-100 animate-pulse rounded-lg p-3">
        </div>
        <div className="h-full w-24 bg-gray-100 animate-pulse rounded-lg p-3">
        </div>
    </div>
  )
}
