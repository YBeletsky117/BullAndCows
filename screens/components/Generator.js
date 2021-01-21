import React, { createRef, useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Keyboard,
  TouchableOpacity,
  Animated,
  Image,
} from "react-native";
import { BallIndicator } from "react-native-indicators";
import { Reviewer } from "../components/Reviewer";
import Modal from "react-native-modal";
import ConfettiCannon from "react-native-confetti-cannon";
import { MaterialIcons } from "@expo/vector-icons";
import variables from "./_attemptCounter";

export function Generator({ switchScreen }) {
  const [number, setNumber] = useState([]);
  const [state, setState] = useState(false);
  const [nowInputBgColor, setNowInputBgColor] = useState("transparent");
  const [checkedResultScore, setCheckedResultScore] = useState({});
  const [checkCountPos, setCheckCountPos] = useState(0);
  const [counter, setCounter] = useState(0);

  const [modalVisible, setModalVisible] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  function getRandomNumber() {
    function getRandom(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    let numberArrays = [
      new Array(0, 0, 0, 0).map(() => getRandom(0, 9)),
      new Array(0, 0, 0, 0, 0).map(() => getRandom(0, 9)),
      new Array(0, 0, 0, 0, 0, 0).map(() => getRandom(0, 9)),
    ];
    let amount = numberArrays[getRandom(0, 2)];
    setNumber(amount);
    console.log(amount);
  }

  const checkRandomNumber = (wrin, index) => {
    setCheckResult("Ура! Победа!");
    setCheckCount(6);
    setCheckCountPos(6);
  };
  checkRandomNumber;
  const myRef = createRef();
  const numberHandler = () => {
    return (
      <TextInput
        textAlign="center"
        maxLength={number.length}
        keyboardType="number-pad"
        style={{
          width: "100%",
          height: "100%",
          fontSize: 60,
          color: "brown",
          fontFamily: "nathaniel",
        }}
        onChangeText={(item) => {
          if (number.length === item.length) {
            Keyboard.dismiss();
            setCheckedResultScore(Reviewer(number, item.split("")));
            setModalVisible(true);
            setCounter(counter + 1);
          }
        }}
      ></TextInput>
    );
  };

  function fadeIn() {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 700,
      useNativeDriver: true,
    }).start();
  }

  useEffect(() => {
    setTimeout(() => {
      setState(true);
      getRandomNumber();
      fadeIn();
    }, 1000);
  }, []);
  if (!state) {
    return (
      <View style={[styles.container, styles.horizontal]}>
        <BallIndicator size={40} color="brown" />
      </View>
    );
  }
  function ModalViewHandler() {
    if (checkedResultScore.state) {
      return (
        <Modal
          animationIn="slideInUp"
          animationOut="slideOutDown"
          backdropOpacity={0.8}
          backdropColor="black"
          isVisible={modalVisible}
          style={{
            flexDirection: "column",
            alignItems: "center",
            alignContent: "space-between",
          }}
        >
          <ConfettiCannon
            fallSpeed={2500}
            explosionSpeed={1500}
            fadeOut={true}
            count={100}
            origin={{ x: 150, y: 550 }}
          />

          <View style={styles.centeredView}>
            <Image
              style={{ width: 300, height: 320, bottom: -30 }}
              source={require("../../assets/bik_think.png")}
            ></Image>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Молодец!</Text>
              <MaterialIcons
                style={{ position: "absolute", top: 10, right: 10 }}
                name="cancel"
                size={40}
                color="brown"
                onPress={() => {
                  setModalVisible(!modalVisible) + switchScreen(3);
                }}
              />
              <View
                style={{
                  flexDirection: "column",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "flex-end",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      ...styles.textStyle,
                      borderWidth: 0,
                      margin: 10,
                      color: "white",
                      fontSize: 36,
                      width: "80%",
                    }}
                  >
                    Полностью сошлось цифр:
                  </Text>
                  <Text
                    style={{
                      ...styles.textStyle,
                      borderWidth: 0,
                      margin: 10,
                      color: "brown",
                      fontSize: 96,
                    }}
                  >
                    {checkedResultScore.superHitCount}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "flex-end",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      ...styles.textStyle,
                      borderWidth: 0,
                      margin: 10,
                      color: "white",
                      fontSize: 26,
                      width: "80%",
                    }}
                  >
                    Частично сошлось цифр:
                  </Text>
                  <Text
                    style={{
                      ...styles.textStyle,
                      borderWidth: 0,
                      margin: 10,
                      color: "brown",
                      fontSize: 56,
                    }}
                  >
                    {checkedResultScore.hitCount}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "flex-end",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      ...styles.textStyle,
                      borderWidth: 0,
                      margin: 10,
                      color: "white",
                      fontSize: 26,
                      width: "80%",
                    }}
                  >
                    Всего попыток:
                  </Text>
                  <Text
                    style={{
                      ...styles.textStyle,
                      borderWidth: 0,
                      margin: 10,
                      color: "brown",
                      fontSize: 56,
                    }}
                  >
                    {counter}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <TouchableOpacity
                    style={{
                      backgroundColor: "brown",
                      overflow: "hidden",
                      borderRadius: 50,
                    }}
                    onPress={() => {
                      setModalVisible(!modalVisible);
                      switchScreen(4);
                      variables._attemptCounter = counter;
                    }}
                  >
                    <Text
                      style={{
                        ...styles.textStyle,
                        backgroundColor: "brown",
                        padding: 15,
                      }}
                    >
                      Продолжить
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </Modal>
      );
    } else {
      return (
        <Modal
          animationIn="slideInUp"
          animationOut="slideOutDown"
          backdropOpacity={0.8}
          backdropColor="black"
          isVisible={modalVisible}
          style={{
            flexDirection: "column",
            alignItems: "center",
            alignContent: "space-between",
          }}
        >
          <View style={styles.centeredView}>
            <Image
              style={{ width: 300, height: 320, bottom: -30 }}
              source={require("../../assets/bik_think.png")}
            ></Image>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Неудача...</Text>
              <MaterialIcons
                style={{ position: "absolute", top: 10, right: 10 }}
                name="cancel"
                size={40}
                color="brown"
                onPress={() => {
                  setModalVisible(!modalVisible) + switchScreen(3);
                }}
              />
              <View
                style={{
                  flexDirection: "column",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "flex-end",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      ...styles.textStyle,
                      borderWidth: 0,
                      margin: 10,
                      color: "white",
                      fontSize: 35,
                      width: "80%",
                    }}
                  >
                    Полностью сошлось цифр:
                  </Text>
                  <Text
                    style={{
                      ...styles.textStyle,
                      borderWidth: 0,
                      margin: 10,
                      color: "brown",
                      fontSize: 56,
                    }}
                  >
                    {checkedResultScore.superHitCount}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "flex-end",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      ...styles.textStyle,
                      borderWidth: 0,
                      margin: 10,
                      color: "white",
                      fontSize: 35,
                      width: "80%",
                    }}
                  >
                    Частично сошлось цифр:
                  </Text>
                  <Text
                    style={{
                      ...styles.textStyle,
                      borderWidth: 0,
                      margin: 10,
                      color: "brown",
                      fontSize: 56,
                    }}
                  >
                    {checkedResultScore.hitCount}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "flex-end",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      ...styles.textStyle,
                      borderWidth: 0,
                      margin: 10,
                      color: "white",
                      fontSize: 35,
                      width: "80%",
                    }}
                  >
                    Всего попыток:
                  </Text>
                  <Text
                    style={{
                      ...styles.textStyle,
                      borderWidth: 0,
                      margin: 10,
                      color: "brown",
                      fontSize: 56,
                    }}
                  >
                    {counter}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <TouchableOpacity
                    style={{
                      backgroundColor: "brown",
                      overflow: "hidden",
                      borderRadius: 50,
                    }}
                    onPress={() => {
                      setModalVisible(!modalVisible) + switchScreen(1);
                    }}
                  >
                    <Text
                      style={{
                        ...styles.textStyle,
                        backgroundColor: "brown",
                        padding: 15,
                      }}
                    >
                      Повторить
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </Modal>
      );
    }
  }
  return (
    <Animated.View
      ref={myRef}
      style={{
        alignItems: "center",
        opacity: fadeAnim,
      }}
    >
      <ModalViewHandler />
      <Text style={styles.text}>Какое число я загадал?</Text>

      <View style={styles.input}>{numberHandler()}</View>
      <Text style={styles.text}>
        Подсказка! В моём числе{" "}
        {number.length === 4
          ? `${number.length} цифры`
          : `${number.length} цифр`}
      </Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  text: {
    color: "white",
    fontFamily: "childrenText",
    fontSize: 46,
    textAlign: "center",
  },
  inputs: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderColor: "#fff",
    width: "92%",
    paddingVertical: 15,
  },
  input: {
    borderColor: "brown",
    borderWidth: 3,
    borderRadius: 15,
    width: "90%",
    height: "40%",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    fontFamily: "childText",
    color: "black",
  },
  container: {
    flex: 1,
    justifyContent: "center",
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    paddingTop: 10,
    marginBottom: 15,
    textAlign: "center",
    color: "brown",
    fontFamily: "childText",
    fontSize: 24,
  },
  text2: {
    top: 110,
    paddingTop: 10,
    marginBottom: 15,
    textAlign: "center",
    color: "brown",
    fontFamily: "childText",
    fontSize: 24,
  },
  text2Cont: {
    position: "absolute",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
  },
  textStyle: {
    textAlign: "center",
    fontSize: 36,
    fontFamily: "childText",
    backgroundColor: "brown",
    borderColor: "grey",
    borderWidth: 2,
    borderRadius: 19,
    backgroundColor: "#F5D494",
    color: "white",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    top: 0,
  },
  modalView: {
    backgroundColor: "#F5D494",
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
  modalText: {
    fontFamily: "childrenText",
    fontSize: 40,
    color: "brown",
  },
});
