import React, { useContext, useEffect, useRef, useState } from 'react'
import MetaData from '../../components/MetaData';
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';

import { Player } from "@lottiefiles/react-lottie-player";
import lottiePlayer from "../../assets/ressources/lotties/98891-insider-loading.json";
import LottieShowCategoriesContext from '../../context/LottieShowCategoriesContext';
import { GetCategoriesActive } from '../../Redux/actions/CategoryAction';
const GetCategories = () => {
    const categories = useSelector((state) => state.CategoriesActiveReducer);
    const { lottieShowCategories, setLottieShowCategories } = useContext(LottieShowCategoriesContext);
    const lottieRef = useRef();

    const dispatch = useDispatch()

    useEffect(() => {
        const interval = setInterval(() => {
            dispatch(GetCategoriesActive(1))
        }, 10000);
        return () => {
            clearInterval(interval)
        }
    }, [])

    return (
        <>
            <MetaData title={`Médias - Linked`} index="false" />
            <h1 className="title titleMain">Médias</h1>
            {
                lottieShowCategories
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
                    <div className="get-categories-page">
                        {
                            categories.length > 0
                                ?
                                categories.map((category) => (
                                    <Link to={`/medias/${category.idCategory}`} key={category.idCategory}>
                                        <p>{category.nameCategory}</p>
                                    </Link>
                                ))
                                :
                                <p>Il n'y a pas de contenu pour le moment.</p>
                        }
                    </div>
            }

        </>
    )
}

export default GetCategories