"use client"
import styles from "@app/homePage.module.scss"; 
import {MoneyBagIcon, EcoFriendlyIcon, EnergyIcon} from "@app/icons/icons"; //
import Button from "@components/button/button"; 
import LatestProjectsGrid from "@components/latest-Project/latestProject";
import TestimonialCarousel from "@components/testimonial/testimonialCarousel";

export default function Home() {

  const whatWeDoItems = [
    {
      image: "/images/installation.png",
      text: "Solar Panel Installation",
    },
    {
      image: "/images/storage.jpeg",
      text: "Battery Storage Solutions",
    },
    {
      image: "/images/maintenance.png",
      text: "Maintenance & Support",
    },
    {
      image: "/images/monitoring.png",
      text: "System Monitoring",
    },
  ];

  const whyItsWorthItData = [
    {
      icon: <MoneyBagIcon />,
      title: "Save Money",
      description: "Reduce electricity bills by generating your own power. Over time, solar panels pay for themselves through savings and tax incentives.",
    },
    {
      icon: <EcoFriendlyIcon />,
      title: "Eco-Friendly",
      description: "Solar energy is clean and renewable, reducing carbon emissions and dependence on fossil fuels, helping fight climate change.",
    },
    {
      icon: <EnergyIcon />,
      title: "Energy Independence",
      description: "With solar power (especially with battery storage), you’re less reliant on the grid, protecting you from outages and rising energy costs.",
    },
  ];


  return (
    <div className={styles.homePageContainer}>
        <div className={styles.heroContainer}>
          <img src="/images/hero-bg.png" alt="Hero Bg" />

          <div className={styles.heroContent}>
            <div className={styles.heroContent1}>
            <h1 className={styles.heroTitle}>Powering a sustainable future with solar energy</h1>
            <p className={styles.heroDescription}>Harness the power of the sun and reduce your energy costs with our premium solar solutions.</p>
            </div>
            <div className={styles.heroContent2}>
              <div className={styles.image}>
                <img src="/images/hero-img.png" alt="Hero Image" />
              </div>
              <p className={styles.text}>Get ahead of your energy needs with cutting-edge solar and home battery</p>
            </div>
          </div>
        </div>

        <div className={styles.aboutUsContainer} id="about-us">
          <div className={styles.content1}>
            <h2 className={styles.title}>About Us</h2>
            <ul >
              <li className={styles.text2}>Who we are at Ionworx</li>
            </ul>
          </div>
          <div className={styles.content2}>
            <p className={styles.text}>At Ionworx, we are committed to delivering high-quality, sustainable solar energy solutions for homes and businesses. With cutting-edge technology and expert installation, we help you reduce energy costs and embrace a greener future.</p>
            <p className={styles.text2}>Our mission is to make clean, renewable power accessible, reliable, and efficient for everyone.</p>

          </div>
        </div>

        <div className={styles.videoContainer}>
        <video controls autoPlay muted>
          <source src="/videos/sample-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        </div>

        <div className={styles.whatWeDoContainer} id="services">
          <div className={styles.content1}>
            <h2 className={styles.title}>What we do</h2>
            <p className={styles.text}>From home and office solar installation, electric vehicles, e-bikes, to solar farms, we are empowering businesses and individuals, helping them save costs.</p>
          </div>
          <div className={styles.content2}>
            {whatWeDoItems.map((item, index) => (
              <div key={index} className={styles.gridItem}>
                <img src={item.image} alt={item.text} className={styles.image} />
                <p className={styles.text}>{item.text}</p>
              </div>
            ))}
          </div>
        </div>


        <div className={styles.whyItsWorthContainer}>
          <div className={styles.content1}>
            <h2 className={styles.title}>Why its Worth it</h2>
            <p className={styles.text}>Switching to solar energy is not just an investment in your property, but also in a sustainable future. Discover the benefits of clean, renewable energy today.</p>
          </div>
          <div className={styles.content2}>
              {whyItsWorthItData.map((item, index) => (
                <div key={index} className={styles.gridItem}>
                  <div className={styles.gridItemHeading}>
                  <span className={styles.icon}>{item.icon}</span>
                  <h3 className={styles.title}>{item.title}</h3>
                  </div>
                  <p className={styles.text}>{item.description}</p>
                </div>
              ))}
          </div>
        </div>
        
        <div className={styles.contactUsContainer} id="contact-us">
          <div className={styles.content1}>
            <h2 className={styles.title}>Get a Quote</h2>
            <ul >
              <li className={styles.text2}>Start your solar journey today!</li>
            </ul>
          </div>
            <div className={styles.content2}>
            <p className={styles.text}>Power your home or business with clean, reliable energy! Get a customized solar solution tailored to your needs. Click below to get a quote today!</p> 
            <Button 
              text="Get a Quote" 
              state="secondary"
              style={{alignSelf: "start"}}
              onClick={() => window.open("https://wa.me/+2347063000481", "_blank")} 
            />
            </div>
        </div>
        <TestimonialCarousel />
        <div className={styles.latestProjectContainer} id="projects">
          <h2 className={styles.title}>Latest Projects</h2>
          <LatestProjectsGrid />
        </div>


    </div>
    
  );
}
