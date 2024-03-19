import React from 'react'

export default function LoadingSkeleton() {
  return (
    <div>
        <div className="h-full w-full bg-gray-100 animate-pulse rounded-lg p-3">
            {/* Additional skeleton elements for other product properties (optional) */}
            Loading...
        </div>
    </div>
  )
}
