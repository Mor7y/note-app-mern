import axios from "axios";
import { Note } from "../models/note";

interface AxiosConfig {
  url: string;
  method: string;
  headers?: string;
  body?: string;
}

async function fetchData(config: AxiosConfig) {
  try {
    const { url, method, headers, body } = config;
    const axiosConfig = {
      url: url,
      method: method,
      headers: {
        "Content-Type": headers,
      },
      body: body,
    };
    const res = await axios.request(axiosConfig);
    console.log(axios);
    return res;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      throw new Error(err.response ? err.response.data.error : err.message);
    } else {
      throw new Error("Something went wrong");
    }
  }
}

export async function fetchNotes(): Promise<Note[]> {
  const response = await fetchData({ url: "/api/notes", method: "get" });
  return response.data;
}
export interface NoteInput {
  title: string;
  text?: string;
}

export async function createNote(note: NoteInput): Promise<Note[]> {
  const response = await fetchData({
    url: "/api/notes",
    method: "post",
    headers: "application/json",
    body: JSON.stringify(note),
  });
  return response.data;
}
