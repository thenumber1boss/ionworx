import React from "react";
import Link from "next/link";
import styles from "@components/button/button.module.scss"; // Import the SCSS module

// Define Button props
export interface ButtonProps {
  className?: string;
  divClassName?: string;
  style?: React.CSSProperties;
  state?: "default" | "primary" | "secondary";
  text: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: "button" | "submit" | "reset";
  link?: string;
  anchorLink?: string;
  loading?: boolean;
  iconSrc?: string | React.ReactNode;
  iconClassName?: string;
  disabled?: boolean;
}

// Functional Button component
export const Button = ({
  className = "",
  divClassName = "",
  style = {},
  state = "default",
  text,
  onClick,
  type = "button",
  link,
  anchorLink,
  loading = false,
  iconSrc,
  iconClassName = "",
  disabled = false,
}: ButtonProps) => {
  const isDisabled = disabled;

  // Determine additional classes based on state
  const iconStateClass =
    state === "primary" ? styles.white : state === "secondary" ? styles.black : "";
  const divStateClass =
    state === "primary" ? styles.white : state === "secondary" ? styles.black : "";

  // Content inside the button
  const buttonContent = (
    <>
      {iconSrc && typeof iconSrc === "string" && (
        <img
          src={iconSrc}
          alt="icon"
          className={`${styles.iconClass} ${iconStateClass} ${iconClassName}`}
        />
      )}
      {iconSrc &&
        typeof iconSrc !== "string" &&
        React.isValidElement(iconSrc) &&
        React.cloneElement(iconSrc as React.ReactElement<{ className?: string }>, {
          className: `${styles.iconClass} ${iconStateClass} ${iconClassName}`,
        })}
      <div className={`${styles.divClass} ${divStateClass} ${divClassName}`}>
        {loading ? "Loading..." : text}
      </div>
    </>
  );

  // Handle anchor link scrolling
  const handleAnchorClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    const anchorElement = document.querySelector(anchorLink!);
    if (anchorElement) {
      anchorElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Ensure `link` and `anchorLink` are not passed together
  if (link && anchorLink) {
    console.error("Button cannot accept both 'link' and 'anchorLink' at the same time.");
    return null;
  }

  // Render a `Link` for navigation
  if (link) {
    return (
      <Link
        href={link}
        className={`${styles.button} ${styles[state]} ${className} ${
          isDisabled ? styles.disabled : ""
        }`}
        style={style}
      >
        {buttonContent}
      </Link>
    );
  }

  // Render an anchor for scrolling
  if (anchorLink) {
    return (
      <a
        href={anchorLink}
        className={`${styles.button} ${styles[state]} ${className} ${
          isDisabled ? styles.disabled : ""
        }`}
        style={style}
        tabIndex={isDisabled ? -1 : 0}
        onClick={handleAnchorClick}
        aria-disabled={isDisabled}
      >
        {buttonContent}
      </a>
    );
  }

  // Render a regular button by default
  return (
    <button
      className={`${styles.button} ${styles[state]} ${className} ${
        isDisabled ? styles.disabled : ""
      }`}
      style={style}
      onClick={onClick}
      type={type}
      disabled={isDisabled}
      aria-disabled={isDisabled}
    >
      {buttonContent}
    </button>
  );
};

export default Button;