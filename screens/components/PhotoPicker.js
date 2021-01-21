import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Alert,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import { MaterialIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

async function askForPermissions() {
  const { status } = await Permissions.askAsync(Permissions.CAMERA);
  if (status !== "granted") {
    Alert.alert("Ошибка", "Вы не дали прав на создание фото");
    return false;
  }
  return true;
}

export const PhotoPicker = ( {onPick}) => {
  const [image, setImage] = useState(null);

  const takePhoto = async () => {
    const hasPermissions = await askForPermissions();

    if (!hasPermissions) {
      return;
    }

    const img = await ImagePicker.launchCameraAsync({
      quality: 0.7,
      allowsEditing: false,
      aspect: [16, 9],
    });

          setImage(img.uri);
          onPick(img.uri)
  };
  if (!image) {
    return (
      <View style={{ ...styles.photo, opacity: 0.7 }}>
        <TouchableOpacity onPress={takePhoto}>
          <MaterialIcons name="add-a-photo" size={60} color="#FDD9B5" />
        </TouchableOpacity>
      </View>
    );
        }
  return (
    <View style={styles.photo}>
      {image && (
        <ImageBackground style={styles.image} source={{ uri: image }}>
          <Feather
            style={{ top: 10, right: 10 }}
            name="repeat"
            size={24}
            color="#FDD9B5"
            onPress={takePhoto}
          />
        </ImageBackground>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 10,
  },
  image: {
    width: 164,
    height: 164,
    alignItems: "flex-end",
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
});
