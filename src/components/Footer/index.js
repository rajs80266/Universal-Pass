import React from "react";
import './style.css';


const Footer = () => {
    return (
        <>
            <footer className="footer-distributed">

                <div className="footer-left">

                    <h3>Pass<span>Management </span></h3>

                    <p className="footer-company-name">Company Name © 2022</p>
                </div>

                <div className="footer-center">

                    <div>
                        <i className="fa fa-map-marker"></i>
                        <p><span>728 kellogg st</span> San marcos, California</p>
                    </div>

                    <div>
                        <i className="fa fa-phone"></i>
                        <p>+1 9546698347</p>
                    </div>

                    <div>
                        <i className="fa fa-envelope"></i>
                        <p><a href="mailto:lohitreddycht@gmail.com">lohitreddycht@gmail.com</a></p>
                    </div>

                </div>

                <div className="footer-right">

                    <p className="footer-company-about">
                        <span>About the Application</span>
                        Lorem ipsum dolor sit amet, consectateur adispicing elit. Fusce euismod convallis velit, eu auctor lacus vehicula sit amet.
                    </p>

                </div>

            </footer>
        </>
    );
}

export default Footer;