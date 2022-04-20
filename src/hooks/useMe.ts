import { useReactiveVar } from "@apollo/client";
import { useEffect } from "react";
import { tokenVar } from "../apollo/vars";
import { useMeQuery } from "../graphql/generated";
import { logUserOut } from "../libs/auth";

export default function useMe() {
  const token = useReactiveVar(tokenVar);
  const { data: { me } = {} } = useMeQuery();

  useEffect(() => {
    if (!token) {
      logUserOut();
    }
  }, [token]);

  return me;
}
