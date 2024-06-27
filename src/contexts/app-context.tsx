// import useAuthStore from "@/store/auth";
// import createContext from 'zustand/context'

// import React, { useEffect, useState } from "react";
// import { User } from "@/types/types";

// type FriendState = {
//   id: string;
//   userOneId: string;
//   userTwoId: string;
//   isFriend: boolean;
// };

// interface AppState {
//   friends: User[];
//   requestFriends: User[],
//   sentFriendRequest: User[],
//   fetchApi: (userId: string) => Promise<void>;
//   updateData: (value: React.SetStateAction<AppState>) => void;
// }

// const defaultContext: AppState = {
//   friends: [],
//   requestFriends: [],
//   sentFriendRequest: [],
//   fetchApi: async () => {},
//   updateData: () => {},
// };

// export const AppContext = createContext(defaultContext);

// export default function AppContextProvider({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   console.log("context");
//   const { isAuthenticated, user } = useAuthStore();
//   const [data, updateData] = useState(defaultContext);
//   useEffect(() => {
//     if (isAuthenticated && user) {
//         fetchData(user.id);
//     }
//   }, []);

//   const fetchData = async (userId: string) => {
//     const resp = await fetch(`/api/app/${userId}`);
//     const { friends,requestFriends, sentFriendRequest }: { friends: User[],requestFriends: User[], sentFriendRequest:User[] } = await resp.json();
//     updateData({ ...data, friends,requestFriends,sentFriendRequest });
//   };
//   return (
//     <AppContext.Provider
//       value={{ friends: data.friends, fetchApi: fetchData, updateData }}
//     >
//       {children}
//     </AppContext.Provider>
//   );
// }
