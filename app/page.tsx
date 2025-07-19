'use client'

import React, { useState, useEffect } from 'react'

export default function Home() {
  const [displayText, setDisplayText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showReportView, setShowReportView] = useState(false)
  const [streetNumber, setStreetNumber] = useState('')
  const [streetName, setStreetName] = useState('')
  const [streetSuffix, setStreetSuffix] = useState('')
  const fullText = "let's get started."

  useEffect(() => {
    if (currentIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + fullText[currentIndex])
        setCurrentIndex(prev => prev + 1)
      }, 100)
      return () => clearTimeout(timeout)
    }
  }, [currentIndex, fullText])

  const handleGenerateReport = () => {
    setShowReportView(true)
  }

  const handleBackToHome = () => {
    setShowReportView(false)
  }

  // Report Generation View
  if (showReportView) {
    return (
      <main className="min-h-screen bg-plottwist-dark-bg text-plottwist-dark-text">
        {/* Animated Background */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-mesh rounded-full blur-3xl animate-float"></div>
            <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-mesh rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-mesh rounded-full blur-3xl animate-float" style={{animationDelay: '4s'}}></div>
          </div>
        </div>

        {/* Header */}
        <div className="relative z-10 max-w-7xl w-full mx-auto px-6 py-8">
          <div className="flex justify-between items-center">
            <button
              onClick={handleBackToHome}
              className="flex items-center space-x-2 text-plottwist-dark-text hover:text-plottwist-tech-blue transition-colors duration-300"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span>Back to Home</span>
            </button>
            <div></div>
          </div>
        </div>

        {/* Property Details Content */}
        <div className="relative flex flex-col items-center px-6 pt-16">
          <div className="text-center mb-16 animate-slide-up">
            <h1 className="text-6xl md:text-7xl font-bold mb-6 text-plottwist-dark-text">
              Property Report
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed text-plottwist-dark-text/80">
              {streetNumber && streetName && streetSuffix ? `${streetNumber} ${streetName} ${streetSuffix}, Boston, MA` : 'Property Details'}
            </p>
          </div>

          {/* Property Details Grid */}
          <div className="w-full max-w-6xl animate-fade-in" style={{animationDelay: '0.5s'}}>
            <div className="bg-plottwist-dark-surface/50 backdrop-blur-sm rounded-3xl p-8 border border-plottwist-tech-blue/20">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Section 1: Parcel Overview */}
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-plottwist-tech-blue mb-6">Parcel Overview</h2>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-3 border-b border-plottwist-tech-blue/20">
                      <span className="text-plottwist-dark-text/80 font-medium">Parcel ID:</span>
                      <span className="text-plottwist-dark-text font-semibold">x</span>
                    </div>
                    
                    <div className="flex justify-between items-center py-3 border-b border-plottwist-tech-blue/20">
                      <span className="text-plottwist-dark-text/80 font-medium">Address:</span>
                      <span className="text-plottwist-dark-text font-semibold">x</span>
                    </div>
                    
                    <div className="flex justify-between items-center py-3 border-b border-plottwist-tech-blue/20">
                      <span className="text-plottwist-dark-text/80 font-medium">Lot Size:</span>
                      <span className="text-plottwist-dark-text font-semibold">x</span>
                    </div>
                    
                    <div className="flex justify-between items-center py-3 border-b border-plottwist-tech-blue/20">
                      <span className="text-plottwist-dark-text/80 font-medium">Existing Structure:</span>
                      <span className="text-plottwist-dark-text font-semibold">x</span>
                    </div>
                    
                    <div className="flex justify-between items-center py-3 border-b border-plottwist-tech-blue/20">
                      <span className="text-plottwist-dark-text/80 font-medium">Year Built:</span>
                      <span className="text-plottwist-dark-text font-semibold">x</span>
                    </div>
                    
                    <div className="flex justify-between items-center py-3 border-b border-plottwist-tech-blue/20">
                      <span className="text-plottwist-dark-text/80 font-medium">Parking:</span>
                      <span className="text-plottwist-dark-text font-semibold">x</span>
                    </div>
                    
                    <div className="flex justify-between items-center py-3 border-b border-plottwist-tech-blue/20">
                      <span className="text-plottwist-dark-text/80 font-medium">Owner:</span>
                      <span className="text-plottwist-dark-text font-semibold">x</span>
                    </div>
                    
                    <div className="flex justify-between items-center py-3 border-b border-plottwist-tech-blue/20">
                      <span className="text-plottwist-dark-text/80 font-medium">Owner Mailing Address:</span>
                      <span className="text-plottwist-dark-text font-semibold">x</span>
                    </div>
                  </div>
                </div>

                {/* Section 2: Zoning Information */}
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-plottwist-pink mb-6">Zoning Information</h2>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-3 border-b border-plottwist-pink/20">
                      <span className="text-plottwist-dark-text/80 font-medium">Zoning District:</span>
                      <span className="text-plottwist-dark-text font-semibold">x</span>
                    </div>
                    
                    <div className="flex justify-between items-center py-3 border-b border-plottwist-pink/20">
                      <span className="text-plottwist-dark-text/80 font-medium">Zoning Code Source:</span>
                      <span className="text-plottwist-dark-text font-semibold">x</span>
                    </div>
                    
                    <div className="flex justify-between items-center py-3 border-b border-plottwist-pink/20">
                      <span className="text-plottwist-dark-text/80 font-medium">Zoning Map:</span>
                      <span className="text-plottwist-dark-text font-semibold">x</span>
                    </div>
                    
                    <div className="flex justify-between items-center py-3 border-b border-plottwist-pink/20">
                      <span className="text-plottwist-dark-text/80 font-medium">Allowed Use (By-Right):</span>
                      <span className="text-plottwist-dark-text font-semibold">x</span>
                    </div>
                    
                    <div className="flex justify-between items-center py-3 border-b border-plottwist-pink/20">
                      <span className="text-plottwist-dark-text/80 font-medium">Overlay:</span>
                      <span className="text-plottwist-dark-text font-semibold">x</span>
                    </div>
                  </div>
                </div>

                {/* Section 3: Dimensional Requirements */}
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-plottwist-tech-blue-light mb-6">Dimensional Requirements</h2>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-3 border-b border-plottwist-tech-blue-light/20">
                      <span className="text-plottwist-dark-text/80 font-medium">Max Height:</span>
                      <span className="text-plottwist-dark-text font-semibold">x</span>
                    </div>
                    
                    <div className="flex justify-between items-center py-3 border-b border-plottwist-tech-blue-light/20">
                      <span className="text-plottwist-dark-text/80 font-medium">Min Lot Area:</span>
                      <span className="text-plottwist-dark-text font-semibold">x</span>
                    </div>
                    
                    <div className="flex justify-between items-center py-3 border-b border-plottwist-tech-blue-light/20">
                      <span className="text-plottwist-dark-text/80 font-medium">Min Lot Width:</span>
                      <span className="text-plottwist-dark-text font-semibold">x</span>
                    </div>
                    
                    <div className="flex justify-between items-center py-3 border-b border-plottwist-tech-blue-light/20">
                      <span className="text-plottwist-dark-text/80 font-medium">Front Setback:</span>
                      <span className="text-plottwist-dark-text font-semibold">x</span>
                    </div>
                    
                    <div className="flex justify-between items-center py-3 border-b border-plottwist-tech-blue-light/20">
                      <span className="text-plottwist-dark-text/80 font-medium">FAR:</span>
                      <span className="text-plottwist-dark-text font-semibold">x</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Predictive Analytics Section */}
        <div className="w-full max-w-6xl mt-12 mx-auto">
          <div className="bg-plottwist-dark-surface/50 backdrop-blur-sm rounded-3xl p-8 border border-plottwist-pink/20">
          </div>
        </div>

        {/* Floating particles */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-1.5 h-1.5 rounded-full animate-bounce-slow opacity-40 ${
                i % 4 === 0 ? 'bg-plottwist-pink/20' : 
                i % 4 === 1 ? 'bg-plottwist-tech-blue/20' : 
                i % 4 === 2 ? 'bg-plottwist-tech-blue-light/20' :
                'bg-plottwist-tech-blue-accent/20'
              }`}
              style={{
                left: `${10 + Math.random() * 80}%`,
                top: `${10 + Math.random() * 80}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${4 + Math.random() * 2}s`
              }}
            ></div>
          ))}
        </div>
      </main>
    )
  }

  // Homepage View
  return (
    <main className="min-h-screen bg-plottwist-dark-bg text-plottwist-dark-text">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-mesh rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-mesh rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-mesh rounded-full blur-3xl animate-float" style={{animationDelay: '4s'}}></div>
        </div>
      </div>

      {/* Header */}
      <div className="relative z-10 max-w-7xl w-full mx-auto px-6 py-8">
        <div className="flex justify-between items-center">
          <div></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative flex flex-col items-center px-6 pt-16">
        {/* Main Title */}
        <div className="text-center mb-20 animate-slide-up">
          <div className="relative">
            <h1 className="text-8xl md:text-9xl font-bold mb-6 text-plottwist-dark-text">
              PlotTwist
            </h1>
            {/* Cohesive blue fade behind title */}
            <div className="absolute inset-0 bg-gradient-to-r from-plottwist-tech-blue/20 via-plottwist-tech-blue-light/15 to-plottwist-tech-blue-accent/20 blur-3xl"></div>
          </div>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed text-plottwist-dark-text/80">
            AI-powered Boston property insights in seconds.
          </p>
        </div>

        {/* Typewriter Text */}
        <div className="text-center mb-32 animate-fade-in" style={{animationDelay: '0.5s'}}>
          <div className="inline-block">
            <span className="text-4xl md:text-5xl font-mono text-plottwist-tech-blue">
              {displayText}
            </span>
            <span className="text-4xl md:text-5xl font-mono border-r-2 animate-blink text-plottwist-tech-blue border-plottwist-tech-blue">
              &nbsp;
            </span>
          </div>
        </div>

        {/* Search Bar */}
        <div className="w-full max-w-5xl">
          <div className="flex flex-col items-center space-y-8">
            <div className="w-full">
              <div className="flex flex-col md:flex-row gap-4 w-full">
                {/* Street Number */}
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={streetNumber}
                    onChange={(e) => setStreetNumber(e.target.value)}
                    placeholder="Street Number"
                    autoComplete="off"
                    className="w-full px-6 py-6 text-xl border-2 rounded-2xl backdrop-blur-sm focus:outline-none transition-all duration-500 placeholder-opacity-60 bg-plottwist-dark-surface/80 border-plottwist-tech-blue/30 text-plottwist-dark-text placeholder-plottwist-dark-text/60 focus:border-plottwist-tech-blue focus:ring-4 focus:ring-plottwist-tech-blue/20"
                  />
                </div>
                
                {/* Street Name */}
                <div className="relative flex-2">
                  <input
                    type="text"
                    value={streetName}
                    onChange={(e) => setStreetName(e.target.value)}
                    placeholder="Street Name"
                    autoComplete="off"
                    className="w-full px-6 py-6 text-xl border-2 rounded-2xl backdrop-blur-sm focus:outline-none transition-all duration-500 placeholder-opacity-60 bg-plottwist-dark-surface/80 border-plottwist-tech-blue/30 text-plottwist-dark-text placeholder-plottwist-dark-text/60 focus:border-plottwist-tech-blue focus:ring-4 focus:ring-plottwist-tech-blue/20"
                  />
                </div>
                
                {/* Street Suffix */}
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={streetSuffix}
                    onChange={(e) => setStreetSuffix(e.target.value)}
                    placeholder="St, Ave, Rd, etc."
                    autoComplete="off"
                    className="w-full px-6 py-6 text-xl border-2 rounded-2xl backdrop-blur-sm focus:outline-none transition-all duration-500 placeholder-opacity-60 bg-plottwist-dark-surface/80 border-plottwist-tech-blue/30 text-plottwist-dark-text placeholder-plottwist-dark-text/60 focus:border-plottwist-tech-blue focus:ring-4 focus:ring-plottwist-tech-blue/20"
                  />
                </div>
              </div>
            </div>
            
            <button 
              onClick={handleGenerateReport}
              disabled={!streetNumber.trim() || !streetName.trim() || !streetSuffix.trim()}
              className={`px-16 py-6 rounded-3xl text-2xl font-bold transition-all duration-500 ${
                streetNumber.trim() && streetName.trim() && streetSuffix.trim()
                  ? 'hover:scale-105 hover:shadow-2xl bg-plottwist-tech-blue text-white hover:bg-plottwist-tech-blue-dark hover:shadow-plottwist-tech-blue/25' 
                  : 'bg-plottwist-dark-surface/50 text-plottwist-dark-text/40 cursor-not-allowed'
              }`}
            >
              Generate a Report
            </button>
          </div>
        </div>

        {/* Description Text */}
        <div className="text-center mt-16">
          <p className="text-3xl md:text-4xl font-bold text-white max-w-4xl mx-auto leading-relaxed">
            Generate a report with <span className="text-plottwist-pink">advanced</span> <span className="text-plottwist-pink">analytics</span> and get <span className="text-plottwist-pink">predictive</span> <span className="text-plottwist-pink">data</span>.
          </p>
        </div>
      </div>

      {/* Report Preview */}
      <div className="relative mt-32 pb-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-plottwist-dark-surface/50 backdrop-blur-sm rounded-3xl p-8 border border-plottwist-tech-blue/20">
            <div className="text-center mb-8">
              <div className="w-24 h-24 bg-gradient-to-br from-plottwist-tech-blue to-plottwist-tech-blue-light rounded-2xl flex items-center justify-center animate-float mx-auto mb-4">
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-plottwist-dark-text">123 Main Street, Boston, MA</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Section 1: Parcel Overview */}
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-plottwist-tech-blue mb-4">Parcel Overview</h2>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-plottwist-tech-blue/20">
                    <span className="text-plottwist-dark-text/80 text-sm">Parcel ID:</span>
                    <span className="text-plottwist-dark-text font-semibold text-sm">123456789</span>
                  </div>
                  
                  <div className="flex justify-between items-center py-2 border-b border-plottwist-tech-blue/20">
                    <span className="text-plottwist-dark-text/80 text-sm">Address:</span>
                    <span className="text-plottwist-dark-text font-semibold text-sm">123 Main St</span>
                  </div>
                  
                  <div className="flex justify-between items-center py-2 border-b border-plottwist-tech-blue/20">
                    <span className="text-plottwist-dark-text/80 text-sm">Lot Size:</span>
                    <span className="text-plottwist-dark-text font-semibold text-sm">2,500 sq ft</span>
                  </div>
                  
                  <div className="flex justify-between items-center py-2 border-b border-plottwist-tech-blue/20">
                    <span className="text-plottwist-dark-text/80 text-sm">Year Built:</span>
                    <span className="text-plottwist-dark-text font-semibold text-sm">1925</span>
                  </div>
                  
                  <div className="flex justify-between items-center py-2 border-b border-plottwist-tech-blue/20">
                    <span className="text-plottwist-dark-text/80 text-sm">Owner:</span>
                    <span className="text-plottwist-dark-text font-semibold text-sm">John Smith</span>
                  </div>
                </div>
              </div>

              {/* Section 2: Zoning Information */}
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-plottwist-pink mb-4">Zoning Information</h2>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-plottwist-pink/20">
                    <span className="text-plottwist-dark-text/80 text-sm">Zoning District:</span>
                    <span className="text-plottwist-dark-text font-semibold text-sm">R-1</span>
                  </div>
                  
                  <div className="flex justify-between items-center py-2 border-b border-plottwist-pink/20">
                    <span className="text-plottwist-dark-text/80 text-sm">Allowed Use:</span>
                    <span className="text-plottwist-dark-text font-semibold text-sm">Single Family</span>
                  </div>
                  
                  <div className="flex justify-between items-center py-2 border-b border-plottwist-pink/20">
                    <span className="text-plottwist-dark-text/80 text-sm">Overlay:</span>
                    <span className="text-plottwist-dark-text font-semibold text-sm">None</span>
                  </div>
                  
                  <div className="flex justify-between items-center py-2 border-b border-plottwist-pink/20">
                    <span className="text-plottwist-dark-text/80 text-sm">Zoning Map:</span>
                    <span className="text-plottwist-dark-text font-semibold text-sm">Map 12</span>
                  </div>
                </div>
              </div>

              {/* Section 3: Dimensional Requirements */}
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-plottwist-tech-blue-light mb-4">Dimensional Requirements</h2>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-plottwist-tech-blue-light/20">
                    <span className="text-plottwist-dark-text/80 text-sm">Max Height:</span>
                    <span className="text-plottwist-dark-text font-semibold text-sm">35 ft</span>
                  </div>
                  
                  <div className="flex justify-between items-center py-2 border-b border-plottwist-tech-blue-light/20">
                    <span className="text-plottwist-dark-text/80 text-sm">Min Lot Area:</span>
                    <span className="text-plottwist-dark-text font-semibold text-sm">2,000 sq ft</span>
                  </div>
                  
                  <div className="flex justify-between items-center py-2 border-b border-plottwist-tech-blue-light/20">
                    <span className="text-plottwist-dark-text/80 text-sm">Front Setback:</span>
                    <span className="text-plottwist-dark-text font-semibold text-sm">20 ft</span>
                  </div>
                  
                  <div className="flex justify-between items-center py-2 border-b border-plottwist-tech-blue-light/20">
                    <span className="text-plottwist-dark-text/80 text-sm">FAR:</span>
                    <span className="text-plottwist-dark-text font-semibold text-sm">0.6</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating particles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-1.5 h-1.5 rounded-full animate-bounce-slow opacity-40 ${
              i % 4 === 0 ? 'bg-plottwist-pink/20' : 
              i % 4 === 1 ? 'bg-plottwist-tech-blue/20' : 
              i % 4 === 2 ? 'bg-plottwist-tech-blue-light/20' :
              'bg-plottwist-tech-blue-accent/20'
            }`}
            style={{
              left: `${10 + Math.random() * 80}%`,
              top: `${10 + Math.random() * 80}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${4 + Math.random() * 2}s` // slower
            }}
          ></div>
        ))}
      </div>
    </main>
  )
} 