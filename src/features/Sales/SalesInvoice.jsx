import { useEffect, useState } from 'react';
import { getSaleInvoice } from '../../services/apiSales';
import Spinner from '../../ui/Spinner';
import Logo from '../../ui/Logo';
import { convertTimestamp, formatCurrency } from '../../utils/helpers';
import Button from '../../ui/Button';
import { PDFDownloadLink, Document, Page, Text, Image, StyleSheet } from '@react-pdf/renderer';



function SalesInvoice({ salesId }) {

  const [invoiceItem, setInvoiceItem] = useState(null);
  useEffect(() => {
      const fetchSalesItem = async () => {
        try {
          const data = await getSaleInvoice(salesId);
          setInvoiceItem(data);
        } catch (error) {
          console.error('Error fetching sales item:', error.message);
        }
      };
  
      if (salesId) {
        fetchSalesItem();
      }
    }, [salesId]);
    
  
    if (!invoiceItem) {
      return <Spinner />;
    }


  return (
    <div className='text-gray-800 dark:text-gray-400 text-xl' id='invoice'>
      <div className='mb-5'>
        <Logo />
        <h1 className='font-bold text-3xl text-center'>Pharma Sheet</h1>
      </div>

      <div className='flex flex-col gap-2 mb-2'> 
        <h2 className='font-extrabold text-2xl'>Invoice Details</h2>
        <p>Medicine Name: {invoiceItem.medName}</p>
        <p>Client Name: {invoiceItem.clientName}</p>
        <p>Batch Number: {invoiceItem.batchNo}</p>
        <p>Price: {invoiceItem.price}</p>
        <p>Date and Time: {convertTimestamp(invoiceItem.dateAndTime)}</p>
        <p>Dosage: {invoiceItem.dosage}</p>
        <p>Total Price: {formatCurrency(invoiceItem.totalPrice)}</p>
      </div>

      <PDFDownloadLink
        document={<SalesInvoicePDF invoiceItem={invoiceItem} />}
        fileName={`${invoiceItem.clientName}_sales_invoice.pdf`}
      >
        <Button type='primary'>Download PDF</Button>
      </PDFDownloadLink>
    </div>
  );
}


const PDFstyles = StyleSheet.create({
  page: {
    color: 'gray',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 20,
    gap: 20,
  },
  image: {
    width: 80,
    height:'auto',
  },
  heading: {
    fontWeight: 'extrabold',
    marginBottom: 30,
    fontSize: 30,
  },
  end: {
    alignSelf: 'end',
    fontSize: 16,
  }
})


const SalesInvoicePDF = ({ invoiceItem }) => (
  <Document>
    <Page style={PDFstyles.page}>
      <Image src='logo.png' style={PDFstyles.image}/>
      <Text style={PDFstyles.heading}>Pharma Sheet</Text>
      <Text style={PDFstyles.end}>{convertTimestamp(invoiceItem.dateAndTime)}</Text>
      <Text>Medicine Name: {invoiceItem.medName}</Text>
      <Text>Client Name: {invoiceItem.clientName}</Text>
      <Text>Batch Number: {invoiceItem.batchNo}</Text>
      <Text>Price: {invoiceItem.price}</Text>
      <Text>Dosage: {invoiceItem.dosage}</Text>
      <Text>Total Price: {formatCurrency(invoiceItem.totalPrice)}</Text>
    </Page>
  </Document>
);

export default SalesInvoice;
