import { DOWNLOAD_DATA } from "../types";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const readData = () => {
  
    return {
      type: DOWNLOAD_DATA,
    };
  
};
