import React, { useState, useRef, useEffect } from "react";
import {View,Text,StyleSheet,Dimensions,Animated,Easing,Modal,ScrollView,Image,Button,TouchableOpacity,} from "react-native";
import { useNavigation } from "@react-navigation/native";

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

export function Home() {
  const navigation = useNavigation();
  const [footprints] = useState(generateFootprints());
  const [modalVisible, setModalVisible] = useState(true); // Estado para mostrar/ocultar el modal
  const iconBounce = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const bounceAnimation = () => {
      Animated.sequence([
        Animated.timing(iconBounce, {
          toValue: 8,
          duration: 1900,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(iconBounce, {
          toValue: -8,
          duration: 1900,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]).start(() => bounceAnimation());
    };
    bounceAnimation();
  }, []);

  const handleAccept = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      {/* Renderizar las huellas */}
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

      {/* Frame */}
      <View style={styles.frame}>
        <Text style={styles.title}>LAIKA</Text>
        <Text style={styles.subtitle}>
          Entendiendo emociones, conectando corazones
        </Text>

        {/* Logo animado */}
        <Animated.View style={{ transform: [{ translateY: iconBounce }] }}>
          <View style={styles.iconContainer}>
            <Image
              source={require("../../images/Laikita.png")}
              style={styles.iconImage}
            />
          </View>
        </Animated.View>

        {/* Botones */}
        <View style={styles.buttonContainer}>
          <Button
            title="Ir a Audio"
            color="#F1AC20"
            onPress={() => navigation.navigate("Audio")}
          />
          <View style={styles.space} />
          <View style={styles.space} />
          <Button
            title="Ir a Imagen"
            color="#F1AC20"
            onPress={() => navigation.navigate("Imagen")}
          />
        </View>

        {/* Footer con clickeable "Términos y Condiciones" */}
        <View style={styles.footerContainer}>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Text style={styles.footerLink}>
              ©LAIKA 2024. Términos y Condiciones
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Modal de Términos y Condiciones */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Términos y Condiciones</Text>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <Text style={styles.termsText}>
                <Text style={{ fontWeight: "bold" }}>
                  TÉRMINOS Y CONDICIONES Y AVISO DE PRIVACIDAD DE LAIKA{"\n\n"}
                </Text>
                <Text style={{ fontWeight: "bold" }}>
                  CONECTANDO CORAZONES, ENTENDIENDO EMOCIONES{"\n\n"}
                </Text>
                En LAIKA valoramos y respetamos la privacidad de nuestros
                usuarios. Estos Términos y Condiciones junto con nuestro Aviso
                de Privacidad describen cómo recopilamos, utilizamos y
                protegemos la información personal que nos proporcionas a través
                de nuestra aplicación.{"\n\n"}
                <Text style={{ fontWeight: "bold" }}>
                  1. Responsable del Tratamiento de Datos Personales{"\n"}
                </Text>
                LAIKA es una aplicación desarrollada para mejorar la calidad de
                vida de las mascotas y la interacción entre ellas y sus dueños.
                {"\n\n"}
                <Text style={{ fontWeight: "bold" }}>
                  2. Información Recabada{"\n"}
                </Text>
                No almacenamos datos personales como nombres, correos
                electrónicos ni contraseñas. {"\n\n"}
                <Text style={{ fontWeight: "bold" }}>
                  3. Finalidades del Tratamiento de Datos{"\n"}
                </Text>
                Los datos serán utilizados para los siguientes propósitos:
                {"\n\n"}
                <Text style={{ fontWeight: "bold" }}>Finalidades Primarias:{"\n"}</Text>
                - Proveer los servicios de interpretación del comportamiento y
                emociones de la mascota.{"\n"}
                - Emitir recomendaciones personalizadas.{"\n\n"}
                <Text style={{ fontWeight: "bold" }}>Finalidades Secundarias:{"\n"}</Text>
                - Realizar encuestas de satisfacción.{"\n"}
                - Utilizar imágenes para entrenar y mejorar la IA.{"\n\n"}
                <Text style={{ fontWeight: "bold" }}>
                  4. Protección de la Información{"\n"}
                </Text>
                Nos comprometemos a mantener la confidencialidad y seguridad.
                {"\n\n"}
                <Text style={{ fontWeight: "bold" }}>5. Transferencia de Datos{"\n"}</Text>
                No transferimos tus datos personales a terceros sin tu
                consentimiento. {"\n\n"}
                <Text style={{ fontWeight: "bold" }}>
                  6. Derechos ARCO (Acceso, Rectificación, Cancelación,
                  Oposición){"\n"}
                </Text>
                Puedes contactarnos en: privacidad@laika.app{"\n\n"}
                <Text style={{ fontWeight: "bold" }}>7. Condiciones de Uso{"\n"}</Text>
                - LAIKA está diseñada para fines informativos.{"\n"}
                - No sustituye la atención veterinaria profesional.{"\n\n"}
                <Text style={{ fontWeight: "bold" }}>
                  8. Modificaciones al Aviso de Privacidad{"\n"}
                </Text>
                Este aviso puede actualizarse. Te notificaremos sobre cambios
                significativos.{"\n\n"}
                <Text style={{ fontWeight: "bold" }}>9. Contacto{"\n"}</Text>
                Si tienes preguntas, contacta a: privacidad.laika.app@gmail.com
              </Text>
            </ScrollView>
            <Button title="Aceptar" color="#800020" onPress={handleAccept} />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  footprint: {
    position: "absolute",
    color: "#293855",
  },
  frame: {
    width: "95%",
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    borderRadius: 25,
    padding: 30,
    alignItems: "center",
  },
  title: {
    fontSize: 45,
    fontWeight: "bold",
    color: "#800020",
    marginBottom: 15,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 26,
    color: "#800020",
    marginBottom: 30,
    textAlign: "center",
  },
  iconContainer: {
    width: 180,
    height: 180,
    borderRadius: 90,
    borderWidth: 7,
    borderColor: "#000000",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30,
  },
  iconImage: {
    width: 150,
    height: 150,
    resizeMode: "contain",
  },
  buttonContainer: {
    marginVertical: 20,
    width: "80%",
  },
  space: {
    height: 10,
  },
  footerContainer: {
    marginTop: 20,
  },
  footerLink: {
    fontSize: 14,
    color: "#4165D5",
    textDecorationLine: "underline",
    textAlign: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#FFF",
    padding: 20,
    borderRadius: 10,
    width: "90%",
    maxHeight: "80%",
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  termsText: {
    fontSize: 16,
    lineHeight: 24,
    color: "#293855",
    textAlign: "justify",
  },
  scrollViewContent: {
    paddingVertical: 20,
  },
});
