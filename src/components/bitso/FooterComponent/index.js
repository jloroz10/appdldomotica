import React from 'react';
import './index.css';
import FacebookIcon from "../../resources/images/facebook-icon.png";
import TwitterIcon from "../../resources/images/twitter-icon.png";
import InstagramIcon from "../../resources/images/instagram-icon.png";
import GitHubIcon from "../../resources/images/github-icon.png";


function FooterComponent(){
    return(
        <div className="footer">
            <div className="footer-details">
                <ul className="footer-list">
                    <li className="footer-list-elem"><a href="http://www.facebook.com" target="_blank" rel="noopener noreferrer"><img alt="facebook icon"  className="footer-icon"src={FacebookIcon}></img></a></li>
                    <li className="footer-list-elem"><a href="http://www.twitter.com" target="_blank" rel="noopener noreferrer"><img alt="twitter icon"  className="footer-icon"src={TwitterIcon}></img></a></li>
                    <li className="footer-list-elem"><a href="http://www.instagram.com" target="_blank" rel="noopener noreferrer"><img alt="instagram icon"  className="footer-icon"src={InstagramIcon}></img></a></li>
                </ul>
                {/* <div className="dev">
                    <a className="redirect-a" target="_blank" rel="noopener noreferrer" href="https://github.com/jloroz10">
                        <img alt="" className="footer-icon" src={GitHubIcon}></img> 
                        <span className="dev-username">@jloroz10 </span>
                    </a>
                        
                </div> */}
            </div>
            
        </div>
    )
}

export default FooterComponent; 