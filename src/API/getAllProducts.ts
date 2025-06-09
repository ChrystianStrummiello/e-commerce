import axios from "axios";

// Defina a interface do produto conforme o retorno esperado da API
interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  image: string;
}

const dummyJsonApi = "https://fakestoreapi.com/products";

export const getAllProducts = async (): Promise<Product[]> => {
  try {
    const response = await axios.get(dummyJsonApi);
    return response.data;
  } catch (error: any) {
    // Aqui você pode melhorar o tratamento do erro conforme o que a API retorna
    throw new Error(error.response?.data?.message || error.message);
  }
};
