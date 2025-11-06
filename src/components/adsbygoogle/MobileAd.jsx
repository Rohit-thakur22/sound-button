import React, { useEffect,  } from 'react';

const MobileAd = () => {
     useEffect(() => {
            try {
                (window.adsbygoogle = window.adsbygoogle || []).push({});
            } catch (e) {
                console.error("Adsense error:", e);
            }
        }, []);
  return (
    <ins class="adsbygoogle"
    style={{display:"inline-block" , width:"320px" , height:"50px"}}
    data-ad-client="ca-pub-9988190119065685"
    data-ad-slot="1445463122"></ins>
  )
}

export default MobileAd