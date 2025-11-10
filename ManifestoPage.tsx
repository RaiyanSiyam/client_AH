import React from 'react';
import { Link } from 'react-router-dom';
import { useOutletContext } from './App'; 
import { Language } from './types';
import { content } from './constants';

type ContentType = typeof content.bn;

const ManifestoPage: React.FC = () => {
    const { currentContent } = useOutletContext<{ language: Language, currentContent: ContentType }>();
    const isBengali = currentContent.lang_toggle === 'বাংলা';

    return (
        <div className="bg-gray-100 py-16 px-4">
            <div className="container mx-auto">
                <div className="text-center max-w-3xl mx-auto">
                    <h1 className={`text-4xl lg:text-5xl font-black text-[#00523A] mt-2 leading-tight ${isBengali ? '' : 'font-sans-english'}`}>
                        {currentContent.manifesto_page.heading}
                    </h1>
                    
                </div>

                <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {currentContent.manifesto.items.map((section, index) => (
                        <div key={index} className="bg-white p-6 rounded-lg shadow-lg border-t-4 border-yellow-400 flex flex-col">
                            
                            <img 
                                src={(section as any).imageUrl} 
                                alt={section.title}
                                className="w-full rounded-md mb-4"
                            />
                            
                            <h2 className="text-2xl font-bold text-[#00523A]">{section.title}</h2>
                            
                            <p className="mt-3 text-gray-600">{section.description}</p>
                         
                            <div className="mt-auto pt-6 text-center">
                                <a
                                    href={`/manifesto/view/${section.pdfUrl}`}
                                    className="bg-[#00523A] text-white font-bold py-2 px-6 rounded-lg hover:bg-green-800 transition-colors duration-200 inline-flex items-center"
                               >     <p>{currentContent.manifesto_page.button_label}</p>
                                    
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ManifestoPage;