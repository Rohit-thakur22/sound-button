"use client";
import React, { useEffect, useState, useContext, useCallback } from "react";
import Soundbox from "../Soundbox";
import { NavbarHead } from "@/components/header/NavbarHead";
import Botbar from "../footer/Botbar";
import { MyContext } from "@/utils/context/visitContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { soundsAPI } from "@/lib/apiServices";
import Loading from "@/components/loading/Loading";

const VisitPage = ({ locale = "en", userId }) => {
  const [filters, SetFilters] = useState("created");
  const [createdSoundsOfUser, setCreatedSoundsOfUser] = useState([]);
  const [favouriteSounds, setFavouriteSounds] = useState([]);
  const [currentlyPlayingSound, setCurrentlyPlayingSound] = useState(null);
  const { sharedData } = useContext(MyContext);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUserData = useCallback(async (id) => {
    try {
      setLoading(true);
      setError(null);

      // Single API call to get all user data
      const response = await soundsAPI.getSoundsByUser(id);

      // Transform user data
      const userData = {
        id: response.data.id,
        authId: response.data.authId,
        name: response.data.name,
        email: response.data.email,
        photoUrl: response.data.photoUrl,
        phoneNumber: response.data.phoneNumber,
        location: response.data.location,
        downloads: response.data.downloads,
        is_banned: response.data.isBanned,
        is_active: response.data.isActive,
        rank: response.data.rank,
      };

      // Transform created sounds
      const sounds = response.data.sounds.map((sound) => ({
        id: sound.id,
        name: sound.name,
        link: sound.url,
        description: sound.description,
        author: response.data.authId,
        color: sound.color,
        favorites: sound.favorites,
        downloads: sound.downloads,
        tags: [], // API doesn't provide tags in this response
        is_deleted: sound.isDeleted,
        created_at: sound.createdAt,
      }));

      // Transform favorite sounds
      const favoriteSounds = response.data.favoriteSounds.map((sound) => ({
        id: sound.id,
        name: sound.name,
        link: sound.url,
        description: sound.description,
        author: response.data.authId,
        color: sound.color,
        favorites: sound.favorites,
        downloads: sound.downloads,
        tags: [], // API doesn't provide tags in this response
        is_deleted: sound.isDeleted,
        created_at: sound.createdAt,
      }));

      setUserData(userData);
      setCreatedSoundsOfUser(sounds);
      setFavouriteSounds(favoriteSounds);
    } catch (err) {
      console.error("Error fetching user data:", err);
      setError(
        "Failed to load user data. Please check your connection and try again."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (userId) {
      fetchUserData(userId);
    }
  }, [userId, fetchUserData]);

  const handlePlaySound = (soundId) => {
    setCurrentlyPlayingSound(soundId);
  };

  return (
    <>
      <ToastContainer
        position="bottom-left"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <main className="hidebar dark:bg-[#212D3D] w-full relative flex min-h-screen flex-col items-center">
        <NavbarHead locale={locale} />
        <div className="md:block hidden top-[60px] overflow-hidden max-h-[250px] bg-[#F2F3F5] absolute w-full">
          <svg
            className=""
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            viewBox="0 0 2048 389"
          >
            <path
              transform="translate(0)"
              d="m0 0h2048v389h-2048z"
              fill="#F2F3F5"
            />
            <path
              transform="translate(362,139)"
              d="m0 0 5 1 2 3 9-1 13-2v2l-20 5v16l-2 13 2 5 8 1 4-8 3-7 4-3v3l-2 3v7l2 2h6l3-3-5-4-2-7 2-3 5 1 3 4v5l6-1 1-9-3-1v-6l3-3 3 3v3l6-1 2 1 3 13 5 1 4-5 3-7h2l-1 6-5 8-6 2-5-3-2-6v-7h-5v7l-4 6-3 2h-4l-2 5-5 3-7-1-2-4h-2l-1 4-5 4-6-1-6-5-2 6-4 4-7-1v-2l-6 5-4 1-6-4-2 5-5 3h-6l-5-4v-2h-2l-1 4-4 5-6 1-5-5-1-11-4 1-1 6h-3v-5l-4-1v-6l1-2 4 1 1 4 6-1 3 4 2 10 5 1h2l2-5 4-12 3-3 5 1 2 2v6l-4 7h7l4-5 4-11 4-4 7-1 2 1v2l-8 1-3 4v7l1 2 5-1 3-9 3 3 2 4h5l4-8-1-7-3-12-1-9-11 2h-4l1-3 14-3z"
              fill="#1B1D5E"
            />
            <path
              transform="translate(1893,139)"
              d="m0 0 5 1 2 3 9-1 13-2-1 3-19 4v19l-1 12 4 4h5l4-7 3-8 4-3v3l-2 3v6l2 3h6l3-3-6-6v-7l1-1h5l3 5 1 5 5-2 1-2v-6l-3-1v-6l1-2h4l1 5 7-1 2 3 1 9 2 3 5-1 3-4 3-7h2l-1 6-5 8-6 2-5-3-2-9v-4l-4 1-2 8-4 5-6 1-2 5-5 3-6-1-4-3-4 6-6 1-6-4-2-1-5 8-7 1-4-2-3 4-4 1-7-4-2 5-5 3-8-1-4-4-4 6-4 3-6-1-3-5-1-10-4 1-1 6-3-1 1-4-5-1 1-7 4-1 2 4 7 1 3 13 5 1 4-4 4-13 3-3 5 1 2 2v6l-4 7h7l4-5 5-12 5-4h6l2 3-2 1h-6l-3 3-1 7 2 3 4-1 3-9h2l3 7h5l3-4 1-9-4-16v-8l-12 3h-4v-2l15-4z"
              fill="#1B1D5E"
            />
            <path
              transform="translate(745,139)"
              d="m0 0 5 1 1 4 20-4 3 1-2 2-18 4-1 23-1 7 5 5h6l3-9 4-8 3-1-1 4-1 1v10h8l2-4-5-4-1-7 2-2 5 1 3 6v3l5-2 3-9-3 1-2-2 1-6 3-2 3 4v2l6-1 2 2 2 13 7-1 4-8 1-3h3l-3 9-5 6-5 1-5-4-2-11h-4l-2 9-4 4-5 2-3 5-4 2-7-1-3-3-5 6-5 1-5-3-4-3-2 6-4 4-7-1-3-2-1 4-6 2-4-2v-2h-2l-2 5-5 3h-6l-6-5-6 8-6 1-5-4-2-11h-3l-2 6h-2v-5h-4l-1-3 2-6 4 1 1 4 6-1 3 5 1 10h6l4-5 4-13 3-2 5 1 2 3-1 7-3 3v2h6l4-4 4-11 5-5 7-1 2 1v2l-8 1-3 4v7l1 2 5-1 3-9 2 1 3 6h5l4-8-1-6-3-12-1-11-11 3-5-1 2-2 14-3z"
              fill="#1B1D5E"
            />
            <path
              transform="translate(1128,139)"
              d="m0 0 5 1 1 4 22-4 1 2-16 4-5 2v22l-1 7 5 5h6l3-10 4-7h3l-2 4-1 6 2 4h7l2-4-5-4-1-2v-6l1-1h5l3 4 1 6 5-2 2-5-1-3-3-1 1-7 4-1 2 4h6l2 2 2 13 7-1 4-8 1-3h2l-1 7-4 6-5 3-5-2-3-4-1-9h-4l-2 9-6 5-3 1-5 6-7 1-5-4-5 6-5 1-5-3-4-3-2 6-5 4-6-1-3-2-2 4-5 2-4-2v-2h-2l-2 4-5 4h-6l-6-5-6 8-6 1-5-4-2-11h-3l-2 6h-2v-5h-4l-1-4 2-5 4 1 1 4 5-1 3 2 3 13h5l4-5 4-13 3-2 5 1 2 4-1 6-3 3v2h6l4-4 5-13 6-4 7 1-1 3h-7l-3 3v9l4 1 3-3 1-7 3 1 3 6h5l4-9-4-17-1-11-11 3-5-1 2-2 14-3 2-6z"
              fill="#1B1D5E"
            />
            <path
              transform="translate(1511,139)"
              d="m0 0 5 1 1 4 19-4h3l-1 3-19 4v20l-1 10 5 5 5-1 3-6 3-8 2-2 3 1-3 4v6l2 3h7l2-4-6-5v-7l1-1h5l3 5 1 5 5-2 2-5-1-3-3-1 1-7 4-1 2 4h6l2 2 2 12 5 1 4-4 3-8h2l-1 7-4 6-5 3-5-2-3-4-1-9h-4l-2 8-4 5-6 1-2 5-5 3-6-1-4-2-4 5-6 1-6-4-1-2-6 9-7 1-4-2-3 4-4 1-6-3-5 6-2 1h-6l-5-3-2-2-4 7-4 2-6-1-3-5-1-9h-5v6h-2v-5l-5-1 1-7 4-1 2 4 7 1 1 1 2 12 1 1h5l4-6 3-11 3-3 6 1 1 1v8l-4 6h7l4-4 4-12 4-4 8-1 2 3-2 1h-6l-3 3-1 6 2 4h5l2-10h2l3 7h5l3-4 1-9-3-11-1-13-12 3h-4v-2l12-3h4l1-6z"
              fill="#1C1D5F"
            />
            <path
              transform="translate(1320,334)"
              d="m0 0 4 1 2 4 15-3h7v2l-18 4h-3l1 6v10l-2 14 4 5 4 1 4-4 5-12 4-3v3l-2 3v7l2 2h6l3-3-5-4-2-4 1-5 5-1 3 3 1 7 6-1 2-9h-4l-1-3 2-6 4 1 1 4 6-1 3 5 1 10h6l4-5 3-7h2l-1 6-5 8-3 2-6-1-3-4-2-10h-3l-3 10-5 4-4 1-3 5-4 2-7-1-4-3-2 5-3 2-7-1-6-5-1 5-5 5-7-1v-2l-7 6-6-1-3-3-2 5-4-1 4-5 4-11 4-4 7-1 2 1v3h-7l-3 3-1 2v6l1 2 5-1 3-9 3 3 3 5 4-1 3-4 1-8-4-15v-9l-10 2h-6v-2l13-3h3v-5z"
              fill="#17195C"
            />
            <path
              transform="translate(1703,334)"
              d="m0 0 4 2 2 3 15-3h7l-1 2-17 4h-3v23l-1 7 4 5 4 1 4-4 4-11 3-3h2l-2 4v10h8l2-4-5-4-1-7 2-2 5 1 3 5v4l5-2 3-8h-4l-1-5 2-4 4 1 1 4 6-1 2 2 3 13h5l4-6 2-6h3l-3 10-4 5-6 1-5-4-2-11h-5v7l-3 5-7 3-3 5-4 2-7-1-3-3-4 6-2 1h-6l-5-4v-2h-2l-1 5-5 5-7-1-2-1-5 5-6-1-1-3h-2l-2 5-4-1 4-5 4-11 4-4 7-1 2 1v3h-7l-4 4v7l1 2 5-1 3-9 2 1 3 6 3 1 4-4 2-5-2-9-4-19-9 2h-6l1-2 15-4 2-6z"
              fill="#1D1F60"
            />
            <path
              transform="translate(171,334)"
              d="m0 0 4 1 3 4 15-3h6v2l-18 4h-3l1 2v20l-1 8 4 5 4 1 3-3 6-14 4-1-2 4-1 7 2 3h7l2-4-5-4-1-2v-6l1-1h5l3 4 1 6 5-2 3-8-5-1 1-7 4-1 2 4 7 1 3 13 1 1h5l4-6 2-6h2l-1 7-4 6-4 3-6-1-3-5-1-10-4 1-2 9-6 5-3 1-5 6-7 1-5-4-6 7h-6l-6-5-6 8-1 1h-6l-4-3-2 4-3 2-5-1-3-2-2 4-4-1 4-6 3-9 5-5 6-1 3 1-1 3h-6l-4 4v8l5 1 2-3 2-7 2 1 2 7 6-1 4-9-4-16-2-11-9 2h-6v-2l16-3 2-7z"
              fill="#1C1E5F"
            />
            <path
              transform="translate(554,334)"
              d="m0 0 4 1 3 4 15-3h6v2l-18 4h-3l1 2v19l-1 10 6 5 4-1 4-10 3-6 4-1v2h-2l-1 9 2 3h7l2-4-6-5v-7l1-1h5l4 8v2l5-2 3-8-5-1 1-7 4-1 1 5 6-1 3 3 2 11 5 1 3-3 4-9h2l-1 7-4 6-4 3-6-1-3-4-1-11-4 1-2 9-6 5h-4l-2 5-4 3-7-1-3-3-6 7h-6l-7-5-3 6-3 3h-6l-4-3-2 4-3 2-5-1-3-2-3 4-3-1 4-6 4-11 6-4 6 1v3h-7l-3 3-1 6 2 4 5-1 2-9h2l3 7 4 1 3-3 2-4v-7l-4-18v-5l-10 2h-6v-2l16-3 1-6z"
              fill="#1D1F60"
            />
            <path
              transform="translate(560,203)"
              d="m0 0 3 1 2 9 1 1 3-6 2-2h5l3 3 1 3v8l-1 3 5-4 4-10h3l-2 8-4 6-4 3-7 1-6-3 1-3 6 1 2-7-2-5h-4l-3 8v9l4 24v12l-3 5-5 1-3-4-1-3v-22l3-16-1-6-3 5-7 3-3 5-5 2-6-1-4-5v-7l3-5 3-1-1 4-2 6 1 5h8l3-5-4-1-3-4v-5l2-2 5 1 3 6v3l5-2 3-8z"
              fill="#1B1D5E"
            />
            <path
              transform="translate(177,203)"
              d="m0 0 3 1 2 9 1 1 3-6 2-2h5l3 3 1 3v8l-1 3 5-4 4-10h3l-2 8-4 6-4 3-7 1-6-3 1-3 6 1 2-4-1-9-5 1-3 8v9l4 24v12l-3 5-4 1-4-4-1-4v-21l3-16-1-6-3 5-7 3-3 5-5 2-6-1-3-3-1-9 3-5 3-1-1 4-2 6 1 5h8l3-5-4-1-3-5 1-5 5-1 4 6v4l5-2 3-7z"
              fill="#1A1C5E"
            />
            <path
              transform="translate(1901,7)"
              d="m0 0 2 3 2 9 5-8 4-1 5 5 1 8-2 5 5-3 6-12h1l-1 8-4 6-3 3-3 1h-7l-4-2v-3l6 1 2-2v-11h-5l-4 12 4 24 1 15-2 7-1 1h-6l-3-6-1-14 2-17 2-10v-4h-2l-1 4-3 3-6 1-2 5-2 2-6 1-5-3-2-3v-8l4-5h2l-2 5-1 6 1 3 7 1 3-3-6-7v-6l1-1h5l3 4 1 6 5-2 2-5 1-12z"
              fill="#1A1C5E"
            />
            <path
              transform="translate(1518,7)"
              d="m0 0 2 2 2 9 2-3 5-5 4 1 3 3 1 3v7l-2 4 6-4 5-11 2 2-4 10-5 5-3 1h-7l-4-3v-2l6 1 2-2 1-5-2-6-4 1-4 11 5 31v9l-3 7h-6l-3-6v-23l3-16-1-5-5 6-6 1-1 4-3 3-5 1-5-2-3-4v-7l4-6h2v3h-2l-1 8 1 4h7l3-2 1-3-5-2-2-3v-6l1-1h5l3 4 1 6 5-2 2-4 1-13z"
              fill="#1B1D5E"
            />
            <path
              transform="translate(752,7)"
              d="m0 0 2 1 3 11 4-8 5-1 4 4 1 2v9l-1 2 4-2 3-4 3-8 2 1-1 6-5 8-5 3h-8l-4-4h4l4-1 1-8-2-4-4 1-3 9 1 11 3 19v14l-3 5h-5l-3-4-1-4v-18l3-18v-6l-4 5-7 3-3 5-7 2-6-3-2-5 1-7 4-4 2 2-3 3v8l2 2h6l3-5-4-2-3-5 1-4 1-1h5l3 5v5l5-2 3-6v-11z"
              fill="#1A1C5E"
            />
            <path
              transform="translate(943,203)"
              d="m0 0h2l3 11 5-8h6l3 4 1 8-1 5 5-4 4-10h2l-1 7-5 8-7 3-6-1-3-2v-2h6l2-2v-8l-2-3-4 2-3 10 2 13 2 12v19l-4 4-4-1-3-5-1-7 1-19 3-16v-4h-2l-1 4-5 4h-4l-1 4-3 3-7 1-4-2-2-4v-8l5-5v4l-2 3 1 7 1 1h7l2-4-5-4-1-2v-6l1-1h5l3 4 1 6 5-2 2-5z"
              fill="#1B1D5E"
            />
            <path
              transform="translate(1135,7)"
              d="m0 0 2 1 3 11 4-8 5-1 4 4 1 2v9l-1 2 4-2 4-7 2-5 2 1-1 6-5 8-5 3h-8l-4-4 2-1 6 1 1-9-2-4-4 1-3 9v7l4 23v14l-3 5h-5l-3-4-1-4v-18l3-18v-6l-4 5-7 3-3 5-7 2-6-3-2-4 1-8 4-4 1 3-2 2v8l2 2h6l3-5-4-2-3-5 1-5h5l3 3 1 7 5-2 3-6v-11z"
              fill="#1A1C5E"
            />
            <path
              transform="translate(369,7)"
              d="m0 0 2 1 2 7v5h2l1-6 4-4 5 1 3 4v10l-1 2 4-2 3-4 3-8h2l-1 7-4 7-6 4h-8l-3-2v-3l5 1 3-3v-7l-2-3h-3l-4 11 1 10 3 17v17l-3 4h-5l-3-5-1-5v-14l4-27h-2l-2 5-5 3h-3l-2 5-6 3-7-2-3-7 2-7 4-3v3l-2 3v6l3 3h7l1-4-6-5v-7l1-1h5l3 5v5l5-2 2-2z"
              fill="#1B1D5E"
            />
            <path
              transform="translate(1326,203)"
              d="m0 0h2l2 8v4h2l1-5 3-4 7 1 2 3 1 7-2 6 5-3 5-11h2l-1 7-4 6-5 4-6 1-6-3 1-3 5 1 2-3v-7l-2-3-4 2-3 9 1 10 3 17v17l-2 4-5 1-4-5-1-6v-13l3-19v-8l-5 6-6 1-2 5-5 3-6-1-4-4-1-5 3-7 3-2v3l-2 3v6l2 3h6l3-3-6-6v-7l5-1 3 3 1 7 6-2 2-5z"
              fill="#1B1D5E"
            />
            <path
              transform="translate(1709,203)"
              d="m0 0h2l2 8v4h2l1-5 3-4 7 1 2 4v10 2l5-5 4-9h2l-1 7-4 6-5 4-6 1-5-2-1-4 6 1 2-3v-7l-2-3h-4l-3 11 1 10 3 18v16l-2 4-5 1-4-5-1-5v-15l3-18v-8l-5 6-6 1-2 5-5 3-6-1-4-4-1-6 3-6 3-2v3l-2 3v6l2 3h6l3-3-6-6v-7l5-1 4 5v5l6-2 2-5z"
              fill="#1B1D5E"
            />
            <path
              transform="translate(1182)"
              d="m0 0h56l-6 7-9 6-6 2-13 1-9-2-9-6-4-6z"
              fill="#F3F4F6"
            />
            <path
              transform="translate(1565)"
              d="m0 0h55l-2 4-7 6-8 4-10 2-12-1-10-5-6-7z"
              fill="#F3F4F6"
            />
            <path
              transform="translate(1948)"
              d="m0 0h55l-2 4-7 6-8 4-10 2-12-1-9-4-7-8z"
              fill="#F3F4F6"
            />
            <path
              transform="translate(799)"
              d="m0 0h56l-6 7-9 6-6 2-12 1-10-2-9-6-4-6z"
              fill="#F3F4F6"
            />
            <path
              transform="translate(33)"
              d="m0 0h56l-3 5-8 6-10 4-11 1-10-2-7-4-6-7z"
              fill="#F3F4F6"
            />
            <path
              transform="translate(416)"
              d="m0 0h56l-6 7-9 6-6 2-11 1-11-2-9-6z"
              fill="#F3F4F6"
            />
            <path
              transform="translate(926,174)"
              d="m0 0 2 1-2 5-8 5-15 4-1 3v9l3 16v9l-3 8-5 5-7 3h-11l-8-4-2-4h3l6 4 9 1 9-3 4-5 1-3v-13l-2-11v-14l1-2h-11l-11-1h-19l-9 4-4 4-1 2v10l3 5 8 2 8-3 5-8 1-3h2l-1 7-5 7-7 3h-8l-6-4-3-4-1-3v-7l4-8 8-6 10-2 39 2 2-5 4-1-3 6 11-3 7-4z"
              fill="#131559"
            />
            <path
              transform="translate(543,175)"
              d="m0 0h2l-2 5-5 4-8 3-10 2v15l2 11v13l-4 8-5 4-6 2h-10l-8-4-3-4h3l7 4 8 1 9-3 4-4 2-8-2-16-1-6v-11l1-3h-11l-11-1h-18l-9 3-5 6-1 2v8l3 5 6 3 9-2 5-6 2-6h3l-3 9-4 5-6 3h-8l-6-3-4-6v-12l6-8 9-4 6-1 20 1h19l4-5h2l-3 6 12-3 6-4z"
              fill="#131559"
            />
            <path
              transform="translate(160,175)"
              d="m0 0h2l-2 5-7 5-12 3h-4v16l2 11v13l-4 8-5 4-6 2h-10l-8-4-3-4h3l10 5 10-1 6-4 3-5 1-10-3-17v-10l1-4h-11l-11-1h-18l-9 3-5 6-1 2v8l3 5 6 3 9-2 5-6 2-6h3l-3 9-5 6-5 2h-8l-6-3-4-6v-11l4-7 8-5 9-2 20 1h19l4-5h2l-3 6 12-3 6-4z"
              fill="#131559"
            />
            <path
              transform="translate(1309,174)"
              d="m0 0 2 2-6 7-10 4-10 1v14l3 17-1 11-4 6-5 4-5 2h-11l-8-4-2-2v-3l4 2 5 3 9 1 8-3 4-4 2-5v-10l-2-12v-16l-21-2h-19l-8 3-5 5-2 5 1 8 5 5 6 1 8-3 4-6 2-5h2l-1 6-4 6-5 4-3 1h-8l-5-3-4-5-1-2v-9l3-6 7-6 12-3 39 2 2-5 3-1-1 4-1 2 13-4 6-4z"
              fill="#131559"
            />
            <path
              transform="translate(1692,174)"
              d="m0 0 2 2-6 7-10 4-10 1v14l3 18-1 10-4 6-5 4-5 2h-11l-8-4-2-2v-3l4 2 5 3 9 1 8-3 4-4 2-5v-10l-2-12v-16l-21-2h-19l-10 4-4 5-1 8 3 7 7 3 8-2 5-5 3-7h2l-1 6-4 6-5 4-3 1h-8l-5-3-4-5-1-2v-9l3-6 7-6 12-3 19 1h19l4-5h2l-1 4-1 1 8-1 10-5z"
              fill="#131559"
            />
            <path
              transform="translate(1401,152)"
              d="m0 0h11l8 3 5 4 2 5-1 9-4 6-5 4-8 3h-8l-6-4-2-5 1-7 1-2h3l-1 4v7l3 3h11l6-3 3-1 3-6v-9l-4-5-5-2h-15l-11 4-10 9-5 10-1 8 2 9 4 6 6 5 11 3 13-1 10-4 9-7 6-10h2l-1 5-4 6-7 7-12 6-4 1h-16l-9-3-8-7-4-8-1-4v-10l4-11 9-10 14-7z"
              fill="#131559"
            />
            <path
              transform="translate(1018,152)"
              d="m0 0h11l8 3 5 4 2 5-1 9-4 6-5 4-8 3h-8l-6-4-2-5 1-7 4-2-1 4v7l3 3h11l6-3 5-5 1-2v-10l-6-5-3-1h-15l-9 3-8 6-6 7-3 7-1 8 2 9 4 6 6 5 11 3h8l11-3 10-6 7-9 2-4h2l-1 5-4 6-7 7-12 6-4 1h-16l-10-4-7-6-4-8-1-4v-10l4-11 9-10 14-7z"
              fill="#131559"
            />
            <path
              transform="translate(1784,152)"
              d="m0 0h11l8 3 5 5 2 5-1 8-6 8-7 4-4 1h-8l-5-3-3-5 1-8 1-2 3 1-2 7 1 5 3 1h11l8-5 4-6v-8l-4-5-5-2h-16l-10 4-9 7-5 8-2 7v7l3 10 4 5 10 5 13 1 12-3 8-5 4-2 2-4 5-8h2l-1 5-6 8-8 7-9 4-5 1h-15l-9-3-9-8-4-10v-12l4-10 9-10 8-5z"
              fill="#131559"
            />
            <path
              transform="translate(635,152)"
              d="m0 0h12l8 3 5 5 1 3v8l-3 6-8 7-6 2h-8l-6-3-2-3v-9l2-3h2l-1 10 4 4 5 1 10-3 5-4 3-6v-6l-3-5-7-3h-15l-10 4-8 6-6 8-2 6v12l4 9 7 6 11 3h8l12-3 10-7 6-7 2-5h3l-2 6-8 10-10 6-9 3h-15l-9-3-8-6-5-10-1-10 2-9 6-10 8-7 11-5z"
              fill="#131559"
            />
            <path
              transform="translate(252,152)"
              d="m0 0h12l8 3 6 7v10l-5 8-8 5-4 1h-8l-5-3-3-4v-7l2-4h2l-1 9 2 4 7 2 10-3 6-5 2-5-1-9-5-4-3-1h-16l-10 4-9 7-6 10-1 4v10l4 10 6 5 7 3 5 1h8l12-3 9-6 7-8 3-5h2l-2 6-7 9-10 7-10 3h-15l-11-4-5-4-4-6-2-6v-14l4-9 6-8 11-7z"
              fill="#131559"
            />
            <path
              transform="translate(937,334)"
              d="m0 0 4 1 2 5 16-4h6v2l-18 4h-3l1 4v14l-2 13-4 1-4-16-1-13-10 2h-6v-2l13-3h3l1-6z"
              fill="#1C1E5F"
            />
            <path
              transform="translate(24,153)"
              d="m0 0 4 1 1 4 6-1 2 1 3 13 5 1 4-5 3-7h2l-1 6-5 8-6 2-5-3-2-9v-4l-4 1-2 8-4 5-6 1-2 5-5 3-7-1-3-3-2 2 1-10 4-6h3l-3 5v7l2 2h6l3-3-5-5-2-6 2-3 5 1 3 4 1 5 5-1 1-9-3-1v-6z"
              fill="#242665"
            />
            <path
              transform="translate(63,347)"
              d="m0 0h8l9 3 5 4 2 5v7l-3 6-8 7-5 2h-10l-5-3-3-6 2-8 3-1-1 4v7l3 3 8 1 10-4 4-5 2-8-3-6-4-3-4-1h-13l-9 3-9 6-6 7-3 7v15h-3l-1-4v-8l4-11 6-8 8-6 10-4z"
              fill="#131559"
            />
            <path
              transform="translate(1594,347)"
              d="m0 0h8l9 3 5 4 2 4v8l-4 8-9 6-3 1h-10l-6-4-1-2v-9l2-3h2l-1 10 3 4 8 1 10-4 4-5 2-5-1-7-6-5-3-1h-14l-11 4-9 7-5 7-2 6v14h-3l-1-11 3-10 6-9 11-8 8-3z"
              fill="#131559"
            />
            <path
              transform="translate(445,347)"
              d="m0 0h9l9 3 6 7 1 7-3 8-8 7-6 2h-10l-6-5-1-8 2-5 3 1-1 2v9l6 3 9-1 6-4h2l2-4 1-3v-8l-5-5-5-2h-14l-10 4-6 4-8 9-3 10v11h-2l-1-2v-12l4-10 9-10 14-7z"
              fill="#131559"
            />
            <path
              transform="translate(1977,347)"
              d="m0 0h8l9 3 5 4 2 4v8l-3 6-5 5-8 4h-10l-5-3-3-7 2-7 3-1-1 4v7l3 3 8 1 10-4 4-5 2-5-1-7-6-5-4-1h-13l-11 4-8 6-6 8-2 6v14h-3l-1-4v-7l3-10 6-9 11-8 8-3z"
              fill="#131559"
            />
            <path
              transform="translate(286,381)"
              d="m0 0h17l23 2-1 6h-53l5-5z"
              fill="#F3F4F6"
            />
            <path
              transform="translate(1051,381)"
              d="m0 0h18l22 2v5l-1 1h-52l5-5z"
              fill="#F3F4F6"
            />
            <path
              transform="translate(1817,381)"
              d="m0 0h17l23 2-1 6h-52l4-5z"
              fill="#F3F4F6"
            />
            <path
              transform="translate(1434,381)"
              d="m0 0h17l23 2-1 6h-52l4-5z"
              fill="#F3F4F6"
            />
            <path
              transform="translate(669,381)"
              d="m0 0h17l22 2v5l-1 1h-52l5-5z"
              fill="#F3F4F6"
            />
            <path
              transform="translate(1364,348)"
              d="m0 0 4 1 1 4 6-1 3 5 1 10h6l4-5 3-7h2l-1 6-5 8-3 2-6-1-3-4-2-10h-3l-3 10-5 4-6 1-6-4-2-4 1-5 5-1 3 3 1 7 6-1 2-9h-4l-1-3z"
              fill="#282967"
            />
            <path
              transform="translate(1211,347)"
              d="m0 0h8l10 3 6 7v10l-4 7-5 4-7 3h-10l-5-3-2-4v-7l2-4h2l-1 9 2 4 4 2 9-1 6-3 5-6 1-2v-7l-3-5-7-3h-14l-11 4-9 7-5 8-1 3h-3l2-6 4-6 9-8 11-5z"
              fill="#131559"
            />
            <path
              transform="translate(982,348)"
              d="m0 0 4 2v3l6-1 3 3 2 11 5 1 3-3 4-9h2l-1 6-3 6-5 4-6-1-3-4-1-11-4 1-2 8-4 5-6 1-1 3h-2l-2-4-4-4-1-5 2-3 5 1 3 5v4l6-1 3-9-5-1 1-7z"
              fill="#292B68"
            />
            <path
              transform="translate(2011,183)"
              d="m0 0h9l28 2v3h-11l-11-1h-18l-8 3-5 4-2 4v8l3 5 6 3 9-2 5-6 2-6h3l-2 8-6 7-5 2h-8l-6-3-4-6v-11l4-7 8-5z"
              fill="#131559"
            />
            <path
              transform="translate(1882,370)"
              d="m0 0h3l-2 5-10 6-13 3-2 5h-2l1-6h-11l-12-1h-17l-9 3-4 4h-3l2-4 5-4 6-2 14-1 31 2 3-6h3l-3 6 12-3 6-4z"
              fill="#131559"
            />
            <path
              transform="translate(1500,370)"
              d="m0 0h2l-2 5-5 4-13 4-5 1-1 5h-3l1-6h-12l-11-1h-17l-9 3-4 4-3-1 4-5 9-4 14-1 11 1h20l4-5h2l-3 6 12-3 6-4z"
              fill="#131559"
            />
            <path
              transform="translate(734,370)"
              d="m0 0h2l-1 4-6 5-13 4h-5l-1 6-3-1 1-5h-12l-10-1h-17l-9 3-5 4-3-1 8-7 5-2 14-1 12 1h19l4-5h2l-2 5 8-1 10-5z"
              fill="#131559"
            />
            <path
              transform="translate(351,370)"
              d="m0 0 3 1-6 7-10 4-10 1-1 6h-2v-5l-22-2h-17l-9 3-5 4-3-1 8-7 12-3 19 1h19l4-5h2l-1 4-1 1 9-1 9-5z"
              fill="#131559"
            />
            <path
              transform="translate(828,347)"
              d="m0 0h9l9 3 6 7 1 7-3 7-3-1 2-4v-8l-5-5-5-2h-14l-10 4-6 4-8 9-3 9v12h-2l-1-2v-12l4-10 9-10 14-7z"
              fill="#131559"
            />
            <path
              transform="translate(1108,377)"
              d="m0 0 4 2-13 4h-5l-1 6-3-1 1-5h-12l-10-1h-18l-10 4-3 3-3-1 8-7 10-3h12l11 1h17l4-1 3 1z"
              fill="#131559"
            />
            <path
              transform="translate(1856)"
              d="m0 0h2l4 22v10l-3 7-5 5-7 3h-10l-7-3-4-3 1-3 9 5 7 1 10-3 4-5 1-3v-13l-2-11z"
              fill="#131559"
            />
            <path
              transform="translate(1473)"
              d="m0 0h2l4 21v12l-4 8-5 4-6 2h-10l-8-4-3-4h3l7 4 7 1 10-3 4-5 1-2v-15l-2-11z"
              fill="#131559"
            />
            <path
              transform="translate(1090)"
              d="m0 0h3l3 19v15l-4 7-5 4-6 2h-10l-8-4-2-2 1-3 8 5 8 1 12-4 3-9v-8l-3-18z"
              fill="#131559"
            />
            <path
              transform="translate(707)"
              d="m0 0h3l3 18v16l-3 6-6 5-6 2h-10l-8-4-2-2 1-3 8 5 8 1 9-3 4-4 2-6v-8l-3-18z"
              fill="#131559"
            />
            <path
              transform="translate(413)"
              d="m0 0 4 1 5 8 10 5 11 1 12-2 10-6 7-7 3 1-7 8-11 7-8 2h-15l-9-3-9-8z"
              fill="#131559"
            />
            <path
              transform="translate(325)"
              d="m0 0h2l4 24-1 11-4 6-5 4-6 2h-9l-7-3-4-3v-3l4 2 5 3 8 1 9-3 4-4 2-5v-10l-2-12z"
              fill="#131559"
            />
            <path
              transform="translate(1139,34)"
              d="m0 0 2 4 3 21v7l-3 5-3-1-2-10 1-18z"
              fill="#F3F4F6"
            />
            <path
              transform="translate(756,34)"
              d="m0 0 2 4 3 21v7l-1 4-4 1-2-4-1-13 2-18z"
              fill="#F3F4F6"
            />
            <path
              transform="translate(947,230)"
              d="m0 0 2 1 3 19v13l-2 3h-3l-2-5v-20z"
              fill="#F3F4F6"
            />
            <path
              transform="translate(1904,35)"
              d="m0 0 2 1 3 18v14l-2 3-4-2-1-4v-19z"
              fill="#F3F4F6"
            />
            <path
              transform="translate(1521,35)"
              d="m0 0h2l3 18v16l-4 2-3-7v-16z"
              fill="#F3F4F6"
            />
            <path
              transform="translate(564,230)"
              d="m0 0h2l3 17v17l-1 2-4-1-2-7v-13z"
              fill="#F3F4F6"
            />
            <path
              transform="translate(1713,230)"
              d="m0 0 2 2 3 20v10l-2 4-4-1-1-3v-23z"
              fill="#F3F4F6"
            />
            <path
              transform="translate(1330,230)"
              d="m0 0 2 2 3 20v11l-2 3-4-1-1-3v-22z"
              fill="#F3F4F6"
            />
            <path
              transform="translate(182,230)"
              d="m0 0h1l3 17v18l-4 1-2-3-1-5v-12l2-15z"
              fill="#F3F4F6"
            />
            <path
              transform="translate(373,34)"
              d="m0 0 2 3 3 20v10l-2 4-4-2-1-2v-23z"
              fill="#F3F4F6"
            />
            <path
              transform="translate(796)"
              d="m0 0h3l6 9 10 5 11 1 12-2 10-6 7-7 3 1-8 9-8 5-10 3h-15l-9-3-9-8z"
              fill="#131559"
            />
            <path
              transform="translate(31)"
              d="m0 0 3 1 4 6 6 5 6 2 12 1 12-3 10-6 5-6h3l-2 4-7 7-12 6-4 1h-16l-10-4-7-6-3-6z"
              fill="#131559"
            />
            <path
              transform="translate(1945)"
              d="m0 0h3l4 7 6 5 12 3 12-1 10-4 8-6 3-4h3l-2 4-7 7-12 6-4 1h-16l-10-4-6-5-4-7z"
              fill="#131559"
            />
            <path
              transform="translate(1562)"
              d="m0 0h3l4 7 5 4 7 3 12 1 13-3 10-7 4-5h3l-2 4-7 7-12 6-4 1h-16l-10-4-6-5-4-7z"
              fill="#131559"
            />
            <path
              transform="translate(1179)"
              d="m0 0h3l6 9 10 5 12 1 11-2 10-6 7-7 3 1-7 8-9 6-10 3h-15l-11-4-7-7z"
              fill="#131559"
            />
            <path
              transform="translate(1661,372)"
              d="m0 0 5 1 2 3-1 7-4 6h-9l3-13z"
              fill="#1E2061"
            />
            <path
              transform="translate(1278,372)"
              d="m0 0 5 1 2 3-1 7-4 6h-9l3-12z"
              fill="#1F2061"
            />
            <path
              transform="translate(513,372)"
              d="m0 0 4 1 2 2v7l-4 6v1h-10l4-14z"
              fill="#212362"
            />
            <path
              transform="translate(130,372)"
              d="m0 0 5 1 1 2v7l-4 6v1h-10l5-15z"
              fill="#1F2161"
            />
            <path
              transform="translate(2044,372)"
              d="m0 0 4 1v16h-12l5-15z"
              fill="#2E306C"
            />
            <path
              transform="translate(0,11)"
              d="m0 0 4 2 2 5-1 8-1 2 5-3 4-9 3-3-1 8-4 6-3 3-8 1z"
              fill="#131559"
            />
            <path
              transform="translate(914,371)"
              d="m0 0 1 3v8l1 2 5-1 2-5 4-1 3 5 4-1 2-3h3l-2 5-3 2-7-1v-2l-7 6-5-1-3-2-3 4-4-1 4-4 4-12z"
              fill="#131559"
            />
            <path
              transform="translate(1800)"
              d="m0 0h2v12l2 4 3 2h10l6-4 4-9h2l-1 7-4 6-8 4h-8l-6-4-3-4-1-10z"
              fill="#131559"
            />
            <path
              transform="translate(1417)"
              d="m0 0h2v12l4 5 7 2 7-2 5-6 2-6h2l-1 7-4 6-7 4h-9l-6-4-3-5-1-8z"
              fill="#131559"
            />
            <path
              transform="translate(1034)"
              d="m0 0 3 1-1 3v7l4 6 7 2 7-2 5-5 3-7h2l-1 6-4 6-5 4-3 1h-8l-7-4-3-6v-10z"
              fill="#131559"
            />
            <path
              transform="translate(651)"
              d="m0 0 3 1-1 9 3 6 7 3 8-2 3-1 2-4 3-7h2l-1 6-4 6-5 4-3 1h-8l-7-4-3-6v-10z"
              fill="#131559"
            />
            <path
              transform="translate(268)"
              d="m0 0 3 1-1 8 3 7 3 2h10l5-3 5-10h2l-1 6-4 6-5 4-3 1h-8l-5-3-4-5-1-2v-9z"
              fill="#131559"
            />
            <path
              transform="translate(1911,13)"
              d="m0 0 5 1 1 2v9l-3 3-4-1-2-1-1 3-1-3 4-12z"
              fill="#F3F4F6"
            />
            <path
              transform="translate(189,208)"
              d="m0 0 4 1 2 9-3 5-6-1-2 1 1-8 3-6z"
              fill="#F3F4F6"
            />
            <path
              transform="translate(1146,13)"
              d="m0 0 4 1 2 4-1 7-3 3-7-1 2-10z"
              fill="#F3F4F6"
            />
            <path
              transform="translate(763,13)"
              d="m0 0 4 1 2 4-1 8-5 2-5-1 2-10z"
              fill="#F3F4F6"
            />
            <path
              transform="translate(572,208)"
              d="m0 0 4 2 2 7-3 6-6-1-2 1 1-8 3-6z"
              fill="#F3F4F6"
            />
            <path
              transform="translate(1529,13)"
              d="m0 0 4 1 2 7-2 5-4 2-5-2 2-9z"
              fill="#F3F4F6"
            />
            <path
              transform="translate(937,343)"
              d="m0 0h5l1 14-1 9-2 1-3-11-1-12z"
              fill="#F3F4F6"
            />
            <path
              transform="translate(8,166)"
              d="m0 0 2 1 3 5 4 4-4 4h-6l-3-3v-7z"
              fill="#F3F4F6"
            />
            <path
              transform="translate(1703,343)"
              d="m0 0h4l1 3v17l-2 4-3-8-1-6v-9z"
              fill="#F3F4F6"
            />
            <path
              transform="translate(172,343)"
              d="m0 0h4l1 4v15l-1 5-2-1-3-12v-10z"
              fill="#F3F4F6"
            />
            <path
              transform="translate(391,166)"
              d="m0 0 2 1 2 5 5 3-2 4-2 1h-6l-3-3v-7z"
              fill="#F3F4F6"
            />
            <path
              transform="translate(555,343)"
              d="m0 0h4l1 5v13l-1 6-2-1-3-12-1-9z"
              fill="#F3F4F6"
            />
            <path
              transform="translate(1511,148)"
              d="m0 0h5l1 5v12l-1 6h-2l-3-12-1-10z"
              fill="#F3F4F6"
            />
            <path
              transform="translate(745,148)"
              d="m0 0h5l1 2v18l-2 4-3-9-1-6z"
              fill="#F3F4F6"
            />
            <path
              transform="translate(732,21)"
              d="m0 0 2 1 3 5 3 2-1 4-2 2h-6l-3-3v-7z"
              fill="#F3F4F6"
            />
            <path
              transform="translate(1348,361)"
              d="m0 0 3 4 6 6-4 4h-6l-3-3v-7z"
              fill="#F3F4F6"
            />
            <path
              transform="translate(1320,343)"
              d="m0 0 5 1v21l-2 2-4-16v-7z"
              fill="#F3F4F6"
            />
            <path
              transform="translate(1894,148)"
              d="m0 0h5l1 14-1 9h-2l-3-11-1-11z"
              fill="#F3F4F6"
            />
            <path
              transform="translate(1128,148)"
              d="m0 0h5l1 2v18l-2 3-3-8-1-6z"
              fill="#F3F4F6"
            />
            <path
              transform="translate(362,148)"
              d="m0 0h5l1 1v20l-2 2-3-9-1-6z"
              fill="#F3F4F6"
            />
            <path
              transform="translate(2012,373)"
              d="m0 0 4 1 1 4h7l2 5v6h-3l-1-8-4 1-1 5h-2v-5h-4l-1-4z"
              fill="#1D1F60"
            />
            <path
              transform="translate(1629,373)"
              d="m0 0 4 1 1 4h7l2 3v8h-2l-2-8h-4v6h-3v-5l-4-1v-6z"
              fill="#1D1F60"
            />
            <path
              transform="translate(1246,373)"
              d="m0 0 4 1 1 4h7l2 3v8h-2l-1-9-5 1v6h-3v-5l-4-1v-6z"
              fill="#1D1F60"
            />
            <path
              transform="translate(821,363)"
              d="m0 0 3 1-2 7 2 5 5 2 9-1 6-4 3-1-1 4-7 4-3 1h-10l-6-5-1-2 1-9z"
              fill="#131559"
            />
            <path
              transform="translate(481,373)"
              d="m0 0 4 1 1 3 7 1 2 7v4h-3l-1-8h-5v6h-2v-5l-5-1 1-7z"
              fill="#1D1F60"
            />
            <path
              transform="translate(98,373)"
              d="m0 0 4 1 1 3 7 1 2 7v4h-3l-1-8h-5v6h-2v-5l-5-1 1-7z"
              fill="#1D1F60"
            />
            <path
              transform="translate(2018,233)"
              d="m0 0 12 6 10-1 5-3h2l1-2-1 5-5 3-4 1h-10l-8-4-3-4z"
              fill="#131559"
            />
            <path
              transform="translate(891,378)"
              d="m0 0h3l1 6 3-1 2-5h2l-1 6-3 4v1h-10z"
              fill="#232564"
            />
            <path
              transform="translate(862,378)"
              d="m0 0h14l2 10-3 1-1-9-5 1v6h-3l1-5-5-1z"
              fill="#131559"
            />
            <path
              transform="translate(1641)"
              d="m0 0h14l-2 4-3 2-6-1z"
              fill="#555687"
            />
            <path
              transform="translate(1258)"
              d="m0 0h14l-2 4-3 2-6-1z"
              fill="#585A89"
            />
            <path
              transform="translate(876)"
              d="m0 0h14l-4 5-6 1-4-3z"
              fill="#5C5E8C"
            />
            <path
              transform="translate(2024)"
              d="m0 0h14l-2 4-4 2-5-1-3-3z"
              fill="#5B5C8B"
            />
            <path
              transform="translate(493)"
              d="m0 0h14l-2 4-4 2-5-1-3-3z"
              fill="#5E608E"
            />
            <path
              transform="translate(110)"
              d="m0 0h14l-2 4-4 2-5-1-3-3z"
              fill="#5E608E"
            />
            <path
              transform="translate(513,375)"
              d="m0 0 4 1-1 7-4 2-1-1v-7z"
              fill="#F3F4F6"
            />
            <path
              transform="translate(130,375)"
              d="m0 0 4 1-1 7-4 2-1-1v-7z"
              fill="#F3F4F6"
            />
            <path
              transform="translate(1469,180)"
              d="m0 0 5 1-1 7-4 2-1-2v-6z"
              fill="#F3F4F6"
            />
            <path
              transform="translate(2044,375)"
              d="m0 0 4 1v6l-3 3h-2l-1-7z"
              fill="#F3F4F6"
            />
            <path
              transform="translate(1278,375)"
              d="m0 0 4 1v6l-2 3h-3l-1-7z"
              fill="#F3F4F6"
            />
            <path
              transform="translate(1852,180)"
              d="m0 0h4l1 5-3 5-3-1v-8z"
              fill="#F3F4F6"
            />
            <path
              transform="translate(1087,180)"
              d="m0 0 4 1-1 7-4 2-1-2v-6z"
              fill="#F3F4F6"
            />
            <path
              transform="translate(704,180)"
              d="m0 0 4 1-1 7-4 2-1-2v-6z"
              fill="#F3F4F6"
            />
            <path
              transform="translate(321,180)"
              d="m0 0h4l1 4-3 6h-3l-1-6z"
              fill="#F3F4F6"
            />
            <path
              transform="translate(1661,375)"
              d="m0 0 4 1v6l-2 3h-3l-1-7z"
              fill="#F3F4F6"
            />
            <path
              transform="translate(962,360)"
              d="m0 0 3 1-3 4v8h-5l2-9z"
              fill="#131559"
            />
            <path
              transform="translate(943,375)"
              d="m0 0 5 2h8l-2 4h-6l-5-5z"
              fill="#131559"
            />
            <path
              transform="translate(0,13)"
              d="m0 0 3 3v9l-3 2z"
              fill="#F3F4F6"
            />
            <path
              transform="translate(920,367)"
              d="m0 0 6 1v3h-11l2-3z"
              fill="#131559"
            />
            <path
              transform="translate(1178,374)"
              d="m0 0 2 4 1 11-3-1z"
              fill="#131559"
            />
            <path
              transform="translate(529,384)"
              d="m0 0 8 4v1h-11z"
              fill="#F3F4F6"
            />
            <path
              transform="translate(1294,384)"
              d="m0 0 3 1v2l6 1v1h-11z"
              fill="#F3F4F6"
            />
            <path
              transform="translate(912,384)"
              d="m0 0 4 3 4 2h-11z"
              fill="#F3F4F6"
            />
            <path
              transform="translate(146,384)"
              d="m0 0 8 4v1h-10z"
              fill="#F3F4F6"
            />
            <path
              transform="translate(1677,384)"
              d="m0 0h2l3 3 4 2h-11z"
              fill="#F3F4F6"
            />
          </svg>
        </div>
        <div className="bg-white md:mt-[100px] dark:bg-[#212D3D] w-full md:shadow-lg md:rounded-3xl md:max-w-[70%] lg:max-w-[50%] h-full md:border dark:border-[#212D3D] mx-auto mt-[60px] relative">
          <div className="text-center mb-6 mt-6">
            <h2 className="text-4xl dark:text-white font-semibold">
              {sharedData ? sharedData.name : userData && userData.name}
            </h2>
            <p className="mt-2 text-gray-500 dark:text-gray-300">
              Creator | Sound Effect Button
            </p>
          </div>
          <svg
            className="rounded-b-3xl -mt-[100px]"
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            viewBox="0 0 2400 800"
            opacity="0.76"
          >
            <defs>
              <linearGradient
                x1="50%"
                y1="0%"
                x2="50%"
                y2="100%"
                id="sssurf-grad"
              >
                <stop
                  stopColor="hsl(208, 77%, 50%)"
                  stopOpacity="1"
                  offset="0%"
                />
                <stop
                  stopColor="hsl(208, 74%, 93%)"
                  stopOpacity="1"
                  offset="100%"
                />
              </linearGradient>
            </defs>
            <g
              fill="url(#sssurf-grad)"
              transform="matrix(1,0,0,1,2.0377197265625,277.198543548584)"
            >
              <path
                d="M-10,10C117.08333333333334,32.708333333333336,347.9166666666667,125.66666666666667,600,119C852.0833333333333,112.33333333333333,950,-18.875,1200,-22C1450,-25.125,1550,123.375,1800,104C2050,84.625,2222.9166666666665,-176.66666666666669,2400,-115C2577.0833333333335,-53.33333333333333,3254.1666666666665,188.54166666666669,2650,400C2045.8333333333335,611.4583333333333,156.25,795.8333333333334,-500,900"
                transform="matrix(1,0,0,1,0,90)"
                opacity="0.05"
              />
              <path
                d="M-10,10C117.08333333333334,32.708333333333336,347.9166666666667,125.66666666666667,600,119C852.0833333333333,112.33333333333333,950,-18.875,1200,-22C1450,-25.125,1550,123.375,1800,104C2050,84.625,2222.9166666666665,-176.66666666666669,2400,-115C2577.0833333333335,-53.33333333333333,3254.1666666666665,188.54166666666669,2650,400C2045.8333333333335,611.4583333333333,156.25,795.8333333333334,-500,900"
                transform="matrix(1,0,0,1,0,180)"
                opacity="1.00"
              />
            </g>
          </svg>
        </div>

        <div className="flex w-full mt-10 px-5">
          <div className="px-2 border-b"></div>
          <div
            onClick={() => SetFilters("created")}
            className={
              filters === "created"
                ? "border px-4 p-2 cursor-pointer rounded-t-sm text-cyan-600 font-semibold border-b-0"
                : "border px-4 p-2 cursor-pointer rounded-sm font-semibold dark:text-white border-t-0 border-l-0 border-r-0"
            }
          >
            Created
          </div>
          <div
            onClick={() => SetFilters("favourite")}
            className={
              filters === "favourite"
                ? "border px-4 p-2 cursor-pointer rounded-t-sm text-cyan-600 font-semibold  border-b-0"
                : "border px-4 p-2 cursor-pointer rounded-sm font-semibold dark:text-white border-t-0 border-l-0 border-r-0"
            }
          >
            Favourites
          </div>
          <div className="w-full border-b"></div>
        </div>

        <div className="w-full flex justify-center mt-8">
          {loading ? (
            <Loading />
          ) : error ? (
            <div className="col-span-full flex flex-col items-center justify-center py-20 text-center">
              <div className="mb-4">
                <p className="text-red-600 dark:text-red-400 mb-2">{error}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  This might be due to a slow connection or server issues.
                  Please try again in a moment.
                </p>
              </div>
              <button
                onClick={() => fetchUserData(userId)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Retry
              </button>
            </div>
          ) : (
            <>
              {filters === "created" ? (
                <div className="md:w-[90%] grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 my-8 gap-5">
                  {createdSoundsOfUser && createdSoundsOfUser.length > 0 ? (
                    createdSoundsOfUser.map((sound) => (
                      <Soundbox
                        key={sound.id}
                        id={sound.id}
                        visitShow={true}
                        authorId={sound.author}
                        name={sound.name}
                        link={sound.link}
                        tags={sound.tags}
                        color={sound.color}
                        description={sound.description}
                        favorites={sound.favorites}
                        downloads={sound.downloads}
                        isPlaying={currentlyPlayingSound === sound.id}
                        handlePlaySound={handlePlaySound}
                        locale={locale}
                      />
                    ))
                  ) : (
                    <div className="w-full flex items-center justify-center col-span-full">
                      <p className="text-center text-lg text-gray-500">
                        No created sound
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="md:w-[90%] grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 my-8 gap-5">
                  {favouriteSounds && favouriteSounds.length > 0 ? (
                    favouriteSounds.map((sound) => (
                      <Soundbox
                        key={sound.id}
                        id={sound.id}
                        visitShow={true}
                        authorId={sound.author}
                        name={sound.name}
                        link={sound.link}
                        tags={sound.tags}
                        color={sound.color}
                        description={sound.description}
                        favorites={sound.favorites}
                        downloads={sound.downloads}
                        isPlaying={currentlyPlayingSound === sound.id}
                        handlePlaySound={handlePlaySound}
                        locale={locale}
                      />
                    ))
                  ) : (
                    <div className="w-full flex items-center justify-center col-span-full">
                      <p className="text-center text-lg text-gray-500">
                        No favourite sound
                      </p>
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </main>
      <Botbar locale={locale} />
    </>
  );
};

export default React.memo(VisitPage);
