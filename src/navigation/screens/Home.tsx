
import {
  View, 
  Text,
  StyleSheet, 
  Dimensions, 
  Animated, 
  Easing, 
  Modal, 
  ScrollView, 
  Image, 
  Button, 
  TouchableOpacity, 
} from "react-native";

// Importación del hook `useNavigation` para manejar la navegación entre pantallas
import { useNavigation } from "@react-navigation/native";

// Extraer las dimensiones actuales de la pantalla
const { width, height } = Dimensions.get("window"); 
// `width`: Representa el ancho total de la pantalla
// `height`: Representa el alto total de la pantalla

// Función para generar posiciones y propiedades aleatorias para las huellas
const generateFootprints = () => {
  const footprints = []; // Inicializa un arreglo vacío donde se guardarán las huellas

  // Bucle que se ejecuta 80 veces para generar 80 huellas diferentes
  for (let i = 0; i < 80; i++) {
    footprints.push({
      left: Math.random() * width, // Posición horizontal aleatoria dentro del ancho de la pantalla
      top: Math.random() * height, // Posición vertical aleatoria dentro del alto de la pantalla
      size: 20 + Math.random() * 30, // Tamaño aleatorio entre 20px y 50px (20 + un valor entre 0 y 30)
      opacity: Math.random() * 0.15 + 0.6, // Opacidad aleatoria entre 0.6 y 0.75 (0.6 + un valor entre 0 y 0.15)
    });
  }

  return footprints; // Devuelve el arreglo con las huellas generadas
};


// Exporta una función llamada Home, que representa un componente de React Native
export function Home() {
  const navigation = useNavigation(); // Hook `useNavigation` para navegar entre pantallas

  // Estado local que almacena las huellas generadas aleatoriamente al cargar el componente
  const [footprints] = useState(generateFootprints()); 
  // generateFootprints() devuelve un arreglo con propiedades de las huellas
  // No se necesita un setter porque el estado no se modifica después de generarse

  const [modalVisible, setModalVisible] = useState(true); 
  // Estado booleano inicializado en `true` para controlar la visibilidad del modal
  // `setModalVisible` se usará para cerrar o mostrar el modal

  const iconBounce = useRef(new Animated.Value(0)).current;
  // `useRef` crea una referencia mutable que no provoca re-renderización
  // Aquí se usa para manejar el valor animado del rebote del icono, inicializado en 0

  // Hook `useEffect` para iniciar la animación cuando el componente se monta
  useEffect(() => {
    const bounceAnimation = () => {
      Animated.sequence([
        // Primera animación: Mueve el icono hacia abajo
        Animated.timing(iconBounce, {
          toValue: 8, // Desplazamiento de 8 píxeles hacia abajo
          duration: 1900, // Duración de 1.9 segundos
          easing: Easing.inOut(Easing.ease), // Animación suavizada
          useNativeDriver: true, // Usa el driver nativo para mayor rendimiento
        }),
        // Segunda animación: Mueve el icono hacia arriba
        Animated.timing(iconBounce, {
          toValue: -8, // Desplazamiento de 8 píxeles hacia arriba
          duration: 1900, // Duración de 1.9 segundos
          easing: Easing.inOut(Easing.ease), // Animación suavizada
          useNativeDriver: true, // Usa el driver nativo para mayor rendimiento
        }),
      ]).start(() => bounceAnimation()); // Reinicia la animación en bucle infinito
    };
    bounceAnimation(); // Inicia la animación
  }, []); // El efecto se ejecuta solo una vez al montar el componente

  // Función para cerrar el modal cuando se presiona "Aceptar"
  const handleAccept = () => {
    setModalVisible(false); // Actualiza el estado y oculta el modal
  };

  return (
    // Contenedor principal
    <View style={styles.container}>
      {/* Renderiza cada huella generada en una posición y tamaño aleatorio */}
      {footprints.map((footprint, index) => (
        <Animated.Text
          key={index} // Clave única para cada elemento del mapa
          style={[
            styles.footprint, // Estilo base de la huella
            {
              left: footprint.left, // Posición horizontal aleatoria
              top: footprint.top, // Posición vertical aleatoria
              fontSize: footprint.size, // Tamaño aleatorio de la huella
              opacity: footprint.opacity, // Opacidad aleatoria
            },
          ]}
        >
          🐾 {/* Muestra el emoji de huella */}
        </Animated.Text>
      ))}

      {/* Marco principal del contenido */}
      <View style={styles.frame}>
        {/* Título principal de la aplicación */}
        <Text style={styles.title}>LAIKA</Text>

        {/* Subtítulo con lema de la aplicación */}
        <Text style={styles.subtitle}>
          Entendiendo emociones, conectando corazones
        </Text>

       {/* Logo animado */} 
<Animated.View style={{ transform: [{ translateY: iconBounce }] }}>
  {/* Contenedor del logo con estilos aplicados */}
  <View style={styles.iconContainer}>
    {/* Imagen del logo */}
    <Image
      source={require("../../images/Laikita.png")} // Ruta de la imagen local
      style={styles.iconImage} // Estilo aplicado a la imagen (dimensiones y ajuste)
    />
  </View>
</Animated.View>

{/* Botones */}
<View style={styles.buttonContainer}>
  {/* Botón para navegar a la pantalla "Audio" */}
  <Button
    title="Ir a Audio" // Texto del botón
    color="#F1AC20" // Color del botón
    onPress={() => navigation.navigate("Audio")} // Función que navega a la pantalla "Audio"
  />
  <View style={styles.space} /> {/* Espaciador vertical entre botones */}
  <View style={styles.space} /> {/* Otro espaciador vertical */}

  {/* Botón para navegar a la pantalla "Imagen" */}
  <Button
    title="Ir a Imagen" // Texto del botón
    color="#F1AC20" // Color del botón
    onPress={() => navigation.navigate("Imagen")} // Función que navega a la pantalla "Imagen"
  />
</View>

{/* Footer con clickeable "Términos y Condiciones" */}
<View style={styles.footerContainer}>
  {/* Texto clickeable que abre el modal */}
  <TouchableOpacity onPress={() => setModalVisible(true)}>
    <Text style={styles.footerLink}>
      ©LAIKA 2024. Términos y Condiciones {/* Texto visible */}
    </Text>
  </TouchableOpacity>
</View>

      {/* Modal de Términos y Condiciones */}
<Modal
  animationType="slide" // Define la animación al abrir/cerrar el modal (deslizante)
  transparent={true} // Hace que el fondo del modal sea transparente
  visible={modalVisible} // Controla la visibilidad del modal (valor del estado modalVisible)
  onRequestClose={() => setModalVisible(false)} // Cierra el modal al presionar el botón de "atrás" en Android
>
  {/* Contenedor principal del modal */}
  <View style={styles.modalContainer}>
    {/* Contenido central del modal */}
    <View style={styles.modalContent}>
      {/* Título principal del modal */}
      <Text style={styles.modalTitle}>Términos y Condiciones</Text>

      {/* Contenedor con scroll para el texto extenso */}
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {/* Texto completo de los Términos y Condiciones */}
        <Text style={styles.termsText}>
          {/* Texto en negritas */}
          <Text style={{ fontWeight: "bold" }}>
            TÉRMINOS Y CONDICIONES Y AVISO DE PRIVACIDAD DE LAIKA{"\n\n"}
          </Text>
          <Text style={{ fontWeight: "bold" }}>
            CONECTANDO CORAZONES, ENTENDIENDO EMOCIONES{"\n\n"}
          </Text>
          {/* Texto introductorio */}
          En LAIKA valoramos y respetamos la privacidad de nuestros
          usuarios. Estos Términos y Condiciones junto con nuestro Aviso
          de Privacidad describen cómo recopilamos, utilizamos y
          protegemos la información personal que nos proporcionas a través
          de nuestra aplicación.{"\n\n"}

          {/* Responsable del tratamiento */}
          <Text style={{ fontWeight: "bold" }}>
            1. Responsable del Tratamiento de Datos Personales{"\n"}
          </Text>
          LAIKA es una aplicación desarrollada para mejorar la calidad de
          vida de las mascotas y la interacción entre ellas y sus dueños.{"\n\n"}

          {/* Información recabada */}
          <Text style={{ fontWeight: "bold" }}>
            2. Información Recabada{"\n"}
          </Text>
          No almacenamos datos personales como nombres, correos
          electrónicos ni contraseñas.{"\n\n"}

          {/* Finalidades del tratamiento */}
          <Text style={{ fontWeight: "bold" }}>
            3. Finalidades del Tratamiento de Datos{"\n"}
          </Text>
          Los datos serán utilizados para los siguientes propósitos:{"\n\n"}
          <Text style={{ fontWeight: "bold" }}>Finalidades Primarias:{"\n"}</Text>
          - Proveer los servicios de interpretación del comportamiento y
          emociones de la mascota.{"\n"}
          - Emitir recomendaciones personalizadas.{"\n\n"}

          <Text style={{ fontWeight: "bold" }}>Finalidades Secundarias:{"\n"}</Text>
          - Realizar encuestas de satisfacción.{"\n"}
          - Utilizar imágenes para entrenar y mejorar la IA.{"\n\n"}

          {/* Protección de la información */}
          <Text style={{ fontWeight: "bold" }}>
            4. Protección de la Información{"\n"}
          </Text>
          Nos comprometemos a mantener la confidencialidad y seguridad.{"\n\n"}

          {/* Transferencia de datos */}
          <Text style={{ fontWeight: "bold" }}>5. Transferencia de Datos{"\n"}</Text>
          No transferimos tus datos personales a terceros sin tu
          consentimiento.{"\n\n"}

          {/* Derechos ARCO */}
          <Text style={{ fontWeight: "bold" }}>
            6. Derechos ARCO (Acceso, Rectificación, Cancelación,
            Oposición){"\n"}
          </Text>
          Puedes contactarnos en: privacidad@laika.app{"\n\n"}

          {/* Condiciones de uso */}
          <Text style={{ fontWeight: "bold" }}>7. Condiciones de Uso{"\n"}</Text>
          - LAIKA está diseñada para fines informativos.{"\n"}
          - No sustituye la atención veterinaria profesional.{"\n\n"}

          {/* Modificaciones al aviso */}
          <Text style={{ fontWeight: "bold" }}>
            8. Modificaciones al Aviso de Privacidad{"\n"}
          </Text>
          Este aviso puede actualizarse. Te notificaremos sobre cambios
          significativos.{"\n\n"}

          {/* Contacto */}
          <Text style={{ fontWeight: "bold" }}>9. Contacto{"\n"}</Text>
          Si tienes preguntas, contacta a: privacidad.laika.app@gmail.com
        </Text>
      </ScrollView>

      {/* Botón para cerrar el modal */}
      <Button
        title="Aceptar" // Texto que aparece en el botón
        color="#800020" // Color del botón
        onPress={handleAccept} // Función que actualiza modalVisible a false
      />
    </View>
  </View>
</Modal>

const styles = StyleSheet.create({
  container: {
    flex: 1, // El contenedor ocupa todo el espacio disponible en la pantalla
    backgroundColor: "#FFFFFF", // Fondo blanco para el contenedor
    alignItems: "center", // Alinea los elementos horizontalmente al centro
    justifyContent: "center", // Alinea los elementos verticalmente al centro
  },
  footprint: {
    position: "absolute", // Las huellas se posicionan de manera absoluta dentro del contenedor
    color: "#293855", // Color de las huellas (un tono azul oscuro)
  },
  frame: {
    width: "95%", // El marco ocupa el 95% del ancho de la pantalla
    backgroundColor: "rgba(255, 255, 255, 0.7)", // Fondo blanco translúcido con opacidad del 70%
    borderRadius: 25, // Bordes redondeados con un radio de 25 píxeles
    padding: 30, // Espaciado interno de 30 píxeles
    alignItems: "center", // Alinea los elementos dentro del marco horizontalmente al centro
  },
  title: {
    fontSize: 45, // Tamaño grande para el texto del título
    fontWeight: "bold", // Estilo de fuente en negrita
    color: "#800020", // Color del texto (un tono burdeos oscuro)
    marginBottom: 15, // Espaciado inferior de 15 píxeles
    textAlign: "center", // Alinea el texto al centro
  },
  subtitle: {
    fontSize: 26, // Tamaño mediano para el texto del subtítulo
    color: "#800020", // Color del texto (el mismo tono burdeos)
    marginBottom: 30, // Espaciado inferior de 30 píxeles
    textAlign: "center", // Alinea el texto al centro
  },
  iconContainer: {
    width: 180, // Ancho del contenedor del icono
    height: 180, // Altura del contenedor del icono (cuadrado)
    borderRadius: 90, // Bordes redondeados (círculo perfecto)
    borderWidth: 7, // Grosor del borde
    borderColor: "#000000", // Color negro para el borde
    alignItems: "center", // Alinea el contenido horizontalmente al centro
    justifyContent: "center", // Alinea el contenido verticalmente al centro
    marginBottom: 30, // Espaciado inferior de 30 píxeles
  },
  iconImage: {
    width: 150, // Ancho de la imagen del icono
    height: 150, // Altura de la imagen del icono (cuadrada)
    resizeMode: "contain", // Escala la imagen para que se ajuste sin recortarse
  },
  buttonContainer: {
    marginVertical: 20, // Margen vertical de 20 píxeles (arriba y abajo)
    width: "80%", // El contenedor ocupa el 80% del ancho disponible
  },
  space: {
    height: 10, // Espaciador vertical con altura de 10 píxeles
  },
  footerContainer: {
    marginTop: 20, // Margen superior de 20 píxeles para separar del contenido anterior
  },
  footerLink: {
    fontSize: 14, // Tamaño pequeño para el texto del pie de página
    color: "#4165D5", // Color azul para el texto
    textDecorationLine: "underline", // Subraya el texto para simular un enlace
    textAlign: "center", // Alinea el texto al centro
  },
  modalContainer: {
    flex: 1, // Ocupa todo el espacio disponible
    justifyContent: "center", // Alinea los elementos verticalmente al centro
    alignItems: "center", // Alinea los elementos horizontalmente al centro
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Fondo negro translúcido con opacidad del 50%
  },
  modalContent: {
    backgroundColor: "#FFF", // Fondo blanco para el contenido del modal
    padding: 20, // Espaciado interno de 20 píxeles
    borderRadius: 10, // Bordes redondeados con un radio de 10 píxeles
    width: "90%", // El modal ocupa el 90% del ancho disponible
    maxHeight: "80%", // El modal puede ocupar hasta el 80% de la altura disponible
  },
  modalTitle: {
    fontSize: 24, // Tamaño grande para el título del modal
    fontWeight: "bold", // Negrita para destacar el título
    marginBottom: 10, // Espaciado inferior de 10 píxeles
    textAlign: "center", // Alinea el texto al centro
  },
  termsText: {
    fontSize: 16, // Tamaño mediano para el texto de los términos
    lineHeight: 24, // Espaciado entre líneas de 24 píxeles
    color: "#293855", // Color azul oscuro para el texto
    textAlign: "justify", // Justifica el texto
  },
  scrollViewContent: {
    paddingVertical: 20, // Espaciado vertical de 20 píxeles dentro del scroll
  },
});
