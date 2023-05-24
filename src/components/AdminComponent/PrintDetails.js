import React, { useState } from "react";
import { Document, Page, Text, PDFDownloadLink } from "@react-pdf/renderer";
import StudentProfile from "./StudentProfile";
import StudentDetails from "../StudentComponent/StudentDetails";
import Test from "./Test";

const PrintDetails = () => {
  const [pdfUrl, setPdfUrl] = useState(null);

  const handlePdfGenerated = (url) => {
    setPdfUrl(url);
  };

  return (
    <div>
      <PDFDownloadLink
        document={<Test />}
        fileName='example.pdf'
        onRender={handlePdfGenerated}
      >
        {({ loading }) =>
          loading ? "Loading document..." : "Generate and store PDF"
        }
      </PDFDownloadLink>
      {pdfUrl && (
        <div>
          <p>PDF URL: {pdfUrl}</p>
          <a href={pdfUrl} target='_blank' rel='noopener noreferrer'>
            Open PDF
          </a>
        </div>
      )}
    </div>
  );
};

export default PrintDetails;
