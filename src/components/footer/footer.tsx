import React from "react";
import { InstagramIcon, FacebookIcon, YouTubeIcon, TwitterIcon } from "@app/icons/icons";
import Link from "next/link";



export default function Footer() {
    return (
      <footer className="bg-[#315B8D] text-[var(--text-dark)] dark:text-[var(--text-light)] py-[40px] lg:py-[80px] px-6 gap-[40px} sm:gap-[auto]">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-center">
          {/* Brand */}
          <div className="font-bold text-2xl">Ionworx</div>
  
          {/* Need Help Section */}
          <div>
            <h3 className="font-semibold text-lg">NEED HELP?</h3>
            <ul className="mt-2 space-y-1">
              <Link href="/#contact-us">
              <li className="hover:underline">Contact Us</li>
              </Link>
              <Link href="/#faq">
              <li className="hover:underline">FAQ</li>
              </Link>
            </ul>
          </div>
  
          {/* Get in Touch Section */}
          <div>
            <h3 className="font-semibold text-lg">GET IN TOUCH</h3>
            <p className="mt-2">help@ionworx.ng</p>
            <div className="flex justify-center gap-4 mt-2">
              <a href="https://facebook.com" className="hover:text-[var(--accent-color)]">
                <FacebookIcon />
              </a>
              <a href="https://instagram.com" className="hover:text-[var(--accent-color)] text-[var(--text-dark)] dark:text-[var(--text-light)]">
                <InstagramIcon />
              </a>
              <a href="https://twitter.com" className="hover:text-[var(--accent-color)] text-[var(--text-dark)] dark:text-[var(--text-light)]">
                <TwitterIcon />
              </a>
              <a href="https://youtube.com" className="hover:text-[var(--accent-color)] text-[var(--text-dark)] dark:text-[var(--text-light)]">
                <YouTubeIcon />
              </a>
              </div>
            </div>
          </div>
            <div className="flex flex-col items-center text-center mt-[40px] text-sm">
            <span className="text-[var(--text-dark)] dark:text-[var(--text-light)] text-[12px]">Copyright © {new Date().getFullYear()} All rights reserved Ionworx Limited.</span>
            <br />
            <span className="flex mt-[-20px] text-[#a3a3a3] text-[12px]">
              Powered by <a href="https://www.gritinformedia.tech" className="hover:underline ml-[4px] text-[#E5A448]">Grit</a>
            </span>
            </div>
      </footer>
    );
  }
  