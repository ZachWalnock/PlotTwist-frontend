'use client'

import React, { useState, useEffect } from 'react'
import { pdf } from '@react-pdf/renderer'
import ReactMarkdown from 'react-markdown'

export default function Home() {
  const [displayText, setDisplayText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showReportView, setShowReportView] = useState(false)
  const [streetNumber, setStreetNumber] = useState('')
  const [streetName, setStreetName] = useState('')
  const [streetSuffix, setStreetSuffix] = useState('')
  const [analysisData, setAnalysisData] = useState<{analysis: string, data_sources?: any, recent_developments?: any, final_report?: any} | null>(null)
  const [propertyData, setPropertyData] = useState<any>(null)
  const [recentDevelopments, setRecentDevelopments] = useState<any>(null)
  const [isLoadingAnalysis, setIsLoadingAnalysis] = useState(false)
  const [analysisError, setAnalysisError] = useState<string | null>(null)
  const [loadingMessage, setLoadingMessage] = useState('Thinking')
  const [dots, setDots] = useState('')
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

  useEffect(() => {
    console.log('useEffect triggered, showReportView:', showReportView)
    if (showReportView) {
      console.log('Calling fetchAnalysisData...')
      fetchAnalysisData()
    }
  }, [showReportView])

  const handleGenerateReport = () => {
    setShowReportView(true)
  }

  const handleBackToHome = () => {
    setShowReportView(false)
    setPropertyData(null)
    setRecentDevelopments(null)
  }

  const handleExportPDF = async () => {
    try {
      // Dynamically import the PDF component
      const { default: PropertyReportPDF } = await import('../components/PropertyReportPDF')
      
      const doc = <PropertyReportPDF 
        streetNumber={streetNumber}
        streetName={streetName}
        streetSuffix={streetSuffix}
        analysisData={analysisData}
      />
      
      const asPdf = pdf(doc)
      const blob = await asPdf.toBlob()
      
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `${streetNumber}-${streetName}-${streetSuffix}-Property-Report.pdf`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Error generating PDF:', error)
      alert('Error generating PDF. Please try again.')
    }
  }

  const fetchAnalysisData = async () => {
    console.log('fetchAnalysisData called')
    setIsLoadingAnalysis(true)
    setAnalysisError(null)
    setLoadingMessage('Thinking')
    setDots('')
    
    const dotAnimation = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '' : prev + '.')
    }, 500)
    
    setTimeout(() => {
      setLoadingMessage('Analyzing data')
    }, 3000)
    
    try {
      console.log('Sending address data:', { streetNumber, streetName, streetSuffix })
      
      const res = await fetch(`http://localhost:8000/create-report`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
            street_number: streetNumber,
            street_name: streetName,
            street_suffix: streetSuffix,
            unit_number: "",
        }),
      })
      
      console.log('Response status:', res.status)
      
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`)
      }
      
      const data = await res.json()
      console.log('Response data:', data)
      setAnalysisData(data)
      
      // Parse data_sources if available
      if (data.data_sources) {
        console.log('Data sources:', data.data_sources)
        setPropertyData(data.data_sources)
      }
      
      // Parse recent_developments if available
      if (data.recent_developments) {
        console.log('Recent developments:', data.recent_developments)
        setRecentDevelopments(data.recent_developments)
      }
    } catch (error) {
      console.error('Error in fetchAnalysisData:', error)
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
      setAnalysisError(`Error: ${errorMessage}`)
    } finally {
      clearInterval(dotAnimation)
      setIsLoadingAnalysis(false)
    }
  }

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

        {/* header */}
        <div className="relative z-10 max-w-7xl w-full mx-auto px-6 py-4">
          <div className="flex justify-start items-center">
            <button
              onClick={handleBackToHome}
              className="flex items-center space-x-2 text-plottwist-dark-text hover:text-plottwist-tech-blue transition-colors duration-300"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span>Back to Home</span>
            </button>
          </div>
        </div>
        
        {/* Header separator line - full width */}
        <div className="w-full h-0.5 bg-white/30"></div>

        {/* property details content */}
        <div className="relative flex flex-col items-center px-6 pt-16">
          <div className="text-center mb-16 animate-slide-up">
            <h1 className="text-6xl md:text-7xl font-bold mb-6 text-plottwist-dark-text">
              Property Report
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed text-plottwist-dark-text/80">
              {streetNumber && streetName && streetSuffix ? `${streetNumber} ${streetName} ${streetSuffix}, Boston, MA` : 'Property Details'}
            </p>
          </div>

          {/* property details grid */}
          <div className="w-full max-w-6xl relative">
            {/* PDF Icon */}
            <div className="absolute -top-16 right-0">
              <button 
                onClick={handleExportPDF}
                className="relative group"
              >
                <div className="w-12 h-12 bg-plottwist-tech-blue/10 backdrop-blur-sm rounded-xl border border-plottwist-tech-blue/20 flex items-center justify-center hover:bg-plottwist-tech-blue/20 transition-all duration-300 cursor-pointer">
                  <svg className="w-6 h-6 text-plottwist-tech-blue group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                
                {/* Tooltip */}
                <div className="absolute bottom-full right-0 mb-2 px-3 py-2 bg-plottwist-dark-surface/70 backdrop-blur-sm rounded-lg border border-plottwist-tech-blue/20 text-sm text-plottwist-dark-text/80 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  Export Data as PDF
                  {/* Tooltip arrow */}
                  <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-plottwist-dark-surface/70"></div>
                </div>
              </button>
            </div>
            
            <div className="bg-plottwist-dark-surface/50 backdrop-blur-sm rounded-3xl p-8 border border-plottwist-tech-blue/20">
              {isLoadingAnalysis ? (
                <div className="flex items-center justify-center py-16">
                  <div className="text-center">
                    <div className="w-16 h-16 border-4 border-plottwist-tech-blue/30 border-t-plottwist-tech-blue rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-plottwist-dark-text/60">Loading property data...</p>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {/* Property Details */}
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-plottwist-tech-blue mb-6">Property Details</h2>
                    
                    <div className="space-y-4">
                      <div className="flex justify-between items-center py-3 border-b border-plottwist-tech-blue/20">
                        <span className="text-plottwist-dark-text/80 font-medium">Parcel ID:</span>
                        <span className="text-plottwist-dark-text font-semibold">
                          {propertyData?.parcel_id || 'N/A'}
                        </span>
                      </div>
                      
                      <div className="flex justify-between items-center py-3 border-b border-plottwist-tech-blue/20">
                        <span className="text-plottwist-dark-text/80 font-medium">Address:</span>
                        <span className="text-plottwist-dark-text font-semibold">
                          {propertyData?.address || `${streetNumber} ${streetName} ${streetSuffix}, Boston, MA`}
                        </span>
                      </div>
                      
                      <div className="flex justify-between items-center py-3 border-b border-plottwist-tech-blue/20">
                        <span className="text-plottwist-dark-text/80 font-medium">Unit Number:</span>
                        <span className="text-plottwist-dark-text font-semibold">
                          {propertyData?.unit_number || 'N/A'}
                        </span>
                      </div>
                      
                      <div className="flex justify-between items-center py-3 border-b border-plottwist-tech-blue/20">
                        <span className="text-plottwist-dark-text/80 font-medium">Property Type:</span>
                        <span className="text-plottwist-dark-text font-semibold">
                          {propertyData?.property_type || 'N/A'}
                        </span>
                      </div>
                      
                      <div className="flex justify-between items-center py-3 border-b border-plottwist-tech-blue/20">
                        <span className="text-plottwist-dark-text/80 font-medium">Classification Code:</span>
                        <span className="text-plottwist-dark-text font-semibold text-right">
                          {propertyData?.classification_code || 'N/A'}
                        </span>
                      </div>
                      
                      <div className="flex justify-between items-center py-3 border-b border-plottwist-tech-blue/20">
                        <span className="text-plottwist-dark-text/80 font-medium">Lot Size:</span>
                        <span className="text-plottwist-dark-text font-semibold">
                          {propertyData?.lot_size || 'N/A'}
                        </span>
                      </div>
                      
                      <div className="flex justify-between items-center py-3 border-b border-plottwist-tech-blue/20">
                        <span className="text-plottwist-dark-text/80 font-medium">Living Area:</span>
                        <span className="text-plottwist-dark-text font-semibold">
                          {propertyData?.living_area || 'N/A'}
                        </span>
                      </div>
                      
                      <div className="flex justify-between items-center py-3 border-b border-plottwist-tech-blue/20">
                        <span className="text-plottwist-dark-text/80 font-medium">Year Built:</span>
                        <span className="text-plottwist-dark-text font-semibold">
                          {propertyData?.year_built || 'N/A'}
                        </span>
                      </div>
                      
                      <div className="flex justify-between items-center py-3 border-b border-plottwist-tech-blue/20">
                        <span className="text-plottwist-dark-text/80 font-medium">Stories:</span>
                        <span className="text-plottwist-dark-text font-semibold">
                          {propertyData?.stories || 'N/A'}
                        </span>
                      </div>
                      
                      <div className="flex justify-between items-center py-3 border-b border-plottwist-tech-blue/20">
                        <span className="text-plottwist-dark-text/80 font-medium">Owner:</span>
                        <span className="text-plottwist-dark-text font-semibold">
                          {propertyData?.owner || 'N/A'}
                        </span>
                      </div>
                      
                      <div className="flex justify-between items-center py-3 border-b border-plottwist-tech-blue/20">
                        <span className="text-plottwist-dark-text/80 font-medium">Owner Address:</span>
                        <span className="text-plottwist-dark-text font-semibold">
                          {propertyData?.owner_address || 'N/A'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Building Features */}
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-plottwist-pink mb-6">Building Features</h2>
                    
                    <div className="space-y-4">
                      <div className="flex justify-between items-center py-3 border-b border-plottwist-pink/20">
                        <span className="text-plottwist-dark-text/80 font-medium">Bedrooms:</span>
                        <span className="text-plottwist-dark-text font-semibold">
                          {propertyData?.bedrooms || 'N/A'}
                        </span>
                      </div>
                      
                      <div className="flex justify-between items-center py-3 border-b border-plottwist-pink/20">
                        <span className="text-plottwist-dark-text/80 font-medium">Bathrooms:</span>
                        <span className="text-plottwist-dark-text font-semibold">
                          {propertyData?.bathrooms || 'N/A'}
                        </span>
                      </div>
                      
                      <div className="flex justify-between items-center py-3 border-b border-plottwist-pink/20">
                        <span className="text-plottwist-dark-text/80 font-medium">Total Rooms:</span>
                        <span className="text-plottwist-dark-text font-semibold">
                          {propertyData?.total_rooms || 'N/A'}
                        </span>
                      </div>
                      
                      <div className="flex justify-between items-center py-3 border-b border-plottwist-pink/20">
                        <span className="text-plottwist-dark-text/80 font-medium">Kitchens:</span>
                        <span className="text-plottwist-dark-text font-semibold">
                          {propertyData?.number_of_kitchens || 'N/A'}
                        </span>
                      </div>
                      
                      <div className="flex justify-between items-center py-3 border-b border-plottwist-pink/20">
                        <span className="text-plottwist-dark-text/80 font-medium">Parking Spaces:</span>
                        <span className="text-plottwist-dark-text font-semibold">
                          {propertyData?.parking_spaces || 'N/A'}
                        </span>
                      </div>
                      
                      <div className="flex justify-between items-center py-3 border-b border-plottwist-pink/20">
                        <span className="text-plottwist-dark-text/80 font-medium">Building Style:</span>
                        <span className="text-plottwist-dark-text font-semibold">
                          {propertyData?.building_style || 'N/A'}
                        </span>
                      </div>
                      
                      <div className="flex justify-between items-center py-3 border-b border-plottwist-pink/20">
                        <span className="text-plottwist-dark-text/80 font-medium">Exterior Finish:</span>
                        <span className="text-plottwist-dark-text font-semibold">
                          {propertyData?.exterior_finish || 'N/A'}
                        </span>
                      </div>
                      
                      <div className="flex justify-between items-center py-3 border-b border-plottwist-pink/20">
                        <span className="text-plottwist-dark-text/80 font-medium">Foundation:</span>
                        <span className="text-plottwist-dark-text font-semibold">
                          {propertyData?.foundation || 'N/A'}
                        </span>
                      </div>
                      
                      <div className="flex justify-between items-center py-3 border-b border-plottwist-pink/20">
                        <span className="text-plottwist-dark-text/80 font-medium">Heat Type:</span>
                        <span className="text-plottwist-dark-text font-semibold">
                          {propertyData?.heat_type || 'N/A'}
                        </span>
                      </div>
                      
                      <div className="flex justify-between items-center py-3 border-b border-plottwist-pink/20">
                        <span className="text-plottwist-dark-text/80 font-medium">AC Type:</span>
                        <span className="text-plottwist-dark-text font-semibold">
                          {propertyData?.ac_type || 'N/A'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Zoning & Valuation */}
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-plottwist-tech-blue-light mb-6">Zoning & Valuation</h2>
                    
                    <div className="space-y-4">
                      <div className="flex justify-between items-center py-3 border-b border-plottwist-tech-blue-light/20">
                        <span className="text-plottwist-dark-text/80 font-medium">Zoning:</span>
                        <span className="text-plottwist-dark-text font-semibold">
                          {propertyData?.zoning || 'N/A'}
                        </span>
                      </div>
                      
                      <div className="flex justify-between items-center py-3 border-b border-plottwist-tech-blue-light/20">
                        <span className="text-plottwist-dark-text/80 font-medium">Land Use:</span>
                        <span className="text-plottwist-dark-text font-semibold">
                          {propertyData?.land_use || 'N/A'}
                        </span>
                      </div>
                      
                      <div className="flex justify-between items-center py-3 border-b border-plottwist-tech-blue-light/20">
                        <span className="text-plottwist-dark-text/80 font-medium">Building Use:</span>
                        <span className="text-plottwist-dark-text font-semibold">
                          {propertyData?.building_use || 'N/A'}
                        </span>
                      </div>
                      
                      <div className="flex justify-between items-center py-3 border-b border-plottwist-tech-blue-light/20">
                        <span className="text-plottwist-dark-text/80 font-medium">Exterior Condition:</span>
                        <span className="text-plottwist-dark-text font-semibold">
                          {propertyData?.exterior_condition || 'N/A'}
                        </span>
                      </div>
                      
                      <div className="flex justify-between items-center py-3 border-b border-plottwist-tech-blue-light/20">
                        <span className="text-plottwist-dark-text/80 font-medium">Interior Condition:</span>
                        <span className="text-plottwist-dark-text font-semibold">
                          {propertyData?.interior_condition || 'N/A'}
                        </span>
                      </div>
                      
                      <div className="flex justify-between items-center py-3 border-b border-plottwist-tech-blue-light/20">
                        <span className="text-plottwist-dark-text/80 font-medium">FY2025 Building Value:</span>
                        <span className="text-plottwist-dark-text font-semibold">
                          {propertyData?.fy2025_building_value || 'N/A'}
                        </span>
                      </div>
                      
                      <div className="flex justify-between items-center py-3 border-b border-plottwist-tech-blue-light/20">
                        <span className="text-plottwist-dark-text/80 font-medium">FY2025 Land Value:</span>
                        <span className="text-plottwist-dark-text font-semibold">
                          {propertyData?.fy2025_land_value || 'N/A'}
                        </span>
                      </div>
                      
                      <div className="flex justify-between items-center py-3 border-b border-plottwist-tech-blue-light/20">
                        <span className="text-plottwist-dark-text/80 font-medium">FY2025 Total Value:</span>
                        <span className="text-plottwist-dark-text font-semibold">
                          {propertyData?.fy2025_total_value || 'N/A'}
                        </span>
                      </div>
                      
                      <div className="flex justify-between items-center py-3 border-b border-plottwist-tech-blue-light/20">
                        <span className="text-plottwist-dark-text/80 font-medium">Previous Year Value:</span>
                        <span className="text-plottwist-dark-text font-semibold">
                          {propertyData?.previous_year_value || 'N/A'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Recent Developments */}
        <div className="w-full max-w-6xl mt-8 mx-auto -mb-2">
          <div className="bg-plottwist-dark-surface/50 backdrop-blur-sm rounded-3xl p-8 border border-plottwist-pink/20">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-plottwist-dark-text">Recent Developments</h3>
            </div>

            {isLoadingAnalysis ? (
              <div className="flex items-center justify-center py-8">
                <div className="text-center">
                  <div className="w-12 h-12 border-4 border-plottwist-pink/30 border-t-plottwist-pink rounded-full animate-spin mx-auto mb-4"></div>
                  <p className="text-plottwist-dark-text/60">Loading recent developments...</p>
                </div>
              </div>
            ) : recentDevelopments ? (
              <div className="space-y-6">
                <div className="bg-plottwist-dark-surface/30 rounded-lg p-6 text-plottwist-dark-text">
                  <div className="prose prose-invert max-w-none">
                    <div className="text-plottwist-dark-text/90 leading-relaxed [&>h1]:text-3xl [&>h1]:font-bold [&>h1]:mb-4 [&>h1]:text-plottwist-pink [&>h2]:text-2xl [&>h2]:font-semibold [&>h2]:mb-3 [&>h2]:text-plottwist-pink/90 [&>h3]:text-xl [&>h3]:font-medium [&>h3]:mb-2 [&>h3]:text-plottwist-pink/80 [&>h4]:text-lg [&>h4]:font-medium [&>h4]:mb-2 [&>h4]:text-plottwist-pink/70 [&>p]:text-base [&>p]:mb-3 [&>ul]:mb-3 [&>ol]:mb-3 [&>li]:mb-1 [&>strong]:text-plottwist-pink/90 [&>em]:text-plottwist-pink/80">
                      <ReactMarkdown>
                        {typeof recentDevelopments === 'string' ? recentDevelopments : JSON.stringify(recentDevelopments, null, 2)}
                      </ReactMarkdown>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-plottwist-pink/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-plottwist-pink" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <p className="text-plottwist-pink font-medium">No recent developments found</p>
                <p className="text-plottwist-dark-text/60 mt-2">No recent development data available for this property</p>
              </div>
            )}
          </div>
        </div>

        {/* predictive */}
        <div className="w-full max-w-6xl mt-12 mx-auto pb-16">
          <div className="bg-plottwist-dark-surface/50 backdrop-blur-sm rounded-3xl p-8 border border-plottwist-tech-blue/20">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-plottwist-dark-text">Predictive Analysis</h3>
            </div>

            {isLoadingAnalysis && (
              <div className="flex items-center justify-center py-8">
                <div className="text-center">
                  <div className="w-12 h-12 border-4 border-plottwist-tech-blue/30 border-t-plottwist-tech-blue rounded-full animate-spin mx-auto mb-4"></div>
                  <p className="text-plottwist-dark-text/60">Loading predictive analysis...</p>
                </div>
              </div>
            )}

            {analysisError && (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-red-400 font-medium">Error loading analysis</p>
                <p className="text-plottwist-dark-text/60 mt-2">{analysisError}</p>
              </div>
            )}

            {analysisData && !isLoadingAnalysis && (
              <div className="space-y-6">
                {analysisData.final_report ? (
                  <div className="bg-plottwist-dark-surface/30 rounded-lg p-8 text-plottwist-dark-text">
                    <div className="prose prose-invert max-w-none">
                      <h4 className="text-xl font-bold text-plottwist-tech-blue mb-6">Final Analysis Report</h4>
                      <div className="text-plottwist-dark-text/90 leading-relaxed [&>h1]:text-3xl [&>h1]:font-bold [&>h1]:mb-4 [&>h1]:text-plottwist-tech-blue [&>h2]:text-2xl [&>h2]:font-semibold [&>h2]:mb-3 [&>h2]:text-plottwist-tech-blue/90 [&>h3]:text-xl [&>h3]:font-medium [&>h3]:mb-2 [&>h3]:text-plottwist-tech-blue/80 [&>h4]:text-lg [&>h4]:font-medium [&>h4]:mb-2 [&>h4]:text-plottwist-tech-blue/70 [&>p]:text-base [&>p]:mb-3 [&>ul]:mb-3 [&>ol]:mb-3 [&>li]:mb-1 [&>strong]:text-plottwist-tech-blue/90 [&>em]:text-plottwist-tech-blue/80">
                        <ReactMarkdown>
                          {(() => {
                            if (typeof analysisData.final_report === 'string') {
                              // Parse the XML-like structure to extract OPPORTUNITIES
                              const opportunitiesMatch = analysisData.final_report.match(/<OPPORTUNITIES>([\s\S]*?)<\/OPPORTUNITIES>/);
                              if (opportunitiesMatch) {
                                return opportunitiesMatch[1].trim();
                              }
                              return analysisData.final_report;
                            }
                            return JSON.stringify(analysisData.final_report, null, 2);
                          })()}
                        </ReactMarkdown>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-plottwist-dark-surface/30 rounded-lg p-8 text-plottwist-dark-text">
                    <div className="prose prose-invert max-w-none">
                      <h4 className="text-xl font-bold text-plottwist-tech-blue mb-4">AI Analysis Report</h4>
                      <div className="text-plottwist-dark-text/90 leading-relaxed whitespace-pre-wrap">
                        {analysisData.analysis}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

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

  // home view
  return (
    <main className="min-h-screen bg-plottwist-dark-bg text-plottwist-dark-text">
      {/* animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-mesh rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-mesh rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-mesh rounded-full blur-3xl animate-float" style={{animationDelay: '4s'}}></div>
        </div>
      </div>

      {/* header */}
      <div className="relative z-10 max-w-7xl w-full mx-auto px-6 py-8">
        <div className="flex justify-between items-center">
          <div></div>
        </div>
      </div>

      {/* main content */}
      <div className="relative flex flex-col items-center px-6 pt-16">
        {/* main title */}
        <div className="text-center mb-20 animate-slide-up">
          <div className="relative">
            <h1 className="text-8xl md:text-9xl font-bold mb-6 text-plottwist-dark-text">
              PlotTwist
            </h1>
            {/*fade */}
            <div className="absolute inset-0 bg-gradient-to-r from-plottwist-tech-blue/20 via-plottwist-tech-blue-light/15 to-plottwist-tech-blue-accent/20 blur-3xl"></div>
          </div>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed text-plottwist-dark-text/80">
            AI-powered Boston property insights in seconds.
          </p>
        </div>

        {/* text animation */}
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

        {/* search bar */}
        <div className="w-full max-w-5xl">
          <div className="flex flex-col items-center space-y-8">
            <div className="w-full">
              <div className="flex flex-col md:flex-row gap-4 w-full">
                {/* street number */}
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
                
                {/* street name */}
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
                
                {/* street suffix */}
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

        {/* description text */}
        <div className="text-center mt-16">
          <p className="text-3xl md:text-4xl font-bold text-white max-w-4xl mx-auto leading-relaxed">
            Generate a report with <span className="text-plottwist-pink">advanced</span> <span className="text-plottwist-pink">analytics</span> and get <span className="text-plottwist-pink">predictive</span> <span className="text-plottwist-pink">data</span>.
          </p>
        </div>
      </div>

      {/* report preview */}
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
              {/* parcel overview */}
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

              {/* zoning information */}
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

              {/* dimensional requirements */}
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

      {/* Predictive Data Capabilities */}
      <div className="relative mt-0.5 pb-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Find Recent Developments */}
            <div className="bg-gradient-to-br from-plottwist-dark-surface/60 to-plottwist-dark-surface/40 backdrop-blur-xl rounded-2xl p-8 border border-plottwist-tech-blue/30 hover:border-plottwist-tech-blue/50 transition-all duration-300 group">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-plottwist-tech-blue to-plottwist-tech-blue-light rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-plottwist-tech-blue">Finds Recent Developments</h3>
              </div>
            </div>

            {/* Assess Feasibility */}
            <div className="bg-gradient-to-br from-plottwist-dark-surface/60 to-plottwist-dark-surface/40 backdrop-blur-xl rounded-2xl p-8 border border-plottwist-pink/30 hover:border-plottwist-pink/50 transition-all duration-300 group">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-plottwist-pink to-pink-400 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-plottwist-pink">Assesses Feasibility</h3>
              </div>
            </div>

            {/* Research Opportunities */}
            <div className="bg-gradient-to-br from-plottwist-dark-surface/60 to-plottwist-dark-surface/40 backdrop-blur-xl rounded-2xl p-8 border border-plottwist-tech-blue-light/30 hover:border-plottwist-tech-blue-light/50 transition-all duration-300 group">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-plottwist-tech-blue-light to-cyan-400 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-plottwist-tech-blue-light">Researches Opportunities</h3>
              </div>
            </div>
          </div>
        </div>
      </div>

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