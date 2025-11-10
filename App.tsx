import React, { useState, useCallback, useEffect, Suspense, memo } from 'react';
import { createBrowserRouter, RouterProvider, Outlet, useOutletContext as useReactRouterOutletContext } from 'react-router-dom';
import { Language } from './types';
import { content } from './constants';
import ManifestoPage from './ManifestoPage';
import PDFViewerPage from './PDFViewerPage';

// --- Global Types ---
declare global {
    interface Window {
        FB?: any;
        fbAsyncInit?: () => void;
    }
}
type ContentType = typeof content.bn;
// A type-safe version of useOutletContext
export function useOutletContext<T>(): T {
    return useReactRouterOutletContext<T>();
}


// --- Header Component ---
interface HeaderProps {
    currentLanguage: Language;
    toggleLanguage: () => void;
    content: ContentType['nav'];
    heroContent: ContentType['hero'];
    langToggleText: string;
}

const Header: React.FC<HeaderProps> = memo(({ currentLanguage, toggleLanguage, content, heroContent, langToggleText }) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const closeMobileMenu = useCallback(() => {
        setIsMobileMenuOpen(false);
    }, []);

    const handleLanguageToggle = useCallback(() => {
        toggleLanguage();
        closeMobileMenu();
    }, [toggleLanguage, closeMobileMenu]);

    return (
        <header className="bg-[#00523A] text-white sticky top-0 z-50 shadow-lg">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <div className="flex-shrink-0">
                        <a href="/" className="text-white">
                            <h1 className={`text-3xl font-black tracking-tighter ${currentLanguage === Language.BN ? '' : 'font-sans-english'} whitespace-nowrap`}>{heroContent.title}</h1>
                            <p className={`text-xs text-yellow-300 font-bold tracking-widest ${currentLanguage === Language.BN ? '' : 'font-sans-english'} whitespace-nowrap`}>{heroContent.subtitle}</p>
                        </a>
                    </div>
                    <nav className="hidden md:flex flex-grow justify-end items-center space-x-4 lg:space-x-6">
                        <a href="/#about" className="hover:text-yellow-300 transition-colors whitespace-nowrap">{content.about}</a>
                        <a href="/#platform" className="hover:text-yellow-300 transition-colors whitespace-nowrap">{content.platform}</a>
                        <a href="/#endorsements" className="hover:text-yellow-300 transition-colors whitespace-nowrap">{content.endorsements}</a>
                        <a href="/#press" className="hover:text-yellow-300 transition-colors whitespace-nowrap">{content.press}</a>
                        <a href="/#gallery" className="hover:text-yellow-300 transition-colors whitespace-nowrap">{content.gallery}</a>
                        <a href="/#blog" className="hover:text-yellow-300 transition-colors whitespace-nowrap">{content.blog}</a>
                        <a href="/#volunteer" className="hover:text-yellow-300 transition-colors whitespace-nowrap">{content.volunteer}</a>
                        <a href="/manifesto" className="hover:text-yellow-300 transition-colors whitespace-nowrap">{content.manifesto}</a>
                        <a href="https://scheduler.fnabd.biz/login_signup.php" className="bg-yellow-400 text-[#00523A] px-3 py-2 lg:px-5 lg:py-2.5 rounded-md font-bold text-sm lg:text-base hover:bg-yellow-300 transition-colors whitespace-nowrap">{content.campaign_scheduler}</a>
                        <button onClick={toggleLanguage} className="bg-white text-[#00523A] px-2 py-1.5 lg:px-3 lg:py-2.5 rounded-md font-bold text-xs lg:text-sm hover:bg-gray-200 transition-colors whitespace-nowrap">
                            {langToggleText}
                        </button>
                    </nav>
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsMobileMenuOpen(prev => !prev)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-yellow-300 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                            aria-expanded={isMobileMenuOpen}
                            aria-controls="mobile-menu"
                        >
                            <span className="sr-only">Open main menu</span>
                            {isMobileMenuOpen ? (
                                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>
            <div
                className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'} absolute top-full left-0 right-0 bg-[#00523A] border-t border-white/10 shadow-lg`}
                id="mobile-menu"
            >
                <div className="px-4 pt-4 pb-6 space-y-3">
                    <a href="/#about" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-white/10 hover:text-yellow-300" onClick={closeMobileMenu}>{content.about}</a>
                    <a href="/#platform" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-white/10 hover:text-yellow-300" onClick={closeMobileMenu}>{content.platform}</a>
                    <a href="/#endorsements" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-white/10 hover:text-yellow-300" onClick={closeMobileMenu}>{content.endorsements}</a>
                    <a href="/#press" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-white/10 hover:text-yellow-300" onClick={closeMobileMenu}>{content.press}</a>
                    <a href="/#gallery" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-white/10 hover:text-yellow-300" onClick={closeMobileMenu}>{content.gallery}</a>
                    <a href="/#blog" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-white/10 hover:text-yellow-300" onClick={closeMobileMenu}>{content.blog}</a>
                    <a href="/#volunteer" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-white/10 hover:text-yellow-300" onClick={closeMobileMenu}>{content.volunteer}</a>
                    <a href="/manifesto" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-white/10 hover:text-yellow-300" onClick={closeMobileMenu}>{content.manifesto}</a>
                    <a href="https://scheduler.fnabd.biz/login_signup.php" className="block w-full text-center bg-yellow-400 text-[#00523A] px-4 py-3 rounded-md font-bold hover:bg-yellow-300 transition-colors" onClick={closeMobileMenu}>
                        {content.campaign_scheduler}
                    </a>
                    <button onClick={handleLanguageToggle} className="block w-full text-center bg-white text-[#00523A] px-4 py-3 rounded-md font-bold text-sm hover:bg-gray-200 transition-colors">
                        {langToggleText}
                    </button>
                </div>
            </div>
        </header>
    );
});

// --- Facebook Embed & Loader ---
const FacebookPageEmbed: React.FC<{ facebookUrl: string }> = memo(({ facebookUrl }) => {
    const getFacebookPageName = useCallback((url: string) => {
        try {
            const urlObj = new URL(url);
            const pathParts = urlObj.pathname.split('/').filter(Boolean);
            return pathParts[0] || 'facebook';
        } catch { return 'facebook'; }
    }, []);

    const [embedWidth, setEmbedWidth] = useState(500);

    useEffect(() => {
        const handleResize = () => setEmbedWidth(window.innerWidth < 500 ? window.innerWidth - 40 : 500);
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (window.FB) {
            window.FB.XFBML.parse();
        }
    }, [embedWidth]);

    const pageName = getFacebookPageName(facebookUrl);

    return (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200" style={{ width: embedWidth === 500 ? '500px' : 'auto', maxWidth: '100%', margin: '0 auto' }}>
            <div className="fb-page" data-href={`https://www.facebook.com/${pageName}`} data-tabs="timeline" data-width={embedWidth} data-height="600" data-small-header="false" data-hide-cover="false" data-show-facepile="true" />
        </div>
    );
});

const SuspenseLoader: React.FC = () => (
    <div className="text-center p-8 bg-white rounded-lg shadow-lg border border-gray-200">
        <p>Loading Facebook Feed...</p>
    </div>
);

// --- PopupImage Component ---
const PopupImage: React.FC<{ imageUrl: string; onClose: () => void; }> = memo(({ imageUrl, onClose }) => {
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-75 p-4" onClick={onClose}>
            <div className="relative max-w-xs sm:max-w-lg w-full max-h-[95vh] flex justify-center items-center p-2" onClick={(e) => e.stopPropagation()}>
                <img src={imageUrl} alt="Popup Ad" className="w-full h-auto object-contain rounded-lg shadow-xl max-h-[90vh]" onError={(e) => (e.currentTarget.src = './uploads/aminul_nomination_post.webp')} />
                <button onClick={onClose} className="absolute -top-3 -right-3 bg-red-600 rounded-full p-2 text-white shadow-lg hover:bg-red-700 transition-all duration-200 z-10 sm:-top-4 sm:-right-4" aria-label="Close popup">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
            </div>
        </div>
    );
});


// --- Layout Component (Wraps all pages) ---
const Layout: React.FC = () => {
    const [language, setLanguage] = useState<Language>(Language.BN);
    const toggleLanguage = useCallback(() => {
        setLanguage((prevLang) => (prevLang === Language.BN ? Language.EN : Language.BN));
    }, []);

    const currentContent = content[language];
    const langToggleText = content[language === Language.BN ? Language.EN : Language.BN].lang_toggle;
    const fontClass = language === Language.BN ? 'font-sans-bengali' : 'font-sans-english';

    return (
        <div className={`flex flex-col min-h-screen ${fontClass}`}>
            <Header
                currentLanguage={language}
                toggleLanguage={toggleLanguage}
                content={currentContent.nav}
                heroContent={currentContent.hero}
                langToggleText={langToggleText}
            />
            <main className="flex-grow bg-gray-50 text-gray-800">
                <Outlet context={{ language, currentContent }} />
            </main>
            <footer className="bg-[#00523A] text-center text-white py-8 px-4">
                <p>&copy; {new Date().getFullYear()} {currentContent.footer.paid_for}</p>
            </footer>
        </div>
    );
};

// --- HomePage Component (The main landing page content) ---
const HomePage: React.FC = () => {
    const { language, currentContent } = useOutletContext<{ language: Language, currentContent: ContentType }>();
    const [isFacebookSdkReady, setIsFacebookSdkReady] = useState(false);
    const [isPopupVisible, setIsPopupVisible] = useState(true);

    const handleClosePopup = useCallback(() => setIsPopupVisible(false), []);
    const isBengali = language === Language.BN;

    useEffect(() => {
        const initFacebookSdk = () => {
            if (window.FB) {
                window.FB.init({ appId: 'YOUR_APP_ID', xfbml: true, version: 'v18.0' });
                setIsFacebookSdkReady(true);
            }
        };

        if (document.getElementById('facebook-jssdk')) {
            if (window.FB) setIsFacebookSdkReady(true);
            else window.fbAsyncInit = initFacebookSdk;
            return;
        }

        window.fbAsyncInit = initFacebookSdk;
        const script = document.createElement('script');
        script.id = "facebook-jssdk";
        script.src = "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v18.0";
        script.async = true;
        script.defer = true;
        script.crossOrigin = "anonymous";
        document.body.appendChild(script);
    }, []);

    return (
        <>
            {isPopupVisible && (
                <PopupImage imageUrl="./image_132851.png" onClose={handleClosePopup} />
            )}

            <section className="bg-[#D81E05] text-white text-center py-6 px-4">
                <h2 className="text-3xl md:text-4xl font-black uppercase tracking-wider">{currentContent.top_banner.heading}</h2>
                <p className="mt-2 max-w-2xl mx-auto">{currentContent.top_banner.subheading}</p>
                <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
                    <a href="https://www.ecs.gov.bd/category/parliament-election-vote-centers" target="_blank" rel="noopener noreferrer" className="bg-yellow-400 text-[#D81E05] font-bold py-3 px-6 rounded-lg w-full sm:w-auto hover:bg-yellow-300 transition-colors duration-200">{currentContent.top_banner.cta1}</a>
                    <a href="https://www.bnpbd.org/founding-historic?language=bn" target="_blank" rel="noopener noreferrer" className="bg-yellow-400 text-[#D81E05] font-bold py-3 px-6 rounded-lg w-full sm:w-auto hover:bg-yellow-300 transition-colors duration-200">{currentContent.top_banner.cta2}</a>
                </div>
            </section>

            <section className="bg-[#00523A] text-white py-12 md:py-20 px-4">
                <div className="container mx-auto grid md:grid-cols-2 items-center gap-8">
                    <div>
                        <h2 className={`text-7xl md:text-9xl font-black leading-none ${isBengali ? '' : 'font-sans-english tracking-tighter'}`}>{currentContent.hero.title}</h2>
                        <h3 className={`text-2xl md:text-3xl text-yellow-300 font-bold uppercase tracking-widest mt-2 ${isBengali ? '' : 'font-sans-english'}`}>{currentContent.hero.subtitle}</h3>
                        <p className="text-xl md:text-2xl max-w-md leading-relaxed mt-8">{currentContent.hero.intro}</p>
                    </div>
                    <div className="flex justify-center items-end">
                        <img src="./uploads/aminul3.webp" alt="Aminul Haque" className="rounded-t-full max-w-sm w-full object-cover" onError={(e) => (e.currentTarget.src = 'https://placehold.co/400x500/00523A/FFF?text=Aminul+Haque')} />
                    </div>
                </div>
            </section>

            <section className="py-20 px-4">
                <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center">
                    <div className="relative border-4 border-yellow-400 p-8 rounded-lg">
                        <span className="text-8xl text-yellow-400 absolute -top-10 left-4 font-black">"</span>
                        <p className="text-2xl md:text-3xl font-bold leading-snug text-[#00523A]">{currentContent.quote.text}</p>
                        <span className="text-8xl text-yellow-400 absolute -bottom-16 right-4 font-black">"</span>
                    </div>
                    <div>
                        <iframe className="w-full aspect-video rounded-lg shadow-2xl" src="https://www.youtube.com/embed/MtfxCWXLOiY" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                    </div>
                </div>
            </section>

            <section id="about" className="py-20 px-4 bg-gray-100 overflow-hidden">
                <div className="container mx-auto grid md:grid-cols-2 gap-x-16 gap-y-12 items-center">
                    <div className="order-2 md:order-1">
                        <h2 className={`text-5xl md:text-6xl font-black text-[#00523A] ${isBengali ? '' : 'font-sans-english'}`}>{currentContent.meet.heading}</h2>
                        <div className="mt-6 border-l-8 border-yellow-400 pl-6">
                            <p className="text-lg leading-relaxed text-gray-700">{currentContent.meet.body}</p>
                        </div>
                    </div>
                    <div className="order-1 md:order-2">
                        <img src="./uploads/aminul2.webp" alt="Aminul speaking" className="max-w-md w-full h-auto mx-auto rounded-2xl shadow-2xl object-cover transform md:rotate-2 transition duration-500 hover:rotate-0 hover:scale-105" onError={(e) => (e.currentTarget.src = 'https://placehold.co/400x400/ccc/333?text=Aminul+Speaking')} />
                    </div>
                </div>
            </section>

            <section id="volunteer" className="py-20 px-4">
                <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center">
                    <div className="bg-yellow-400 p-8 md:p-12 rounded-lg text-gray-900">
                        <p className="font-bold uppercase text-red-600">{currentContent.get_involved.join}</p>
                        <h2 className="text-5xl md:text-6xl font-black mt-2">{currentContent.get_involved.heading}</h2>
                        <p className="mt-4 text-base leading-relaxed">{currentContent.get_involved.body}</p>
                        <div className="mt-8 flex flex-col sm:flex-row gap-4">
                            <button className="bg-red-600 text-white font-bold py-4 px-8 rounded-lg w-full sm:w-auto hover:bg-red-700 transition-colors">{currentContent.get_involved.cta1}</button>
                            <button className="bg-[#00523A] text-white font-bold py-4 px-8 rounded-lg w-full sm:w-auto hover:bg-green-900 transition-colors">{currentContent.get_involved.cta2}</button>
                        </div>
                    </div>
                    <img src="./uploads/aminul4.webp" alt="Supporters at a rally" className="w-full h-full object-cover rounded-lg shadow-xl" onError={(e) => (e.currentTarget.src = 'https://placehold.co/600x400/ccc/333?text=Rally')} />
                </div>
            </section>

            <section id="platform" className="py-20 px-4 bg-gray-100">
                <div className="container mx-auto flex flex-col md:flex-row gap-12">
                    <div className="md:w-1/3">
                        <div className="sticky top-24 border-l-8 border-yellow-400 pl-6">
                            <p className="font-bold text-red-600 uppercase">{currentContent.platform.tag}</p>
                            <h2 className="text-4xl lg:text-5xl font-black text-[#00523A] mt-2 leading-tight">{currentContent.platform.heading}</h2>
                        </div>
                    </div>
                    <div className="md:w-2/3 space-y-12">
                        {currentContent.platform.points.map((point, index) => (
                            <div key={index} className="flex gap-4">
                                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#00523A] mt-1"></div>
                                <div>
                                    <h3 className="text-2xl font-bold text-[#00523A]">{point.title}</h3>
                                    <p className="mt-2 text-gray-700 leading-relaxed">{point.body}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section id="endorsements" className="py-20 px-4">
                <div className="container mx-auto">
                    <div className="text-center max-w-3xl mx-auto">
                        <p className="font-bold text-red-600 uppercase">{currentContent.endorsements.tag}</p>
                        <h2 className="text-4xl lg:text-5xl font-black text-[#00523A] mt-2 leading-tight">{currentContent.endorsements.heading}</h2>
                    </div>
                    <div className="mt-16 grid md:grid-cols-3 gap-8">
                        {currentContent.endorsements.list.map((item, index) => (
                            <div key={index} className="bg-white p-8 rounded-lg shadow-lg border-l-8 border-yellow-400 flex flex-col items-start">
                                {item.image && <img src={item.image} alt={item.name} className="w-20 h-20 rounded-full object-cover mb-4 ring-2 ring-yellow-400" onError={(e) => (e.currentTarget.src = 'https://placehold.co/80x80/ccc/333?text=User')} />}
                                <p className="text-lg text-gray-700 leading-relaxed italic flex-grow">"{item.quote}"</p>
                                <p className="mt-4 text-xl font-bold text-[#00523A] w-full text-right">— {item.name}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section id="press" className="py-20 px-4 bg-gray-100">
                <div className="container mx-auto">
                    <div className="text-center max-w-3xl mx-auto">
                        <p className="font-bold text-red-600 uppercase">{currentContent.press.tag}</p>
                        <h2 className="text-4xl lg:text-5xl font-black text-[#00523A] mt-2 leading-tight">{currentContent.press.heading}</h2>
                    </div>
                    <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
                        {currentContent.press.articles.map((article, index) => (
                            <a key={index} href={article.url} target="_blank" rel="noopener noreferrer" className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col group transition-transform duration-300 hover:scale-[1.03]">
                                <img src={article.image} alt={article.alt} className="w-full h-48 object-cover" onError={(e) => (e.currentTarget.src = `https://placehold.co/600x400/eee/333?text=${encodeURIComponent(article.alt)}`)} />
                                <div className="p-6 flex flex-col flex-grow">
                                    <p className="text-sm text-gray-500">{article.date}</p>
                                    <h3 className="text-xl font-bold text-[#00523A] mt-2 flex-grow">{article.title}</h3>
                                    <p className="mt-4 text-red-600 font-bold group-hover:text-red-700 transition-colors">{article.source} &rarr;</p>
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            </section>

            <section id="gallery" className="py-20 px-4">
                <div className="container mx-auto">
                    <div className="text-center max-w-3xl mx-auto">
                        <p className="font-bold text-red-600 uppercase">{currentContent.gallery.tag}</p>
                        <h2 className="text-4xl lg:text-5xl font-black text-[#00523A] mt-2 leading-tight">{currentContent.gallery.heading}</h2>
                    </div>
                    <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {currentContent.gallery.images.map((image, index) => (
                            <img key={index} src={image.src} alt={image.alt} className="w-full h-64 object-cover rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105" onError={(e) => (e.currentTarget.src = 'https://placehold.co/600x400/ccc/333?text=Gallery+Image')} />
                        ))}
                    </div>
                    <div className="text-center mt-16">
                        <a href={currentContent.gallery.facebook_url} target="_blank" rel="noopener noreferrer" className="bg-yellow-400 text-[#00523A] font-bold py-4 px-10 rounded-lg text-lg hover:bg-yellow-300 transition-colors duration-200">{currentContent.gallery.cta}</a>
                    </div>
                </div>
            </section>

            <section id="blog" className="py-20 px-4 bg-gray-100">
                <div className="container mx-auto">
                    <div className="text-center max-w-3xl mx-auto">
                        <p className="font-bold text-red-600 uppercase">{currentContent.blog.tag}</p>
                        <h2 className="text-4xl lg:text-5xl font-black text-[#00523A] mt-2 leading-tight">{currentContent.blog.heading}</h2>
                    </div>
                    <div className="mt-16 w-full max-w-4xl mx-auto">
                        <Suspense fallback={<SuspenseLoader />}>
                            {isFacebookSdkReady ? (<FacebookPageEmbed facebookUrl={currentContent.blog.facebook_url} />) : (<SuspenseLoader />)}
                        </Suspense>
                    </div>
                    <div className="text-center mt-8">
                        <a href={currentContent.blog.facebook_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-200">
                            <span>{currentContent.blog.cta}</span>
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" /></svg>
                        </a>
                    </div>
                </div>
            </section>
        </>
    );
};


// --- Router Setup ---
const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                index: true,
                element: <HomePage />
            },
            {
                path: "manifesto",
                element: <ManifestoPage />
            },
            {
                path: "manifesto/view/:pdfFile",
                element: <PDFViewerPage />
            }
        ]
    }
]);

// --- Main App Component ---
export default function App() {
    return <RouterProvider router={router} />;
}