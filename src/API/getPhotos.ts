import axios from "axios";

const url =
  "https://api.unsplash.com/photos/?client_id=ScKFaW0RSekUHaPWpyhotEbBVRQNreryeaQvJgsgN0s";

// Defina a interface da foto (exemplo básico, adapte conforme a API do Unsplash)
interface Photo {
  id: string;
  created_at: string;
  width: number;
  height: number;
  color: string;
  description: string | null;
  alt_description: string | null;
  urls: {
    raw: string;
    full: string;
    regular: string;
    small: string;
    thumb: string;
  };
  user: {
    id: string;
    username: string;
    name: string;
  };
  // ...adicione outros campos que precisar
}

export const getPhotos = async (): Promise<Photo[]> => {
  try {
    const response = await axios.get<Photo[]>(url);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
  }
};
