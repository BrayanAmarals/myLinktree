import Head from "next/head";
import Image from "next/image";
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

export default function Home() {
  const [time, relogioTheme, totalMinutes] = Relogio();
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    let percentageValue = 0;
    if (relogioTheme === "day") {
      percentageValue = ((totalMinutes - 360) * 100) / 720;
    } else {
      if (totalMinutes > 1080) {
        percentageValue = ((totalMinutes - 1080) * 100) / 720;
      } else if (totalMinutes <= 360) {
        percentageValue = ((360 + totalMinutes) * 100) / 720;
      }
    }
    setPercentage(percentageValue);
  }, [relogioTheme, totalMinutes]);

  return (
    <>
      <Head>
        <title>
          {relogioTheme === "day" ? "Olá, bom dia! 🌞" : "Olá, boa noite! 🌛"}
        </title>
        <meta name="description" content="Brayan Amaral" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main
        className={`${styles.main} ${
          relogioTheme === "day" ? styles.main : styles.mainNight
        } ${colus.className}`}
      >
        <div className={styles.videoContainer}>
          {relogioTheme == "day" ? (
            <video className={styles.videoBg} autoPlay loop muted>
              <source src="/videos/daym.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <video className={styles.videoBg} autoPlay loop muted>
              <source src="/videos/night.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}

          {relogioTheme == "day" ? (
            <div
              className={styles.sun}
              style={{ left: `${percentage}%` }}
            ></div>
          ) : (
            <div
              className={styles.moon}
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
                  <a
                    className={styles.pushable}
                    href="https://brayanass.github.io/professional-portfolio/"
                    target="_blank"
                  >
                    <span className={`${styles.front} ${tommy.className}`}>
                      MEU PORTFÓLIO
                    </span>
                  </a>
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
      </main>
    </>
  );
}
