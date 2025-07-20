import React from 'react'
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer'

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    padding: 60,
    fontFamily: 'Helvetica',
    fontSize: 11,
    lineHeight: 1.4,
  },
  
  // Header Section
  header: {
    textAlign: 'center',
    marginBottom: 40,
    paddingBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 15,
    letterSpacing: -0.5,
  },
  propertyAddress: {
    fontSize: 16,
    color: '#666666',
    fontWeight: 'normal',
    letterSpacing: 0.1,
  },
  
  // Divider
  divider: {
    width: '100%',
    height: 1.5,
    backgroundColor: '#e1e1e1',
    marginVertical: 35,
  },
  
  // Section Styling
  section: {
    marginBottom: 40,
  },
  sectionHeader: {
    marginBottom: 20,
    paddingBottom: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 5,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  sectionSubline: {
    width: 40,
    height: 2,
    backgroundColor: '#333333',
    marginTop: 5,
  },
  
  // Data Layout
  dataContainer: {
    paddingLeft: 15,
  },
  dataRow: {
    flexDirection: 'row',
    marginBottom: 14,
    alignItems: 'flex-start',
  },
  dataLabel: {
    fontSize: 11,
    color: '#666666',
    width: '35%',
    fontWeight: 'normal',
    paddingRight: 15,
    letterSpacing: 0.1,
  },
  dataValue: {
    fontSize: 11,
    color: '#1a1a1a',
    width: '65%',
    fontWeight: 'bold',
    lineHeight: 1.3,
  },
  
  // Special Analysis Section
  analysisContainer: {
    marginTop: 50,
    padding: 25,
    backgroundColor: '#f8f9fa',
    borderLeftWidth: 4,
    borderLeftColor: '#333333',
  },
  analysisHeader: {
    marginBottom: 18,
  },
  analysisTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 5,
    letterSpacing: -0.3,
  },
  analysisSubtitle: {
    fontSize: 12,
    color: '#666666',
    fontStyle: 'italic',
  },
  analysisContent: {
    fontSize: 11,
    lineHeight: 1.6,
    color: '#333333',
    textAlign: 'justify',
  },
  
  // Footer
  footer: {
    position: 'absolute',
    bottom: 40,
    left: 60,
    right: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#e8e8e8',
  },
  footerBrand: {
    fontSize: 10,
    color: '#999999',
    fontWeight: 'bold',
  },
  footerDate: {
    fontSize: 10,
    color: '#999999',
  },
  
  // Utility Classes
  spacer: {
    marginTop: 25,
  },
  centerText: {
    textAlign: 'center',
  },
})

interface PropertyReportPDFProps {
  streetNumber: string
  streetName: string
  streetSuffix: string
  analysisData?: {
    final_report?: string
    recent_developments?: string
    evidence?: string
    data_sources?: any
    development_opportunities?: string
  } | null
  propertyData?: any
  recentDevelopments?: any
}

const PropertyReportPDF: React.FC<PropertyReportPDFProps> = ({
  streetNumber,
  streetName,
  streetSuffix,
  analysisData,
  propertyData,
  recentDevelopments,
}) => {
  const fullAddress = `${streetNumber} ${streetName} ${streetSuffix}, Boston, MA`
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  // Use data_sources from analysisData if propertyData is not available
  const actualPropertyData = propertyData || analysisData?.data_sources || {}

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>{fullAddress}</Text>
        </View>

        <View style={styles.divider} />

        {/* Property Details */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Property Details</Text>
            <View style={styles.sectionSubline} />
          </View>
          
          <View style={styles.dataContainer}>
            <View style={styles.dataRow}>
              <Text style={styles.dataLabel}>Parcel ID</Text>
              <Text style={styles.dataValue}>{actualPropertyData?.parcel_id || 'Not Available'}</Text>
            </View>
            
            <View style={styles.dataRow}>
              <Text style={styles.dataLabel}>Property Address</Text>
              <Text style={styles.dataValue}>{actualPropertyData?.address || fullAddress}</Text>
            </View>
            
            <View style={styles.dataRow}>
              <Text style={styles.dataLabel}>Unit Number</Text>
              <Text style={styles.dataValue}>{actualPropertyData?.unit_number || 'Not Specified'}</Text>
            </View>
            
            <View style={styles.dataRow}>
              <Text style={styles.dataLabel}>Property Type</Text>
              <Text style={styles.dataValue}>{actualPropertyData?.property_type || 'Residential'}</Text>
            </View>
            
            <View style={styles.dataRow}>
              <Text style={styles.dataLabel}>Classification Code</Text>
              <Text style={styles.dataValue}>{actualPropertyData?.classification_code || 'Not Available'}</Text>
            </View>
            
            <View style={styles.dataRow}>
              <Text style={styles.dataLabel}>Lot Size</Text>
              <Text style={styles.dataValue}>{actualPropertyData?.lot_size || 'Not Available'}</Text>
            </View>
            
            <View style={styles.dataRow}>
              <Text style={styles.dataLabel}>Living Area</Text>
              <Text style={styles.dataValue}>{actualPropertyData?.living_area || 'Not Available'}</Text>
            </View>
            
            <View style={styles.dataRow}>
              <Text style={styles.dataLabel}>Year Built</Text>
              <Text style={styles.dataValue}>{actualPropertyData?.year_built || 'Not Available'}</Text>
            </View>
            
            <View style={styles.dataRow}>
              <Text style={styles.dataLabel}>Stories</Text>
              <Text style={styles.dataValue}>{actualPropertyData?.stories || 'Not Available'}</Text>
            </View>
            
            <View style={styles.dataRow}>
              <Text style={styles.dataLabel}>Owner</Text>
              <Text style={styles.dataValue}>{actualPropertyData?.owner || 'Not Available'}</Text>
            </View>
            
            <View style={styles.dataRow}>
              <Text style={styles.dataLabel}>Owner Address</Text>
              <Text style={styles.dataValue}>{actualPropertyData?.owner_address || 'Not Available'}</Text>
            </View>
          </View>
        </View>

        {/* Building Features */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Building Features</Text>
            <View style={styles.sectionSubline} />
          </View>
          
          <View style={styles.dataContainer}>
            <View style={styles.dataRow}>
              <Text style={styles.dataLabel}>Bedrooms</Text>
              <Text style={styles.dataValue}>{actualPropertyData?.bedrooms || 'Not Available'}</Text>
            </View>
            
            <View style={styles.dataRow}>
              <Text style={styles.dataLabel}>Bathrooms</Text>
              <Text style={styles.dataValue}>{actualPropertyData?.bathrooms || 'Not Available'}</Text>
            </View>
            
            <View style={styles.dataRow}>
              <Text style={styles.dataLabel}>Total Rooms</Text>
              <Text style={styles.dataValue}>{actualPropertyData?.total_rooms || 'Not Available'}</Text>
            </View>
            
            <View style={styles.dataRow}>
              <Text style={styles.dataLabel}>Kitchens</Text>
              <Text style={styles.dataValue}>{actualPropertyData?.number_of_kitchens || 'Not Available'}</Text>
            </View>
            
            <View style={styles.dataRow}>
              <Text style={styles.dataLabel}>Parking Spaces</Text>
              <Text style={styles.dataValue}>{actualPropertyData?.parking_spaces || 'Not Available'}</Text>
            </View>
            
            <View style={styles.dataRow}>
              <Text style={styles.dataLabel}>Building Style</Text>
              <Text style={styles.dataValue}>{actualPropertyData?.building_style || 'Not Available'}</Text>
            </View>
            
            <View style={styles.dataRow}>
              <Text style={styles.dataLabel}>Exterior Finish</Text>
              <Text style={styles.dataValue}>{actualPropertyData?.exterior_finish || 'Not Available'}</Text>
            </View>
            
            <View style={styles.dataRow}>
              <Text style={styles.dataLabel}>Foundation</Text>
              <Text style={styles.dataValue}>{actualPropertyData?.foundation || 'Not Available'}</Text>
            </View>
            
            <View style={styles.dataRow}>
              <Text style={styles.dataLabel}>Heat Type</Text>
              <Text style={styles.dataValue}>{actualPropertyData?.heat_type || 'Not Available'}</Text>
            </View>
            
            <View style={styles.dataRow}>
              <Text style={styles.dataLabel}>AC Type</Text>
              <Text style={styles.dataValue}>{actualPropertyData?.ac_type || 'Not Available'}</Text>
            </View>
          </View>
        </View>

        {/* Zoning & Valuation */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Zoning & Valuation</Text>
            <View style={styles.sectionSubline} />
          </View>
          
          <View style={styles.dataContainer}>
            <View style={styles.dataRow}>
              <Text style={styles.dataLabel}>Zoning</Text>
              <Text style={styles.dataValue}>{actualPropertyData?.zoning || 'Not Available'}</Text>
            </View>
            
            <View style={styles.dataRow}>
              <Text style={styles.dataLabel}>Land Use</Text>
              <Text style={styles.dataValue}>{actualPropertyData?.land_use || 'Not Available'}</Text>
            </View>
            
            <View style={styles.dataRow}>
              <Text style={styles.dataLabel}>Building Use</Text>
              <Text style={styles.dataValue}>{actualPropertyData?.building_use || 'Not Available'}</Text>
            </View>
            
            <View style={styles.dataRow}>
              <Text style={styles.dataLabel}>Exterior Condition</Text>
              <Text style={styles.dataValue}>{actualPropertyData?.exterior_condition || 'Not Available'}</Text>
            </View>
            
            <View style={styles.dataRow}>
              <Text style={styles.dataLabel}>Interior Condition</Text>
              <Text style={styles.dataValue}>{actualPropertyData?.interior_condition || 'Not Available'}</Text>
            </View>
            
            <View style={styles.dataRow}>
              <Text style={styles.dataLabel}>FY2025 Building Value</Text>
              <Text style={styles.dataValue}>{actualPropertyData?.fy2025_building_value || 'Not Available'}</Text>
            </View>
            
            <View style={styles.dataRow}>
              <Text style={styles.dataLabel}>FY2025 Land Value</Text>
              <Text style={styles.dataValue}>{actualPropertyData?.fy2025_land_value || 'Not Available'}</Text>
            </View>
            
            <View style={styles.dataRow}>
              <Text style={styles.dataLabel}>FY2025 Total Value</Text>
              <Text style={styles.dataValue}>{actualPropertyData?.fy2025_total_value || 'Not Available'}</Text>
            </View>
            
            <View style={styles.dataRow}>
              <Text style={styles.dataLabel}>Previous Year Value</Text>
              <Text style={styles.dataValue}>{actualPropertyData?.previous_year_value || 'Not Available'}</Text>
            </View>
          </View>
        </View>

        {/* Recent Developments */}
        {recentDevelopments && (
          <View style={styles.analysisContainer}>
            <View style={styles.analysisHeader}>
              <Text style={styles.analysisTitle}>Recent Developments</Text>
              <Text style={styles.analysisSubtitle}>Latest area development information</Text>
            </View>
            
            <Text style={styles.analysisContent}>
              {(() => {
                let content = typeof recentDevelopments === 'string' ? recentDevelopments : JSON.stringify(recentDevelopments, null, 2);
                // Clean up all markdown and formatting for PDF
                return content
                  .replace(/\*\*(.*?)\*\*/g, '$1')     // Remove ** bold markers
                  .replace(/\*(.*?)\*/g, '$1')         // Remove * italic markers
                  .replace(/_{1,2}(.*?)_{1,2}/g, '$1') // Remove _ underline markers
                  .replace(/#{1,6}\s*(.*)/g, '$1')     // Remove # headers but keep text
                  .replace(/^\s*[-*+]\s+/gm, '• ')     // Convert markdown bullets to bullet points
                  .replace(/^\s*\d+\.\s+/gm, '• ')     // Convert numbered lists to bullet points
                  .replace(/`{1,3}(.*?)`{1,3}/g, '$1') // Remove code backticks
                  .replace(/\[(.*?)\]\(.*?\)/g, '$1')  // Remove markdown links, keep text
                  .replace(/---+/g, '')                // Remove horizontal rules
                  .replace(/\n{3,}/g, '\n\n')          // Limit excessive line breaks
                  .trim();
              })()}
            </Text>
          </View>
        )}

        {/* AI Analysis */}
        {analysisData && (
          <View style={styles.analysisContainer}>
            <View style={styles.analysisHeader}>
              <Text style={styles.analysisTitle}>AI Predictive Analysis</Text>
              <Text style={styles.analysisSubtitle}>Generated insights and recommendations</Text>
            </View>
            
            <Text style={styles.analysisContent}>
              {(() => {
                let content = '';
                if (analysisData.final_report && typeof analysisData.final_report === 'string') {
                  // Parse XML-like structure to extract OPPORTUNITIES
                  const opportunitiesMatch = analysisData.final_report.match(/<OPPORTUNITIES>([\s\S]*?)<\/OPPORTUNITIES>/);
                  if (opportunitiesMatch) {
                    content = opportunitiesMatch[1].trim();
                  } else {
                    content = analysisData.final_report;
                  }
                } else {
                  content = analysisData.development_opportunities || analysisData.evidence || 'No analysis available';
                }
                
                // Clean up all markdown and formatting for PDF
                return content
                  .replace(/\*\*(.*?)\*\*/g, '$1')     // Remove ** bold markers
                  .replace(/\*(.*?)\*/g, '$1')         // Remove * italic markers
                  .replace(/_{1,2}(.*?)_{1,2}/g, '$1') // Remove _ underline markers
                  .replace(/#{1,6}\s*(.*)/g, '$1')     // Remove # headers but keep text
                  .replace(/^\s*[-*+]\s+/gm, '• ')     // Convert markdown bullets to bullet points
                  .replace(/^\s*\d+\.\s+/gm, '• ')     // Convert numbered lists to bullet points
                  .replace(/`{1,3}(.*?)`{1,3}/g, '$1') // Remove code backticks
                  .replace(/\[(.*?)\]\(.*?\)/g, '$1')  // Remove markdown links, keep text
                  .replace(/---+/g, '')                // Remove horizontal rules
                  .replace(/\n{3,}/g, '\n\n')          // Limit excessive line breaks
                  .replace(/<[^>]*>/g, '')             // Remove any remaining XML/HTML tags
                  .trim();
              })()}
            </Text>
          </View>
        )}

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerBrand}>PlotTwist Property Intelligence</Text>
          <Text style={styles.footerDate}>Generated on {currentDate}</Text>
        </View>

      </Page>
    </Document>
      )
  }
  
  export default PropertyReportPDF 