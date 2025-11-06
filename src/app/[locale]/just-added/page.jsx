import React from "react";
import Catalog from "@/components/pages/Catalog";

const page = () => {
  return (
    <>
      <Catalog
        catAlias={"Just Added"}
        catUrl={"just_added"}
        catValue={"just_added"}
        title={"just_added_title"}
        description={"just_added_description"}
        mobileDescription={"just_added_mobile_description"}
      />
    </>
  );
};

export default page;
