import React, { useEffect, useState } from 'react'
import MetaData from '../../components/MetaData';
import { useSelector } from "react-redux";
import Faq from "react-faq-component";
import { ChevronDown } from '../../assets/Svg/Svg';

const GetActus = () => {
    const actus = useSelector((state) => state.ActusByEtablissementReducer);
    const [puclications, setPublications] = useState([]);

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
            <div className="get-actus-page">
                {
                    actus.length > 0
                        ?
                        // <div key={actu.idActus} className='actus'>
                        //     <h2>{actu.titleActus}</h2>
                        //     <p>{actu.contentActus}</p>
                        // </div>
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

        </>
    )
}
export default GetActus