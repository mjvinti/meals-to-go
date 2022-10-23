import { Text } from "react-native";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { ThemeProvider } from "styled-components/native";
import {
  useFonts as useOswald,
  Oswald_400Regular,
} from "@expo-google-fonts/oswald";
import { useFonts as useLato, Lato_400Regular } from "@expo-google-fonts/lato";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { RestaurantsScreen } from "./src/features/restaurants/screens/restaurants.screen";
import { SafeArea } from "./src/components/utils/safe-area.component";

import { theme } from "./src/infrastructure/theme";

const Tab = createBottomTabNavigator();

const SettingsScreen = () => (
  <SafeArea>
    <Text>Settings</Text>
  </SafeArea>
);
const MapsScreen = () => (
  <SafeArea>
    <Text>Maps</Text>
  </SafeArea>
);

export default function App() {
  const [oswaldLoaded] = useOswald({ Oswald_400Regular });
  const [latoLoaded] = useLato({ Lato_400Regular });

  if (!oswaldLoaded || !latoLoaded) {
    return null;
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <NavigationContainer>
          <Tab.Navigator>
            <Tab.Screen name="Restaurants" component={RestaurantsScreen} />
            <Tab.Screen name="Maps" component={MapsScreen} />
            <Tab.Screen name="Settings" component={SettingsScreen} />
          </Tab.Navigator>
        </NavigationContainer>
        <ExpoStatusBar style="auto" />
      </ThemeProvider>
    </>
  );
}
