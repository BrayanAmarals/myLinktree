import Header from "../components/Header/Header.js";
import styles from "../styles/Portfolio.module.css";
import brayanAvatar from "../../public/images/brayanAvatar-e9f1b459.png";
import brayanPhoto from "../../public/images/brayanPhoto.jpg";
import skillsArray from "../data/skills";
import projectsArray from "../data/projects";
import formImage from "../../public/images/formImage-6ab0a45b.svg";
import Image from "next/image";
import Head from "next/head";
import { useRef, useEffect, useState } from "react";
import emailjs from "@emailjs/browser";

import { SiGithub, SiLinkedin, SiInstagram } from "react-icons/si";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const notify = () => toast("Wow so easy !");

import { Montserrat } from "next/font/google";

const montserrat = Montserrat({ subsets: ["latin"] });

const Home = () => {
  const formRef = useRef(null); // Crie uma referência para o elemento do formulário
  const [lastSentTime, setLastSentTime] = useState(null);
  const minTimeBetweenEmails = 60000; // 30 segundos

  useEffect(() => {
    emailjs.init("ENHrrMob3MwEYp6-j");
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (canSendEmail()) {
      setLastSentTime(Date.now());
      toast("Email enviado!");
      emailjs
        .sendForm("service_2xj6gkx", "template_k136me2", formRef.current)

        .then(
          (result) => {
            console.log(result.text);
          },
          (error) => {
            console.log(error.text);
          }
        );
    } else {
      toast("Espere um pouco antes de enviar outro email.");
    }
  };

  const canSendEmail = () => {
    if (!lastSentTime) return true;
    const elapsedTime = Date.now() - lastSentTime;
    return elapsedTime >= minTimeBetweenEmails;
  };
  return (
    <>
      <Head>
        <title>Portfólio - Brayan Amaral</title>
      </Head>
      <div className={`${montserrat.className}`}>
        <section className={`${styles.mainContainer}`}>
          <Header />
          <ToastContainer />
          <section className={styles.banner}>
            <div className={styles.titles}>
              <div className={styles.mainTitle}>
                <h1 className={styles.hi}>Olá, meu nome é</h1>
                <h1 className={styles.brayan}>Brayan...</h1>
              </div>
              <div className={styles.textBoxes}>
                <p className={styles.description}>
                  Desenvolvedor{" "}
                  <span className={styles.customShape}>Front-end;</span>
                </p>
                <p className={styles.description}>
                  Designer <span className={styles.customShape}>Gráfico;</span>
                </p>
                <p className={styles.description}>
                  Designer{" "}
                  <span className={styles.customShape}>de Interfaces.</span>
                </p>
              </div>
            </div>

            <Image
              src={brayanAvatar}
              alt="Avatar do Brayan"
              className={styles.avatar}
            />
          </section>
        </section>

        <section className={styles.aboutMeContainer}>
          <div className={styles.aboutMe}>
            <div className={styles.brayanPhoto}>
              <Image
                src={brayanPhoto}
                alt="Foto do Brayan"
                className={styles.photo}
              />
            </div>
            <div className={styles.aboutTexts}>
              <h2 className={styles.aboutMeTitle}>SOBRE MIM</h2>
              <h2 className={styles.whoAreYou}>Quer saber quem sou?</h2>
              <p className={styles.descriptionAboutMe}>
                &quot;Olá! Sou Brayan Amaral, um Desenvolvedor Web de
                Goiânia-GO, apaixonado por front-end e UI/UX design, com o
                objetivo de me tornar um desenvolvedor Full Stack excepcional.
                <br />
                <br />
                Com 22 anos de idade e 4 anos de experiência em programação,
                estou em constante busca pelo aprimoramento profissional.&quot;
              </p>
              <div className={styles.socialLinks}>
                <a
                  href="https://github.com/BrayanASS"
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
            </div>
          </div>
        </section>
        <section className={styles.skillsContainer}>
          <div className={styles.skills}>
            <h2 className={styles.skillsTitle}>SKILLS</h2>
            <h2 className={styles.skillsSubTitle}>Tecnologias que trabalho</h2>

            <p className={styles.skillsDescription}>
              Este é o ambiente onde minha paixão por programação ganha vida.
              Aqui, você descobrirá as tecnologias que me permitem traduzir
              ideias em funcionalidades concretas.
            </p>
            <div className={styles.skillsList}>
              {skillsArray.map((skill) => (
                <div className={styles.skillCard} key={skill.id}>
                  <div className={styles.iconContainer}>{skill.icon}</div>
                  <p>{skill.name}</p>
                </div>
              ))}
            </div>
            <h1 className={styles.more}>...</h1>
          </div>
        </section>
        <section className={styles.projectsContainer}>
          <div className={styles.projects}>
            <h2 className={styles.projectsTitle}>PORTFÓLIO</h2>
            <h2 className={styles.projectsSubTitle}>
              Projetos que já fiz / participei
            </h2>

            <div className={styles.projectsList}>
              {projectsArray.length != 0 ? (
                projectsArray.map((project) => (
                  <div className={styles.projectCard} key={project.id}>
                    <Image
                      className={styles.projectImage}
                      style={
                        project.mobile
                          ? { width: "12rem", height: "25rem" }
                          : {}
                      }
                      src={project.projectImg}
                      alt={`Imagem do projeto ${project.projectTitle}`} // Adicione uma descrição significativa aqui
                    />
                    <div className={styles.projectTexts}>
                      <h3 className={styles.projectTitle}>
                        {project.projectTopTitle}
                      </h3>
                      <h1 className={styles.projectSubTitle}>
                        {project.projectTitle}
                      </h1>

                      <p className={styles.projectDescription}>
                        {project.projectDescription}
                      </p>
                      <a
                        className={styles.projectButton}
                        href={project.projectLink}
                        target="_blank"
                        style={{
                          backgroundColor: project.color,
                        }}
                      >
                        Visitar
                      </a>
                    </div>
                  </div>
                ))
              ) : (
                <h1>Em desenvolvimento</h1>
              )}
            </div>
          </div>
        </section>
        <section className={styles.contactContainer}>
          <div className={styles.contact}>
            <Image src={formImage} alt="" className={styles.contactImage} />
            <form
              className={styles.contactForm}
              ref={formRef}
              target="_blank"
              onSubmit={handleSubmit}
            >
              <h2 className={styles.contactTitle}>CONTATO</h2>
              <h2 className={styles.contactSubTitle}>Envie-me uma mensagem</h2>
              <div className={styles.forms}>
                <input
                  type="text"
                  placeholder="Primeiro nome"
                  name="user_name"
                  className={styles.input}
                  required
                />
                <input
                  type="text"
                  placeholder="Sobrenome"
                  className={styles.input}
                  name="user-lastName"
                  required
                />
                <input
                  placeholder="Email"
                  type="email"
                  name="user_email"
                  className={styles.input}
                  required
                />
                <input
                  placeholder="Número de telefone"
                  className={styles.input}
                  name="user-phone"
                  required
                />
              </div>
              <textarea
                placeholder="Mensagem"
                cols="30"
                rows="10"
                name="message"
                className={styles.textArea}
              ></textarea>
              <button type="submit" value="Send" className={styles.formButton}>
                Enviar
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </button>
            </form>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
