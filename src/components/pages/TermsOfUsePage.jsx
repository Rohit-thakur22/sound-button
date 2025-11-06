'use client';
import React, { useContext } from 'react';
import { NavbarHead } from '@/components/header/NavbarHead';
import Botbar from '@/components/footer/Botbar';
import Breadcrumb from '@/components/breadcrumb/Breadcrumb';
import { ThemeContext } from '@/components/context/theme-context';
import { useTranslation } from 'react-i18next';
import '../../app/i18n';

const TermsOfUsePage = ({ locale = 'en' }) => {
  const { t } = useTranslation();
  const { theme } = useContext(ThemeContext);

  return (
    <div className="w-full dark:bg-[#212D3D] relative flex min-h-screen flex-col items-center">
      <main className="w-full dark:bg-[#212D3D] relative flex min-h-screen flex-col items-center">
        <NavbarHead locale={locale} />
        
        <Breadcrumb 
          first={t("home")} 
          second={t("terms_of_use")} 
          secondLink="termsofuse" 
          locale={locale} 
        />

        {/* Terms of Use Content */}
        <section className="mt-[60px] w-full max-w-4xl mx-auto px-5 py-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            <h1 className="gradtext font-bold text-4xl md:text-5xl mb-8 text-center">
              {t("terms_of_use")}
            </h1>
            
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">
                {t("last_updated")}: {t("terms_last_updated_date")}
              </p>

              <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
                {t("terms_intro_title")}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                {t("terms_intro_text")}
              </p>

              <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
                {t("terms_acceptance_title")}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                {t("terms_acceptance_text")}
              </p>

              <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
                {t("terms_service_description_title")}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                {t("terms_service_description_text")}
              </p>

              <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
                {t("terms_user_obligations_title")}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {t("terms_user_obligations_text")}
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 mb-6">
                <li>{t("terms_user_obligations_item1")}</li>
                <li>{t("terms_user_obligations_item2")}</li>
                <li>{t("terms_user_obligations_item3")}</li>
                <li>{t("terms_user_obligations_item4")}</li>
                <li>{t("terms_user_obligations_item5")}</li>
              </ul>

              <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
                {t("terms_prohibited_uses_title")}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {t("terms_prohibited_uses_text")}
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 mb-6">
                <li>{t("terms_prohibited_uses_item1")}</li>
                <li>{t("terms_prohibited_uses_item2")}</li>
                <li>{t("terms_prohibited_uses_item3")}</li>
                <li>{t("terms_prohibited_uses_item4")}</li>
                <li>{t("terms_prohibited_uses_item5")}</li>
              </ul>

              <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
                {t("terms_intellectual_property_title")}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                {t("terms_intellectual_property_text")}
              </p>

              <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
                {t("terms_liability_title")}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                {t("terms_liability_text")}
              </p>

              <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
                {t("terms_termination_title")}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                {t("terms_termination_text")}
              </p>

              <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
                {t("terms_changes_title")}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                {t("terms_changes_text")}
              </p>

              <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
                {t("terms_contact_title")}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                {t("terms_contact_text")}
              </p>

              <div className="bg-gray-100 dark:bg-gray-700 p-6 rounded-lg mt-8">
                <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
                  {t("terms_contact_info_title")}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-2">
                  <strong>{t("email")}:</strong> legal@soundeffectbuttons.com
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  <strong>{t("response_time")}:</strong> {t("terms_response_time")}
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

export default TermsOfUsePage;








