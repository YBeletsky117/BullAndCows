import React, { useState } from "react";
import MainScreen from "./screens/MainScreen";
import * as Font from "expo-font";
import { GameScreen } from "./screens/GameScreen";
import { AwardsScreen } from "./screens/AwardsScreen";
import { CreateAwardScreen } from "./screens/CreateAwardScreen";
import { Provider } from "react-redux";
import configureStore from "./store/index";
import { StyleSheet, View } from "react-native";
import { BallIndicator } from "react-native-indicators";
import AsyncStorage from "@react-native-async-storage/async-storage";

const getAllKeys = async () => {
  try {
    keys = await AsyncStorage.getAllKeys();
    keys = (keys.length / 5);
    if (keys === 0) {
      variables._keysCounter = 0;
    } else {
      variables._keysCounter = keys;
    }
  } catch (e) {
    console.log(e);
  }
}
export default function App() {
  getAllKeys()
  const [todo, setTodo] = useState(3);
  const [loaded] = Font.useFonts({
    tinyText: require("./assets/fonts/HelveticaNeueCyr-UltraLight.ttf"),
    childrenText: require("./assets/fonts/Foo.ttf"),
    childText: require("./assets/fonts/ofont.ru_klinik.ttf"),
    nathaniel: require("./assets/fonts/Nathaniel-19.otf"),
  });
  // clearAll()
  const store = configureStore();
  if (!loaded) {
    return (
      <View style={[styles.container, styles.horizontal]}>
        <BallIndicator size={40} color="brown" />
      </View>
    );
  }

  switch (todo) {
    case 1:
      content = (
        <GameScreen
          switchScreen={(item) => {
            setTodo(item);
          }}
        />
      );
      break;
    case 2:
      content = (
        <AwardsScreen
          switchScreen={(item) => {
            setTodo(item);
          }}
        />
      );
      break;
    case 3:
      content = (
        <MainScreen
          switchScreen={(item) => {
            setTodo(item);
          }}
        />
      );
      break;
    case 4:
      content = (
        <CreateAwardScreen
          switchScreen={(item) => {
            setTodo(item);
          }}
        />
      );
      break;
  }

  return <Provider store={store}>{content}</Provider>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
