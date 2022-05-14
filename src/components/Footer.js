import React from 'react';
import { Route } from "react-router-dom";

const Footer = () => {

    return (
        <>
            <Route exact path='/'>
                <footer className="footer">
                    <p className="footer__copyright">&copy; 2022 Mesto Russia</p>
                </footer>
            </Route>
        </>
    );
};

export default Footer;