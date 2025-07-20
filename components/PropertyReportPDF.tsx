import React from 'react'
import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer'

// Define styles for the PDF
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    padding: 30,
    fontFamily: 'Helvetica',
  },
  header: {
    marginBottom: 20,
    textAlign: 'center',
    borderBottom: 2,
    borderBottomColor: '#2563eb',
    paddingBottom: 15,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#64748b',
    marginBottom: 5,
  },
  address: {
    fontSize: 14,
    color: '#475569',
  },
  sectionsContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  section: {
    flex: 1,
    marginRight: 15,
    padding: 15,
    border: 1,
    borderColor: '#e2e8f0',
    borderRadius: 8,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 12,
    paddingBottom: 5,
    borderBottom: 1,
    borderBottomColor: '#e2e8f0',
  },
  parcelTitle: {
    color: '#2563eb',
  },
  zoningTitle: {
    color: '#db2777',
  },
  dimensionalTitle: {
    color: '#0891b2',
  },
  dataRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
    borderBottom: 0.5,
    borderBottomColor: '#f1f5f9',
  },
  dataLabel: {
    fontSize: 10,
    color: '#64748b',
    flex: 1,
  },
  dataValue: {
    fontSize: 10,
    color: '#1e293b',
    fontWeight: 'bold',
    textAlign: 'right',
    flex: 1,
  },
  analysisSection: {
    marginTop: 20,
    padding: 15,
    border: 1,
    borderColor: '#e2e8f0',
    borderRadius: 8,
  },
  analysisTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#db2777',
    marginBottom: 10,
  },
  analysisText: {
    fontSize: 11,
    lineHeight: 1.4,
    color: '#374151',
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 30,
    right: 30,
    textAlign: 'center',
    fontSize: 10,
    color: '#9ca3af',
  },
})

interface PropertyReportPDFProps {
  streetNumber: string
  streetName: string
  streetSuffix: string
  analysisData?: { analysis: string } | null
}

const PropertyReportPDF: React.FC<PropertyReportPDFProps> = ({
  streetNumber,
  streetName,
  streetSuffix,
  analysisData,
}) => {
  const fullAddress = `${streetNumber} ${streetName} ${streetSuffix}, Boston, MA`

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>PlotTwist Property Report</Text>
          <Text style={styles.subtitle}>AI-Powered Boston Property Insights</Text>
          <Text style={styles.address}>{fullAddress}</Text>
        </View>

        {/* Property Details Sections */}
        <View style={styles.sectionsContainer}>
          {/* Parcel Overview */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, styles.parcelTitle]}>Parcel Overview</Text>
            
            <View style={styles.dataRow}>
              <Text style={styles.dataLabel}>Parcel ID:</Text>
              <Text style={styles.dataValue}>x</Text>
            </View>
            
            <View style={styles.dataRow}>
              <Text style={styles.dataLabel}>Address:</Text>
              <Text style={styles.dataValue}>x</Text>
            </View>
            
            <View style={styles.dataRow}>
              <Text style={styles.dataLabel}>Lot Size:</Text>
              <Text style={styles.dataValue}>x</Text>
            </View>
            
            <View style={styles.dataRow}>
              <Text style={styles.dataLabel}>Existing Structure:</Text>
              <Text style={styles.dataValue}>x</Text>
            </View>
            
            <View style={styles.dataRow}>
              <Text style={styles.dataLabel}>Year Built:</Text>
              <Text style={styles.dataValue}>x</Text>
            </View>
            
            <View style={styles.dataRow}>
              <Text style={styles.dataLabel}>Parking:</Text>
              <Text style={styles.dataValue}>x</Text>
            </View>
            
            <View style={styles.dataRow}>
              <Text style={styles.dataLabel}>Owner:</Text>
              <Text style={styles.dataValue}>x</Text>
            </View>
            
            <View style={styles.dataRow}>
              <Text style={styles.dataLabel}>Owner Mailing Address:</Text>
              <Text style={styles.dataValue}>x</Text>
            </View>
          </View>

          {/* Zoning Information */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, styles.zoningTitle]}>Zoning Information</Text>
            
            <View style={styles.dataRow}>
              <Text style={styles.dataLabel}>Zoning District:</Text>
              <Text style={styles.dataValue}>x</Text>
            </View>
            
            <View style={styles.dataRow}>
              <Text style={styles.dataLabel}>Zoning Code Source:</Text>
              <Text style={styles.dataValue}>x</Text>
            </View>
            
            <View style={styles.dataRow}>
              <Text style={styles.dataLabel}>Zoning Map:</Text>
              <Text style={styles.dataValue}>x</Text>
            </View>
            
            <View style={styles.dataRow}>
              <Text style={styles.dataLabel}>Allowed Use (By-Right):</Text>
              <Text style={styles.dataValue}>x</Text>
            </View>
            
            <View style={styles.dataRow}>
              <Text style={styles.dataLabel}>Overlay:</Text>
              <Text style={styles.dataValue}>x</Text>
            </View>
          </View>
        </View>

        {/* Dimensional Requirements - Full Width */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, styles.dimensionalTitle]}>Dimensional Requirements</Text>
          
          <View style={styles.sectionsContainer}>
            <View style={{ flex: 1, marginRight: 15 }}>
              <View style={styles.dataRow}>
                <Text style={styles.dataLabel}>Max Height:</Text>
                <Text style={styles.dataValue}>x</Text>
              </View>
              
              <View style={styles.dataRow}>
                <Text style={styles.dataLabel}>Min Lot Area:</Text>
                <Text style={styles.dataValue}>x</Text>
              </View>
              
              <View style={styles.dataRow}>
                <Text style={styles.dataLabel}>Min Lot Width:</Text>
                <Text style={styles.dataValue}>x</Text>
              </View>
            </View>
            
            <View style={{ flex: 1 }}>
              <View style={styles.dataRow}>
                <Text style={styles.dataLabel}>Front Setback:</Text>
                <Text style={styles.dataValue}>x</Text>
              </View>
              
              <View style={styles.dataRow}>
                <Text style={styles.dataLabel}>FAR:</Text>
                <Text style={styles.dataValue}>x</Text>
              </View>
            </View>
          </View>
        </View>

        {/* AI Analysis Section */}
        {analysisData && (
          <View style={styles.analysisSection}>
            <Text style={styles.analysisTitle}>AI Predictive Analysis</Text>
            <Text style={styles.analysisText}>{analysisData.analysis}</Text>
          </View>
        )}

        {/* Footer */}
        <View style={styles.footer}>
          <Text>Generated by PlotTwist • {new Date().toLocaleDateString()}</Text>
        </View>
      </Page>
    </Document>
  )
}

export default PropertyReportPDF 