import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, Dimensions, TouchableOpacity, View } from 'react-native'
import YoutubeIframe from 'react-native-youtube-iframe';
import { useNavigation } from '@react-navigation/native';

const GetCategories = () => {
    const navigation = useNavigation();
    const [categories, setCategories] = useState([]);
    const [lastContent, setLastContent] = useState([]);

    const dimensionsForScreen = Dimensions.get("screen");

    const handlePress = (idCategory) => {
        navigation.navigate('GetContentByCategory', { idCategory: idCategory });
    };

    useEffect(() => {
        fetch('https://alrahma.ammadec.com/backend/actualites/getCategories.php', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.text())
            .then(res => {
                // console.log(res);
                if (res) {
                    let result = JSON.parse(res);
                    setCategories(result.datas);
                    setLastContent(result.lastContent);
                    console.log(result.lastContent.media.split('v=')[1]);
                }
            }
            )
            .catch(error => {
                console.error(error);
            });
    }, []);
    return (
        <View>
            <Text style={styles.mainTitle}>Médias</Text>
            {
                lastContent.media
                &&
                <View>
                    <YoutubeIframe
                        height={250}
                        width={dimensionsForScreen.width}
                        play={false}
                        videoId={lastContent.media.split('v=')[1]}
                    />
                    <Text style={{ marginLeft: 5, textTransform: "capitalize" }}>{lastContent.title}</Text>
                </View>
            }
            <View style={styles.containerCategory}>
                {
                    categories.length > 0
                        ?
                        categories.map(categorie => (
                            <TouchableOpacity style={styles.textCategory} key={categorie.id}>
                                <View>
                                    <Text style={{ fontSize: 20, textAlign: "center", textTransform: "capitalize", }}>{categorie.name}</Text>
                                </View>
                            </TouchableOpacity>
                        ))
                        :
                        <Text>Il n'y a aucun média pour le moment</Text>
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    mainTitle: {
        textAlign: "center",
        padding: 10,
        backgroundColor: "#04bf94",
        color: "white",
        fontSize: 28,
        fontWeight: "bold"
    },
    containerCategory: {
        width: "100%",
        marginVertical: 32,
        marginHorizontal: "auto",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        flexWrap: "wrap",
        alignItems: "baseline",
    },
    textCategory: {
        width: "40%",
        height: 80,
        backgroundColor: "#fff",
        margin: 15,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 16,
        filter: "drop-shadow(0 0 2px #333)",
    }
})

export default GetCategories