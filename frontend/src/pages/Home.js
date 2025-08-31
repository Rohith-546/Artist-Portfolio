import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon, PaintBrushIcon, SparklesIcon, HeartIcon } from '@heroicons/react/24/outline';
import { useQuery } from 'react-query';
import { artworksAPI } from '../utils/api';

const Home = () => {
  // Fetch featured artworks
  const { data: artworksData } = useQuery(
    ['featured-artworks'],
    () => artworksAPI.getAll({ limit: 6, isVisible: true }),
    {
      select: (data) => data.data,
    }
  );

  const features = [
    {
      icon: PaintBrushIcon,
      title: "Original Artworks",
      description: "Discover unique pieces created with passion and skill across various mediums including oil, watercolor, acrylic, and digital art."
    },
    {
      icon: SparklesIcon,
      title: "Custom Commissions",
      description: "Bring your vision to life with personalized artwork. From portraits to landscapes, we create pieces tailored to your specifications."
    },
    {
      icon: HeartIcon,
      title: "Made with Love",
      description: "Every piece is crafted with attention to detail and artistic integrity, ensuring you receive a work of art that truly speaks to you."
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-50 to-white section-padding">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <h1 className="text-5xl lg:text-6xl font-serif font-bold text-gray-900 mb-6">
                Where Art Meets
                <span className="text-gradient block">Imagination</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Discover a world of beautiful artworks and commission custom pieces 
                that capture your unique vision. From traditional paintings to digital 
                masterpieces, we bring your dreams to life through art.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/gallery" className="btn-primary">
                  View Gallery
                  <ArrowRightIcon className="ml-2 h-5 w-5" />
                </Link>
                <Link to="/commission" className="btn-outline">
                  Commission Artwork
                </Link>
              </div>
            </div>
            
            <div className="relative animate-slide-up">
              <div className="relative z-10">
                <img
                  src="https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=600&h=400&fit=crop"
                  alt="Featured Artwork"
                  className="rounded-lg shadow-2xl w-full h-96 object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 w-full h-full bg-gradient-to-br from-primary-200 to-primary-300 rounded-lg -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold text-gray-900 mb-4">
              Why Choose Our Art
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're passionate about creating meaningful art that connects with people. 
              Here's what makes our work special.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-6">
                  <feature.icon className="h-8 w-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Artworks Section */}
      {artworksData?.artworks?.length > 0 && (
        <section className="section-padding bg-gray-50">
          <div className="container-max">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-serif font-bold text-gray-900 mb-4">
                Featured Artworks
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Explore some of our most popular pieces, each telling its own unique story 
                through color, texture, and emotion.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {artworksData.artworks.slice(0, 6).map((artwork, index) => (
                <Link 
                  key={artwork._id} 
                  to={`/artwork/${artwork._id}`}
                  className="card-hover animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="aspect-w-4 aspect-h-3">
                    <img
                      src={artwork.images[0]?.url || 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400'}
                      alt={artwork.title}
                      className="w-full h-64 object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {artwork.title}
                    </h3>
                    <p className="text-gray-600 mb-3">
                      {artwork.medium} • {artwork.year}
                    </p>
                    <p className="text-gray-700 line-clamp-2">
                      {artwork.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <Link to="/gallery" className="btn-primary">
                View All Artworks
                <ArrowRightIcon className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-r from-primary-600 to-primary-800 text-white">
        <div className="container-max text-center">
          <h2 className="text-4xl font-serif font-bold mb-6">
            Ready to Commission Your Dream Artwork?
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
            Let's work together to create something beautiful and meaningful. 
            Whether it's a portrait, landscape, or abstract piece, we'll bring your vision to life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/commission" 
              className="inline-flex items-center px-8 py-3 bg-white text-primary-600 font-semibold rounded-md hover:bg-gray-100 transition-colors duration-200"
            >
              Start Your Commission
              <ArrowRightIcon className="ml-2 h-5 w-5" />
            </Link>
            <Link 
              to="/contact" 
              className="inline-flex items-center px-8 py-3 border-2 border-white text-white font-semibold rounded-md hover:bg-white hover:text-primary-600 transition-all duration-200"
            >
              Get In Touch
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
