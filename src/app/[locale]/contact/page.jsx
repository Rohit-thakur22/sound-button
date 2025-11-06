'use client'

import { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { NavbarHead } from '@/components/header/NavbarHead';
import '@/app/i18n'
import { useTranslation } from "react-i18next";
import Link from 'next/link';

const ContactUs = ({ params }) => {
  const { locale } = params;
  const [disable, setDisable] = useState(false)
  const [show, setShow] = useState(false)

  const { t } = useTranslation()

  const form = useRef();

  const sendEmail = async (e) => {
    e.preventDefault();
    setDisable(true)
    await emailjs.sendForm('service_j2i9dqs', 'template_yk2bvzx', form.current, {
      publicKey: 'dzFgm8EMBhS8_xagy',
    })
      .then(
        () => {
          setShow(true)
        },
        (error) => {
          console.log('FAILED...', error.text);
        },
      );
  };

  return (
    <>
      <head>
        <title>Contact Us
        </title>
        <meta
          name="description"
          content=" Get in touch with SoundEffectButtons! Reach out for inquiries, feedback, or anything that you have in your mind."
        />
      </head>
      <NavbarHead locale={locale} />
      <div class="bg-gray-100 dark:bg-[#171F2D] min-h-screen flex items-center justify-center">

        {/* backgrounds */}
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none" className="absolute  top-[60px] transform -scale-x-100 hidden w-full h-[700px] md:block" >
          <defs>
            <linearGradient id="sw-gradient-0" x1="1" x2="0" y1="1" y2="0">
              <stop stop-color="hsl(217, 102%, 99%)" offset="0%"></stop>
              <stop stop-color="hsl(217,88%, 93%)" offset="100%"></stop>
            </linearGradient>
          </defs>
          <path className="fill-[url(#sw-gradient-0)] dark:fill-[#171F2D]" d="M 0.351 264.418 C 0.351 264.418 33.396 268.165 47.112 270.128 C 265.033 301.319 477.487 325.608 614.827 237.124 C 713.575 173.504 692.613 144.116 805.776 87.876 C 942.649 19.853 1317.845 20.149 1440.003 23.965 C 1466.069 24.779 1440.135 24.024 1440.135 24.024 L 1440 0 L 1360 0 C 1280 0 1120 0 960 0 C 800 0 640 0 480 0 C 320 0 160 0 80 0 L 0 0 L 0.351 264.418 Z">
          </path>
        </svg>



        <div className="relative bg-white dark:bg-[#111827] shadow-lg rounded-lg mt-[80px] md:mt-0 overflow-hidden grid md:grid-cols-2 max-w-4xl">
          <div className="p-8 flex flex-col gap-6 justify-between">
            <div className='space-y-6'>
              <h3 className="text-2xl font-semibold dark:text-white text-[#0A75C5]">{t('lets_get_in_touch_label')}</h3>
              <p className="text-gray-600 dark:text-gray-300">
                {t('bug_report_label')}
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-gray-600">
                  <svg xmlns="http://www.w3.org/2000/svg" height="22px" viewBox="0 -960 960 960" width="24px" fill="#0A75C5"><path d="M480-480q33 0 56.5-23.5T560-560q0-33-23.5-56.5T480-640q-33 0-56.5 23.5T400-560q0 33 23.5 56.5T480-480Zm0 294q122-112 181-203.5T720-552q0-109-69.5-178.5T480-800q-101 0-170.5 69.5T240-552q0 71 59 162.5T480-186Zm0 106Q319-217 239.5-334.5T160-552q0-150 96.5-239T480-880q127 0 223.5 89T800-552q0 100-79.5 217.5T480-80Zm0-480Z" /></svg>
                  <p className='dark:text-gray-400'><a target='_blank' href='https://www.google.com/maps/place/Dream+Creators/@31.6321971,76.830594,17z/data=!3m1!4b1!4m6!3m5!1s0x39051f92c652cb69:0xf7cd6f8feeb63059!8m2!3d31.6321926!4d76.8331743!16s%2Fg%2F11w3z45y5b?entry=ttu&g_ep=EgoyMDI0MTAwOS4wIKXMDSoASAFQAw%3D%3D'>Rewalsar, Himachal Pradesh, IN</a></p>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <svg xmlns="http://www.w3.org/2000/svg" height="22px" viewBox="0 -960 960 960" width="22px" fill="#0A75C5"><path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm320-280L160-640v400h640v-400L480-440Zm0-80 320-200H160l320 200ZM160-640v-80 480-400Z" /></svg>
                  <p className='dark:text-gray-400'><a href='mailto:richdreamcreators@gmail.com'>richdreamcreators@gmail.com</a></p>
                </div>
                {/* <div className="flex items-center gap-3 text-gray-600">
          <svg xmlns="http://www.w3.org/2000/svg" height="22px" viewBox="0 -960 960 960" width="22px" fill="#0A75C5"><path d="M798-120q-125 0-247-54.5T329-329Q229-429 174.5-551T120-798q0-18 12-30t30-12h162q14 0 25 9.5t13 22.5l26 140q2 16-1 27t-11 19l-97 98q20 37 47.5 71.5T387-386q31 31 65 57.5t72 48.5l94-94q9-9 23.5-13.5T670-390l138 28q14 4 23 14.5t9 23.5v162q0 18-12 30t-30 12ZM241-600l66-66-17-94h-89q5 41 14 81t26 79Zm358 358q39 17 79.5 27t81.5 13v-88l-94-19-67 67ZM241-600Zm358 358Z"/></svg>
            <p></p>
          </div> */}
              </div>
            </div>
            <div>
              <p className="text-gray-600 dark:text-gray-300">{t('connect_with_us_label')}</p>
              <div className="flex space-x-4 mt-2">
                <Link className='cursor-pointer' target='_blank' href={'https://www.instagram.com/soundeffectbuttons/'}>
                  <div className="w-8 h-8 rounded bg-[#0A75C5] text-white flex items-center justify-center hover:bg-[#0A75C5]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill='white' viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
                  </div>
                </Link>
                <Link className='cursor-pointer' target='_blank' href={'https://x.com/soundeffectsseb'}>
                  <div className="w-8 h-8 rounded bg-[#0A75C5] text-white flex items-center justify-center hover:bg-[#0A75C5]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill='white' viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" /></svg>
                  </div>
                </Link>
                <Link className='cursor-pointer' target='_blank' href={'https://www.facebook.com/people/Sound-Effect-Buttons/61569888634612/'}>
                  <div className="w-8 h-8 rounded bg-[#0A75C5] text-white flex items-center justify-center hover:bg-[#0A75C5]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill='white' viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" /></svg>
                  </div>
                </Link>
                <Link className='cursor-pointer' target='_blank' href={'https://www.youtube.com/@SoundEffectButtons'}>
                <div className="w-8 h-8 rounded bg-[#0A75C5] text-white flex items-center justify-center hover:bg-[#0A75C5]">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill='white' viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" /></svg>
                </div>
                </Link>
              </div>
            </div>
          </div>
          <div className="relative bg-[#0A75C5] p-8">
            {show ?
              <div className='h-full flex flex-col items-center justify-center gap-5 text-center'>
                <h4 className='text-3xl text-white font-bold'>{t('thank_you_reaching_out_label')}</h4>
                <p className='text-md text-gray-200 '>{t('team_will_get_back_label')}</p>

              </div>
              :
              <form ref={form} onSubmit={sendEmail} class="space-y-6">
                <h3 className="text-white text-2xl font-semibold">{t('contact_us_label')}</h3>
                <div className="relative">
                  <input
                    type="text"
                    required
                    name="user_name"
                    className="w-full p-3 rounded bg-white border-2 dark:bg-gray-700 dark:text-white border-white focus:outline-none focus:ring focus:ring-[#4283b5]"
                    placeholder={t('name_label')}
                  />
                </div>
                <div className="relative">
                  <input
                    type="email"
                    required
                    name="user_email"
                    className="w-full p-3 rounded bg-white border-2 dark:bg-gray-700 dark:text-white border-white focus:outline-none focus:ring focus:ring-[#4283b5]"
                    placeholder={t('email_label')}
                  />
                </div>
                <div className="relative">
                  <input
                    type="tel"
                    name="user_phone"
                    className="w-full p-3 rounded bg-white border-2 dark:bg-gray-700 dark:text-white border-white focus:outline-none focus:ring focus:ring-[#4283b5]"
                    placeholder={t('phone_label')}
                  />
                </div>
                <div class="relative">
                  <textarea
                    required
                    name="message"
                    className="w-full p-3 rounded bg-white border-2 dark:bg-gray-700 dark:text-white border-white focus:outline-none focus:ring focus:ring-[#4283b5]"
                    placeholder={t('message_label')}
                  ></textarea>
                </div>
                <input
                  type="submit"
                  disabled={disable}
                  value={t('send_label')}
                  className="w-full p-3 rounded bg-white disabled:cursor-not-allowed dark:bg-gray-700 dark:text-white text-[#0A75C5] border-2 border-white cursor-pointer hover:bg-transparent hover:text-white transition"
                />
              </form>
            }

            <div className="absolute top-24 right-[-40px] bg-gradient-to-br from-transparent to-[#52a2e0] rounded-full w-32 h-32"></div>
            <div className="absolute top-2 right-6 bg-gradient-to-br from-transparent to-[#52a2e0] rounded-full w-20 h-20"></div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ContactUs

