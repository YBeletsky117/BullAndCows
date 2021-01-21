import React, { useRef, useState } from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TouchableHighlight,
  Animated,
} from "react-native";
import Modal from "react-native-modal";

export default function MainScreen({ switchScreen }) {
  const [modalVisible, setModalVisible] = useState(false);
  const zoomValue = useRef(new Animated.Value(0.1)).current; 
  const opacityValue = useRef(new Animated.Value(0.1)).current; 
  const mainInOpacityValue = useRef(new Animated.Value(0)).current; 
  const mainOutOpacityValue = useRef(new Animated.Value(1)).current; 
  const trophyValue = useRef(new Animated.Value(-200)).current; 
  const btnPlayAnim = () => {
    Animated.spring(zoomValue, {
      toValue: 1,
      friction: 1,
      useNativeDriver: false,
    }).start();
  };
  const opacityAnim = () => {
    Animated.timing(opacityValue, {
      toValue: 1,
      duration: 700,
      useNativeDriver: false,
    }).start();
  };
  const trophyDownAnim = () => {
    Animated.timing(trophyValue, {
      toValue: 0,
      duration: 700,
      useNativeDriver: false,
    }).start();
  };
  const mainOpacitiAnimIn = () => {
    Animated.timing(mainInOpacityValue, {
      toValue: 1,
      duration: 700,
      useNativeDriver: false,
    }).start();
  };
  const mainOpacitiAnimOut = () => {
    Animated.timing(mainOutOpacityValue, {
      toValue: 0,
      duration: 700,
      useNativeDriver: false,
    }).start();
  };
  btnPlayAnim();
  opacityAnim();
  trophyDownAnim()
  mainOpacitiAnimIn()
  return (
    <Animated.View style={{ ...styles.container, opacity: mainInOpacityValue }}>
      <Modal
        animationIn="slideInDown"
        animationOut="slideOutUp"
        backdropOpacity={0.8}
        backdropColor="black"
        isVisible={modalVisible}
      >
        <View style={styles.centeredView}>
          <Image
            style={{ width: 280, height: 140, bottom: -10 }}
            source={require("../assets/bik_bottom.png")}
          ></Image>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Хотите перейти в зал славы?</Text>

            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <TouchableOpacity
                style={{ backgroundColor: "#2196F3", margin: 10 }}
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}
              >
                <Text style={styles.textStyle}>Отменить</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ backgroundColor: "#2196F3", margin: 10 }}
                onPress={() => {
                  switchScreen(2) + mainOpacitiAnimOut();
                }}
              >
                <Text style={styles.textStyle}>Перейти</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <TouchableHighlight
        activeOpacity={0.9}
        style={{
          ...styles.touchOpacity,
          position: "absolute",
          top: 80,
          borderRadius: 25,
        }}
        onPress={() => {
          setModalVisible(true);
        }}
      >
        <Animated.Image
          source={require("../assets/trophy.png")}
          style={{ width: 106, height: 100, top: trophyValue }}
        ></Animated.Image>
      </TouchableHighlight>
      <Image
        source={require("../assets/biki.png")}
        style={{
          position: "absolute",
          left: 0,
          bottom: -20,
          width: 400,
          height: 440,
        }}
      ></Image>
      <View
        style={{
          bottom: 105,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View style={styles.textContent}>
          <Animated.Text style={{ ...styles.text, opacity: opacityValue }}>
            Попробуй угадать число!
          </Animated.Text>
        </View>

        <TouchableOpacity
          onPress={() => switchScreen(1) + mainOpacitiAnimOut()}
          style={{
            ...styles.touchOpacity,
            paddingTop: 10,
            margin: 10,
            padding: 10,
            width: "55%",
            borderRadius: 37,
          }}
        >
          <Animated.Image
            source={require("../assets/play.png")}
            style={{
              width: 200,
              height: 100,
              transform: [{ scale: zoomValue }],
            }}
          ></Animated.Image>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  textContent: {
    alignItems: "center",
  },
  trophy: { width: 106, height: 100 },
  text: {
    marginHorizontal: 20,
    color: "black",
    fontFamily: "childrenText",
    textAlign: "center",
    fontSize: 56,
  },
  inputs: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 15,
    borderColor: "#fff",
  },
  input: {
    borderColor: "#808080",
    borderWidth: 5,
    borderRadius: 20,
    width: 55,
    height: 80,
    alignItems: "center",
    fontSize: 70,
    alignContent: "center",
    justifyContent: "center",
    fontFamily: "childrenText",
    color: "lightblue",
  },
  btnGenerate: {
    fontFamily: "nathaniel",
    textAlign: "center",
    fontSize: 35,
    borderWidth: 3,
    borderRadius: 25,
    padding: 12,
    backgroundColor: "#fff700",
    borderColor: "brown",
    overflow: "hidden",
    color: "#d6620f",
  },
  touchOpacity: {
    alignItems: "center",
    justifyContent: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 10,
    backgroundColor: "orange",
    borderRadius: 20,
    padding: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 20,
    },
    shadowOpacity: 0.28,
    shadowRadius: 9,
    elevation: 11,
    borderWidth: 4,
    borderColor: "brown",
  },
  textStyle: {
    color: "brown",
    textAlign: "center",
    fontSize: 26,
    fontFamily: "childText",
    borderColor: "brown",
    borderWidth: 4,
    borderRadius: 15,
    padding: 10,
    backgroundColor: "orange",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    color: "brown",
    fontFamily: "childText",
    fontSize: 36,
  },
});
