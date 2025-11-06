'use client'
import Botbar from '@/components/footer/Botbar'
import { NavbarHead } from '@/components/header/NavbarHead'
import '@/app/i18n'
import { useTranslation } from 'react-i18next';

const AboutUs = ({ params }) => {
    const { locale } = params;
    const { t } = useTranslation();

    return (
        <>
            <head>
                <title>About Us
                </title>
                <meta
                    name="description"
                    content=" Learn about Soundeffectbuttons, our mission, and how we provide high-quality sound effects for creators and enthusiasts."
                />
            </head>
            <div class="min-h-screen dark:bg-[#171F2D]">
                <NavbarHead locale={locale} />
                <section class="" id="hero">
                    <div class="w-full pt-[40px] md:pt-[150px] lg:pb-16">
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
                        <div class="w-full px-3 sm:px-10 xl:px-60 ">
                            <h1 class="text-center my-10 mt-20 text-[#1A3454] dark:text-white drop-shadow-xl text-3xl md:text-4xl font-bold">
                                {t("about_us")}
                            </h1>
                            <p class="text-sm text-justify dark:text-gray-400 lg:text-lg text-gray-700">
                                {t("about_us_intro")}
                            </p>
                        </div>
                    </div>
                </section>
                <section id="different">
                    <div class="w-full px-3 sm:px-10 xl:px-60 ">
                        <p class="text-center my-10 text-[#1A3454] drop-shadow-xl dark:text-white text-3xl md:text-4xl font-bold">
                            {t("what_makes_us_different_title")}
                        </p>
                        <p class="text-sm text-justify lg:text-lg dark:text-gray-400 text-gray-700">
                            {t("what_makes_us_different_description")}
                        </p>

                    </div>
                </section>
                <section class="relative" id="milestones">
                    <p class="text-center text-[#1A3454] dark:text-white drop-shadow-xl my-10 pt-5 mt-24 text-3xl md:text-4xl font-bold">
                        {t("milestones_title")}
                    </p>
                    <div class=" mx-5 lg:lg:mx-16 xl:mx-56 grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                        <div data-aos="fade-down" class="shadow-xl bg-white py-16 gap-3 flex flex-col items-center justify-center aos-init aos-animate">
                            <svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" fill="rgb(107,114,128)"><path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm-43-61v-82q-35 0-59-26t-24-61v-44L149-559q-5 20-7 39.5t-2 39.5q0 130 84.5 227T437-141Zm294-108q22-24 38.5-51t28-56.5q11.5-29.5 17-60.5t5.5-63q0-106-58-192.5T607-799v18q0 35-24 61t-59 26h-87v87q0 17-13.5 28T393-568h-83v88p58q17 0 28 13t11 30v127h43q29 0 51 17t30 44Z" /></svg>
                            <p class="text-xl font-bold">{t("global_reach")}</p>
                            <p class="text-sm text-gray-700 font-medium uppercase">{t("global_reach_label")}</p>
                        </div>
                        <div data-aos="fade-up" className="shadow-xl bg-white py-16 gap-3 flex flex-col items-center justify-center aos-init aos-animate">
                            <svg xmlns="http://www.w3.org/2000/svg" height="48" width="48" viewBox="0 -960 960 960" fill="rgb(107,114,128)"><path d="M360-120p00q-33 0-56.5-23.5T120-200v-280q0-75 28.5-140.5t77-114q48.5-48.5 114-77T480-840q75 0 140.5 28.5t114 77q48.5 48.5 77 114T840-480v280q0 33-23.5 56.5T760-120H600v-320h160v-40q0-117-81.5-198.5T480-760q-117 0-198.5 81.5T200-480v40h160v320Zm-80-240h-80v160h80v-160Zm400 0v160h80v-160h-80Zm-400 0h-80 80Zm400 0h80-80Z" /></svg>
                            <p class="text-xl font-bold">{t("sounds")}</p>
                            <p class="text-sm text-gray-700 font-medium uppercase">{t("sounds_label")}</p>
                        </div>
                        <div data-aos="fade-down" class="bg-white shadow-xl py-16 gap-3 flex flex-col items-center justify-center aos-init aos-animate">
                            <svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" fill="rgb(107,114,128)"><path d="M320-203v-560l440 280-440 280Z" /></svg>
                            <p class="text-xl font-bold">{t("daily_plays")}</p>
                            <p class="text-sm text-gray-700 font-medium uppercase">{t("daily_plays_label")}</p>
                        </div>
                        <div data-aos="fade-up" class="bg-white shadow-xl py-16 gap-3 flex flex-col items-center justify-center aos-init aos-animate">
                            <svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" fill="rgb(107,114,128)"><path d="M480-481q-66 0-108-42t-42-108q0-66 42-108t108-42q66 0 108 42t42 108q0 66-42 108t-108 42ZM160-160v-94q0-38 19-65t49-41q67-30 128.5-45T480-420q62 0 123 15.5T731-360q31 14 50 41t19 65v94H160Z" /></svg>
                            <p class="text-xl font-bold">{t("community_members")}</p>
                            <p class="text-sm text-gray-700 font-medium uppercase">{t("community_label")}</p>
                        </div>
                    </div>
                </section>

                <section id="valuesmobile" class="w-full mb-[80px] md:hidden">
                    <p class="text-center my-16 text-[#1A3454] drop-shadow-xl text-3xl md:text-4xl font-bold">{t("objective_title")}</p>
                    <div data-aos="flip-right" class="bg-white shadow-lg mx-5 lg:mx-10 pb-4 px-5 mt-10 mission aos-init aos-animate">
                        <h4 class="py-2 drop-shadow-md text-gray-800 text-2xl font-bold">{t("goal_title")}</h4>
                        <p class="text-sm lg:text-lg">{t("goal_description")}</p>
                    </div>
                    <div data-aos="flip-left" class="bg-white shadow-lg mx-5 lg:mx-10 pb-4 px-5 mt-10 mission aos-init aos-animate">
                        <h4 class="py-2 text-gray-800 text-2xl drop-shadow-md font-bold">{t("vision_title")}</h4>
                        <p class="text-sm lg:text-lg">{t("vision_description")}</p>
                    </div>
                </section>

                <section id="values" class="w-full hidden md:block mb-24 mt-24">
                    <p class="text-center my-16 dark:text-white text-[#1A3454] drop-shadow-xl text-4xl font-bold">{t("objective_title")}</p>
                    <div class="grid h-[400px] lg:px-44 grid-cols-2 ">
                        <div class="left border-r-2 border-dashed border-gray-500">
                            <div data-aos="flip-right" class="bg-white shadow-lg mx-5 lg:mx-10 pb-4 px-5 mt-10 mission aos-init aos-animate">
                                <h4 class="py-2 drop-shadow-md text-gray-800 text-xl md:text-2xl font-bold">{t("goal_title")}</h4>
                                <p class="text-sm lg:text-lg">
                                {t("goal_description")}
                                </p>
                            </div>
                        </div>

                        <div class="right relative border-dashed border-l-2 border-gray-500">
                            <div data-aos="flip-left" class="bg-white absolute bottom-10 shadow-lg mx-5 lg:mx-10 pb-4 px-5 mt-10 mission aos-init aos-animate">
                                <h4 class="py-2 text-gray-800 text-xl md:text-2xl drop-shadow-md font-bold">{t("vision_title")}</h4>
                                <p class="text-sm lg:text-lg">
                                    {t("vision_description")}
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <Botbar locale={locale} />

            </div>
        </>

    )
}

export default AboutUs

