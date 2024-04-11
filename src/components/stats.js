import { useEffect, useState, useCallback } from "react";
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
  const [time, setTime] = useState("");
  const [theme, setTheme] = useState("");
  const [totalMinutes, setTotalMinutes] = useState(0);

  const obterHoraAtual = useCallback(() => {
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
  }, []);

  useEffect(() => {
    const updateClock = () => {
      const { time, theme, totalMinutes } = obterHoraAtual();
      setTime(time);
      setTheme(theme);
      setTotalMinutes(totalMinutes);
    };

    const timerId = setInterval(updateClock, 1000);
    return () => clearInterval(timerId);
  }, [obterHoraAtual]);

  const obterPorcentagemDoDia = useCallback((totalMinutes) => {
    return totalMinutes >= 360 && totalMinutes < 1080 ? "day" : "night";
  }, []);

  return [time, theme, totalMinutes];
}
