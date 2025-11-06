'use client';
import React, { useContext } from 'react';
import { NavbarHead } from '@/components/header/NavbarHead';
import Botbar from '@/components/footer/Botbar';
import Breadcrumb from '@/components/breadcrumb/Breadcrumb';
import { ThemeContext } from '@/components/context/theme-context';
import { useTranslation } from 'react-i18next';
import '../../app/i18n';

const PrivacyPolicyPage = ({ locale = 'en' }) => {
  const { t } = useTranslation();
  const { theme } = useContext(ThemeContext);

  return (
    <div className="w-full dark:bg-[#212D3D] relative flex min-h-screen flex-col items-center">
      <main className="w-full dark:bg-[#212D3D] relative flex min-h-screen flex-col items-center">
        <NavbarHead locale={locale} />
        
        <Breadcrumb 
          first={t("home")} 
          second={t("privacy_policy")} 
          secondLink="privacypolicy" 
          locale={locale} 
        />

        {/* Privacy Policy Content */}
        <section className="mt-[60px] w-full max-w-4xl mx-auto px-5 py-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            <h1 className="gradtext font-bold text-4xl md:text-5xl mb-8 text-center">
              {t("privacy_policy")}
            </h1>
            
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">
                {t("last_updated")}: {t("privacy_last_updated_date")}
              </p>

              <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
                {t("privacy_intro_title")}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                {t("privacy_intro_text")}
              </p>

              <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
                {t("privacy_info_collection_title")}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {t("privacy_info_collection_text")}
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 mb-6">
                <li>{t("privacy_info_collection_item1")}</li>
                <li>{t("privacy_info_collection_item2")}</li>
                <li>{t("privacy_info_collection_item3")}</li>
                <li>{t("privacy_info_collection_item4")}</li>
              </ul>

              <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
                {t("privacy_info_use_title")}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {t("privacy_info_use_text")}
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 mb-6">
                <li>{t("privacy_info_use_item1")}</li>
                <li>{t("privacy_info_use_item2")}</li>
                <li>{t("privacy_info_use_item3")}</li>
                <li>{t("privacy_info_use_item4")}</li>
              </ul>

              <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
                {t("privacy_cookies_title")}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                {t("privacy_cookies_text")}
              </p>

              <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
                {t("privacy_data_sharing_title")}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                {t("privacy_data_sharing_text")}
              </p>

              <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
                {t("privacy_data_security_title")}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                {t("privacy_data_security_text")}
              </p>

              <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
                {t("privacy_user_rights_title")}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {t("privacy_user_rights_text")}
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 mb-6">
                <li>{t("privacy_user_rights_item1")}</li>
                <li>{t("privacy_user_rights_item2")}</li>
                <li>{t("privacy_user_rights_item3")}</li>
                <li>{t("privacy_user_rights_item4")}</li>
              </ul>

              <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
                {t("privacy_contact_title")}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                {t("privacy_contact_text")}
              </p>

              <div className="bg-gray-100 dark:bg-gray-700 p-6 rounded-lg mt-8">
                <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
                  {t("privacy_contact_info_title")}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-2">
                  <strong>{t("email")}:</strong> privacy@soundeffectbuttons.com
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  <strong>{t("response_time")}:</strong> {t("privacy_response_time")}
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

export default PrivacyPolicyPage;








