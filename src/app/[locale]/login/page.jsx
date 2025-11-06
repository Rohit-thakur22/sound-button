'use client'
import LoginPage from "@/components/pages/LoginPage";

const UserLogin = ({searchParams, params}) => {
    const { upload } = searchParams;
    const { locale } = params;
    
    return (
        <LoginPage uploadCheck={upload} locale={locale} />
    );
};

export default UserLogin;
