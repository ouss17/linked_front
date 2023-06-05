import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'
import { Icon, divIcon, point } from "leaflet";
import { Pin } from '../../assets/Svg/Svg';
import MetaData from '../../components/MetaData';
import customMarker from '../../assets/ressources/leaflet/marker.png'
import MarkerClusterGroup from "react-leaflet-cluster";

import "./localisation.css";
import { useSelector } from "react-redux";

const Localisation = () => {
    const etablissement = useSelector((state) => state.EtablissementReducer);


    //MAP
    const [lati, setLati] = useState(47.0810);
    const [long, setLong] = useState(2.3988);
    const markerPoint = [48.93665, 2.51447];
    useEffect(() => {
        if (etablissement.latitudeEtablissement) {
            setLati(etablissement.latitudeEtablissement)
        }
        if (etablissement.longitudeEtablissement) {
            setLong(etablissement.longitudeEtablissement)
        }
    }, [etablissement]);

    const customIcon = new Icon({
        iconUrl: require('../../assets/ressources/leaflet/marker.png'),
        iconSize: [50, 50]
    });

    const createClusterCustomIcon = function (cluster) {
        return new divIcon({
            html: `<span className="cluster-icon">${cluster.getChildCount()}</span>`,
            className: "custom-marker-cluster",
            iconSize: point(45, 45, true)
        });
    };

    const markers = [
        {
            geocode: markerPoint,
        },
    ];


    return (
        <>
            <MetaData title={`Localisation - Linked`} index="false" />

            <MapContainer center={[lati, long]} zoom={6} scrollWheelZoom={true}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <MarkerClusterGroup
                    chunkedLoading
                    iconCreateFunction={createClusterCustomIcon}
                >
                    {markers.map((marker) => (
                        <Marker position={marker.geocode} icon={customIcon}>
                            <Popup>
                                <p style={{ fontSize: "12px" }}>{etablissement && etablissement.nameEtablissement}</p>
                                <p style={{ fontSize: "12px" }} id="adrs">{etablissement && etablissement.addressEtablissement} <a href={`https://www.google.com/maps/place/${etablissement && etablissement.nameEtablissement}/@${etablissement && etablissement.latitudeEtablissement},${etablissement && etablissement.longitudeEtablissement},17z/data=!3m1!4b1!4m6!3m5!1s0x47e615c008fc4cc9:0xba0c6adebba6f959!8m2!3d48.936589!4d2.5144964!16s%2Fg%2F11fj7jlps_`} target="_blank">
                                    <Pin />
                                </a></p>
                            </Popup>
                        </Marker>
                    ))}
                </MarkerClusterGroup>
            </MapContainer>
            <div className="localisation">
                <p>Mosquée El-Rahma</p>
                <p id="adrs">{etablissement && etablissement.addressEtablissement} <a href={`https://www.google.com/maps/place/${etablissement && etablissement.nameEtablissement}/@${etablissement && etablissement.latitudeEtablissement},${etablissement && etablissement.longitudeEtablissement},17z/data=!3m1!4b1!4m6!3m5!1s0x47e615c008fc4cc9:0xba0c6adebba6f959!8m2!3d48.936589!4d2.5144964!16s%2Fg%2F11fj7jlps_`} target="_blank">
                    <Pin />
                </a></p>
                <p>Téléphone : <span className="main-color">{etablissement && etablissement.numberEtablissement}</span></p>
            </div>
        </>
    )
}

export default Localisation