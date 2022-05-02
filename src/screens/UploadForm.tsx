import { ReactNativeFile } from "apollo-upload-client";
import { useLayoutEffect } from "react";
import { useForm } from "react-hook-form";
import {
  ActivityIndicator,
  Image,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import styled from "styled-components/native";
import Input from "../components/Input";
import Text from "../components/Text";
import {
  SeeCoffeeShopsDocument,
  useCreateCoffeeShopMutation,
} from "../graphql/generated";
import { UploadFormScreenProps } from "../types/navigator";

const InputContainer = styled.View`
  padding: 10px;
`;

interface Form {
  name: string;
  latitude: string;
  longitude: string;
  category: string;
}

export default function UploadForm({
  navigation,
  route: {
    params: { uri },
  },
}: UploadFormScreenProps) {
  const [upload, { loading }] = useCreateCoffeeShopMutation({
    refetchQueries: [{ query: SeeCoffeeShopsDocument }],
    onCompleted: ({ createCoffeeShop }) => {
      if (createCoffeeShop?.ok) {
        navigation.navigate("TabsNav");
      }
    },
  });
  const { control, handleSubmit } = useForm<Form>();
  const { width } = useWindowDimensions();

  const onValid = (data: Form) => {
    const newFile = new ReactNativeFile({
      uri,
      name: "a.jpg",
      type: "image/jpeg",
    });
    upload({
      variables: {
        photos: newFile,
        ...data,
        categories: data.category
          .split(",")
          .map((word) => word.trimStart().trimEnd()),
      },
    });
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () =>
        loading ? null : (
          <TouchableOpacity onPress={navigation.goBack}>
            <Text>Back</Text>
          </TouchableOpacity>
        ),
      headerRight: () =>
        loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <TouchableOpacity onPress={handleSubmit(onValid)}>
            <Text>Upload</Text>
          </TouchableOpacity>
        ),
    });
  }, [navigation, loading]);

  return (
    <KeyboardAwareScrollView
      style={{ backgroundColor: "black" }}
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps="handled"
    >
      <Image style={{ width, height: width }} source={{ uri }} />
      <InputContainer>
        <Input
          control={control}
          rules={{ required: "Name is required." }}
          name="name"
          placeholder="Name"
        />
        <Input
          control={control}
          rules={{ required: "Latitude is required." }}
          name="latitude"
          placeholder="Latitude"
        />
        <Input
          control={control}
          rules={{ required: "Longitude is required." }}
          name="longitude"
          placeholder="Longitude"
        />
        <Input
          control={control}
          rules={{ required: "Category is required." }}
          name="category"
          placeholder="Category (use , to write multiple categories down)"
          returnKeyType="done"
          onSubmitEditing={handleSubmit(onValid)}
        />
      </InputContainer>
    </KeyboardAwareScrollView>
  );
}
