import { create } from "zustand";
import { getAllProducts } from "@/API/getAllProducts";

export type Product = {
  id: number;
  sku?: string;
  meta?: object;
  tags?: string[];
  brand: string;
  title: string;
  price: number;
  stock: number;
  image: string;
  rating: number;
  reviews?: object[];
  category: string;
  quantity: number;
  thumbnail: string;
  description: string;
  discountPercentage: number;
  // outras propriedades opcionais
};

type CartStore = {
  products: Product[];
  initializeProducts: () => Promise<void>;
  addProduct: (product: Product) => void;
  removeProduct: (productId: number) => void;
  increaseQuantity: (productId: number) => void;
  decreaseQuantity: (productId: number) => void;
};

export const useCartStore = create<CartStore>((set, get) => ({
  products: [],

  initializeProducts: async () => {
    const response = await getAllProducts();
    // Se a API retornar { products: [...] }, use response.products
    const productsFromApi = response;

    const products = productsFromApi.map((p: any) => ({
      id: p.id,
      sku: p.sku ?? "",
      meta: p.meta ?? {},
      tags: p.tags ?? [],
      brand: p.brand,
      title: p.title,
      price: p.price,
      stock: p.stock,
      image: p.images ?? [],
      rating: p.rating,
      reviews: p.reviews ?? [],
      category: p.category,
      quantity: 1, // inicializa quantidade como 1 para o carrinho
      thumbnail: p.thumbnail,
      description: p.description,
      discountPercentage: p.discountPercentage,
    }));

    set({ products });
  },

  addProduct: (product) => {
    const products = get().products;
    const exists = products.find((p) => p.id === product.id);
    if (exists) return; // já está no carrinho

    set({ products: [...products, { ...product, quantity: 1 }] });
  },

  removeProduct: (productId) => {
    set((state) => ({
      products: state.products.filter((p) => p.id !== productId),
    }));
  },

  increaseQuantity: (productId) => {
    set((state) => ({
      products: state.products.map((p) =>
        p.id === productId ? { ...p, quantity: p.quantity + 1 } : p
      ),
    }));
  },

  decreaseQuantity: (productId) => {
    set((state) => ({
      products: state.products.map((p) =>
        p.id === productId ? { ...p, quantity: Math.max(p.quantity - 1, 1) } : p
      ),
    }));
  },
}));
