import React, { useEffect,  } from 'react';

const Ads = ({ adSlot , className }) => {

  useEffect(() => {
    try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
        console.error("Adsense error:", e);
    }
}, []);
  return (
      <ins
        className={`adsbygoogle ${className} `}
        style={{ display: 'block' }}
        data-ad-client="ca-pub-9988190119065685"
        data-ad-slot={adSlot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
  );
};

export default Ads;