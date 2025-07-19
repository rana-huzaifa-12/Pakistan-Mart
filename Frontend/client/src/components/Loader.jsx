import React from 'react';

export default function Loader() {
    return (
        <div className="absolute inset-0 z-[50] flex flex-col items-center justify-center bg-gray-900 bg-opacity-20">
            <div className="w-12 h-12 border-4 border-dashed border-orange-500 rounded-full animate-spin mb-3"></div>
            <p className="text-orange-500 text-lg font-semibold animate-pulse">Loading...</p>
        </div>
    );
}
