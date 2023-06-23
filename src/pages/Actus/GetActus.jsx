import React, { useContext, useEffect, useRef, useState } from 'react'
import MetaData from '../../components/MetaData';
import { useDispatch, useSelector } from "react-redux";
import Faq from "react-faq-component";
import { ChevronDown } from '../../assets/Svg/Svg';
import { Player } from "@lottiefiles/react-lottie-player";
import lottiePlayer from "../../assets/ressources/lotties/98891-insider-loading.json";
import LottieShowActusContext from '../../context/LottieShowActusContext';
import { GetActusByEtablissement } from '../../Redux/actions/ActusAction';

const GetActus = () => {
    const actus = useSelector((state) => state.ActusByEtablissementReducer);
    const [puclications, setPublications] = useState([]);
    const { lottieShowActus, setLottieShowActus } = useContext(LottieShowActusContext);
    const lottieRef = useRef();

    const dispatch = useDispatch()

    useEffect(() => {
        const interval = setInterval(() => {
            dispatch(GetActusByEtablissement(1))
        }, 10000);
        return () => {
            clearInterval(interval)
        }
    }, [])

    useEffect(() => {
        let tab = [];
        let object = {};
        if (actus.length > 0) {
            actus.forEach(actu => {
                object = {
                    title: actu.titleActus,
                    content: actu.contentActus,
                };
                tab.push(object);
            });
            setPublications(tab);
        }
    }, [actus]);


    const styles = {
        // bgColor: 'white',
        titleTextSize: "2.2em",
        titleTextColor: "green",
        rowTitleTextSize: "1.7em",
        rowTitleColor: "#04bf94",
        rowContentPaddingBottom: "10px",
        rowContentColor: "#555555",
        arrowColor: "#04bf94",
        rowContentTextSize: "1em",
    };

    const config = {
        animate: true,
        arrowIcon: <ChevronDown />,
        tabFocus: true,
        // openOnload: 0,
        // expandIcon: "+",
    };

    return (
        <>
            <MetaData title={`Actualités - Linked`} index="false" />
            <h1 className="title titleMain">Actualités</h1>
            {
                lottieShowActus
                    ?
                    <Player
                        ref={lottieRef} // set the ref to your class instance
                        autoplay={true}
                        loop={true}
                        controls={false}
                        src={lottiePlayer}
                        style={{ height: "300px", width: "300px" }}
                    ></Player>
                    :
                    <div className="get-actus-page">
                        {
                            actus.length > 0
                                ?
                                <div style={{ transition: "all 500ms" }} className="blob actus">
                                    <Faq
                                        data={{
                                            title: "",
                                            rows: puclications,
                                        }}
                                        styles={styles}
                                        config={config}
                                    />
                                </div>

                                :
                                <p>Il n'y a pas de contenu pour le moment.</p>
                        }
                    </div>
            }

        </>
    )
}
export default GetActus