import React from 'react';
import {useLocation} from "react-router-dom";

const Footer = () => {
    const location = useLocation();

    return (
        <>
            {
                location.pathname === '/sign-up' || location.pathname === '/sign-in' ? (<></>) :
                    (<footer className="footer">
                        <p className="footer__copyright">&copy; 2022 Mesto Russia</p>
                    </footer>)
            }
        </>
    );
};

export default Footer;