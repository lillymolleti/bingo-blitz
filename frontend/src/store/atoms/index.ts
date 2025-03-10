import { atom } from "recoil";
import { User } from "../../types";

const storedUser = localStorage.getItem("user");

export const userAtom = atom<User | null>({
    key: "User",
    default: storedUser ? JSON.parse(storedUser) : null
});

export const tokenAtom = atom<string | null>({
    key: "Token",
    default: localStorage.getItem("token") || null,
});

export const loaderAtom = atom<boolean>({
    key: "Loading",
    default: false, // Set to false initially
});
