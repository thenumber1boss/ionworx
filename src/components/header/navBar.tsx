"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Close } from "@mui/icons-material";
import styles from "@components/header/navBar.module.scss"; // Import the CSS module
import Image from "next/image";
import { Button } from "@components/button/button";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const pathname = usePathname();
  const isActive = (href: string) => {
    if (href.includes("#")) {
      return window.location.hash === href; // Check if the hash matches
    }
    return pathname === href; // For regular paths
  };

  const getLinkClass = (href: string) => {
    return `${styles.navText} ${isActive(href) ? styles.active : ""}`;
  };

  return (
    <nav className={styles.navContainer}>
      <>
        {/* Logo */}
        <div className={styles.inner}>
          <Link href="/">
            <Image src="/logo.png" alt="Logo" width={100} height={100} />
          </Link>

          {/* Nav Menu */}
          <div className={styles.navMenu}>
            <Link href="/" className={getLinkClass("/")}>
              Home
            </Link>
            <Link href="/#about-us" className={getLinkClass("/#about-us")}>
              About Us
            </Link>
            <Link href="/#services" className={getLinkClass("/#services")}>
              Services
            </Link>
            <Link href="/#projects" className={getLinkClass("/#projects")}>
              Projects
            </Link>
          </div>
          {/* Special Actions */}
          <div className={`flex items-center ${styles.specialActions}`}>
            <Button
              text="Get Quote"
              state="secondary"
              onClick={() => window.open("https://wa.me/+2347063000481", "_blank")}
            />
            <div className={styles.hide}>
              <button onClick={toggleMenu}>
                {isMenuOpen ? (
                  <Close className={styles.navIcons} />
                ) : (
                  <Menu className={styles.navIcons} />
                )}
              </button>
            </div>
          </div>
        </div>
      </>
      <>
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className={styles.mobileMenu}>
            <Link href="/" className={getLinkClass("/")}>
              Home
            </Link>
            <Link href="/#about-us" className={getLinkClass("/#about-us")}>
              About Us
            </Link>
            <Link href="/#services" className={getLinkClass("/#services")}>
              Services
            </Link>
            <Link href="/#projects" className={getLinkClass("/#projects")}>
              Projects
            </Link>
          </div>
        )}
      </>
    </nav>
  );
};

export default NavBar;