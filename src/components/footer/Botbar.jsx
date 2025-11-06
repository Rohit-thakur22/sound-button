import React from 'react'
import { useTranslation } from "react-i18next";
import '../../app/i18n'
import Link from 'next/link';

const Botbar = ({ locale = 'en' }) => {

  const { t } = useTranslation()

  return (
    <div class="flex flex-col py-16  gap-5 items-center border-t-2 bg-[#F6F8FC] dark:bg-gray-900 px-5 xl:px-5 lg:px-10 md:px-20 sm:px-14 relative h-full w-full max-w-inner-content">
      <div class="flex flex-col w-full py-6 pb-8 ">
        <nav class="grid grid-cols-2 sm:grid-cols-4 gap-y-10 gap-x-12 py-2 my-2">
          <div class="flex flex-col col-span-2 justify-center">
            <div class="cursor-pointer">
              <Link href={`/${locale}`}>
                <h6 className="font-bold dark:text-white text-center text-3xl lg:text-5xl">SoundEffectButtons</h6>
              </Link>
            </div>
            <ul class="flex flex-col dark:text-gray-300 justify-center items-center mt-4">

              <li>
                <p>
                  <span class="font-bold">{t("location")}:</span> <a target='_blank' href='https://www.google.com/maps/place/Dream+Creators/@31.6321971,76.830594,17z/data=!3m1!4b1!4m6!3m5!1s0x39051f92c652cb69:0xf7cd6f8feeb63059!8m2!3d31.6321926!4d76.8331743!16s%2Fg%2F11w3z45y5b?entry=ttu&g_ep=EgoyMDI0MTAwOS4wIKXMDSoASAFQAw%3D%3D'>Rewalsar, Himachal Pradesh, IN</a>
                </p>
              </li>
              <li>
                <span class="font-bold">{t("contact_us")}: </span><a href='mailto:richdreamcreators@gmail.com'>richdreamcreators@gmail.com</a>
              </li>
            </ul>
          </div>

          <div class="flex flex-col">
            <h2 class="font-semibold text-xl dark:text-[#FEFEFE] mb-4 uppercase">
              {t("categories")}
            </h2>
            <ul className='dark:text-gray-200'>
              <li className="my-2 listBorder relative pb-2 w-fit">
                <Link href={`/${locale}/meme-soundboard`} >
                {t("meme_soundboard")}
                </Link>
              </li>
              <li className="my-2 listBorder relative pb-2 w-fit">
                <Link href={`/${locale}/anime-soundboard`}>
                {t("anime_soundboard")}
                </Link>
              </li>
              <li className="my-2 listBorder relative pb-2 w-fit">
                <Link href={`/${locale}/prank-soundboard`}>
                {t("prank_soundboard")}
                </Link>
              </li>
              <li className="my-2 listBorder relative pb-2 w-fit">
                <Link href={`/${locale}/reaction-soundboard`}>
                {t("reaction_soundboard")}
                </Link>
              </li>
              <li className="my-2 listBorder relative pb-2 w-fit">
                <Link href={`/${locale}/discord-soundboard`} className=" my-2 listBorder relative pb-2 w-fit">
                {t("discord_soundboard")}
                </Link>
              </li>
            </ul>
          </div>
          <div class="flex flex-col">
            <h2 class="font-semibold text-xl dark:text-[#FEFEFE] mb-4 uppercase">
              {t("pages")}
            </h2>
            <ul className='dark:text-gray-200'>
              <Link href={`/${locale}/privacypolicy`}>
                <li class="my-2 listBorder relative pb-2 w-fit">
                  {t("privacy_policy")}
                </li>
              </Link>
              <Link href={`/${locale}/dcma-copyright-policy`}>
                <li class="my-2 listBorder relative pb-2 w-fit">
                {t("dmca_copyright_policy")}
                </li>
              </Link>
              <Link href={`/${locale}/termsofuse`}>
                <li class="my-2 listBorder relative pb-2 w-fit">
                  {t("terms_of_use")}
                </li>
              </Link>
              <Link href={'/about'}>
                <li class="my-2 listBorder relative pb-2 w-fit">
                  {t("about_us")}
                </li>
              </Link>
              <Link href={{
                pathname: `/contact`
              }}>
                <li class="my-2 listBorder relative pb-2 w-fit">
                  {t("contact_us")}
                </li>
              </Link>
            </ul>
          </div>
        </nav>
      </div>
    </div>
  )
}

export default Botbar
