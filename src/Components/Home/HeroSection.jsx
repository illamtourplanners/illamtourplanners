import React from 'react'

export const HeroSection = () => {
  return (
    <div>
<div className="relative h-[600px] overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <img 
          src="https://myholidayhappiness.com/uploads/kerala-8855.jpg" 
          alt="Ilam Tea Gardens" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center text-center px-4">
          <div className="max-w-3xl bg-opacity-50 p-8 rounded-lg">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Discover the Beauty of Vaidehi Holidays</h1>
            {/* <p className="text-xl text-white mb-6">Nepal's most scenic hill station</p> */}
           {/* <a href='/package'> <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300">
              Book a Tour
            </button></a> */}
          </div>
        </div>
      </div>
    </div>
  )
}
