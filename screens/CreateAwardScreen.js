import React, { useRef } from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  Animated,
  KeyboardAvoidingView,
} from "react-native";
import { PhotoPicker } from "./components/PhotoPicker";
import variables from "./components/_attemptCounter";
import AsyncStorage from "@react-native-async-storage/async-storage";

let [_Bull, _BackGnd, _ProfilePhoto] = [
  require("../assets/bik-hint.png"),
  require("../assets/splash-clean.png"),
  require("../assets/bik_think.png"),
];
let [animatedRight, animatedBottom] = [
  new Animated.Value(-400),
  new Animated.Value(-800),
];

export function CreateAwardScreen({ switchScreen }) {
  const imgRef = useRef();
  const nameRef = useRef();
  const lastNameRef = useRef();
  const mainInOpacityValue = useRef(new Animated.Value(0)).current;
  const mainOutOpacityValue = useRef(new Animated.Value(1)).current;

  Animated.timing(animatedRight, {
    toValue: 0,
    duration: 700,
    useNativeDriver: false,
  }).start();
  Animated.timing(animatedBottom, {
    toValue: 40,
    duration: 500,
    useNativeDriver: false,
  }).start();
  const photoPickHandler = (uri) => {
    imgRef.current = uri;
  };
  let iterations = variables._keysCounter + 1;
  let keys = {
    keyImgSrc: `IMG${iterations}`,
    keyAttempt: `AT${iterations}`,
    keyId: `ID${iterations}`,
    keyName: `NAME${iterations}`,
    keyLastName: `LASTNAME${iterations}`,
  };

  const writeData = async () => {
    let post = {
      id: new Date().toJSON(),
      name: nameRef.current,
      lastName: lastNameRef.current,
      img: imgRef.current,
      attempt: JSON.stringify(variables._attemptCounter),
    };
    try {
      await AsyncStorage.setItem(keys.keyImgSrc, post.img);
      await AsyncStorage.setItem(keys.keyAttempt, post.attempt);
      await AsyncStorage.setItem(keys.keyId, post.id);
      await AsyncStorage.setItem(keys.keyName, post.name);
      await AsyncStorage.setItem(keys.keyLastName, post.lastName);
      console.log("Writing complete!");
      variables._keysCounter++;
    } catch (e) {
      console.log(e);
    }
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
  mainOpacitiAnimIn();

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Animated.View
        style={{
          ...styles.hint,
          right: animatedRight,
          opacity: mainInOpacityValue,
        }}
      >
        <View style={styles.hintBg}>
          <Text style={styles.hintText}>
            Предлагаю поместить твои результаты на стену рекордсменов! Мне нужно
            только знать как тебя зовут и как ты выглядишь. Если хочешь
            отказаться - просто сообщи мне!
          </Text>
          <TouchableOpacity
            style={styles.btnCancel}
            onPress={() => switchScreen(3)}
          >
            <Text style={styles.textBtCancel}>Отказаться</Text>
          </TouchableOpacity>
        </View>
        <Image source={_Bull} style={styles.bullImage}></Image>
      </Animated.View>
      <Animated.View
        style={{ ...styles.questionnaire, bottom: animatedBottom }}
      >
        <View style={styles._photo}>
          <PhotoPicker onPick={photoPickHandler} />
        </View>
        <View style={styles.fields}>
          <Text style={styles.titleInput}>Имя:</Text>
          <TextInput
            clearButtonMode="always"
            maxLength={7}
            returnKeyType="go"
            keyboardAppearance="dark"
            enablesReturnKeyAutomatically={true}
            textContentType="name"
            textAlign="left"
            style={styles.input}
            onChangeText={(i) => (nameRef.current = i)}
          ></TextInput>
        </View>
        <View style={styles.fields}>
          <Text style={styles.titleInput}>Фамилия:</Text>
          <TextInput
            clearButtonMode="always"
            maxLength={8}
            returnKeyType="go"
            keyboardAppearance="dark"
            enablesReturnKeyAutomatically={true}
            textContentType="name"
            textAlign="left"
            style={styles.input}
            onChangeText={(i) => (lastNameRef.current = i)}
          ></TextInput>
        </View>
        <TouchableOpacity
          style={styles.btnAccept}
          onPress={() => {
            if (nameRef.current !== 0 && lastNameRef.current !== 0) {
              mainOpacitiAnimOut();
              switchScreen(3);
              writeData();
            }
          }}
        >
          <Text style={styles.textBtnAccept}>Готово</Text>
        </TouchableOpacity>
      </Animated.View>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  bullImage: {
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
    width: 153,
    height: 214,
  },
  hint: {
    position: "absolute",
    top: "10%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-start",
    alignContent: "center",
  },
  hintText: {
    fontFamily: "childText",
    color: "brown",
    fontSize: 17,
  },
  hintBg: {
    alignItems: "center",
    width: 200,
    padding: 10,
    backgroundColor: "#FDD9B5",
    borderRadius: 25,
    borderWidth: 4,
    borderColor: "brown",
    overflow: "hidden",
  },
  btnCancel: {
    padding: 3,
    borderRadius: 25,
    backgroundColor: "brown",
    color: "brown",
    marginTop: 10,
  },
  textBtCancel: {
    color: "#FDD9B5",
    fontFamily: "childText",
    fontSize: 22,
    borderColor: "#FDD9B5",
    borderWidth: 2,
    borderRadius: 18,
    padding: 7,
  },
  questionnaire: {
    width: 350,
    backgroundColor: "#F5D494",
    borderWidth: 4,
    borderColor: "brown",
    borderRadius: 25,
    padding: 20,
    paddingBottom: 65,
  },
  _photo: {
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
  photo: {
    margin: 5,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
    borderColor: "brown",
    borderRadius: 20,
    borderWidth: 4,
    overflow: "hidden",
    width: 164,
    height: 164,
  },
  fields: {
    flexDirection: "column",
  },
  titleInput: {
    fontFamily: "childText",
    fontSize: 40,
    color: "brown",
  },
  input: {
    margin: 5,
    borderWidth: 4,
    borderColor: "brown",
    borderRadius: 25,
    width: "100%",
    fontSize: 40,
    padding: 7,
    paddingHorizontal: 15,
    color: "brown",
    fontFamily: "childText",
    overflow: "hidden",
  },
  btnAccept: {
    position: "absolute",
    bottom: 12,
    right: 100,
    backgroundColor: "brown",
    borderRadius: 19,
    backgroundColor: "brown",
    padding: 5,
    width: 150,
  },
  textBtnAccept: {
    textAlign: "center",
    fontSize: 36,
    fontFamily: "childText",
    color: "white",
  },
});
