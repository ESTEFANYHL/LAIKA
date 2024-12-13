import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Button,
  Text,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Dimensions,
} from "react-native";
import { Audio } from "expo-av";
import axios from "axios";
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";

const apiUrl = "https://api-laika-1.onrender.com";
const { width, height } = Dimensions.get("window");

// Genera posiciones aleatorias para las huellas
const generateFootprints = () => {
  const footprints = [];
  for (let i = 0; i < 80; i++) {
    footprints.push({
      left: Math.random() * width,
      top: Math.random() * height,
      size: 20 + Math.random() * 30,
      opacity: Math.random() * 0.15 + 0.6,
    });
  }
  return footprints;
};

export function AudioPre() {
  const navigation = useNavigation();
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [audioUri, setAudioUri] = useState<string | null>(null);
  const [prediction, setPrediction] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [footprints] = useState(generateFootprints());

  // Animaciones
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  const startRecording = async () => {
    try {
      const permission = await Audio.requestPermissionsAsync();
      if (permission.status !== "granted") {
        Alert.alert("Permiso requerido", "Necesitas otorgar permisos para usar el micrófono.");
        return;
      }

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording);
    } catch (err) {
      console.error("Error al iniciar grabación:", err);
      Alert.alert("Error", "No se pudo iniciar la grabación.");
    }
  };

  const stopRecording = async () => {
    if (!recording) return;

    try {
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      setAudioUri(uri);
      setRecording(null);
    } catch (err) {
      console.error("Error al detener grabación:", err);
    }
  };

  const sendAudioToApi = async () => {
    if (!audioUri) return;

    setLoading(true);
    scale.value = withSpring(0.8);
    opacity.value = withSpring(0.5);

    const formData = new FormData();
    const uriParts = audioUri.split(".");
    const fileType = uriParts[uriParts.length - 1];

    formData.append("file", {
      uri: audioUri,
      name: `audio.${fileType}`,
      type: `audio/${fileType}`,
    } as any);

    try {
      const response = await axios.post(`${apiUrl}/predict/audio/`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      let result = response.data.prediction.class;
      result = result.trim().toLowerCase();

      switch (result) {
        case "advertencia o miedo":
          navigation.navigate("Miedo");
          break;
        case "alerta o emoción":
          navigation.navigate("Alerta");
          break;
        case "relajación":
          navigation.navigate("Relajado");
          break;
        default:
          Alert.alert("Predicción no válida", `Valor recibido: "${result}"`);
          break;
      }
    } catch (error) {
      console.error("Error al predecir:", error);
      Alert.alert("Error", "Hubo un problema al realizar la predicción.");
    } finally {
      setLoading(false);
      scale.value = withSpring(1);
      opacity.value = withSpring(1);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Fondo con huellas */}
      {footprints.map((footprint, index) => (
        <Animated.Text
          key={index}
          style={[styles.footprint, {
            left: footprint.left,
            top: footprint.top,
            fontSize: footprint.size,
            opacity: footprint.opacity,
          }]}
        >
          🐾
        </Animated.Text>
      ))}

      {/* Controles */}
      <View style={styles.controls}>
        {!recording ? (
          <Button title="Iniciar Grabación" onPress={startRecording} color="#27ae60" />
        ) : (
          <Button title="Detener Grabación" onPress={stopRecording} color="#e74c3c" />
        )}
        {audioUri && (
          <>
            <Button title="Enviar Audio" onPress={sendAudioToApi} color="#3498db" />
            <Button title="Grabar de Nuevo" onPress={() => setAudioUri(null)} color="#f39c12" />
          </>
        )}
      </View>

      {/* Indicador de carga y resultado */}
      <Animated.View style={[styles.animatedContainer, animatedStyle]}>
        {loading && <ActivityIndicator size="large" color="#48c9b0" />}
        {prediction && !loading && (
          <Text style={styles.predictionText}>Predicción: {prediction}</Text>
        )}
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 10,
  },
  footprint: {
    position: "absolute",
    color: "#293855",
  },
  controls: {
    marginBottom: 20,
    alignItems: "center",
  },
  animatedContainer: {
    marginTop: 10,
    alignItems: "center",
  },
  predictionText: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: "700",
    color: "#f39c12",
  },
});
