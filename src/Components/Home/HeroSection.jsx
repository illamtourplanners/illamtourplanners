import React from 'react'

export const HeroSection = () => {
  return (
    <div>
<div className="relative h-[600px] overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <img 
          src="https://media.istockphoto.com/id/1473868732/photo/girl-friends-sitting-on-a-clifftop-viewpoint-and-admiring-view-of-majestic-flying-hot-air.jpg?s=612x612&w=0&k=20&c=2lPLwKH8se_8CEICqUHzwAm_LhXc7ypj7qfEGUyGlZc=" 
          alt="Ilam Tea Gardens" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center text-center px-4">
          <div className="max-w-3xl bg-opacity-50 p-8 rounded-lg">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Discover the Beauty of Ilam</h1>
            <p className="text-xl text-white mb-6">Nepal's most scenic hill station</p>
            <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300">
              Book a Tour
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
