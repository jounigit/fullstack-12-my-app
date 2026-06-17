import { getUsers, getUser } from "@service/users";
import useSWR from "swr";

export function useUsers() {
  const { data: users } = useSWR("/api/users", getUsers, { suspense: true });
    // console.log("useUsers - users:", users );
  return {
    users,
  };
}

export function useUser(id: number) {
  const { data: user } = useSWR(`/api/users/${id}`, () => getUser(id), { suspense: true });

  return {
    user,
  };
}


