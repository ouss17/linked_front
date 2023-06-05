import React, { useEffect, useState } from 'react'
import MetaData from '../../components/MetaData';
import { useSelector } from "react-redux";

const GetCategories = () => {

    const categories = useSelector((state) => state.CategoriesActiveReducer);

    return (
        <>
            <MetaData title={`Médias - Linked`} index="false" />
            <h1 className="title titleMain">Médias</h1>
            <div className="get-categories-page">
                {
                    categories.length > 0
                        ?
                        categories.map((category) => (
                            <div key={category.idCategory}>
                                <p>{category.nameCategory}</p>
                            </div>
                        ))
                        :
                        <p>Il n'y a pas de contenu pour le moment.</p>
                }
            </div>

        </>
    )
}

export default GetCategories