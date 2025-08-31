import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import { FunnelIcon } from '@heroicons/react/24/outline';
import { artworksAPI } from '../utils/api';
import { formatPrice, getMediumColor } from '../utils/helpers';

const Gallery = () => {
  const [filters, setFilters] = useState({
    medium: 'All',
    year: '',
    page: 1,
  });
  const [showFilters, setShowFilters] = useState(false);

  const { data: artworksData, isLoading, error } = useQuery(
    ['artworks', filters],
    () => artworksAPI.getAll({ ...filters, limit: 12 }),
    {
      select: (data) => data.data,
      keepPreviousData: true,
    }
  );

  const mediums = ['All', 'Oil Painting', 'Watercolor', 'Acrylic', 'Sketch', 'Digital'];
  const years = Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - i);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value,
      page: 1, // Reset to first page when filters change
    }));
  };

  const handlePageChange = (newPage) => {
    setFilters(prev => ({ ...prev, page: newPage }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Error Loading Gallery</h2>
          <p className="text-gray-600">Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-white shadow-sm">
        <div className="container-max section-padding">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-serif font-bold text-gray-900 mb-4">
              Art Gallery
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore our collection of beautiful artworks spanning various mediums and styles. 
              Each piece tells a unique story through color, texture, and artistic vision.
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="bg-white border-b border-gray-200">
        <div className="container-max py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex items-center justify-between lg:justify-start">
              <h2 className="text-lg font-semibold text-gray-900">
                {artworksData?.total || 0} Artworks
              </h2>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
              >
                <FunnelIcon className="h-5 w-5 mr-2" />
                Filters
              </button>
            </div>
            
            <div className={`${showFilters ? 'block' : 'hidden'} lg:block`}>
              <div className="flex flex-col lg:flex-row gap-4">
                {/* Medium Filter */}
                <div>
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
                </div>

                {/* Year Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Year
                  </label>
                  <select
                    value={filters.year}
                    onChange={(e) => handleFilterChange('year', e.target.value)}
                    className="select-field min-w-32"
                  >
                    <option value="">All Years</option>
                    {years.map(year => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Clear Filters */}
                {(filters.medium !== 'All' || filters.year) && (
                  <div className="flex items-end">
                    <button
                      onClick={() => setFilters({ medium: 'All', year: '', page: 1 })}
                      className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 underline"
                    >
                      Clear Filters
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="section-padding">
        <div className="container-max">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, index) => (
                <div key={index} className="card animate-pulse">
                  <div className="w-full h-64 bg-gray-300"></div>
                  <div className="p-6">
                    <div className="h-4 bg-gray-300 rounded mb-2"></div>
                    <div className="h-3 bg-gray-300 rounded mb-3 w-2/3"></div>
                    <div className="h-3 bg-gray-300 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : artworksData?.artworks?.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {artworksData.artworks.map((artwork, index) => (
                  <Link
                    key={artwork._id}
                    to={`/artwork/${artwork._id}`}
                    className="card-hover animate-slide-up"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <div className="relative">
                      <img
                        src={artwork.images[0]?.url || 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400'}
                        alt={artwork.title}
                        className="w-full h-64 object-cover"
                        loading="lazy"
                      />
                      {artwork.isForSale && artwork.price && (
                        <div className="absolute top-3 right-3 bg-primary-600 text-white px-2 py-1 rounded-md text-sm font-medium">
                          {formatPrice(artwork.price)}
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-2 line-clamp-1">
                        {artwork.title}
                      </h3>
                      <div className="flex items-center justify-between mb-3">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getMediumColor(artwork.medium)}`}>
                          {artwork.medium}
                        </span>
                        <span className="text-sm text-gray-500">{artwork.year}</span>
                      </div>
                      <p className="text-gray-600 text-sm line-clamp-2">
                        {artwork.description}
                      </p>
                      {artwork.size && (
                        <p className="text-gray-500 text-xs mt-2">
                          {artwork.size}
                        </p>
                      )}
                    </div>
                  </Link>
                ))}
              </div>

              {/* Pagination */}
              {artworksData.pagination && artworksData.pagination.pages > 1 && (
                <div className="flex justify-center mt-12">
                  <nav className="flex items-center space-x-2">
                    <button
                      onClick={() => handlePageChange(artworksData.pagination.current - 1)}
                      disabled={!artworksData.pagination.hasPrev}
                      className="px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Previous
                    </button>
                    
                    {Array.from({ length: artworksData.pagination.pages }, (_, i) => i + 1).map(page => (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`px-3 py-2 text-sm font-medium rounded-md ${
                          page === artworksData.pagination.current
                            ? 'bg-primary-600 text-white'
                            : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                    
                    <button
                      onClick={() => handlePageChange(artworksData.pagination.current + 1)}
                      disabled={!artworksData.pagination.hasNext}
                      className="px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next
                    </button>
                  </nav>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-16">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                No artworks found
              </h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your filters or check back later for new additions.
              </p>
              <button
                onClick={() => setFilters({ medium: 'All', year: '', page: 1 })}
                className="btn-primary"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Gallery;
