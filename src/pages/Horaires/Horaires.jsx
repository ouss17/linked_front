import React, { useContext, useEffect, useState } from 'react'
import MetaData from '../../components/MetaData';
import UserContext from '../../context/UserContext';
import { Coordinates, CalculationMethod, PrayerTimes, Prayer } from 'adhan';
import moment from 'moment-timezone';
import { useSelector } from 'react-redux';
import masjidLayoutF from '../../assets/ressources/pics/masjidLayoutF.png';
import masjidLayoutD from '../../assets/ressources/pics/masjidLayoutD.png';
import masjidLayoutA from '../../assets/ressources/pics/masjidLayoutA.png';
import masjidLayoutM from '../../assets/ressources/pics/masjidLayoutM.png';
import masjidLayoutI from '../../assets/ressources/pics/masjidLayoutI.png';
import { CircleTime } from '../../assets/Svg/Svg';

const Horaires = () => {
    const { userLog, setUserLog } = useContext(UserContext);
    const etablissementConfig = useSelector((state) => state.EtablissementConfigReducer);
    const etablissement = useSelector((state) => state.EtablissementReducer)

    const coordinates = new Coordinates(48.93665, 2.51447);
    moment.tz.setDefault("Europe/Paris");
    const [hijriDate, setHijriDate] = useState(new Intl.DateTimeFormat('ar-TN-u-ca-islamic', { day: 'numeric', month: 'long', weekday: 'long', year: 'numeric' }).format(Date.now()));
    const months = [
        "Janvier",
        "Février",
        "Mars",
        "Avril",
        "Mai",
        "Juin",
        "Juillet",
        "Août",
        "Septembre",
        "Octobre",
        "Novembre",
        "Decembre"
    ];

    let [date, setDate] = useState(new Date());
    let tomorrow = new Date();
    tomorrow.setDate(date.getDate() + 1);

    const params = CalculationMethod.NorthAmerica();

    const [prayerTimes, setPrayerTimes] = useState(new PrayerTimes(coordinates, date, params));
    const [prayerTimesTomorrow, setPrayerTimesTomorrow] = useState();
    const [param, setParam] = useState({
        method: "NorthAmerica",
        fajr: 0,
        dhuhr: 0,
        asr: 0,
        maghrib: 0,
        isha: 0
    })
    useEffect(() => {
        if (etablissementConfig.idEtablissementConfig && etablissement.idEtablissement) {
            let methode = "NorthAmerica";
            switch (parseFloat(etablissementConfig.degree)) {
                case 15:
                    params.method = "NorthAmerica";
                    methode = "NorthAmerica";
                    break;
                case 17:
                    params.method = "MuslimWorldLeague";
                    methode = "MuslimWorldLeague";
                    break;
                case 17.5:
                    params.method = "Egyptian";
                    methode = "Egyptian";
                    break;
                case 18:
                    params.method = "Qatar";
                    methode = "Qatar";
                    break;
                case 18.2:
                    params.method = "Dubai";
                    methode = "Dubai";
                    break;
                case 18.5:
                    params.method = "UmmAlQura";
                    methode = "UmmAlQura";
                    break;

                default:
                    params.method = "NorthAmerica";
                    methode = "NorthAmerica";
                    break;
            }

            setParam({
                method: methode,
                fajr: etablissementConfig.fajr,
                dhuhr: etablissementConfig.dhuhr,
                asr: etablissementConfig.asr,
                maghrib: etablissementConfig.maghrib,
                isha: etablissementConfig.isha,
            })

        }

    }, [etablissementConfig, etablissement]);

    useEffect(() => {
        params.method = param.method
        params.adjustments.fajr = param.fajr;
        params.adjustments.dhuhr = param.dhuhr;
        params.adjustments.asr = param.asr;
        params.adjustments.maghrib = param.maghrib;
        params.adjustments.isha = param.isha;

        setPrayerTimes(new PrayerTimes(new Coordinates(etablissement.latitudeEtablissement, etablissement.longitudeEtablissement), date, params));
        setPrayerTimesTomorrow(new PrayerTimes(new Coordinates(etablissement.latitudeEtablissement, etablissement.longitudeEtablissement), tomorrow, params));
    }, [param]);

    useEffect(() => {
        let fajrTime = `${moment(prayerTimes.fajr).tz('Europe/Paris').format('H:mm')}`;
        let dhuhrTime = `${moment(prayerTimes.dhuhr).tz('Europe/Paris').format('H:mm')}`;
        let asrTime = `${moment(prayerTimes.asr).tz('Europe/Paris').format('H:mm')}`;
        let maghribTime = `${moment(prayerTimes.maghrib).tz('Europe/Paris').format('H:mm')}`;
        let ichaTime = `${moment(prayerTimes.isha).tz('Europe/Paris').format('H:mm')}`;

        setFajr(fajrTime);
        setDhuhr(dhuhrTime);
        setAsr(asrTime);
        setMaghrib(maghribTime);
        setIsha(ichaTime);

        const interval = setInterval(() => {

            let date = new Date();
            let tomorrow = new Date();
            tomorrow.setDate(date.getDate() + 1);

            let currentPrayer = prayerName(prayerTimes.currentPrayer());
            setCurrentPray(currentPrayer);
            let nextPrayerName = null;
            let awaitNewPrayer;
            let currentPrayerTime;

            let diffMinutes;
            if (currentPrayer == 'Fajr') {
                awaitNewPrayer = new Date(moment(prayerTimes.dhuhr).tz('Europe/Paris').format('M/D/Y H:mm'));
                currentPrayerTime = new Date(moment(prayerTimes.fajr).tz('Europe/Paris').format('M/D/Y H:mm'));

                nextPrayerName = 'Dhuhr';
            } else if (currentPrayer == 'Dhuhr') {
                awaitNewPrayer = new Date(moment(prayerTimes.asr).tz('Europe/Paris').format('M/D/Y H:mm'));
                currentPrayerTime = new Date(moment(prayerTimes.dhuhr).tz('Europe/Paris').format('M/D/Y H:mm'));
                nextPrayerName = 'Asr';
            }
            else if (currentPrayer == 'Asr') {
                awaitNewPrayer = new Date(moment(prayerTimes.maghrib).tz('Europe/Paris').format('M/D/Y H:mm'));
                currentPrayerTime = new Date(moment(prayerTimes.asr).tz('Europe/Paris').format('M/D/Y H:mm'));
                nextPrayerName = 'Maghrib';
            }
            else if (currentPrayer == 'Maghrib') {
                awaitNewPrayer = new Date(moment(prayerTimes.isha).tz('Europe/Paris').format('M/D/Y H:mm'));
                currentPrayerTime = new Date(moment(prayerTimes.maghrib).tz('Europe/Paris').format('M/D/Y H:mm'));
                nextPrayerName = 'Isha';
            }
            else if (currentPrayer == 'Isha') {
                if (new Date(moment(prayerTimes.isha).tz('Europe/Paris').format('M/D/Y')) > new Date(moment().tz('Europe/Paris').format('M/D/Y'))) {
                    awaitNewPrayer = new Date(moment(prayerTimesTomorrow.fajr).tz('Europe/Paris').format('M/D/Y H:mm'));

                } else {
                    awaitNewPrayer = new Date(moment(prayerTimes.fajr).tz('Europe/Paris').format('M/D/Y H:mm'));
                }
                currentPrayerTime = new Date(moment(prayerTimes.isha).tz('Europe/Paris').format('M/D/Y H:mm'));

                nextPrayerName = 'Fajr';
            }

            let diff = Math.abs(currentPrayerTime - awaitNewPrayer);
            diffMinutes = Math.floor((diff / 1000) / 60);
            let currentAbsDiff = Math.abs(date - awaitNewPrayer);
            let currentDiffMinutes = Math.floor((currentAbsDiff / 1000) / 60);


            let difference = awaitNewPrayer.getTime() - date.getTime();
            let difference2 = date.getTime() - currentPrayerTime.getTime();
            if (difference2 < 900000) {
                setTimeToPray(true);
            } else {
                setTimeToPray(false);
            }

            if (timeToPray) {
                document.querySelectorAll(".dd").forEach(el => {
                    el.style.strokeDashoffset = 0;
                })
            } else {
                document.querySelectorAll(".dd").forEach(el => {
                    el.style.strokeDashoffset = currentDiffMinutes * 440 / diffMinutes;
                })
            }

            //Convertir la différence en heures, minutes et secondes
            let heures = Math.floor(difference / (1000 * 60 * 60));
            let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            let secondes = Math.floor((difference % (1000 * 60)) / 1000);

            if (heures > 20) {
                awaitNewPrayer = new Date(moment(prayerTimes.fajr).tz('Europe/Paris').format('M/D/Y H:mm'));
                difference = awaitNewPrayer.getTime() - date.getTime();

                //Convertir la différence en heures, minutes et secondes
                heures = Math.floor(difference / (1000 * 60 * 60));
                minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
                secondes = Math.floor((difference % (1000 * 60)) / 1000);
            }

            setTimeRemaining(`${heures >= 1 ? heures < 10 ? '0' + heures + ':' : heures + ':' : ''}${minutes < 10 ? '0' + minutes : minutes}:${secondes < 10 ? '0' + secondes : secondes}`)
            setClosestHour(nextPrayerName);
        }, 1000);
        return () => {
            clearInterval(interval)
        }
    }, [prayerTimes]);

    /**
     * retourne priere
     * @param {string} prayer 
     * @returns string
    */
    function prayerName(prayer) {
        if (prayer == Prayer.Fajr) {
            return "Fajr";
        } else if (prayer == Prayer.Sunrise) {
            return "Fajr";
        } else if (prayer == Prayer.Dhuhr) {
            return "Dhuhr";
        } else if (prayer == Prayer.Asr) {
            return "Asr";
        } else if (prayer == Prayer.Maghrib) {
            return "Maghrib";
        } else if (prayer == Prayer.Isha) {
            return "Isha";
        } else if (prayer == Prayer.None) {
            return "Isha";
        }
    }

    /**
     *  convertit date en français
     * @returns object
     */
    function frenchTodayDate() {

        // let date = new Date();
        let year = date.getFullYear()
        let dayNumber = date.getDate()
        let month = months[date.getMonth()]
        let weekday = date.toLocaleDateString("fr-FR", { weekday: "long" });

        return { weekday, dayNumber, month, year }
    }

    const [currentFrDate, setCurrentFrDate] = useState(`${frenchTodayDate().weekday} ${frenchTodayDate().dayNumber} ${frenchTodayDate().month} ${frenchTodayDate().year}`);
    const [currentHour, setCurrentHour] = useState(`${date.getHours() < 10 ? "0" + date.getHours() : date.getHours()}:${date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()}`);
    const [timeToPray, setTimeToPray] = useState(false);
    const [closestHour, setClosestHour] = useState("Dhuhr");
    const [currentPray, setCurrentPray] = useState("")

    const [fajr, setFajr] = useState(null);
    const [dhuhr, setDhuhr] = useState(null);
    const [asr, setAsr] = useState(null);
    const [maghrib, setMaghrib] = useState(null);
    const [isha, setIsha] = useState(null);
    const [timeRemaining, setTimeRemaining] = useState("00:00");

    useEffect(() => {
        const interval = setInterval(() => {
            let date = new Date();
            setDate(date);
            setCurrentFrDate(`${frenchTodayDate().weekday} ${frenchTodayDate().dayNumber} ${frenchTodayDate().month} ${frenchTodayDate().year}`);
            setCurrentHour(`${date.getHours() < 10 ? "0" + date.getHours() : date.getHours()}:${date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()}`);
            setHijriDate(new Intl.DateTimeFormat('ar-TN-u-ca-islamic', { day: 'numeric', month: 'long', weekday: 'long', year: 'numeric' }).format(Date.now()));
        }, 1000);
        return () => {
            clearInterval(interval)
        }
    }, [])

    return (
        <>
            <MetaData title={`Horaires - Linked`} index="false" />
            <h1 className="title titleMain" style={{ display: "none" }}>Horaires de prières</h1>
            <div className={`masjidLayout`} id={`${closestHour == "Dhuhr" ? "masjidLayoutF" : closestHour == "Asr" ? "masjidLayoutD" : closestHour == "Maghrib" ? "masjidLayoutA" : closestHour == "Isha" ? "masjidLayoutM" : "masjidLayoutI"}`}>
                <div id="actualTime" className="date-container">
                    <p className="date date-french">{currentFrDate}</p>
                    <p className="current-hour">{currentHour}</p>
                    <p className="date date-arabic">{hijriDate}</p>
                </div>
                <img src={`${closestHour == "Dhuhr" ? masjidLayoutF : closestHour == "Asr" ? masjidLayoutD : closestHour == "Maghrib" ? masjidLayoutA : closestHour == "Isha" ? masjidLayoutM : masjidLayoutI}`} alt="" />
                {
                    etablissement.idEtablissement
                    &&
                    <div className="mosqueeName">
                        <p>{etablissement.nameEtablissement}</p>
                    </div>
                }
                <div className="countDown">
                    <div className="circle">
                        <CircleTime />
                        <div className="countDownTime">
                            {
                                timeToPray
                                    ?
                                    currentPray == "Isha"
                                        ?
                                        <>
                                            {timeRemaining} <br />
                                            <span className="countDownText">avant {closestHour}</span>
                                        </>
                                        :
                                        <>
                                            Salat <br />
                                            {currentPray}
                                        </>
                                    :
                                    <>
                                        {timeRemaining} <br />
                                        <span className="countDownText">avant {closestHour}</span>
                                    </>

                            }
                        </div>
                    </div>
                </div>
            </div>
            <div id="salat-hours-page">
                <div className="hours-container">
                    <div className="hour-salat fajr">
                        <span class="name-french">Fajr</span>
                        <span class="time-salat">{fajr}</span>
                        <span class="name-arabic">الفجر</span>
                    </div>
                    <div className="hour-salat dhuhr">
                        <span class="name-french">Dhuhr</span>
                        <span class="time-salat">{dhuhr}</span>
                        <span class="name-arabic">الظهر</span>
                    </div>
                    <div className="hour-salat asr">
                        <span class="name-french">Asr</span>
                        <span class="time-salat">{asr}</span>
                        <span class="name-arabic">العصر</span>
                    </div>
                    <div className="hour-salat maghrib">
                        <span class="name-french">Maghrib</span>
                        <span class="time-salat">{maghrib}</span>
                        <span class="name-arabic">المغرب</span>
                    </div>
                    <div className="hour-salat isha">
                        <span class="name-french">Isha</span>
                        <span class="time-salat">{isha}</span>
                        <span class="name-arabic">العشاء</span>
                    </div>
                </div>
            </div>
        </>
    )
}


export default Horaires