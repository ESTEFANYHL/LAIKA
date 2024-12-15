import React, { useState, useRef, useEffect } from 'react';
import { 
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Animated,
  Easing,
  Modal,
  ScrollView,
  Button
} from 'react-native';

const { width, height } = Dimensions.get('window');

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

export function Home() {
  const [modalVisible, setModalVisible] = useState(true); 
  const [footprints] = useState(generateFootprints());
  const animatedValues = useRef(footprints.map(() => new Animated.Value(0))).current;
  const iconBounce = useRef(new Animated.Value(0)).current;
  const circleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Animación de las huellas
    animatedValues.forEach((animatedValue) => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(animatedValue, {
            toValue: 1,
            duration: 10000 + Math.random() * 5000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(animatedValue, {
            toValue: 0,
            duration: 10000 + Math.random() * 5000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ])
      ).start();
    });

    // Animación de rebote (bounce)
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
      ]).start(() => {
        bounceAnimation();
      });
    };
    bounceAnimation();

    // Animación de pulso para el círculo
    Animated.loop(
      Animated.sequence([
        Animated.timing(circleAnim, {
          toValue: 1.2,
          duration: 1500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(circleAnim, {
          toValue: 1,
          duration: 1500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();

  }, [animatedValues, iconBounce, circleAnim]);
  
  const handleAccept = () => {
    setModalVisible(false); // Cierra el modal al presionar el botón
  };
  const [currentView, setCurrentView] = useState('Home'); // Estado para cambiar de vista

  return (
    <View style={styles.container}>
      {/* Huellas */}
      {footprints.map((footprint, index) => (
        <Animated.Text
          key={index}
          style={[styles.footprint, {
            left: footprint.left,
            top: footprint.top,
            fontSize: footprint.size,
            opacity: footprint.opacity,
            transform: [
              { translateY: animatedValues[index].interpolate({ inputRange: [0, 1], outputRange: [0, 20] }) },
              { translateX: animatedValues[index].interpolate({ inputRange: [0, 1], outputRange: [0, 15] }) },
            ],
          }]}
        >
          🐾
        </Animated.Text>
      ))}

      {/* Frame principal */}
      <View style={styles.frame}>
        <Text style={styles.title}>LAIKA</Text>

        {/* Círculo azul sin relleno y animado */}
        <Animated.View style={[styles.logoContainer, { transform: [{ scale: circleAnim }] }]}>
          <Text style={styles.logoEmoji}>🐶</Text>
        </Animated.View>

        <Text style={styles.subtitle}>Entendiendo emociones, conectando corazones</Text>

        {/* Botón modificado para navegar */}

        <View style={styles.footerContainer}>
          <Text style={styles.footer}>©LAIKA 2024. TODOS LOS DERECHOS RESERVADOS.</Text>
        </View>
      </View>

      {/* Modal Términos y Condiciones */}
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
                <Text style={{ fontWeight: 'bold' }}>TÉRMINOS Y CONDICIONES Y AVISO DE PRIVACIDAD DE LAIKA{'\n\n'}</Text>
                <Text style={{ fontWeight: 'bold' }}>CONECTANDO CORAZONES, ENTENDIENDO EMOCIONES{'\n\n'}</Text>
                En LAIKA valoramos y respetamos la privacidad de nuestros usuarios. Estos Términos y Condiciones junto con nuestro Aviso de Privacidad describen cómo recopilamos, utilizamos y protegemos la información personal que nos proporcionas a través de nuestra aplicación.{'\n\n'}
                <Text style={{ fontWeight: 'bold' }}>1. Responsable del Tratamiento de Datos Personales{'\n'}</Text>
                LAIKA es una aplicación desarrollada para mejorar la calidad de vida de las mascotas y la interacción entre ellas y sus dueños. Somos responsables del tratamiento de los datos personales que recabamos de los usuarios. Nuestro objetivo principal es brindar un servicio que facilite la comprensión del comportamiento emocional y las necesidades de las mascotas, siempre respetando la privacidad y la protección de los datos.{'\n\n'}
                <Text style={{ fontWeight: 'bold' }}>2. Información Recabada{'\n'}</Text>
                No almacenamos datos personales como nombres, correos electrónicos ni contraseñas. LAIKA no cuenta con un sistema de registro o autenticación de usuarios, y no recabamos datos para crear perfiles personales. Únicamente recopilamos información de las imágenes cargadas en la aplicación para brindar nuestros servicios.{'\n\n'}
                <Text style={{ fontWeight: 'bold' }}>3. Finalidades del Tratamiento de Datos{'\n'}</Text>
                Los datos serán utilizados para los siguientes propósitos:{'\n\n'}
                <Text style={{ fontWeight: 'bold' }}>Finalidades Primarias:{'\n'}</Text>
                - Proveer los servicios de interpretación del comportamiento y emociones de la mascota.{'\n'}
                - Emitir recomendaciones personalizadas para mejorar la calidad de vida de tu mascota.{'\n'}
                - Generar reportes sobre el estado emocional de tu mascota.{'\n\n'}
                <Text style={{ fontWeight: 'bold' }}>Finalidades Secundarias:{'\n'}</Text>
                - Realizar encuestas de satisfacción para mejorar el servicio.{'\n'}
                - Utilizar las imágenes que subas a la aplicación para entrenar y mejorar nuestra Inteligencia Artificial, con el fin de mejorar la precisión de la interpretación de emociones de las mascotas. Estas imágenes se emplearán exclusivamente para fines de entrenamiento y mejora del modelo.{'\n\n'}
                <Text style={{ fontWeight: 'bold' }}>4. Protección de la Información{'\n'}</Text>
                Nos comprometemos a mantener la confidencialidad y seguridad de tu información. Hemos implementado medidas técnicas y organizativas adecuadas para proteger la información contra pérdida, mal uso, acceso no autorizado, alteración y destrucción.{'\n\n'}
                <Text style={{ fontWeight: 'bold' }}>5. Transferencia de Datos{'\n'}</Text>
                No transferimos tus datos personales a terceros sin tu consentimiento previo, salvo para cumplir con obligaciones legales. En caso de realizar transferencias, siempre se te notificará con antelación.{'\n\n'}
                <Text style={{ fontWeight: 'bold' }}>6. Derechos ARCO (Acceso, Rectificación, Cancelación, Oposición){'\n'}</Text>
                Dado que no recabamos información personal, los derechos ARCO no son aplicables en esta plataforma. Sin embargo, si tienes preguntas sobre el uso de las imágenes proporcionadas, puedes contactarnos en: privacidad@laika.app.{'\n\n'}
                <Text style={{ fontWeight: 'bold' }}>7. Condiciones de Uso{'\n'}</Text>
                - <Text style={{ fontWeight: 'bold' }}>Uso de la Aplicación:</Text> LAIKA está diseñada para ayudar a los dueños de mascotas a interpretar el comportamiento emocional de sus mascotas. Al utilizar la aplicación, aceptas que cualquier sugerencia o información proporcionada es únicamente de referencia y no sustituye la atención veterinaria profesional.{'\n'}
                - <Text style={{ fontWeight: 'bold' }}>Prohibiciones:</Text> Está prohibido el uso de la aplicación con fines ilícitos o que puedan dañar a terceros. La manipulación malintencionada de las imágenes o el uso no autorizado del contenido de la aplicación está estrictamente prohibido.{'\n'}
                - <Text style={{ fontWeight: 'bold' }}>Responsabilidad del Usuario:</Text> Al utilizar la aplicación, el usuario se compromete a hacer un uso responsable y adecuado de la misma. La precisión del análisis de las emociones de las mascotas puede depender de varios factores, como la calidad de la imagen y el entorno en el que se encuentre la mascota.{'\n\n'}
                <Text style={{ fontWeight: 'bold' }}>8. Modificaciones al Aviso de Privacidad y Términos y Condiciones{'\n'}</Text>
                Este aviso de privacidad y los términos y condiciones pueden sufrir modificaciones, cambios o actualizaciones derivadas de nuevos requerimientos legales, de nuestras propias necesidades, de los servicios que ofrecemos, de nuestras prácticas de privacidad o de otros motivos. Te notificaremos a través de la aplicación o de nuestro sitio web sobre cualquier cambio significativo.{'\n\n'}
                <Text style={{ fontWeight: 'bold' }}>9. Contacto{'\n'}</Text>
                Si tienes preguntas o necesitas mayor información sobre nuestros Términos y Condiciones o nuestro Aviso de Privacidad, no dudes en contactarnos al correo: privacidad.laika.app@gmail.com
              </Text>
            </ScrollView>

            <TouchableOpacity
              style={styles.acceptButton}
              onPress={handleAccept}
            >
              <Text style={styles.acceptButtonText}>Aceptar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  footprint: {
    position: 'absolute',
    color: '#293855',
  },
  frame: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 30,
    paddingTop: 60,
  },
  title: {
    fontSize: 60,
    fontWeight: 'bold',
    color: '#4165D5',
    marginBottom: 15,
    textAlign: 'center',
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 4,
    borderColor: '#4165D5',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 25,
  },
  logoEmoji: {
    fontSize: 40,
  },
  subtitle: {
    fontSize: 20,
    color: '#4165D5',
    marginBottom: 30,
    textAlign: 'center',
    paddingHorizontal: 20
  },
  button: {
    backgroundColor: '#F1AC20',
    borderRadius: 35,
    width: '80%',
    height: 60,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  footerContainer: {
    marginTop: 30,
    alignItems: 'center',
  },
  footer: {
    fontSize: 14,
    color: '#293855',
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 20,
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 10,
    width: '90%',
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#293855',
  },
  scrollViewContent: {
    paddingVertical: 20,
  },
  termsText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#293855',
    textAlign: 'justify',
  },
  acceptButton: {
    backgroundColor: '#4165D5',
    padding: 10,
    borderRadius: 5,
    alignSelf: 'center',
    marginTop: 20,
  },
  acceptButtonText: {
    color: 'white',
    fontSize: 18,
  },
});
