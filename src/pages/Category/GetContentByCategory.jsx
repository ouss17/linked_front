import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useRoute } from '@react-navigation/native';

const GetContentByCategory = ({ category }) => {
    const [contents, setContents] = useState([]);
    useEffect(() => {
        fetch(`https://alrahma.ammadec.com/backend/actualites/getContentByCat.php?id=${category.id}`, {
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
                    setContents(result.datas);
                }
            }
            )
            .catch(error => {
                console.error(error);
            });
    }, []);

    return (
        <View>
            <Text style={styles.mainTitle}>{category.name}</Text>
            {
                contents.length > 0
                    ?
                    contents.map(content => (
                        <View>
                            <YoutubeIframe
                                height={250}
                                width={dimensionsForScreen.width}
                                play={false}
                                videoId={content.media.split('v=')[1]}
                            />
                            <Text style={{ marginLeft: 5, textTransform: "capitalize" }}>{content.title}</Text>
                            <Text style={{ marginLeft: 5, textTransform: "capitalize" }}>{content.content}</Text>
                        </View>
                    ))
                    :
                    <Text>Aucun contenu disponible pour le moment</Text>
            }
        </View>
    );
}

const styles = StyleSheet.create({})

export default GetContentByCategory;
