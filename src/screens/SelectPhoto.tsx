import {
  Alert,
  FlatList,
  Image,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as MediaLibrary from "expo-media-library";
import { useEffect, useLayoutEffect, useState } from "react";
import styled from "styled-components/native";
import { SelectPhotoScreenProps } from "../types/navigator";
import Text from "../components/Text";

const CheckBox = styled.View`
  position: absolute;
  right: 5px;
  bottom: 5px;
`;

export default function SelectPhoto({ navigation }: SelectPhotoScreenProps) {
  const { width } = useWindowDimensions();
  const [photos, setPhotos] = useState<MediaLibrary.Asset[]>([]);
  const [selectedPhoto, setSelectedPhoto] = useState<MediaLibrary.Asset | null>(
    null
  );

  const getPhotos = async () => {
    const { assets } = await MediaLibrary.getAssetsAsync();
    if (assets.length) {
      setSelectedPhoto(assets[0]);
    }
    setPhotos(assets);
  };

  const permissionHandler = async () => {
    const { status, canAskAgain } = await MediaLibrary.getPermissionsAsync();
    if (status === "granted") {
      await getPhotos();
    } else if (status === "denied" && !canAskAgain) {
      Alert.alert("PERMISSION DENIED", "Go to Settings and allow it manually.");
    } else {
      await MediaLibrary.requestPermissionsAsync();
      await permissionHandler();
    }
  };

  useEffect(() => {
    permissionHandler();
  }, []);

  const onNext = async () => {
    const { localUri } = await MediaLibrary.getAssetInfoAsync(selectedPhoto!);
    navigation.navigate("UploadForm", { uri: localUri! });
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={onNext}>
          <Text>Next</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation, selectedPhoto]);

  const select = (item: MediaLibrary.Asset) => {
    setSelectedPhoto(item);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "black" }}>
      <Image
        style={{ width, height: width, marginBottom: 2 }}
        source={{ uri: selectedPhoto?.uri }}
      />
      <FlatList
        numColumns={3}
        data={photos}
        renderItem={({ item, index }) => (
          <TouchableOpacity onPress={() => select(item)}>
            <Image
              style={{
                width: width / 3 - 4 / 3,
                height: width / 3 - 4 / 3,
                marginRight: index % 3 === 2 ? 0 : 2,
                marginBottom: index % 3 === 2 ? 0 : 2,
              }}
              source={{ uri: item.uri }}
            />
            <CheckBox>
              <Ionicons
                name="checkmark-circle"
                color={
                  selectedPhoto?.id === item.id
                    ? "white"
                    : "rgba(255, 255, 255, 0.5)"
                }
                size={26}
              />
            </CheckBox>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}
