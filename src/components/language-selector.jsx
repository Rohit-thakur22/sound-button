"use client";

import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { useRouter, usePathname } from 'next/navigation'
import india from '../assets/images/flags/india.png'
import usa from '../assets/images/flags/usa.png'
import france from '../assets/images/flags/france.png'
import bangladesh from '../assets/images/flags/bangladesh.png'
import germany from '../assets/images/flags/germany.png'
import italy from '../assets/images/flags/italy.png'
import portugal from '../assets/images/flags/portugal.png'
import russia from '../assets/images/flags/russia.png'
import spain from '../assets/images/flags/spain.png'
import southKorea from '../assets/images/flags/southKorea.webp'
import { useTranslation } from 'react-i18next';
import { createLocalizedUrl, getLocaleFromPathname, getLocaleDisplayName } from '@/utils/locale';

const LanguageSelector = ({ locale = 'en' }) => {
    const langRef = useRef(null);
    const router = useRouter();
    const pathname = usePathname();
    const [visible, setVisible] = useState(false)
    const [country, setCountry] = useState(usa)
    const [lang, setLang] = useState('En')

    const { i18n } = useTranslation()

    // Language configuration mapping
    const languageConfig = {
        en: { flag: usa, label: 'En', name: 'English' },
        es: { flag: spain, label: 'Es', name: 'Español' },
        fr: { flag: france, label: 'Fr', name: 'Français' },
        it: { flag: italy, label: 'It', name: 'Italiano' },
        de: { flag: germany, label: 'De', name: 'Deutsch' },
        bn: { flag: bangladesh, label: 'Bn', name: 'Bangla' },
        pt: { flag: portugal, label: 'Pt', name: 'Português' },
        ko: { flag: southKorea, label: 'Ko', name: '한국어' },
        hi: { flag: india, label: 'Hi', name: 'Hindi' },
        ru: { flag: russia, label: 'Ru', name: 'Русский' },
        ta: { flag: india, label: 'Ta', name: 'தமிழ்' },
        ml: { flag: india, label: 'Ml', name: 'മലയാളം' },
        ja: { flag: southKorea, label: 'Ja', name: '日本語' },
        ar: { flag: india, label: 'Ar', name: 'العربية' }
    };

    // Update current language display based on locale
    useEffect(() => {
        const config = languageConfig[locale];
        if (config) {
            setCountry(config.flag);
            setLang(config.label);
        }
    }, [locale]);

    const changeLanguage = (newLocale) => {
        // Simple approach: redirect to the same page with new locale
        const currentPath = window.location.pathname;
        const newPath = currentPath.replace(`/${locale}`, `/${newLocale}`);
        
        // Update i18n
        i18n.changeLanguage(newLocale);
        
        // Redirect to new URL
        window.location.href = newPath;
        
        setVisible(false);
    }

    useEffect(() => {
        function handleClickOutside(event) {
          if (langRef.current && !langRef.current.contains(event.target)) {
            setVisible(false);
          }
        }
    
        // Bind the event listener
        document.addEventListener('mousedown', handleClickOutside);
    
        return () => {
          // Unbind the event listener on cleanup
          document.removeEventListener('mousedown', handleClickOutside);
        };
      }, [langRef]);

    return (
        <div ref={langRef} className='flex px-2 mr-0.5 py-0.5 rounded-full items-center relative'>
            <div className=''>
                <div  id='langbox' onClick={() => setVisible(!visible)} className='font-semibold  flex gap-2 cursor-pointer'>
                    <Image className='img rounded-full w-6' src={country} alt="country" />
                    <span className='dark:text-white'>{lang}</span>
                </div>
            </div>
            {
                visible &&
                <div data-aos="fade-down" className='fixed top-[60px] w-full sm:w-fit bg-white right-0 rounded shadow grid grid-cols-2 sm:grid-cols-3 backdrop-blur-md '>
                    {/* Render all languages dynamically */}
                    {Object.entries(languageConfig).map(([localeCode, config]) => (
                        <div 
                            key={localeCode}
                            onClick={() => changeLanguage(localeCode)} 
                            className={`${lang === config.label ? 'bg-white text-black dark:text' : ""} dark:text-white dark:hover:text-gray-800 font-semibold flex hover:bg-white duration-150 px-3 py-2 gap-2 cursor-pointer`}
                        >
                            <Image className='img rounded-full w-6' src={config.flag} alt={localeCode} />
                            <span>{config.name}</span>
                        </div>
                    ))}
                </div>
            }
        </div>
    )
}

export default LanguageSelector


