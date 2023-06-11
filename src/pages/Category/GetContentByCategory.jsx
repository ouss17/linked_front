import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import MetaData from '../../components/MetaData';
import { useLocation } from 'react-router';
import { GetActusByCategory } from '../../Redux/actions/ActusAction';
import { GetCategory } from '../../Redux/actions/CategoryAction';

const GetContentByCategory = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const actuByCategory = useSelector((state) => state.ActusByCategoryReducer);
    const category = useSelector((state) => state.CategoryReducer);

    useEffect(() => {
        let idCategory = location.pathname.substring(location.pathname.lastIndexOf('/') + 1);
        dispatch(GetCategory(idCategory)).then(() => {
            dispatch(GetActusByCategory(1, idCategory))
        })
    }, [location]);


    return (
        <>
            <MetaData title={`Médias${category.nameCategory && " - " + category.nameCategory} - Linked`} index="false" />
            <h1 className="title titleMain">{`Médias - ${category.nameCategory && category.nameCategory}`}</h1>
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
            </div >
        </>
    );
}


export default GetContentByCategory;
