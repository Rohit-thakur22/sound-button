'use client'
import Botbar from '@/components/footer/Botbar'
import TopCreators from '@/components/topCreators/TopCreators'
import { NavbarHead } from '@/components/header/NavbarHead'
import Breadcrumb from '@/components/breadcrumb/Breadcrumb'
import '../../app/i18n'
import { useTranslation } from 'react-i18next';

const Leaders = ({ creatorsData, locale = 'en' }) => {

    const { t } = useTranslation();

    return (
        <main className="w-full dark:bg-[#212D3D] relative flex min-h-screen flex-col items-cente">
            <NavbarHead active='leaderboard' locale={locale} />
            <Breadcrumb first={t("home")} second={t("leaderboard")} secondLink={'leaderboard'} locale={locale} />

            <section class="md:mt-[60px]" id="hero">
                <div class="w-full flex justify-center  lg:pb-10">
                    <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none" className="absolute -z-[999] top-[60px] transform -scale-x-100 hidden dark:hidden w-full h-[700px] md:block" >
                        <defs>
                            <linearGradient id="sw-gradient-0" x1="1" x2="0" y1="1" y2="0">
                                <stop stop-color="hsl(217, 102%, 99%)" offset="0%"></stop>
                                <stop stop-color="hsl(217,88%, 93%)" offset="100%"></stop>
                            </linearGradient>
                        </defs>
                        <path className="fill-[url(#sw-gradient-0)] dark:fill-[#171F2D]" d="M 0.351 264.418 C 0.351 264.418 33.396 268.165 47.112 270.128 C 265.033 301.319 477.487 325.608 614.827 237.124 C 713.575 173.504 692.613 144.116 805.776 87.876 C 942.649 19.853 1317.845 20.149 1440.003 23.965 C 1466.069 24.779 1440.135 24.024 1440.135 24.024 L 1440 0 L 1360 0 C 1280 0 1120 0 960 0 C 800 0 640 0 480 0 C 320 0 160 0 80 0 L 0 0 L 0.351 264.418 Z">
                        </path>
                    </svg>
                    <div class="w-full px-3 sm:px-10 xl:w-[60%] ">
                        <h1 class="text-center my-10 mt-10 text-[#1A3454] dark:text-white drop-shadow-xl text-3xl md:text-4xl font-bold">{t("leaderboard")}</h1>
                        <p class="text-sm  text-justify dark:text-gray-400 lg:text-lg text-gray-700">
                            {t("leaderboard_description")}
                        </p>
                    </div>
                </div>
            </section>
            <TopCreators creators={creatorsData} locale={locale} />
            <Botbar locale={locale} />
        </main>
    )
}

export default Leaders
