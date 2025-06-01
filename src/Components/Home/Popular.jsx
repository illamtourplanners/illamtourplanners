import React from 'react'

export const Popular = () => {
     const popularTours = [
        {
          id: 1,
          title: "Tea Garden Experience",
          description: "Explore the lush tea gardens of Ilam and learn about tea processing.",
          image: "https://img.freepik.com/free-photo/full-shot-travel-concept-with-landmarks_23-2149153258.jpg?semt=ais_hybrid&w=740"
        },
        {
          id: 2,
          title: "Mai Pokhari Trek",
          description: "Trek to the sacred lake Mai Pokhari through beautiful landscapes.",
          image: "https://static.toiimg.com/thumb/110879936/Trekking-tips.jpg?width=1200&height=900"
        },
        {
          id: 3,
          title: "Cultural Village Tour",
          description: "Experience the unique culture and traditions of Ilam's ethnic communities.",
          image: "https://storage.ghadiscovery.com/cdn-cgi/image/width=1920,f=auto,g=auto,fit=scale-down/img/images/7/4/1/9/479147-8-eng-GB/962b5b0ecf7d-thaba_bosiu_gha_image_1920x1080.jpg"
        }
      ];
  return (
    <div>
         <section className="py-24 bg-gradient-to-br from-gray-50 to-green-50 px-4 relative overflow-hidden">
  {/* Decorative elements */}
  <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-green-100 opacity-30 blur-3xl"></div>
  <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-green-200 opacity-20 blur-3xl"></div>
  
  <div className="max-w-7xl mx-auto relative z-10">
    {/* Section header */}
    <div className="text-center mb-20">
      <span className="inline-block text-green-600 font-medium tracking-widest text-sm mb-4">JOURNEY TO REMEMBER</span>
      <h2 className="text-5xl font-bold text-gray-900 mb-6 font-serif leading-tight">
        Discover Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-500">Exclusive Tours</span>
      </h2>
      <div className="flex justify-center">
        <div className="w-24 h-1 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full"></div>
      </div>
    </div>
    
    {/* Tours grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {popularTours.map((tour, index) => (
        <div 
          key={tour.id} 
          className="relative group overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500"
          data-aos="fade-up"
          data-aos-delay={index * 100}
        >
          {/* Image with overlay */}
          <div className="relative h-80 overflow-hidden">
            <img 
              src={tour.image} 
              alt={tour.title} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
            <div className="absolute top-0 left-0 w-full h-full border-8 border-white/10 group-hover:border-white/20 transition-all duration-500"></div>
            
            {/* Badge */}
            <span className="absolute top-5 right-5 bg-white/90 backdrop-blur-sm text-green-800 font-bold px-3 py-1 rounded-full text-sm shadow-sm">
              {tour.days} Days
            </span>
          </div>
          
          {/* Content */}
          <div className="absolute bottom-0 left-0 w-full p-6 text-white">
            <div className="transform transition-all duration-500 group-hover:-translate-y-2">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-2xl font-bold font-serif">{tour.title}</h3>
                <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
                  ${tour.price}
                </span>
              </div>
              
              <p className="text-white/90 mb-5 line-clamp-2">{tour.description}</p>
              
              <div className="flex justify-between items-center opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <svg 
                      key={i} 
                      className={`w-5 h-5 ${i < tour.rating ? 'text-yellow-400 fill-current' : 'text-white/30 fill-current'}`} 
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                  ))}
                  <span className="text-white/80 ml-1 text-sm">({tour.reviews})</span>
                </div>
                
                <button className="flex items-center justify-center w-10 h-10 rounded-full bg-white text-green-600 hover:bg-green-600 hover:text-white transition-all duration-300 group-[.active]:scale-110">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
          
          {/* Hover effect overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-green-600/80 via-green-600/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        </div>
      ))}
    </div>
    
    {/* CTA Button */}
    <div className="text-center mt-20" data-aos="fade-up" data-aos-delay="300">
      <button className="relative inline-flex items-center justify-center px-8 py-4 overflow-hidden font-medium tracking-wider text-green-600 rounded-full group">
        <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-green-600 rounded-full group-hover:w-56 group-hover:h-56"></span>
        <span className="absolute inset-0 w-full h-full -mt-1 rounded-full border-2 border-green-600"></span>
        <span className="relative flex items-center group-hover:text-white transition-colors duration-300">
          Explore All Destinations
          <svg className="w-5 h-5 ml-3 transition-transform duration-300 group-hover:translate-x-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
          </svg>
        </span>
      </button>
    </div>
  </div>
</section>
    </div>
  )
}
