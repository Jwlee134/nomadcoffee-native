import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { MaterialTopTabScreenProps } from "@react-navigation/material-top-tabs";
import { CompositeScreenProps } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type RootNavParamList = {
  TabsNav: undefined;
  UploadNav: undefined;
};

export type TabsNavScreenProps = NativeStackScreenProps<
  RootNavParamList,
  "TabsNav"
>;

export type TabsNavParamList = {
  Home: undefined;
  Search: undefined;
  UploadNav: undefined;
  Profile: undefined;
};

export type ProfileScreenProps = CompositeScreenProps<
  BottomTabScreenProps<TabsNavParamList, "Profile">,
  NativeStackScreenProps<RootNavParamList>
>;

export type SearchScreenProps = CompositeScreenProps<
  BottomTabScreenProps<TabsNavParamList, "Search">,
  NativeStackScreenProps<RootNavParamList>
>;

export type UploadNavParamList = {
  SelectPhotoTopTabNav: undefined;
  UploadForm: { uri: string };
};

export type UploadFormScreenProps = CompositeScreenProps<
  NativeStackScreenProps<UploadNavParamList, "UploadForm">,
  NativeStackScreenProps<RootNavParamList>
>;

export type SelectPhotoTopTabNavParamList = {
  SelectPhotoStackNav: undefined;
  TakePhoto: undefined;
};

export type TakePhotoScreenProps = CompositeScreenProps<
  MaterialTopTabScreenProps<SelectPhotoTopTabNavParamList, "TakePhoto">,
  CompositeScreenProps<
    NativeStackScreenProps<UploadNavParamList>,
    NativeStackScreenProps<RootNavParamList>
  >
>;

export type SelectPhotoStackNavParamList = {
  SelectPhoto: undefined;
};

export type SelectPhotoScreenProps = CompositeScreenProps<
  NativeStackScreenProps<SelectPhotoStackNavParamList, "SelectPhoto">,
  CompositeScreenProps<
    MaterialTopTabScreenProps<SelectPhotoTopTabNavParamList>,
    CompositeScreenProps<
      NativeStackScreenProps<UploadNavParamList>,
      NativeStackScreenProps<RootNavParamList>
    >
  >
>;
