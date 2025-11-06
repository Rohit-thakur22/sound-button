'use client';
import React, { useContext } from 'react';
import { NavbarHead } from '@/components/header/NavbarHead';
import Botbar from '@/components/footer/Botbar';
import Breadcrumb from '@/components/breadcrumb/Breadcrumb';
import { ThemeContext } from '@/components/context/theme-context';
import { useTranslation } from 'react-i18next';
import '../../app/i18n';

const DCMAPage = ({ locale = 'en' }) => {
  const { t } = useTranslation();
  const { theme } = useContext(ThemeContext);

  return (
    <div className="w-full dark:bg-[#212D3D] relative flex min-h-screen flex-col items-center">
      <main className="w-full dark:bg-[#212D3D] relative flex min-h-screen flex-col items-center">
        <NavbarHead locale={locale} />
        
        <Breadcrumb 
          first={t("home")} 
          second={t("dcma_policy")} 
          secondLink="dcma-copyright-policy" 
          locale={locale} 
        />

        {/* DCMA Content */}
        <section className="mt-[60px] w-full max-w-4xl mx-auto px-5 py-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            <h1 className="gradtext font-bold text-4xl md:text-5xl mb-8 text-center">
              {t("dcma_copyright_policy")}
            </h1>
            
            <div className="prose dark:prose-invert max-w-none">
              <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
                {t("dcma_intro_title")}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                {t("dcma_intro_text")}
              </p>

              <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
                {t("dcma_procedure_title")}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {t("dcma_procedure_text")}
              </p>

              <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
                {t("dcma_notice_title")}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {t("dcma_notice_text")}
              </p>

              <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
                {t("dcma_counter_notice_title")}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {t("dcma_counter_notice_text")}
              </p>

              <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
                {t("dcma_repeat_infringer_title")}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {t("dcma_repeat_infringer_text")}
              </p>

              <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
                {t("dcma_contact_title")}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {t("dcma_contact_text")}
              </p>

              <div className="bg-gray-100 dark:bg-gray-700 p-6 rounded-lg mt-8">
                <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
                  {t("dcma_contact_info_title")}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-2">
                  <strong>{t("email")}:</strong> copyright@soundeffectbuttons.com
                </p>
                <p className="text-gray-600 dark:text-gray-300 mb-2">
                  <strong>{t("subject_line")}:</strong> DMCA Notice
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  <strong>{t("response_time")}:</strong> {t("dcma_response_time")}
                </p>
              </div>
            </div>
          </div>
        </section>

        <Botbar locale={locale} />
      </main>
    </div>
  );
};

export default DCMAPage;








