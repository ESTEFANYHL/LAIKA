import React, { useState } from "react";
import { View, Text, StyleSheet, Dimensions, Animated } from "react-native";

const { width, height } = Dimensions.get("window");

// Función para generar posiciones aleatorias para las huellas
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

export function Miedo() {
  const [footprints] = useState(generateFootprints());

  const recommendations = [
    "Crea un espacio seguro y cómodo donde pueda refugiarse.",
    "Evita los ruidos fuertes y las situaciones estresantes.",
    "Habla con voz calmada y acarícialo suavemente para tranquilizarlo.",
    "Permítele acercarse a ti cuando se sienta listo, no lo fuerces.",
    "Ofrece recompensas o juguetes que le gusten para asociar el entorno con cosas positivas.",
  ];

  return (
    <View style={styles.container}>
      {/* Fondo con huellas animadas */}
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

      {/* Contenido principal */}
      <View style={styles.frame}>
        <Text style={styles.title}>¡Tu Perro Tiene Miedo!</Text>
        <Text style={styles.subtitle}>Recomendaciones para tranquilizarlo</Text>

        <View style={styles.recommendationsContainer}>
          {recommendations.map((recommendation, index) => (
            <Text key={index} style={styles.recommendation}>
              - {recommendation}
            </Text>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  footprint: {
    position: "absolute",
    fontFamily: "monospace",
    color: "rgba(0, 0, 0, 0.3)",
  },
  frame: {
    width: "95%",
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    borderRadius: 25,
    padding: 30,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2e2e2e",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#777",
    textAlign: "center",
    marginBottom: 20,
  },
  recommendationsContainer: {
    marginTop: 20,
    paddingHorizontal: 10,
  },
  recommendation: {
    fontSize: 16,
    marginBottom: 10,
    color: "#555",
  },
});
