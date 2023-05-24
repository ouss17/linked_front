import React, { useEffect, useState } from 'react'
import { StyleSheet, Text } from 'react-native'
import { View } from 'react-native-animatable';

const GetActus = () => {

    const [allActus, setAllActus] = useState([]);
    const getActus = () => {
        return fetch('https://alrahma.ammadec.com/backend/actualites/getActus.php', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        })
            .then(json => {
                return json.json();
            })
            .then(
                (res => {
                    setAllActus(res);
                    // console.log(res);
                })
            )
            .catch(error => {
                console.error(error);
            });
    };
    useEffect(() => {
        getActus();
    }, []);

    useEffect(() => {
        // console.log(allActus);
    }, [allActus]);

    const [openedContentIndex, setOpenedContentIndex] = useState(null);

    const handleClick = (index) => {
        setOpenedContentIndex(index === openedContentIndex ? null : index);
    };

    return (
        <View>
            <Text style={[styles.mainTitle]}>Actualités</Text>
            {allActus.map(actu => (
                <View key={actu.id} style={[styles.actuContainer]}>
                    <Text style={[styles.title, { backgroundColor: openedContentIndex === actu.id ? "#04bf94" : "#fff" }, { color: openedContentIndex === actu.id ? "white" : "black" }]} onPress={() => handleClick(actu.id)}>
                        {actu.title}
                    </Text>
                    {openedContentIndex === actu.id && <Text style={[styles.content]}>{actu.content}</Text>}
                </View>
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    mainTitle: {
        textAlign: "center",
        padding: 32,
        backgroundColor: "#04bf94",
        color: "white",
        fontSize: 28,
        fontWeight: "bold"
    },
    actuContainer: {
    },

    title: {
        textAlign: "center",
        backgroundColor: "#fff",
        margin: 16,
        padding: 16,
        borderRadius: 16,
        fontSize: 20.8,
        fontWeight: "bold",
        position: "relative",
        color: "black"
    },
    content: {
        width: "100%",
        overflow: "hidden",
        textAlign: "center",
        backgroundColor: "#fff",
        borderRadius: 16,
        height: "auto",
        alignItems: "center",
        fontSize: 16,
        color: "black"
    }
})

export default GetActus