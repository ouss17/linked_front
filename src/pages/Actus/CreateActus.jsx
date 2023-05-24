import React, { useState, useEffect } from 'react'
import { Button, StyleSheet, Text, TextInput, View, ScrollView } from 'react-native'
import { Picker } from '@react-native-picker/picker';

const CreateActus = ({ navigation }) => {

  const [categories, setCategories] = useState([]);

  const [inputState, setInputState] = useState({
    title: "",
    content: "",
    image: "",
    category: "",
  });

  const [successAction, setSuccessAction] = useState(false);
  const [errorAction, setErrorAction] = useState(false);

  const emptyValue = () => {
    setInputState({
      title: "",
      content: "",
      image: "",
      category: "",
    });
  };

  const handleChangeInput = (name, value) => {
    console.log(name);
    console.log(value);
    setInputState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    fetch("https://alrahma.ammadec.com/backend/actualites/retrieveCategories.php", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then(response => response.text())
      .then(data => {
        let results = JSON.parse(data);
        console.log(results);

        setCategories(results.data)

      })
      .catch(error => console.error(error));
  }, [])

  const checkLog = () => {
    const { title, content, image, category } = inputState;
    return fetch('https://alrahma.ammadec.com/backend/actualites/createActus.php', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: title,
        content: content,
        image: image,
        category: category,
      }),
    })
      .then(response => response.text())
      .then(data => {
        let result = JSON.parse(data);
        emptyValue()
        if (result.send) {
          setSuccessAction(true)
          setTimeout(() => {
            setSuccessAction(false)
          }, 5000);
        } else {
          setErrorAction(true)
          setTimeout(() => {
            setErrorAction(false)
          }, 5000);
        }
        console.log(JSON.parse(data));
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <View>
      <Text style={styles.mainTitle}>Ajouter un Post</Text>
      <View>
        {
          successAction
          &&
          <Text style={styles.successAction}>Le post a bien été enregistrée.</Text>
        }
        {
          errorAction
          &&
          <Text style={styles.errorAction}>Le post n'a pas été enregistrée.</Text>
        }
      </View>
      <View style={styles.containerForm}>

        <ScrollView style={styles.form}>
          <View className="fieldsForm">
            <View style={styles.field}>
              <Text style={styles.titleForm}>Titre *</Text>
              <TextInput
                style={styles.value}
                value={inputState.title}
                placeholder="titre"
                onChangeText={(valueN) => handleChangeInput('title', valueN)}
              />
            </View>
            <View style={styles.field}>
              <Text style={styles.titleForm}>Contenu *</Text>
              <TextInput
                style={styles.value}
                editable
                multiline
                numberOfLines={4}
                placeholder="Le contenu du post"
                value={inputState.content}
                onChangeText={(value) => handleChangeInput("content", value)}
              />
            </View>
            <View style={styles.field}>
              <Text style={styles.titleForm}>Catégorie</Text>
              <Picker
                selectedValue={inputState.category}
                onValueChange={(itemValue) => handleChangeInput('category', itemValue)}
              >
                {categories.map((category) => (
                  <Picker.Item key={category.id} label={category.name.toLowerCase()
                    .charAt(0)
                    .toUpperCase() +
                    category.name.slice(1).toLowerCase()} value={category.id} />
                ))}
              </Picker>
            </View>


            {
              inputState.category !== "annonces"
              &&
              <View style={styles.field}>
                <Text style={styles.titleForm}>Media</Text>
                <TextInput
                  style={styles.value}
                  value={inputState.image}
                  placeholder="Url de la vidéo youtube"
                  onChangeText={(valueI) => handleChangeInput('image', valueI)}
                />
              </View>
            }
          </View>
          <View className="actionsForm">
            <Button style={styles.button} title='Créer' onPress={checkLog}>
              {this.res == 'null' ? <Text>heh</Text> : null}
            </Button>
          </View>
        </ScrollView>
      </View>
    </View >
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
  containerForm: {
    display: "flex",
    marginTop: 50,
    justifyContent: "center",
    alignItems: "center"
  },
  form: {
    width: "75%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 16,
  },
  field: {
    marginBottom: 30,
  },
  titleForm: {
    fontSize: 22,
    marginBottom: 10,
  },
  value: {
    borderStyle: "solid",
    borderWidth: 1,
    borderRadius: 16,
    padding: 5,
    paddingHorizontal: 10,
    borderColor: "rgba(0,0,0,0.4)",
  },
  button: {
    borderRadius: 16
  },
  successAction: {
    color: "white",
    paddingHorizontal: 30,
    paddingVertical: 5,
    backgroundColor: "green",
    textAlign: "center",
    borderRadius: 16,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },
  errorAction: {
    color: "white",
    paddingHorizontal: 30,
    paddingVertical: 5,
    backgroundColor: "red",
    textAlign: "center",
    borderRadius: 16,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  }

})

export default CreateActus