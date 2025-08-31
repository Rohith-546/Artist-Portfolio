import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeftIcon, TagIcon, CalendarIcon } from '@heroicons/react/24/outline';
import { getArtworkById } from '../data/mockArtworks';
import { formatPrice, getMediumColor } from '../utils/helpers';
import ImageWithFallback from '../components/ImageWithFallback';

const ArtworkDetail = () => {
  const { id } = useParams();
  const artwork = getArtworkById(id);

  if (!artwork) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Artwork Not Found</h2>
          <p className="text-gray-600 mb-6">The artwork you're looking for doesn't exist.</p>
          <Link to="/gallery" className="btn-primary">
            Back to Gallery
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <div className="bg-white border-b">
        <div className="container-max py-4">
          <Link 
            to="/gallery" 
            className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors duration-200"
          >
            <ArrowLeftIcon className="h-5 w-5 mr-2" />
            Back to Gallery
          </Link>
        </div>
      </div>

      {/* Artwork Detail */}
      <section className="section-padding">
        <div className="container-max max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Image Gallery */}
            <div>
              <div className="space-y-4">
                <div className="aspect-w-4 aspect-h-3">
                  <ImageWithFallback
                    src={artwork.images.main}
                    fallback={artwork.images.fallback}
                    alt={artwork.title}
                    className="w-full h-96 object-cover rounded-lg shadow-lg"
                  />
                </div>
                
                {artwork.images.thumbnails && artwork.images.thumbnails.length > 1 && (
                  <div className="grid grid-cols-3 gap-4">
                    {artwork.images.thumbnails.slice(1, 4).map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`${artwork.title} - View ${index + 2}`}
                        className="w-full h-24 object-cover rounded-lg shadow cursor-pointer hover:shadow-lg transition-shadow duration-200"
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Artwork Information */}
            <div>
              <div className="mb-6">
                <h1 className="text-4xl font-serif font-bold text-gray-900 mb-4">
                  {artwork.title}
                </h1>
                
                <div className="flex flex-wrap items-center gap-4 mb-6">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getMediumColor(artwork.medium)}`}>
                    <TagIcon className="h-4 w-4 mr-1" />
                    {artwork.medium}
                  </span>
                  
                  <span className="inline-flex items-center text-gray-600">
                    <CalendarIcon className="h-4 w-4 mr-1" />
                    {artwork.yearCreated}
                  </span>
                  
                  {artwork.isAvailable && artwork.price && (
                    <span className="text-2xl font-bold text-primary-600">
                      {formatPrice(artwork.price)}
                    </span>
                  )}
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-3">Description</h2>
                  <p className="text-gray-600 leading-relaxed">
                    {artwork.description}
                  </p>
                </div>

                {artwork.inspiration && (
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900 mb-3">Inspiration</h2>
                    <p className="text-gray-600 leading-relaxed">
                      {artwork.inspiration}
                    </p>
                  </div>
                )}

                {artwork.technique && (
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900 mb-3">Technique</h2>
                    <p className="text-gray-600 leading-relaxed">
                      {artwork.technique}
                    </p>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 mb-2">Medium</h3>
                    <p className="text-gray-600">{artwork.medium}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 mb-2">Dimensions</h3>
                    <p className="text-gray-600">{artwork.dimensions}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 mb-2">Year</h3>
                    <p className="text-gray-600">{artwork.yearCreated}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 mb-2">Category</h3>
                    <p className="text-gray-600 capitalize">{artwork.category}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 mb-2">Availability</h3>
                    <p className="text-gray-600">
                      {artwork.isForSale ? 'For Sale' : 'Not for Sale'}
                    </p>
                  </div>
                </div>

                {artwork.tags && artwork.tags.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 mb-2">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {artwork.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-800"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {artwork.isForSale && (
                  <div className="space-y-4 pt-6 border-t border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Interested in this piece?
                    </h3>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Link
                        to="/contact"
                        className="btn-primary"
                      >
                        Inquire About Purchase
                      </Link>
                      <Link
                        to="/commission"
                        className="btn-outline"
                      >
                        Commission Similar Work
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ArtworkDetail;
