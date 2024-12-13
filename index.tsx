import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HeaderButton, Text } from '@react-navigation/elements';
import {createStaticNavigation,StaticParamList,} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Image } from 'react-native';
import calendar from '../assets/calendar.png';
import newspaper from '../assets/newspaper.png';
import { Home } from './screens/Home';
import { Login } from './screens/Iniciar_sesion';
import { Triste } from './screens/Triste';
import { Feliz } from './screens/Feliz';
import { Enojado } from './screens/Enojado';
import { Relajado } from './screens/Relax';
import { AudioPre } from './screens/Audio';
import { Imagen } from './screens/Imagen';
import { Agenda } from './screens/Agenda';
import { Miedo } from './screens/Miedo';
import { Alerta } from './screens/Alerta';



const HomeTabs = createBottomTabNavigator({
  screens: {
    Home: {
      screen: Home,
      options: {
        title: 'Inicio',
        tabBarIcon: ({ color, size }) => (
          <Image
            source={newspaper}
            tintColor={color}
            style={{
              width: size,
              height: size,
            }}
          />
        ),
      },
    },
    Agenda: {
      screen: Agenda,
      options: {
        tabBarIcon: ({ color, size }) => (
          <Image
            source={calendar}
            tintColor={color}
            style={{
              width: size,
              height: size,
            }}
          />
        ),
      },
    },
  },
});

const RootStack = createNativeStackNavigator({
  screens: {
    HomeTabs: {
      screen: HomeTabs,
      options: {
        title: 'Home',
        headerShown: false,
      },
    },
    Audio: {
      screen: AudioPre,
      options: ({ navigation }) => ({
        presentation: 'modal'
      }),
    },
    Imagen: {
      screen: Imagen,
      options: ({ navigation }) => ({
        presentation: 'modal',
      }),
    },
    Enojado: {
      screen: Enojado,
      options: ({ navigation }) => ({
        presentation: 'modal',
      }),
    },
    Miedo: {
      screen: Miedo,
      options: ({ navigation }) => ({
        presentation: 'modal',
      }),
    },
    Alerta: {
      screen: Alerta,
      options: ({ navigation }) => ({
        presentation: 'modal',
      }),
    },
    Feliz: {
      screen: Feliz,
      options: ({ navigation }) => ({
        presentation: 'modal',
      }),
    },
    Relajado: {
      screen: Relajado,
      options: ({ navigation }) => ({
        presentation: 'modal',
      }),
    },
    Triste: {
      screen: Triste,
      options: ({ navigation }) => ({
        presentation: 'modal',
      }),
    },
    Iniciar_sesion: {
      screen: Login,
      options: ({ navigation }) => ({
        presentation: 'modal',
        headerRight: () => (
          <HeaderButton onPress={navigation.goBack}>
            <Text>Salir</Text>
          </HeaderButton>
        ),
      }),
    },
  },
});

export const Navigation = createStaticNavigation(RootStack);

type RootStackParamList = StaticParamList<typeof RootStack>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
