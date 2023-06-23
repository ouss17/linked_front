import React, { useContext, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import Faq from "react-faq-component";
import { ChevronDown } from '../../assets/Svg/Svg';
import MetaData from '../../components/MetaData';
import { useNavigate } from 'react-router';
import UserContext from '../../context/UserContext';
import { GetFeedbacksByEtablissement } from '../../Redux/actions/FeedbackAction';

import { Player } from "@lottiefiles/react-lottie-player";
import lottiePlayer from "../../assets/ressources/lotties/98891-insider-loading.json";

const Feedbacks = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { userLog, setUserLog } = useContext(UserContext);
    const [lottieShowContent, setLottieShowContent] = useState(true);
    const lottieRef = useRef();

    useEffect(() => {
        if (!userLog.isLogged) {
            navigate('/')
        } else {
            dispatch(GetFeedbacksByEtablissement(1, userLog.token)).then(() => {
                setLottieShowContent(false)
            })

        }
    }, [userLog]);


    const feedbacks = useSelector((state) => state.FeedbacksByEtablissementReducer);
    const [puclications, setPublications] = useState([]);

    useEffect(() => {
        let tab = [];
        let object = {};
        if (feedbacks.length > 0) {
            feedbacks.forEach(feedback => {
                object = {
                    title: feedback.titleFeedback,
                    content: feedback.detailFeedback,
                };
                tab.push(object);
            });
            setPublications(tab);
        }
    }, [feedbacks]);


    const styles = {
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
    };

    return (
        <>
            <MetaData title={`Retours d'utilisateurs - Linked`} index="false" />
            <div className="get-actus-page">
                {
                    lottieShowContent
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
                        feedbacks.length > 0
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
                            <p>Il n'y a aucun retour pour le moment.</p>
                }
            </div>

        </>
    )
}
export default Feedbacks