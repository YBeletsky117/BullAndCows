import React, { useEffect, useState, useRef } from "react";
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  FlatList,
  Image,
  Animated,
  Dimensions,
} from "react-native";
import { useDispatch } from "react-redux";
import { readData } from "../store/actions/post";
import configureStore from "../store/index";
import { Ionicons } from "@expo/vector-icons";
import variables from "./components/_attemptCounter";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Item = ({ name, photo, lastname, attempt }) => {
  const springValue = useRef(new Animated.Value(0.4)).current; // 56
  const animatedX = () => {
    Animated.spring(springValue, {
      toValue: 1,
      friction: 5,
      useNativeDriver: false,
    }).start();
  };
  animatedX();
  return (
    <Animated.View
      style={{
        alignItems: "stretch",
        borderColor: "orange",
        borderRadius: 20,
        borderWidth: 4,
        overflow: "hidden",
        transform: [{ scale: springValue }],
        width: 168,
        height: 192,
        margin: "2%",
      }}
    >
      <ImageBackground
        style={{
          width: 168,
          height: 192,
          alignItems: "center",
          justifyContent: "flex-start",
        }}
        source={require("../assets/awardPostXL.png")}
      >
        <Image
          source={{ uri: photo }}
          style={{
            top: 8,
            width: 120,
            height: 120,
            borderRadius: 50,
            borderWidth: 2,
            borderColor: "orange",
          }}
        ></Image>
      </ImageBackground>
      <View
        style={{
          position: "absolute",
          bottom: 0,
          backgroundColor: "rgba(186,94,94, 0.6)",
          width: "100%",
          padding: 3,
          height: 50,
        }}
      >
        <Text
          style={{
            color: "white",
            textAlign: "center",
            fontSize: 20,
            fontWeight: "bold",
          }}
        >
          {name} {lastname}
        </Text>
        <Text
          style={{
            color: "white",
            textAlign: "center",
            fontSize: 20,
          }}
        >
          Попыток: {attempt}
        </Text>
      </View>
    </Animated.View>
  );
};
export function AwardsScreen({ switchScreen }) {
  const mainInOpacityValue = useRef(new Animated.Value(0)).current;
  const trophyValue = useRef(new Animated.Value(-200)).current;
  const dispatch = useDispatch();
  const [count, setCount] = useState(null);
  const store = configureStore();
  useEffect(() => {
    dispatch(readData());
    store.getState().post.then((item) => setCount(item.allPosts));
  }, []);
  const renderItem = ({ item }) => {
    return (
      <Item
        name={item.NAME}
        photo={item.IMG}
        attempt={item.ATTEMPT}
        lastname={item.LASTNAME}
      />
    );
  };
  const mainOpacitiAnimIn = () => {
    Animated.timing(mainInOpacityValue, {
      toValue: 1,
      duration: 700,
      useNativeDriver: false,
    }).start();
  };
  const trophyDownAnim = () => {
    Animated.timing(trophyValue, {
      toValue: 0,
      duration: 400,
      useNativeDriver: false,
    }).start();
  };
  trophyDownAnim();
  mainOpacitiAnimIn();
  function FlatListRender() {
    if (variables._keysCounter !== 0) {
      return (
        <FlatList
          style={{
            paddingTop: 10,
            overflow: "hidden",
            shadowColor: "black",
            shadowRadius: 5,
            shadowOffset: {
              width: -10,
              height: 10,
            },
            shadowOpacity: 0.5,
            padding: "1.5%",
          }}
          horizontal={false}
          numColumns={2}
          data={count}
          renderItem={renderItem}
          keyExtractor={(item) => item.ID}
        ></FlatList>
      );
    } else {
      return (
        <Text
          style={{
            top: "30%",
            width: 200,
            justifyContent: "center",
            fontFamily: "childText",
            fontSize: 28,
            color: "#B77857",
          }}
        >
          К сожалению пока никому не удалось отгадать моё число...
        </Text>
      );
    }
  }
  return (
    <Animated.View style={{ ...styles.container, opacity: mainInOpacityValue }}>
      <Animated.View style={{ ...styles.title, top: trophyValue }}>
        <View style={styles.btnBack}>
          <Ionicons
            name="md-arrow-back"
            size={34}
            color="white"
            onPress={() => switchScreen(3)}
          />
        </View>
        <View>
          <Text style={styles.titleText}>Рекордсмены</Text>
        </View>
        <View style={styles.btnUpdate}></View>
      </Animated.View>
      <FlatListRender />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "rgb(222,222,222)",
  },
  title: {
    flexDirection: "row",
    paddingHorizontal: 30,
    alignItems: "flex-end",
    color: "orange",
    textAlign: "center",
    backgroundColor: "brown",
    paddingBottom: 10,
    overflow: "hidden",
    width: "100%",
    height: "12%",
    justifyContent: "center",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  titleText: {
    color: "white",
    fontSize: 46,
    fontFamily: "childText",
  },
  btnBack: {
    position: "absolute",
    borderColor: "white",
    borderWidth: 2,
    borderRadius: 15,
    left: 11,
    bottom: 11,
  },
  btnUpdate: {
    position: "absolute",
    right: 15,
    bottom: 15,
  },
});
