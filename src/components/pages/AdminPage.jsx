'use client';
import React, { useEffect, useState, useContext } from 'react';
import { NavbarHead } from '@/components/header/NavbarHead';
import Botbar from '@/components/footer/Botbar';
import Breadcrumb from '@/components/breadcrumb/Breadcrumb';
import { ThemeContext } from '@/components/context/theme-context';
import { useTranslation } from 'react-i18next';
import '../../app/i18n';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../../firebase';
import { isAdmin } from '@/database/isAdmin';
import Loading from '@/components/loading/Loading';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminPage = ({ locale = 'en' }) => {
  const router = useRouter();
  const { t } = useTranslation();
  const { theme } = useContext(ThemeContext);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [adminStatus, setAdminStatus] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        try {
          const adminCheck = await isAdmin(currentUser.uid);
          setAdminStatus(adminCheck);
          if (!adminCheck) {
            toast.error(t('access_denied'));
            router.push(`/${locale}`);
          }
        } catch (error) {
          console.error('Error checking admin status:', error);
          toast.error(t('error_occurred'));
          router.push(`/${locale}`);
        }
      } else {
        router.push(`/${locale}/login`);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router, locale, t]);

  if (loading) {
    return <Loading />;
  }

  if (!user || !adminStatus) {
    return null;
  }

  return (
    <div className="w-full dark:bg-[#212D3D] relative flex min-h-screen flex-col items-center">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      
      <main className="w-full dark:bg-[#212D3D] relative flex min-h-screen flex-col items-center">
        <NavbarHead active="admin" locale={locale} />
        
        <Breadcrumb 
          first={t("home")} 
          second={t("admin")} 
          secondLink="admin" 
          locale={locale} 
        />

        {/* Admin Dashboard Content */}
        <section className="mt-[60px] w-full max-w-6xl mx-auto px-5 py-8">
          <div className="text-center mb-8">
            <h1 className="gradtext font-bold text-4xl md:text-6xl mb-4">
              {t("admin_dashboard")}
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              {t("admin_description")}
            </p>
          </div>

          {/* Admin Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-center">
              <h3 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                {t("total_sounds")}
              </h3>
              <p className="text-3xl font-bold text-gray-800 dark:text-white">
                --
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-center">
              <h3 className="text-2xl font-bold text-green-600 dark:text-green-400 mb-2">
                {t("total_users")}
              </h3>
              <p className="text-3xl font-bold text-gray-800 dark:text-white">
                --
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-center">
              <h3 className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                {t("total_downloads")}
              </h3>
              <p className="text-3xl font-bold text-gray-800 dark:text-white">
                --
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-center">
              <h3 className="text-2xl font-bold text-orange-600 dark:text-orange-400 mb-2">
                {t("total_categories")}
              </h3>
              <p className="text-3xl font-bold text-gray-800 dark:text-white">
                --
              </p>
            </div>
          </div>

          {/* Admin Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
                {t("sound_management")}
              </h3>
              <div className="space-y-3">
                <button 
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                  onClick={() => router.push(`/${locale}/admin/sounds`)}
                >
                  {t("manage_sounds")}
                </button>
                <button 
                  className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
                  onClick={() => router.push(`/${locale}/admin/categories`)}
                >
                  {t("manage_categories")}
                </button>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
                {t("user_management")}
              </h3>
              <div className="space-y-3">
                <button 
                  className="w-full bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded"
                  onClick={() => router.push(`/${locale}/admin/users`)}
                >
                  {t("manage_users")}
                </button>
                <button 
                  className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                  onClick={() => router.push(`/${locale}/admin/reports`)}
                >
                  {t("view_reports")}
                </button>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
                {t("system_settings")}
              </h3>
              <div className="space-y-3">
                <button 
                  className="w-full bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
                  onClick={() => router.push(`/${locale}/admin/settings`)}
                >
                  {t("system_settings")}
                </button>
                <button 
                  className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded"
                  onClick={() => router.push(`/${locale}/admin/analytics`)}
                >
                  {t("view_analytics")}
                </button>
              </div>
            </div>
          </div>
        </section>

        <Botbar locale={locale} />
      </main>
    </div>
  );
};

export default AdminPage;








