import brayanLogo from "../../../public/images/brayanLogo-8027997d.png";
import styles from "./Header.module.css";
import { SiGithub, SiLinkedin, SiInstagram } from "react-icons/si";
import Image from "next/image";

const Header = () => {
  return (
    <>
      <nav className={styles.header}>
        <Image src={brayanLogo} alt="Logo brayan" className={styles.logo} />
        <div className={styles.socialLinks}>
          <a
            href="https://github.com/BrayanAmarals"
            className={styles.iconDiv}
            target="_blank"
          >
            <SiGithub className={styles.icon} />
          </a>
          <a
            href="https://www.linkedin.com/in/brayanamaralss/"
            className={styles.iconDiv}
            target="_blank"
          >
            <SiLinkedin className={styles.icon} />
          </a>
          <a
            href="https://www.instagram.com/brayan_amarals"
            className={styles.iconDiv}
            target="_blank"
          >
            <SiInstagram className={styles.icon} />
          </a>
        </div>
      </nav>
    </>
  );
};

export default Header;
