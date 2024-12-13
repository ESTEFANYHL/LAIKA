import React, { useState, useRef, useEffect } from "react";
import {SafeAreaView,View,Button,Image,StyleSheet,Text,ActivityIndicator,Alert,Dimensions,} from "react-native";
import { CameraView, useCameraPermissions, CameraMode, CameraType } from "expo-camera";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from "react-native-reanimated";

const apiUrl = "https://api-laaika.onrender.com";
const { width, height } = Dimensions.get("window");

// Generar posiciones aleatorias para las huellas
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

export function Imagen() {
  const navigation = useNavigation(); // Para navegar entre pantallas
  const cameraRef = useRef<CameraView>(null);
  const [permission, requestPermission] = useCameraPermissions();
  const [facing, setFacing] = useState<CameraType>("back");
  const [cameraZoom, setCameraZoom] = useState<number>(0);
  const [cameraMode] = useState<CameraMode>("picture");
  const [pictureUri, setPictureUri] = useState<string | null>(null);
  const [prediction, setPrediction] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showCamera, setShowCamera] = useState(true);
  const [footprints] = useState(generateFootprints());

  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  const handleTakePicture = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync();
        if (photo) {
          setPictureUri(photo.uri);
          setShowCamera(false);
        }
      } catch (error) {
        console.error("Error al tomar la foto:", error);
        Alert.alert("Error", "Hubo un problema al tomar la foto.");
      }
    }
  };

  const predictImage = async () => {
    if (!pictureUri) return;

    setLoading(true);
    scale.value = withSpring(0.8);
    opacity.value = withSpring(0.5);

    const formData = new FormData();
    const uriParts = pictureUri.split(".");
    const fileType = uriParts[uriParts.length - 1];

    formData.append("file", {
      uri: pictureUri,
      name: `image.${fileType}`,
      type: `image/${fileType}`,
    } as any);

    try {
      const response = await axios.post(`${apiUrl}/predict/image/`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const result = response.data.prediction.class;
      console.log("Predicción:", result);

      // Lógica del switch para navegación
      switch (result) {
        case "Relajado":
          navigation.navigate("Relajado");
          break;
        case "Triste":
          navigation.navigate("Triste");
          break;
        case "Enojado":
          navigation.navigate("Enojado");
          break;
        case "Feliz":
          navigation.navigate("Feliz");
          break;
        case "No-es-un-perro":
          Alert.alert("Eso no es un perro", "Inténtalo de nuevo.");
          break;
        default:
          Alert.alert("Predicción no válida", "Inténtalo de nuevo.");
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

  const handleRetake = () => {
    setPictureUri(null);
    setPrediction(null);
    setShowCamera(true);
  };

  const handleExit = () => {
    Alert.alert("¡Nos vemos!", "Gracias por usar Laika 🐶.");
    setPictureUri(null);
    setPrediction(null);
    setShowCamera(true);
  };

  const toggleCameraFacing = () => {
    setFacing((current) => (current === "back" ? "front" : "back"));
  };

  const increaseZoom = () => {
    if (cameraZoom < 1) setCameraZoom((prevValue) => prevValue + 0.1);
  };

  const decreaseZoom = () => {
    if (cameraZoom > 0) setCameraZoom((prevValue) => prevValue - 0.1);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Fondo de huellas */}
      {footprints.map((footprint, index) => (
        <Animated.Text
          key={index}
          style={[
            styles.footprint,
            {
              left: footprint.left,
              top: footprint.top,
              fontSize: footprint.size,
              opacity: footprint.opacity,
            },
          ]}
        >
          🐾
        </Animated.Text>
      ))}

      {showCamera ? (
        <CameraView
          ref={cameraRef}
          style={styles.camera}
          mode={cameraMode}
          zoom={cameraZoom}
          facing={facing}
          ratio="16:9"
        >
          <View style={styles.controls}>
            <Button title="Tomar Foto" onPress={handleTakePicture} color="#F1AC20" />
            <Button title="Cambiar Cámara" onPress={toggleCameraFacing} color="#F1AC20" />
          </View>
          <View style={styles.zoomControls}>
            <View style={styles.smallButtonContainer}>
              <Button title="Zoom +" onPress={increaseZoom} color="#F1AC20" />
            </View>
            <View style={styles.smallButtonContainer}>
              <Button title="Zoom -" onPress={decreaseZoom} color="#F1AC20" />
            </View>
          </View>
        </CameraView>
      ) : (
        <>
          {pictureUri && <Image source={{ uri: pictureUri }} style={styles.image} />}
          <Button title="Guardar y Predecir" onPress={predictImage} color="#f39c12" />
          <Button title="Reintentar" onPress={handleRetake} color="#27ae60" />
          <Button title="Salir" onPress={handleExit} color="#e74c3c" />
        </>
      )}

      <Animated.View style={[styles.animatedContainer, animatedStyle]}>
        {loading && <ActivityIndicator size="large" color="#48c9b0" />}
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
  },
  footprint: {
    position: "absolute",
    color: "#293855",
  },
  camera: {
    flex: 1,
    width: "100%",
  },
  controls: {
    position: "absolute",
    bottom: 70,
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
  },
  zoomControls: {
    position: "absolute",
    bottom: 20,
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
  },
  smallButtonContainer: {
    width: 80, // Botones más pequeños
    marginHorizontal: 5,
  },
  image: {
    width: 250,
    height: 250,
    marginTop: 10,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: "#48c9b0",
  },
  animatedContainer: {
    marginTop: 10,
  },
});
