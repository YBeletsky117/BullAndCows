import { LOAD_POSTS, DOWNLOAD_DATA } from "../types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import variables from "../../screens/components/_attemptCounter";

const initialState = {
  allPosts: [],
};

export const postReducer = async (state = initialState, action) => {
  if (action.type === DOWNLOAD_DATA) {
    for (let i = 1; i <= variables._keysCounter; i++) {
      let CARD = {};
      let keys = {
        keyImgSrc: `IMG${i}`,
        keyAttempt: `AT${i}`,
        keyId: `ID${i}`,
        keyName: `NAME${i}`,
        keyLastName: `LASTNAME${i}`,
      };
      CARD.IMG = await AsyncStorage.getItem(keys.keyImgSrc);
      CARD.ATTEMPT = await AsyncStorage.getItem(keys.keyAttempt);
      CARD.ID = await AsyncStorage.getItem(keys.keyId);
      CARD.NAME = await AsyncStorage.getItem(keys.keyName);
      CARD.LASTNAME = await AsyncStorage.getItem(keys.keyLastName);
      state.then((state) => (state.allPosts[i-1] = CARD));
    }
    return state;
  }
  return state;
};
