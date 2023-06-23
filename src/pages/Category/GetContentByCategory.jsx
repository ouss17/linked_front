import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import MetaData from '../../components/MetaData';
import { useLocation } from 'react-router';
import { GetActusByCategory } from '../../Redux/actions/ActusAction';
import { GetCategory } from '../../Redux/actions/CategoryAction';
import { Player } from "@lottiefiles/react-lottie-player";
import lottiePlayer from "../../assets/ressources/lotties/98891-insider-loading.json";
import { useInView } from "react-intersection-observer";

const GetContentByCategory = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const actuByCategory = useSelector((state) => state.ActusByCategoryReducer);
    const category = useSelector((state) => state.CategoryReducer);

    function sleep(ms) {
        // return new Promise(resolve => setTimeout(resolve, ms));
        return new Promise((resolve) => {
            const timer = setTimeout(() => {
                resolve("done !");
                clearTimeout(timer);
            }, ms);
        });
    }

    const [lottieShowContent, setLottieShowContent] = useState(true);
    const [lottieShowContent2, setLottieShowContent2] = useState(true);
    const lottieRef = useRef();
    const lottieRef2 = useRef();

    const [visible, setVisible] = useState(2);
    const [refMoreMovies, inViewMoreMovies] = useInView({
        triggerOnce: false,
        threshold: 0.2,
        onChange: (inViewMoreMovies) => {
            if (inViewMoreMovies) {
                sleep(2000).then(() => {
                    setLottieShowContent2(false);
                    setVisible(() => visible + 1);
                });
            } else if (inViewMoreMovies == false) {
                setLottieShowContent2(true);
            }
        },
    });

    useEffect(() => {
        let idCategory = location.pathname.substring(location.pathname.lastIndexOf('/') + 1);
        dispatch(GetCategory(idCategory)).then(() => {
            dispatch(GetActusByCategory(1, idCategory)).then(() => {
                setLottieShowContent(false);
            })
        })
    }, [location]);


    return (
        <>
            <MetaData title={`Médias${category.nameCategory && " - " + category.nameCategory} - Linked`} index="false" />
            <h1 className="title titleMain">{`Médias${(category.nameCategory && category.nameCategory !== undefined && category.nameCategory !== null) ? ` - ${category.nameCategory}` : ""}`}</h1>
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
                    <>
                        <div className="contenus">
                            {
                                actuByCategory.length > 0
                                    ?
                                    actuByCategory.map((actu) => (
                                        <div className='contenu' key={actu.idActus}>
                                            <h2>{actu.titleActus}</h2>
                                            {
                                                actu.mediaActus
                                                &&
                                                <iframe
                                                    title='YouTube video player'
                                                    src={`https://www.youtube.com/embed/${actu.mediaActus.substring(actu.mediaActus.lastIndexOf('/') + 1)}`}
                                                    frameborder='0'
                                                    allowFullScreen ></iframe>
                                            }
                                            {
                                                actu.contentActus
                                                &&
                                                <p>{actu.contentActus}</p>
                                            }
                                        </div>
                                    ))
                                    :
                                    <p>Il n'y a pas de contenu pour le moment.</p>
                            }
                        </div>
                        <div
                            className={lottieShowContent ? "observerHidden" : "observer"}
                            ref={refMoreMovies}
                        >
                        </div>
                        {lottieShowContent2 && (
                            <Player
                                ref={lottieRef2} // set the ref to your class instance
                                autoplay={true}
                                loop={true}
                                controls={false}
                                src={lottiePlayer}
                                style={{
                                    height: "300px",
                                    width: "300px",
                                    color: "var(--main-color)",
                                }}
                            ></Player>
                        )}
                    </>
            }
        </>
    );
}


export default GetContentByCategory;
