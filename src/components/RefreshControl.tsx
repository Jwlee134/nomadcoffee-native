import { RefreshControl as Control } from "react-native";

interface Props {
  refreshing: boolean;
  onRefresh: () => void;
}

export default function RefreshControl({ refreshing, onRefresh }: Props) {
  return (
    <Control refreshing={refreshing} onRefresh={onRefresh} tintColor="white" />
  );
}
