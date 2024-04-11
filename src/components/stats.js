import { useEffect, useState } from "react";
import styles from "@/styles/Home.module.css";

const obterDataAtual = () => {
  const data = new Date();
  const dia = data.getDate();
  const mes = data.getMonth() + 1;
  const diaFormatado = dia < 10 ? "0" + dia : dia;
  const mesFormatado = mes < 10 ? "0" + mes : mes;
  return `${diaFormatado}/${mesFormatado}`;
};

export function Data() {
  const [date, setDate] = useState(obterDataAtual());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDate(obterDataAtual());
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  return <h2 className={styles.statsDate}>{date}</h2>;
}

export function Relogio() {
  const [time, setTime] = useState(obterHoraAtual().time);
  const [theme, setTheme] = useState(obterHoraAtual().theme);
  const [totalMinutes, setTotalMinutes] = useState(
    obterHoraAtual().totalMinutes
  );

  useEffect(() => {
    const timerId = setInterval(() => {
      const { time, theme, totalMinutes } = obterHoraAtual();
      setTime(time);
      setTheme(theme);
      setTotalMinutes(totalMinutes);
      //console.log({ time, theme, totalMinutes });
    }, 1000);
    return () => clearInterval(timerId);
  }, [obterHoraAtual]);

  function obterHoraAtual() {
    const data = new Date();
    const hours = data.getHours();
    const minutes = data.getMinutes();
    const seconds = data.getSeconds();
    const hoursFormated = hours < 10 ? "0" + hours : hours;
    const minutesFormated = minutes < 10 ? "0" + minutes : minutes;
    const secondsFormated = seconds < 10 ? "0" + seconds : seconds;
    const timeFormated = `${hoursFormated}:${minutesFormated}:${secondsFormated}`;
    const totalMinutes = hours * 60 + minutes;
    const theme = obterPorcentagemDoDia(totalMinutes);
    return {
      time: timeFormated,
      theme: theme,
      totalMinutes: totalMinutes,
    };
  }

  function obterPorcentagemDoDia(totalMinutes) {
    return totalMinutes >= 360 && totalMinutes < 1080 ? "day" : "night";
  }

  return [time, theme, totalMinutes];
}
