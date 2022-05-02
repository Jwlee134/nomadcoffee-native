import {
  getCameraPermissionsAsync,
  requestCameraPermissionsAsync,
} from "expo-camera";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Alert, Image, Platform, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { Camera } from "expo-camera";
import { Ionicons } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import { useIsFocused } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as MediaLibrary from "expo-media-library";
import { TakePhotoScreenProps } from "../types/navigator";

const Container = styled.View`
  flex: 1;
`;

const Actions = styled.View`
  flex: 0.35;
  padding: 0 50px;
  align-items: center;
  justify-content: space-around;
`;

const TakePhotoBtn = styled.TouchableOpacity`
  width: 100px;
  height: 100px;
  background-color: rgba(255, 255, 255, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.8);
  border-radius: 50px;
`;

const SliderContainer = styled.View``;

const ButtonsContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  width: 100%;
`;

const ActionsContainer = styled.View`
  flex-direction: row;
`;

const CloseButton = styled.TouchableOpacity`
  position: absolute;
  left: 20px;
`;

const PhotoActions = styled(Actions)`
  flex-direction: row;
`;

const PhotoAction = styled.TouchableOpacity`
  background-color: white;
  padding: 10px 25px;
  border-radius: 4px;
`;

const PhotoActionText = styled.Text`
  font-weight: 600;
`;

const TakePhoto = ({ navigation }: TakePhotoScreenProps) => {
  const ref = useRef<Camera>(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [flashMode, setFlashMode] = useState(Camera.Constants.FlashMode.off);
  const [zoom, setZoom] = useState(0);
  const [ready, setReady] = useState(false);
  const [takenPhotoUri, setTakenPhotoUri] = useState("");
  const isFocused = useIsFocused();
  const top = useSafeAreaInsets().top;

  const getPermission = useCallback(async () => {
    const { status, canAskAgain } = await getCameraPermissionsAsync();
    if (status === "denied" && !canAskAgain) {
      Alert.alert(
        "Go to the application setting and allow permission manually."
      );
    } else if (status !== "granted") {
      await requestCameraPermissionsAsync();
      await getPermission();
    }
  }, []);

  useEffect(() => {
    getPermission();
  }, [getPermission]);

  const onCameraChange = () => {
    setType((prev) =>
      prev === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  };

  const onZoomValueChange = (value: number) => {
    setZoom(value);
  };

  const onFlashChange = () => {
    setFlashMode((prev) => {
      if (prev === Camera.Constants.FlashMode.on) {
        return Camera.Constants.FlashMode.auto;
      } else if (prev === Camera.Constants.FlashMode.off) {
        return Camera.Constants.FlashMode.on;
      }
      return Camera.Constants.FlashMode.off;
    });
  };

  const takePhoto = async () => {
    if (!ref.current || !ready) return;
    const photo = await ref.current.takePictureAsync({
      quality: 1,
      exif: true,
      skipProcessing: true,
    });
    setTakenPhotoUri(photo.uri);
  };

  const onDismiss = () => setTakenPhotoUri("");

  const goToUpload = async (save: boolean) => {
    if (save) {
      await MediaLibrary.saveToLibraryAsync(takenPhotoUri);
    }
    navigation.navigate("UploadForm", { file: takenPhotoUri });
  };

  const onUpload = () => {
    Alert.alert("Do you want to save it?", "Save & upload or just upload it.", [
      { text: "yes", onPress: () => goToUpload(true) },
      { text: "no", onPress: () => goToUpload(false) },
    ]);
  };

  return (
    <Container>
      {takenPhotoUri ? (
        <Image source={{ uri: takenPhotoUri }} style={{ flex: 1 }} />
      ) : (
        isFocused && (
          <Camera
            ref={ref}
            type={type}
            zoom={zoom}
            flashMode={flashMode}
            onCameraReady={() => setReady(true)}
            style={{ flex: 1 }}
          >
            <CloseButton
              onPress={() => navigation.navigate("TabsNav")}
              style={{ top: Platform.OS === "android" ? top : 0 }}
            >
              <Ionicons name="close" color="white" size={30} />
            </CloseButton>
          </Camera>
        )
      )}

      {takenPhotoUri ? (
        <PhotoActions>
          <PhotoAction onPress={onDismiss}>
            <PhotoActionText>Dismiss</PhotoActionText>
          </PhotoAction>
          <PhotoAction onPress={onUpload}>
            <PhotoActionText>Upload</PhotoActionText>
          </PhotoAction>
        </PhotoActions>
      ) : (
        <Actions>
          <SliderContainer>
            <Slider
              style={{ width: 200, height: 40 }}
              minimumValue={0}
              maximumValue={1}
              minimumTrackTintColor="#FFFFFF"
              maximumTrackTintColor="rgba(255, 255, 255, 0.5)"
              onValueChange={onZoomValueChange}
            />
          </SliderContainer>
          <ButtonsContainer>
            <TakePhotoBtn onPress={takePhoto} />
            <ActionsContainer>
              <TouchableOpacity
                onPress={onFlashChange}
                style={{ marginRight: 30 }}
              >
                <Ionicons
                  color="white"
                  size={30}
                  name={
                    flashMode === Camera.Constants.FlashMode.off
                      ? "flash-off"
                      : flashMode === Camera.Constants.FlashMode.on
                      ? "flash"
                      : "eye"
                  }
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={onCameraChange}>
                <Ionicons color="white" size={30} name="camera-reverse" />
              </TouchableOpacity>
            </ActionsContainer>
          </ButtonsContainer>
        </Actions>
      )}
    </Container>
  );
};

export default TakePhoto;
