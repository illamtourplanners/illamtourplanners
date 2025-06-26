import React from 'react'
export const Popular = () => {
  const popularTours = [
    {
      id: 1,
      title: "Tea Garden Experience",
      description: "Explore the lush tea gardens of Ilam and learn about tea processing from local experts.",
      image: "https://img.freepik.com/free-photo/full-shot-travel-concept-with-landmarks_23-2149153258.jpg?semt=ais_hybrid&w=740",
      days: 3,
      price: 299,
      rating: 4.8,
      reviews: 128,
      category: "Nature"
    },
    {
      id: 2,
      title: "Mai Pokhari Trek",
      description: "Trek to the sacred lake Mai Pokhari through beautiful Himalayan landscapes.",
      image: "https://static.toiimg.com/thumb/110879936/Trekking-tips.jpg?width=1200&height=900",
      days: 5,
      price: 499,
      rating: 5.0,
      reviews: 256,
      category: "Adventure"
    },
    {
      id: 3,
      title: "Cultural Village Tour",
      description: "Immerse yourself in the unique traditions of Ilam's ethnic communities.",
      image: "https://storage.ghadiscovery.com/cdn-cgi/image/width=1920,f=auto,g=auto,fit=scale-down/img/images/7/4/1/9/479147-8-eng-GB/962b5b0ecf7d-thaba_bosiu_gha_image_1920x1080.jpg",
      days: 2,
      price: 199,
      rating: 4.5,
      reviews: 87,
      category: "Culture"
    }
  ];

  return (
    <section className="py-20 bg-gray-50 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-sm font-medium text-emerald-600 mb-3 tracking-wider">
            DISCOVER NEPAL
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Popular <span className="text-emerald-600">Experiences</span>
          </h2>
          <p className="max-w-2xl mx-auto text-gray-600 text-lg">
            Curated journeys that showcase the best of our region's natural beauty and cultural heritage
          </p>
        </div>

        {/* Tours Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {popularTours.map((tour) => (
            <div 
              key={tour.id}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 group"
            >
              {/* Image with category badge */}
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={tour.image} 
                  alt={tour.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute bottom-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    tour.category === "Adventure" ? "bg-orange-100 text-orange-800" :
                    tour.category === "Nature" ? "bg-green-100 text-green-800" :
                    "bg-purple-100 text-purple-800"
                  }`}>
                    {tour.category}
                  </span>
                </div>
              </div>

              {/* Tour Content */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold text-gray-900">{tour.title}</h3>
                  <span className="text-emerald-600 font-bold">${tour.price}</span>
                </div>

                <p className="text-gray-600 mb-4">{tour.description}</p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex mr-2">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-4 h-4 ${i < Math.floor(tour.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-sm text-gray-500">
                      {tour.rating} ({tour.reviews} reviews)
                    </span>
                  </div>

                  <span className="text-sm text-gray-500">{tour.days} days</span>
                </div>

                <button className="mt-6 w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition-colors duration-300 flex items-center justify-center">
                  Book Now
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <button className="px-8 py-3 border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white font-medium rounded-full transition-colors duration-300 inline-flex items-center">
            View All Tours
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}