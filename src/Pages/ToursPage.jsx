import React from 'react';
import { axiosInstance } from '../config/axiosInstance';
import { useEffect } from 'react';

export default function WeddingGallery() {
  // Section titles

useEffect(()=>{
const fetchTours=async()=>{
  const respose=await axiosInstance.get('/tour/getall');
  console.log(respose.data.posts);
  
}
fetchTours()
},[])










  const sectionTitles = [
    "Ceremony Highlights",
    "Reception Moments",
    "Bridal Preparation"
  ];

  // Predefined layout pattern for each section (6 photos)
  const sectionPattern = [
    "col-span-2 row-span-2",       // Large square
    "col-span-1 row-span-1",       // Small square
    "col-span-1 row-span-1",       // Small square
    "col-span-1 row-span-1",       // Small square
    "col-span-1 row-span-1",       // Small square
    "col-span-2 md:col-span-4"     // Wide rectangle (full width on medium+)
  ];

  // Generate mock images
  const generateImages = (count) => {
    return Array.from({ length: count }, (_, i) => ({
      src: `https://picsum.photos/500/300?random=${i}`,
      alt: `Wedding Photo ${i + 1}`
    }));
  };

  // Split images into sections of 6
  const allImages = generateImages(18); // 3 sections x 6 images
  const imageSections = [];
  
  for (let i = 0; i < allImages.length; i += 6) {
    imageSections.push(allImages.slice(i, i + 6));
  }



  return (
    <div className="py-12 max-w-screen-xl mx-auto px-4">
      {imageSections.map((section, sectionIndex) => (
        <div key={sectionIndex} className="mb-20">
          {/* Section Heading */}
          <h2 className="text-3xl md:text-4xl font-serif text-center mb-12 text-rose-800">
            {sectionTitles[sectionIndex] || `Gallery Section ${sectionIndex + 1}`}
          </h2>
          
          {/* Image Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[150px] gap-4">
            {section.map((image, imageIndex) => (
              <div 
                key={imageIndex}
                className={`overflow-hidden rounded-xl shadow-lg transition-all duration-500 hover:shadow-xl ${sectionPattern[imageIndex]}`}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}