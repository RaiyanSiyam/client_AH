import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useOutletContext } from './App';
import { Language } from './types';
import { content } from './constants';
import { Document, Page, pdfjs } from 'react-pdf';

// This is the correct and robust way to import the worker.
// @ts-ignore - url-import worker has no type declarations in this project
// THE FIX: Changed the import path to use the version of pdfjs-dist bundled with react-pdf.
import pdfWorker from 'react-pdf/node_modules/pdfjs-dist/build/pdf.worker.mjs?url';

pdfjs.GlobalWorkerOptions.workerSrc = pdfWorker;

type ContentType = typeof content.bn & {
    pdf_viewer: {
        title: string;
        back_button: string;
    };
};

const PDFViewerPage: React.FC = () => {
    const { pdfFile } = useParams<{ pdfFile: string }>();
    const { currentContent } = useOutletContext<{ language: Language, currentContent: ContentType }>();
    const [numPages, setNumPages] = useState<number | null>(null);

    const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
        setNumPages(numPages);
    };

    const fileName = pdfFile?.split('/').pop();
    const pdfPath = `/pdfs/manifestos/${fileName}`;

    return (
        <div className="bg-gray-200 min-h-screen flex flex-col items-center">
            <div className="w-full max-w-4xl bg-white rounded-lg shadow-2xl overflow-hidden my-4">
                <Document
                    file={pdfPath}
                    onLoadSuccess={onDocumentLoadSuccess}
                    error="Failed to load PDF file."
                >
                    {Array.from(new Array(numPages || 0), (el, index) => (
                        <Page
                            key={`page_${index + 1}`}
                            pageNumber={index + 1}
                            renderAnnotationLayer={false}
                            renderTextLayer={false}
                            width={Math.min(window.innerWidth * 0.9, 896)}
                        />
                    ))}
                </Document>
            </div>
            <div className="w-full max-w-4xl flex justify-end p-4">
                 <Link
                        to="/manifesto"
                        className="bg-[#00523A] text-white font-bold py-2 px-6 rounded-lg hover:bg-green-800 transition-colors duration-200 flex items-center"
                    >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                        </svg>
                        {currentContent.pdf_viewer.back_button}
                    </Link>
            </div>
        </div>
    );
};

export default PDFViewerPage;