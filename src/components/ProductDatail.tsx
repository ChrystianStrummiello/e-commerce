import { getProduct } from "@/API/getProduct";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";
import { Input } from "./ui/input";
import { toast } from "sonner";
import { useCartStore } from "@/store/useCartStore";
import { TiShoppingCart } from "react-icons/ti";

export const ProductDatail = () => {
  const [productId, setProductId] = useState<{
    title: string;
    description: string;
    image: string;
    price: number;
    category: string;
    rating: {
      rate: number;
      count: number;
    };
  } | null>(null);
  const url = window.location.pathname;
  const productsCartList = useCartStore((state) => state.products);
  const setProductsCart = useCartStore((state) => state.addProduct);
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>

  useEffect(() => {
    (async function getProductID() {
      const id = url.split("/").pop();
      const data = await getProduct(id as string);
      setProductId(data as any);
    })();
  }, []);

  const addProduct = (event: any, product: any) => {
    event.preventDefault();
    if (productsCartList.find((item) => item.id === product.id)) {
      return toast.info(`${product.title}`, {
        description: "Já esta na sacola",
        action: {
          label: "Fechar",
          onClick: () => {
            // setOpen(true);
          },
        },
      });
    }

    setProductsCart(product);
    toast.success(`${product.title}`, {
      description: "Adicionado na sacola",
      action: {
        label: "Fechar",
        onClick: () => {
          // setOpen(true);
        },
      },
    });
  };

  return (
    <div className="flex flex-col items-start justify-start p-4 mt-20">
      <div className="flex items-start justify-start p-4 mt-20">
        <Button className="flex flex-row items-center justify-center gap-2">
          <Link
            to="/"
            className="flex flex-row items-center justify-center gap-2 text-white"
          >
            <FaArrowLeft />
            Voltar
          </Link>
        </Button>

        <img
          src={productId?.image}
          alt={productId?.title}
          className="w-1/4 h-auto  rounded-lg m-4 p-5"
        />
        <div className="flex flex-col  justify-between p-4 w-3/5 h-auto gap-5">
          <h1 className="text-5xl font-bold mb-2">{productId?.title}</h1>
          <h1 className="text-4xl font-bold mt-4">
            R$ {productId?.price?.toFixed(2).replace(".", ",")}
          </h1>
          <div className="flex flex-row items-center justify-between mt-4">
            <div className="flex flex-row items-center gap-2">
              <span className="text-gray-500">Categoria:</span>
              <span className="text-gray-700 font-semibold">
                {productId?.category}
              </span>
            </div>
            <div className="flex flex-row items-center gap-2">
              <span className="text-gray-500">Avaliação:</span>
              <span className="text-yellow-500 font-semibold">
                {productId?.rating?.rate}{" "}
                <span className="text-gray-500">/ 5</span>
              </span>
            </div>
          </div>
          <div className="flex flex-row items-center gap-2 mt-4">
            <span className="text-gray-500">Quantidade:</span>
            <Input
              type="number"
              defaultValue={1}
              className="border border-gray-300 rounded px-2 py-1 w-20"
              min={1}
              max={10}
            />
            <div className="w-full flex flex-row items-ends justify-end p-4">
              <Button
                onClick={(event) => addProduct(event, productId!)}
                className=" text-white px-4 py-2 rounded hover:bg-zinc-700"
              >
                Adicionar ao Carrinho
                <TiShoppingCart className="ml-2" size={25} />
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full p-4">
        <h2 className="text-2xl font-semibold mb-2">Descrição</h2>
        <p className="text-gray-700">{productId?.description}</p>
      </div>
    </div>
  );
};
