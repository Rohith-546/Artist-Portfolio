import React from 'react';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-white shadow-sm">
        <div className="container-max section-padding">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-serif font-bold text-gray-900 mb-4">
              About the Artist
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Passionate about creating meaningful art that connects with people and tells stories through color, texture, and emotion.
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding">
        <div className="container-max max-w-4xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <img
                src="https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=600&h=400&fit=crop"
                alt="Artist at work"
                className="rounded-lg shadow-lg"
              />
            </div>
            <div>
              <h2 className="text-3xl font-serif font-bold text-gray-900 mb-6">
                My Artistic Journey
              </h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                With over a decade of experience in fine arts, I specialize in creating 
                emotionally resonant pieces that capture the beauty and complexity of life. 
                My work spans multiple mediums, from traditional oil and watercolor paintings 
                to contemporary digital art.
              </p>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Each piece I create is infused with passion and attention to detail, 
                whether it's a serene landscape, an intimate portrait, or an abstract 
                exploration of color and form. I believe art has the power to transform 
                spaces and touch hearts.
              </p>
              <div className="space-y-3">
                <div className="flex items-center">
                  <span className="font-semibold text-gray-900 w-24">Education:</span>
                  <span className="text-gray-600">MFA in Fine Arts</span>
                </div>
                <div className="flex items-center">
                  <span className="font-semibold text-gray-900 w-24">Experience:</span>
                  <span className="text-gray-600">10+ years</span>
                </div>
                <div className="flex items-center">
                  <span className="font-semibold text-gray-900 w-24">Mediums:</span>
                  <span className="text-gray-600">Oil, Watercolor, Acrylic, Digital</span>
                </div>
              </div>
            </div>
          </div>

          <div className="card p-8 text-center">
            <h2 className="text-2xl font-serif font-bold text-gray-900 mb-4">
              Commission Process
            </h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Working with me is a collaborative process. Here's how we bring your vision to life:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-bold">
                  1
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Consultation</h3>
                <p className="text-sm text-gray-600">
                  We discuss your vision, requirements, and timeline
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-bold">
                  2
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Sketching</h3>
                <p className="text-sm text-gray-600">
                  Initial sketches and composition planning
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-bold">
                  3
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Creation</h3>
                <p className="text-sm text-gray-600">
                  The artwork comes to life with regular progress updates
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-bold">
                  4
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Delivery</h3>
                <p className="text-sm text-gray-600">
                  Final artwork delivered with care and protection
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
