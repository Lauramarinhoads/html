import { useState } from 'react';
import {
  StyleSheet, Text, View, StatusBar, TextInput, Platform, Pressable, ScrollView,
  ActivityIndicator, Alert, Keyboard
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';

const statusBarHeight = StatusBar.currentHeight;
const KEY_GPT = 'sk-proj-9JjboNGiLqEIWQC5aU2lT3BlbkFJeGLjDrOOn7gI5bMMrsxC';

export default function App() {

  const [genero, setGenero] = useState("");
  const [stars, setStars] = useState(3);
  const [loading, setLoading] = useState(false);
  const [book, setBook] = useState("")

  async function handleGenerate() {
    if (genero === "") {
      Alert.alert("Atenção", "Preencha o genero!")
      return;
    }

    setBook("")
    setLoading(true);
    Keyboard.dismiss();

    const prompt = `Crie uma lista de 5 livros, do genero ${genero} que sejam avaliados em ${stars.toFixed(0)} estrelas`

    fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${KEY_GPT}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.20,
        max_tokens: 500,
        top_p: 1,
      })
    })
      .then(response => response.json())
      .then((data) => {
        console.log(data.choices[0].message.content);
        setBook(data.choices[0].message.content)
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      })

  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" translucent={true} backgroundColor="#F1F1F1" />
      <Text style={styles.heading}>Books</Text>

      <View style={styles.form}>
        <Text style={styles.label}>Gênero</Text>
        <TextInput
          placeholder="Ex: Suspense"
          style={styles.input}
          value={genero}
          onChangeText={(text) => setGenero(text)}
        />

        <Text style={styles.label}>Avaliação: <Text style={styles.stars}> {stars.toFixed(0)} </Text> estrelas</Text>
        <Slider
          minimumValue={1}
          maximumValue={5}
          minimumTrackTintColor="#009688"
          maximumTrackTintColor="#000000"
          value={stars}
          onValueChange={(value) => setStars(value)}
        />
      </View>

      <Pressable style={styles.button} onPress={handleGenerate}>
        <Text style={styles.buttonText}>Gerar recomendação de livros</Text>
        <MaterialIcons name="book" size={24} color="#FFF" />
      </Pressable>

      <ScrollView contentContainerStyle={{ paddingBottom: 24, marginTop: 4, }} style={styles.containerScroll} showsVerticalScrollIndicator={false} >
        {loading && (
          <View style={styles.content}>
            <Text style={styles.title}>Carregando livros...</Text>
            <ActivityIndicator color="#000" size="large" />
          </View>
        )}

        {book && (
          <View style={styles.content}>
            <Text style={styles.title}>livros👇</Text>
            <Text style={{ lineHeight: 24 }}>{book}</Text>
          </View>
        )}
      </ScrollView>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#04038D',
    alignItems: 'center',
    paddingTop: 20,
  },
  heading: {
    fontSize: 32,
    fontWeight: 'bold',
    color:'#fff',
    paddingTop: Platform.OS === 'android' ? statusBarHeight : 54
  },
  form: {
    backgroundColor: '#FFF4EB',
    width: '90%',
    borderRadius: 8,
    padding: 16,
    marginTop: 16,
    marginBottom: 8,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 8,
    color:'#5E17EB',
  },
  input: {
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#5E17EB',
    padding: 8,
    fontSize: 16,
    marginBottom: 16,
  },
  stars: {
    backgroundColor: '#F1f1f1'
  },
  button: {
    backgroundColor: '#5E17EB',
    width: '90%',
    borderRadius: 8,
    flexDirection: 'row',
    padding: 14,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  buttonText: {
    fontSize: 18,
    color: '#FFF',
    fontWeight: 'bold'
  },
  content: {
    backgroundColor: '#FFF4EB',
    padding: 16,
    width: '100%',
    marginTop: 16,
    borderRadius: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 14
  },
  containerScroll: {
    width: '90%',
    marginTop: 8,
  }
});