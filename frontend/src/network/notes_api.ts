import axios from "axios";
import { Note } from "../models/note";
import { User } from "../models/users";

interface AxiosConfig {
  url: string;
  method: string;
  headers?: object;
  body?: object;
}

async function fetchData(config: AxiosConfig) {
  const { url, method, headers, body } = config;
  const axiosConfig = {
    url: url,
    method: method,
    headers: headers,
    data: body,
  };
  try {
    const res = await axios.request(axiosConfig);
    return res;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      throw new Error(err.response ? err.response.data.error : err.message);
    } else {
      throw new Error("Something went wrong");
    }
  }
}

export async function getLoggedInUser(): Promise<User> {
  const response = await fetchData({ url: "/api/users", method: "get" });
  return response.data;
}

export interface SignUpCredentials {
  username: string;
  email: string;
  password: string;
}

export async function signUp(credentials: SignUpCredentials): Promise<User> {
  console.log(credentials);
  const response = await fetchData({
    url: "/api/users/signup",
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: credentials,
  });
  return response.data;
}

export interface LoginCredentials {
  username: string;
  email: string;
}

export async function logIn(credentials: LoginCredentials): Promise<User> {
  const response = await fetchData({
    url: "/api/users/login",
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: credentials,
  });
  return response.data;
}

export async function logout() {
  await fetchData({ url: "/api/users/logout", method: "post" });
}

export async function fetchNotes(): Promise<Note[]> {
  const response = await fetchData({ url: "/api/notes", method: "get" });
  return response.data;
}
export interface NoteInput {
  title: string;
  text?: string;
}

export async function createNote(note: NoteInput): Promise<Note> {
  const response = await fetchData({
    url: "/api/notes",
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: note,
  });

  return response.data;
}

export async function updateNote(
  noteId: string,
  note: NoteInput
): Promise<Note> {
  const response = await fetchData({
    url: `/api/notes/${noteId}`,
    method: "patch",
    headers: {
      "Content-Type": "application/json",
    },
    body: note,
  });
  return response.data;
}

export async function deleteNote(noteId: string) {
  await fetchData({ url: `api/notes/${noteId}`, method: "delete" });
}
