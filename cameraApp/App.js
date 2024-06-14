import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView } from 'react-native';
import {useState} from 'react';

export default function App() {
  return (
    <SafeAreaView style={estilos.container}>
      <View>
        <TouchableOpacity>
          <Text>Abrir Album</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text>Abrir Câmera</Text>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
