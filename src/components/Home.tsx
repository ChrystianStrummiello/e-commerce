// import { getAllProducts } from "@/API/getAllProducts";
import { getPhotos } from "@/API/getPhotos";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { ShoppingBag } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { toast } from "sonner";
import { Skeleton } from "./ui/skeleton";
import { getAllProducts } from "@/API/getAllProducts";
import { Product } from "@/types/Products";
import { Header } from "./Header";
import { Link } from "react-router-dom";

export const Home = () => {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const [products, setProducts] = useState<any[]>([]);
  const [productsCartListTwo, setProductsCartListTwo] = useState<Product[]>([]);
  const [productsCart, setProductsCart, productsCartList] = useCartStore(
    (state) => [state.products, state.addProduct, state.products]
  );
  console.log(productsCart);

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
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

  useEffect(() => {
    (async function getProductsData() {
      const data = await getAllProducts();
      setProductsCartListTwo(data as any);
    })();
    (async function getPhotosData() {
      const data = await getPhotos();
      const newArr: string[] = [];
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      data.map((photo: any) => newArr.push(photo.urls.regular));

      setProducts(data);
    })();
  }, []);

  return (
    <div className="flex flex-col items-center gap-8 p-20 w-full">
      <Carousel>
        <CarouselContent className="w-full h-96 ">
          {products.map((product, i) => (
            <CarouselItem key={i}>
              <img
                src={product.urls.regular}
                alt=""
                className="w-full h-full object-cover"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6">
        {productsCartListTwo.map((product) => (
          <Card
            key={product.id}
            className=" flex flex-col justify-between rounded-none border-0 shadow-none hover:shadow-2xl hover:scale-105  hover:shadow-zinc-500"
          >
            <CardContent className="p-0 h-48 pt-0 border-0">
              {!product.image ? (
                <Skeleton className="object-cover h-[125px] w-[250px] rounded-xl" />
              ) : (
                <Link to={`/product/${product.id}`}>
                  <img
                    src={product.image}
                    alt={product.image}
                    className="w-full h-full object-cover hover:shadow-border-2xl hover:shadow-zinc-900
                  rounded-none border-0"
                  />
                </Link>
              )}
            </CardContent>
            <CardHeader className="pt-3 pb-3 items-center rounded-none border-0">
              <CardTitle className="text-1xl">{product.title}</CardTitle>
            </CardHeader>
            <Separator />

            <CardFooter className="pt-3 pb-3 flex flex-col items-center justify-center rounded-none border-0">
              R$ {product.price}
              {/* <CardDescription className="text-1xl text-center border-0 ">
                {product.description}
              </CardDescription> */}
            </CardFooter>

            <Button
              onClick={(event) => addProduct(event, product)}
              variant="outline"
              size="lg"
              className="flex flex-row items-center justify-center p-2 border-0  rounded-none hover:rounded-none hover:bg-zinc-900 hover:text-zinc-50"
            >
              COMPRAR
              <ShoppingBag strokeWidth={2} className=" flex ml-2" size={20} />
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
};
