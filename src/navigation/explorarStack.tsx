import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from '../hooks/useTheme'; // Cambiado a la ruta correcta
import Explorar from '../screens/recetas/Explorar';
import InfoReceta from '../screens/recetas/InfoReceta';
import BuscarPorId from '../screens/recetas/BuscarPorId';
import { useLanguageStore } from '../store/useLanguageStore';
import { messages } from '../constants/messages';

const Stack = createNativeStackNavigator();

export default function ExplorarStack() {
  const { colors } = useTheme();
  const language = useLanguageStore((state) => state.language);
  const t = messages[language];
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: colors.secondary,
        },
        headerTitleStyle: {
          fontFamily: 'Poppins-Bold',
          fontSize: 22,
          color: colors.text,
        },
        headerTintColor: colors.primary,
      }}
    >
      <Stack.Screen name="ExplorarRecetas" component={Explorar} options={{ title: t.explore }} />
      <Stack.Screen name="BuscarPorId" component={BuscarPorId} options={{ title: t.searchById }} />
      <Stack.Screen name="InfoReceta" component={InfoReceta as React.ComponentType<any>} options={{ title: t.viewRecipe }} />
    </Stack.Navigator>
  );
}
