import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FunnelIcon } from '@heroicons/react/24/outline';
import { mockArtworks } from '../data/mockArtworks';
import { formatPrice, getMediumColor } from '../utils/helpers';
import ImageWithFallback from '../components/ImageWithFallback';

const Gallery = () => {
  const [filters, setFilters] = useState({
    medium: 'All',
    category: 'All',
    page: 1,
  });
  const [showFilters, setShowFilters] = useState(false);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.3,
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      scale: 0.9 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    hover: {
      y: -8,
      scale: 1.02,
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    }
  };

  const filterVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: { 
      opacity: 1, 
      height: "auto",
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  // Filter artworks based on selected filters
  const filteredArtworks = useMemo(() => {
    let filtered = mockArtworks.filter(artwork => artwork.isAvailable);
    
    if (filters.medium !== 'All') {
      filtered = filtered.filter(artwork => 
        artwork.medium.toLowerCase().includes(filters.medium.toLowerCase())
      );
    }
    
    if (filters.category !== 'All') {
      filtered = filtered.filter(artwork => artwork.category === filters.category);
    }
    
    return filtered;
  }, [filters]);

  const mediums = ['All', 'Oil', 'Acrylic', 'Mixed Media', 'Watercolor'];
  const categories = ['All', 'landscape', 'seascape', 'cityscape', 'portrait', 'abstract'];

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value,
      page: 1, // Reset to first page when filters change
    }));
  };

  return (
    <motion.div 
      className="min-h-screen bg-gray-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <motion.section 
        className="bg-white shadow-sm"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="container-max section-padding">
          <div className="text-center">
            <motion.h1 
              className="text-4xl lg:text-5xl font-serif font-bold text-gray-900 mb-4"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Art Gallery
            </motion.h1>
            <motion.p 
              className="text-xl text-gray-600 max-w-3xl mx-auto"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Explore our collection of beautiful artworks spanning various mediums and styles. 
              Each piece tells a unique story through color, texture, and artistic vision.
            </motion.p>
          </div>
        </div>
      </motion.section>

      {/* Filters */}
      <motion.section 
        className="bg-white border-b border-gray-200"
        variants={filterVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="container-max py-6 px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4"
            variants={containerVariants}
          >
            <motion.div 
              className="flex items-center justify-between lg:justify-start"
              variants={filterVariants}
            >
              <motion.h2 
                className="text-lg font-semibold text-gray-900"
                variants={filterVariants}
              >
                {filteredArtworks.length} Artworks
              </motion.h2>
              <motion.button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
                variants={filterVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FunnelIcon className="h-5 w-5 mr-2" />
                Filters
              </motion.button>
            </motion.div>
            
            <AnimatePresence>
              {(showFilters || window.innerWidth >= 1024) && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <motion.div 
                    className="flex flex-col lg:flex-row gap-4"
                    variants={containerVariants}
                  >
                    {/* Medium Filter */}
                    <motion.div variants={filterVariants}>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Medium
                      </label>
                      <select
                        value={filters.medium}
                        onChange={(e) => handleFilterChange('medium', e.target.value)}
                        className="select-field min-w-40"
                      >
                        {mediums.map(medium => (
                          <option key={medium} value={medium}>
                            {medium}
                          </option>
                        ))}
                      </select>
                    </motion.div>

                    {/* Category Filter */}
                    <motion.div variants={filterVariants}>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Category
                      </label>
                      <select
                        value={filters.category}
                        onChange={(e) => handleFilterChange('category', e.target.value)}
                        className="select-field min-w-32"
                      >
                        {categories.map(category => (
                          <option key={category} value={category}>
                            {category === 'All' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
                          </option>
                        ))}
                      </select>
                    </motion.div>

                    {/* Clear Filters */}
                    <AnimatePresence>
                      {(filters.medium !== 'All' || filters.category !== 'All') && (
                        <motion.div 
                          className="flex items-end"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 20 }}
                          transition={{ duration: 0.3 }}
                        >
                          <motion.button
                            onClick={() => setFilters({ medium: 'All', category: 'All', page: 1 })}
                            className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 underline"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            Clear Filters
                          </motion.button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </motion.section>

      {/* Gallery Grid */}
      <motion.section 
        className="section-padding"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="container-max">
          {filteredArtworks.length > 0 ? (
            <>
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <AnimatePresence>
                  {filteredArtworks.map((artwork, index) => (
                    <motion.div
                      key={artwork.id}
                      variants={cardVariants}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      custom={index}
                      whileHover={{ 
                        y: -8,
                        scale: 1.02,
                        transition: { duration: 0.3 }
                      }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Link
                        to={`/artwork/${artwork.id}`}
                        className="block bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                      >
                        <motion.div 
                          className="relative overflow-hidden"
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.4 }}
                        >
                          <ImageWithFallback
                            src={artwork.images.main}
                            fallback={artwork.images.fallback}
                            alt={artwork.title}
                            className="w-full h-64 object-cover transition-transform duration-300"
                            loading="lazy"
                          />
                          <motion.div 
                            className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-all duration-300"
                            whileHover={{ opacity: 1 }}
                          />
                          {artwork.isAvailable && artwork.price && (
                            <motion.div 
                              className="absolute top-3 right-3 bg-primary-600 text-white px-2 py-1 rounded-md text-sm font-medium"
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.3 + index * 0.1 }}
                            >
                              {formatPrice(artwork.price)}
                            </motion.div>
                          )}
                          {artwork.isFeatured && (
                            <motion.div 
                              className="absolute top-3 left-3 bg-amber-500 text-white px-2 py-1 rounded-md text-xs font-medium"
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.4 + index * 0.1 }}
                            >
                              Featured
                            </motion.div>
                          )}
                        </motion.div>
                        <motion.div 
                          className="p-4"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 + index * 0.05 }}
                        >
                          <motion.h3 
                            className="font-semibold text-gray-900 mb-2 line-clamp-1"
                            whileHover={{ color: '#6366F1' }}
                            transition={{ duration: 0.2 }}
                          >
                            {artwork.title}
                          </motion.h3>
                          <div className="flex items-center justify-between mb-3">
                            <motion.span 
                              className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getMediumColor(artwork.medium)}`}
                              whileHover={{ scale: 1.05 }}
                              transition={{ duration: 0.2 }}
                            >
                              {artwork.medium}
                            </motion.span>
                            <span className="text-sm text-gray-500">{artwork.yearCreated}</span>
                          </div>
                          <p className="text-gray-600 text-sm line-clamp-2">
                            {artwork.description}
                          </p>
                          <div className="flex items-center justify-between mt-2">
                            <p className="text-gray-500 text-xs">
                              {artwork.dimensions}
                            </p>
                            <span className="text-xs text-gray-400 capitalize">
                              {artwork.category}
                            </span>
                          </div>
                        </motion.div>
                      </Link>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            </>
          ) : (
            <motion.div 
              className="text-center py-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.h3 
                className="text-xl font-semibold text-gray-900 mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                No artworks found
              </motion.h3>
              <motion.p 
                className="text-gray-600 mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                Try adjusting your filters or check back later for new additions.
              </motion.p>
              <motion.button
                onClick={() => setFilters({ medium: 'All', category: 'All', page: 1 })}
                className="btn-primary"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Clear Filters
              </motion.button>
            </motion.div>
          )}
        </div>
      </motion.section>
    </motion.div>
  );
};

export default Gallery;
