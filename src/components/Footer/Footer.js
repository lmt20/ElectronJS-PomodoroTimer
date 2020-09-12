import React from 'react'
import './Footer.module.css'
import {Facebook} from 'react-feather'
import {Twitter} from 'react-feather'
import {GitHub} from 'react-feather'

const Footer = () => {
    return (
        <div className="footer">
            <div className="footer__sitemap">
                <a href="/">HOME</a>
                <a href="/">PRIVACY</a>
                <a href="/">CONTACT</a>
            </div>
            <div style={{padding: "1rem 1rem"}} className="footer__sitemap_icon">
                <a href="https://facebook.com/lmt20"><Facebook color="#999" size="2.2rem"/></a>
                <a href="https://twitter.com/TruongLeManh" style={{padding: "0rem 0.7rem"}}><Twitter color="#999" size="2.2rem"/></a>
                <a href="https://github.com/lmt20"><GitHub color="#999" size="2.2rem"/></a>
            </div>
            <div className="footer__me">
                Made with &lt;3 by <a href="https://github.com/lmt20">LM Truong</a> based on <a href="#">Yuya Uzu</a>
            </div>
            <div className="footer__allrights">
                ©Pomofocus 2020. All Rights Reserved.
            </div>
        </div>
    )
}

export default Footer
