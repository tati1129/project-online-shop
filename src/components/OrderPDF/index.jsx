import React from 'react';
import { Document, Page, Text, View, PDFDownloadLink } from '@react-pdf/renderer';

const OrderPDF = ({ order }) => (
  <PDFDownloadLink document={<OrderDocument order={order} />} fileName="order.pdf">
    {({ blob, url, loading, error }) =>
      loading ? 'Generating PDF...' : error ? 'Error while generating PDF' : 'Download PDF'
    }
  </PDFDownloadLink>
);

const OrderDocument = ({ order }) => (
  <Document>
    <Page>
      <View>
        <Text>Order Information</Text>
        <Text>Order ID: {order.id}</Text>
        <Text>Phone number: {order.phone}</Text>
        <Text>Order items:</Text>
        {order.data.map(item => (
          <Text key={item.id}>
            {item.title} - Quantity: {item.count}, Price: {item.price}
          </Text>
        ))}
        <Text>Total: {order.total}</Text>
      </View>
    </Page>
  </Document>
);

export default OrderPDF;
