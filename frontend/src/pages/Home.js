import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRightIcon, PaintBrushIcon, SparklesIcon, HeartIcon } from '@heroicons/react/24/outline';
import { getFeaturedArtworks } from '../data/mockArtworks';
import ImageWithFallback from '../components/ImageWithFallback';

const Home = () => {
  // Get featured artworks from mock data
  const featuredArtworks = getFeaturedArtworks();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

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
    <motion.div 
      className="min-h-screen"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Hero Section */}
      <motion.section 
        className="relative bg-gradient-to-br from-primary-50 to-white section-padding"
        variants={itemVariants}
      >
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div variants={containerVariants}>
              <motion.h1 
                className="text-5xl lg:text-6xl font-serif font-bold text-gray-900 mb-6"
                variants={itemVariants}
              >
                Where Art Meets
                <motion.span 
                  className="text-gradient block"
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  Imagination
                </motion.span>
              </motion.h1>
              <motion.p 
                className="text-xl text-gray-600 mb-8 leading-relaxed"
                variants={itemVariants}
              >
                Discover a world of beautiful artworks and commission custom pieces 
                that capture your unique vision. From traditional paintings to digital 
                masterpieces, we bring your dreams to life through art.
              </motion.p>
              <motion.div 
                className="flex flex-col sm:flex-row gap-4"
                variants={itemVariants}
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link to="/gallery" className="btn-primary">
                    View Gallery
                    <ArrowRightIcon className="ml-2 h-5 w-5" />
                  </Link>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link to="/commission" className="btn-outline">
                    Commission Artwork
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>
            
            <motion.div 
              className="relative"
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div 
                className="relative z-10"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <img
                  src="https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=600&h=400&fit=crop"
                  alt="Featured Artwork"
                  className="rounded-lg shadow-2xl w-full h-96 object-cover"
                />
              </motion.div>
              <motion.div 
                className="absolute -bottom-4 -right-4 w-full h-full bg-gradient-to-br from-primary-200 to-primary-300 rounded-lg -z-10"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              />
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section 
        className="section-padding bg-white"
        variants={itemVariants}
      >
        <div className="container-max">
          <motion.div 
            className="text-center mb-16"
            variants={containerVariants}
          >
            <motion.h2 
              className="text-4xl font-serif font-bold text-gray-900 mb-4"
              variants={itemVariants}
            >
              Why Choose Our Art
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-600 max-w-3xl mx-auto"
              variants={itemVariants}
            >
              We're passionate about creating meaningful art that connects with people. 
              Here's what makes our work special.
            </motion.p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={containerVariants}
          >
            {features.map((feature, index) => (
              <motion.div 
                key={index} 
                className="text-center"
                variants={itemVariants}
                custom={index}
                whileHover={{ y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div 
                  className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-6"
                  whileHover={{ 
                    scale: 1.1,
                    backgroundColor: '#6366F1',
                    transition: { duration: 0.3 }
                  }}
                >
                  <feature.icon className="h-8 w-8 text-primary-600" />
                </motion.div>
                <motion.h3 
                  className="text-xl font-semibold text-gray-900 mb-4"
                  variants={itemVariants}
                >
                  {feature.title}
                </motion.h3>
                <motion.p 
                  className="text-gray-600 leading-relaxed"
                  variants={itemVariants}
                >
                  {feature.description}
                </motion.p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Featured Artworks Section */}
      {featuredArtworks.length > 0 && (
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
              {featuredArtworks.map((artwork, index) => (
                <Link 
                  key={artwork.id} 
                  to={`/artwork/${artwork.id}`}
                  className="card-hover animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="aspect-w-4 aspect-h-3">
                    <ImageWithFallback
                      src={artwork.images.main}
                      fallback={artwork.images.fallback}
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
    </motion.div>
  );
};

export default Home;
