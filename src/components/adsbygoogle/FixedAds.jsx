import React, { useEffect,  } from 'react';

const FixedAds = () => {
    useEffect(() => {
        try {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (e) {
            console.error("Adsense error:", e);
        }
    }, []);
  return (
    <ins class="adsbygoogle"
    style={{display:"inline-block" , width:"1000px" , height:"100px"}}
    data-ad-client="ca-pub-9988190119065685"
    data-ad-slot="2318688954"></ins>
  )
}

export default FixedAds