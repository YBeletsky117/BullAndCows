import React from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image
} from "react-native";
import { Generator } from "./components/Generator.js";

export function GameScreen({ switchScreen }) {
  return (
    <View style={styles.container}>
        <Image
          source={require("../assets/bik_about.png")}
          style={{ position: "absolute", top: 63, width: 270, height: 270 }}
        ></Image>
        <View style={styles.frame}>
          <Generator switchScreen={switchScreen} />
        </View>

        <TouchableOpacity
          style={styles.touchOpacity}
          onPress={() => {
            switchScreen(3);
          }}
        >
          <Text style={styles.btnReturnMenu}>Вернуться в меню</Text>
        </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
  },
  btnReturnMenu: {
    fontFamily: "childrenText",
    textAlign: "center",
    fontSize: 25,
    borderWidth: 2,
    borderRadius: 25,
    padding: 12,
    backgroundColor: "white",
    borderColor: "brown",
    overflow: "hidden",
    color: "brown",
  },
  touchOpacity: {
    alignItems: "center",
    justifyContent: "center",
    bottom: 50,
    position: "absolute",
  },
  frame: {
    width: "90%",
    backgroundColor: "#F5D494",
    height: "20%",
    borderRadius: 25,
    borderColor: "brown",
    borderWidth: 4,
  },
});
