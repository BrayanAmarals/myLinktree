import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

import styles from "@/styles/Home.module.css";
import { Relogio, Data } from "@/components/stats";
import { useState, useEffect } from "react";

import borderBottomLeft from "../../public/botLeft.png";
import borderBottomRight from "../../public/botRight.png";
import borderTopLeft from "../../public/topLeft.png";
import borderTopRight from "../../public/topRight.png";

import localFont from "next/font/local";

const colus = localFont({ src: "../fonts/Colus-Regular.ttf" });
const tommy = localFont({ src: "../fonts/made-tommy-bold.otf" });

import { motion } from "framer-motion";

export default function Home() {
  const [time, relogioTheme, totalMinutes] = Relogio();
  const [percentage, setPercentage] = useState();
  const [themeDay, setThemeDay] = useState();

  useEffect(() => {
    if (relogioTheme === "day") {
      setPercentage(((totalMinutes - 360) * 100) / 720);
      setThemeDay(true);
      console.log(`${percentage}%`);
    } else {
      if (totalMinutes > 1080) {
        setPercentage(((totalMinutes - 1080) * 100) / 720);
        setThemeDay(false);
      } else if (totalMinutes <= 360) {
        setPercentage(((360 + totalMinutes) * 100) / 720);
        setThemeDay(false);
      }
    }
  }, [relogioTheme, totalMinutes]);

  return (
    <>
      <Head>
        <title>
          {themeDay === true ? "Olá, bom dia! 🌞" : "Olá, boa noite! 🌛"}
        </title>
        <meta name="description" content="Brayan Amaral" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <motion.main
        className={`${styles.main} ${colus.className}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
      >
        <div className={styles.videoContainer}>
          <video className={styles.videoBg} autoPlay loop muted>
            <source src={`/videos/${relogioTheme}.mp4`} type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {themeDay == true ? (
            <div
              className={`${styles.sun} ${styles.sunTransition}`}
              style={{ left: `${percentage}%` }}
            ></div>
          ) : (
            <div
              className={`${styles.moon} ${styles.moonTransition}`}
              style={{ left: `${percentage}%` }}
            ></div>
          )}
        </div>
        <Image
          priority
          src={borderTopLeft}
          alt="Borda superior esquerda"
          className={styles.topLeft}
        />
        <Image
          priority
          src={borderTopRight}
          alt="Borda superior direita"
          className={styles.topRight}
        />
        <div className={styles.textsContainer}>
          <div className={styles.texts}>
            <div className={styles.middleContents}>
              <div className={styles.mainTexts}>
                {relogioTheme == "day" ? (
                  <h1 className={`${styles.nameDay} ${colus.className}`}>
                    BRAYAN
                  </h1>
                ) : (
                  <h1 className={`${styles.nameNight} ${colus.className}`}>
                    BRAYAN
                  </h1>
                )}
              </div>
              <div className={styles.buttons}>
                <button className={styles.pushable}>
                  <Link className={styles.pushable} href="/portfolio">
                    <span className={`${styles.front} ${tommy.className}`}>
                      MEU PORTFÓLIO
                    </span>
                  </Link>
                </button>
                <button className={styles.pushable}>
                  <a
                    className={styles.pushable}
                    href="https://www.instagram.com/brayan_amarals/"
                    target="_blank"
                  >
                    <span className={`${styles.front} ${tommy.className}`}>
                      INSTAGRAM
                    </span>
                  </a>
                </button>
                <button className={styles.pushable}>
                  <a
                    className={styles.pushable}
                    href="https://github.com/BrayanASS"
                    target="_blank"
                  >
                    <span className={`${styles.front} ${tommy.className}`}>
                      GITHUB
                    </span>
                  </a>
                </button>
              </div>
            </div>
            <Data />
            <h2 className={styles.statsTime}>{time}</h2>
          </div>
        </div>
        <Image
          priority
          src={borderBottomLeft}
          alt="Borda inferior esquerda"
          className={styles.bottomLeft}
        />
        <Image
          priority
          src={borderBottomRight}
          alt="Borda inferior direita"
          className={styles.bottomRight}
        />
      </motion.main>
    </>
  );
}
