import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useQuery, useMutation } from 'react-query';
import toast from 'react-hot-toast';
import { CloudArrowUpIcon, XMarkIcon, CalculatorIcon } from '@heroicons/react/24/outline';
import { commissionsAPI, settingsAPI } from '../utils/api';
import { formatPrice } from '../utils/helpers';

const Commission = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [pricePreview, setPricePreview] = useState(null);
  const [showShipping, setShowShipping] = useState(false);

  const { register, handleSubmit, watch, setValue, formState: { errors }, reset } = useForm({
    defaultValues: {
      size: 'M',
      medium: 'oil',
      numberOfPersons: 1,
    }
  });

  // Watch form values for price calculation
  const watchedValues = watch(['numberOfPersons', 'size']);

  // Get public settings for pricing
  const { data: settings } = useQuery(
    ['public-settings'],
    () => settingsAPI.getPublic(),
    {
      select: (data) => data.data,
    }
  );

  // Price calculation query
  const { data: priceData, refetch: refetchPrice } = useQuery(
    ['price-calculation', watchedValues[0], watchedValues[1]],
    () => commissionsAPI.getPriceCalculation({
      numberOfPersons: watchedValues[0],
      size: watchedValues[1],
    }),
    {
      select: (data) => data.data,
      enabled: !!(watchedValues[0] && watchedValues[1]),
    }
  );

  // Commission submission mutation
  const createCommissionMutation = useMutation(
    (data) => commissionsAPI.create(data),
    {
      onSuccess: (response) => {
        toast.success('Commission request submitted successfully!');
        reset();
        setSelectedFiles([]);
        setPricePreview(null);
      },
      onError: (error) => {
        toast.error(error.response?.data?.message || 'Failed to submit commission request');
      },
    }
  );

  // Update price preview when calculation data changes
  useEffect(() => {
    if (priceData) {
      setPricePreview(priceData);
    }
  }, [priceData]);

  const handleFileSelect = (event) => {
    const files = Array.from(event.target.files);
    const validFiles = files.filter(file => {
      if (file.size > 10 * 1024 * 1024) {
        toast.error(`File ${file.name} is too large. Maximum size is 10MB.`);
        return false;
      }
      if (!file.type.startsWith('image/')) {
        toast.error(`File ${file.name} is not an image.`);
        return false;
      }
      return true;
    });

    if (selectedFiles.length + validFiles.length > 5) {
      toast.error('Maximum 5 reference images allowed.');
      return;
    }

    setSelectedFiles(prev => [...prev, ...validFiles]);
    event.target.value = ''; // Reset input
  };

  const removeFile = (index) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const onSubmit = async (data) => {
    const formData = {
      ...data,
      referenceImages: selectedFiles,
      deadline: new Date(data.deadline).toISOString(),
    };

    if (showShipping && data.shippingStreet) {
      formData.shippingAddress = {
        street: data.shippingStreet,
        city: data.shippingCity,
        state: data.shippingState,
        zipCode: data.shippingZipCode,
        country: data.shippingCountry,
      };
    }

    // Remove shipping fields from main data
    delete formData.shippingStreet;
    delete formData.shippingCity;
    delete formData.shippingState;
    delete formData.shippingZipCode;
    delete formData.shippingCountry;

    createCommissionMutation.mutate(formData);
  };

  const minDate = new Date();
  minDate.setDate(minDate.getDate() + 7); // Minimum 7 days from now

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-white shadow-sm">
        <div className="container-max section-padding">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-serif font-bold text-gray-900 mb-4">
              Commission Custom Artwork
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Bring your vision to life with a custom painting. Fill out the form below 
              and we'll create a unique piece just for you.
            </p>
          </div>
        </div>
      </section>

      {/* Commission Form */}
      <section className="section-padding">
        <div className="container-max max-w-4xl">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Contact Information */}
            <div className="card p-8">
              <h2 className="text-2xl font-serif font-bold text-gray-900 mb-6">
                Contact Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    {...register('customerName', { 
                      required: 'Name is required',
                      minLength: { value: 2, message: 'Name must be at least 2 characters' }
                    })}
                    className="input-field"
                    placeholder="Your full name"
                  />
                  {errors.customerName && (
                    <p className="mt-1 text-sm text-red-600">{errors.customerName.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    {...register('email', { 
                      required: 'Email is required',
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: 'Please enter a valid email address'
                      }
                    })}
                    className="input-field"
                    placeholder="your.email@example.com"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number (Optional)
                  </label>
                  <input
                    type="tel"
                    {...register('phone')}
                    className="input-field"
                    placeholder="(555) 123-4567"
                  />
                </div>
              </div>
            </div>

            {/* Commission Details */}
            <div className="card p-8">
              <h2 className="text-2xl font-serif font-bold text-gray-900 mb-6">
                Commission Details
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Size *
                  </label>
                  <select
                    {...register('size', { required: 'Size is required' })}
                    className="select-field"
                  >
                    <option value="S">Small (16"x20")</option>
                    <option value="M">Medium (24"x30")</option>
                    <option value="L">Large (36"x48")</option>
                  </select>
                  {errors.size && (
                    <p className="mt-1 text-sm text-red-600">{errors.size.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Medium *
                  </label>
                  <select
                    {...register('medium', { required: 'Medium is required' })}
                    className="select-field"
                  >
                    <option value="oil">Oil Painting</option>
                    <option value="watercolor">Watercolor</option>
                    <option value="acrylic">Acrylic</option>
                    <option value="digital">Digital Art</option>
                  </select>
                  {errors.medium && (
                    <p className="mt-1 text-sm text-red-600">{errors.medium.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Number of Persons *
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    {...register('numberOfPersons', { 
                      required: 'Number of persons is required',
                      min: { value: 1, message: 'Minimum 1 person required' },
                      max: { value: 10, message: 'Maximum 10 persons allowed' }
                    })}
                    className="input-field"
                  />
                  {errors.numberOfPersons && (
                    <p className="mt-1 text-sm text-red-600">{errors.numberOfPersons.message}</p>
                  )}
                </div>
              </div>

              {/* Price Preview */}
              {pricePreview && (
                <div className="bg-primary-50 border border-primary-200 rounded-lg p-4 mb-6">
                  <div className="flex items-center">
                    <CalculatorIcon className="h-5 w-5 text-primary-600 mr-2" />
                    <span className="text-sm font-medium text-primary-800">
                      Estimated Price: <span className="text-lg font-bold">{formatPrice(pricePreview.totalPrice)}</span>
                    </span>
                  </div>
                  <div className="text-xs text-primary-700 mt-1">
                    {pricePreview.numberOfPersons} person(s) × {formatPrice(pricePreview.ratePerPerson)} × {pricePreview.sizeMultiplier}x (size multiplier)
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Deadline *
                </label>
                <input
                  type="date"
                  min={minDate.toISOString().split('T')[0]}
                  {...register('deadline', { 
                    required: 'Deadline is required',
                    validate: (value) => {
                      const selectedDate = new Date(value);
                      const minDate = new Date();
                      minDate.setDate(minDate.getDate() + 7);
                      return selectedDate >= minDate || 'Deadline must be at least 7 days from now';
                    }
                  })}
                  className="input-field"
                />
                {errors.deadline && (
                  <p className="mt-1 text-sm text-red-600">{errors.deadline.message}</p>
                )}
                <p className="mt-1 text-sm text-gray-500">
                  Please allow at least 7 days for commission completion
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description & Requirements *
                </label>
                <textarea
                  rows={4}
                  {...register('description', { 
                    required: 'Description is required',
                    minLength: { value: 10, message: 'Description must be at least 10 characters' }
                  })}
                  className="textarea-field"
                  placeholder="Please describe your vision in detail. Include information about style, colors, mood, composition, and any specific requirements..."
                />
                {errors.description && (
                  <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
                )}
              </div>
            </div>

            {/* Reference Images */}
            <div className="card p-8">
              <h2 className="text-2xl font-serif font-bold text-gray-900 mb-6">
                Reference Images
              </h2>
              
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <CloudArrowUpIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <div className="space-y-2">
                  <label className="cursor-pointer">
                    <span className="btn-primary">
                      Choose Files
                    </span>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleFileSelect}
                      className="sr-only"
                    />
                  </label>
                  <p className="text-sm text-gray-500">
                    Upload up to 5 reference images (Max 10MB each)
                  </p>
                </div>
              </div>

              {selectedFiles.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Selected Images ({selectedFiles.length}/5)
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {selectedFiles.map((file, index) => (
                      <div key={index} className="relative">
                        <img
                          src={URL.createObjectURL(file)}
                          alt={`Reference ${index + 1}`}
                          className="w-full h-24 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => removeFile(index)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                        >
                          <XMarkIcon className="h-4 w-4" />
                        </button>
                        <p className="text-xs text-gray-500 mt-1 truncate">
                          {file.name}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Shipping Information */}
            <div className="card p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-serif font-bold text-gray-900">
                  Shipping Information
                </h2>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={showShipping}
                    onChange={(e) => setShowShipping(e.target.checked)}
                    className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">
                    I need the artwork shipped
                  </span>
                </label>
              </div>

              {showShipping && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Street Address
                    </label>
                    <input
                      type="text"
                      {...register('shippingStreet')}
                      className="input-field"
                      placeholder="123 Main Street"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      City
                    </label>
                    <input
                      type="text"
                      {...register('shippingCity')}
                      className="input-field"
                      placeholder="City"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      State/Province
                    </label>
                    <input
                      type="text"
                      {...register('shippingState')}
                      className="input-field"
                      placeholder="State/Province"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      ZIP/Postal Code
                    </label>
                    <input
                      type="text"
                      {...register('shippingZipCode')}
                      className="input-field"
                      placeholder="12345"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Country
                    </label>
                    <input
                      type="text"
                      {...register('shippingCountry')}
                      className="input-field"
                      placeholder="Country"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                disabled={createCommissionMutation.isLoading}
                className="btn-primary text-lg px-8 py-4 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {createCommissionMutation.isLoading ? (
                  <>
                    <div className="loading-spinner w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                    Submitting...
                  </>
                ) : (
                  'Submit Commission Request'
                )}
              </button>
              
              {pricePreview && (
                <p className="mt-4 text-lg text-gray-600">
                  Estimated Total: <span className="font-bold text-primary-600">{formatPrice(pricePreview.totalPrice)}</span>
                </p>
              )}
              
              <p className="mt-2 text-sm text-gray-500">
                We'll review your request and contact you within 24-48 hours
              </p>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Commission;
