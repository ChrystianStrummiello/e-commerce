import {
  Footprints,
  Minus,
  Plus,
  Search,
  Shirt,
  ShoppingBag,
  Store,
  Trash2,
  UserRound,
  Watch,
} from "lucide-react";
// import { ModeToggle } from "./mode-toggle";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useCartStore } from "@/store/useCartStore";
import { Separator } from "./ui/separator";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { useState } from "react";
import { Badge } from "./ui/badge";
import { Link } from "react-router-dom";

// interface HeaderProps {
//   open: boolean;
//   setOpen: (open: boolean) => void;
// }

export const Header = () => {
  const [open, setOpen] = useState(false);
  const [products, removeProduct, addQuantity, removeQuantity] = useCartStore(
    (state) => [
      state.products,
      state.removeProduct,
      state.increaseQuantity,
      state.decreaseQuantity,
    ]
  );

  const sum = products.reduce((acc, product) => acc + product.price, 0);

  return (
    <div className="flex flex-row w-full items-center justify-between p-4 gap-4 shadow-md dark:shadow-zinc-900  fixed z-50 top-0 bg-background">
      <h1 className="text-xl italic font-bold text-center uppercase">
        <Link
          to="/"
          className="hover:cursor-pointer flex flex-row gap-2 items-center"
        >
          Thunder Store
        </Link>
      </h1>
      <NavigationMenu className="flex flex-row gap-4 z-50">
        <NavigationMenuList className="flex flex-row gap-4">
          <NavigationMenuItem className="z-50">
            <NavigationMenuTrigger className="flex flex-row gap-2">
              Marcas
              <Store size={16} strokeWidth={1} />
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[500px] gap-5 p-5 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                {Array.from({ length: 10 }).map((_, i) => (
                  <li
                    key={i}
                    className="text-sm hover:underline hover:cursor-pointer"
                  >
                    <a className="flex flex-row gap-2">Marcas</a>
                  </li>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem className="z-50">
            <NavigationMenuTrigger className="flex flex-row gap-2">
              Tênis
              <Footprints size={16} strokeWidth={1} />
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[500px] gap-5 p-5 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                {Array.from({ length: 10 }).map((_, i) => (
                  <li
                    key={i}
                    className="text-sm hover:underline hover:cursor-pointer"
                  >
                    <a className="flex flex-row gap-2">Tênis</a>
                  </li>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem className="z-50">
            <NavigationMenuTrigger className="flex flex-row gap-2">
              Roupas
              <Shirt size={16} strokeWidth={1} />
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-5 p-5 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                {Array.from({ length: 10 }).map((_, i) => (
                  <a
                    key={i}
                    className="text-sm hover:underline hover:cursor-pointer"
                  >
                    Roupas
                  </a>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem className="z-50">
            <NavigationMenuTrigger className="flex flex-row gap-2">
              Acessórios
              <Watch size={16} strokeWidth={1} />
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-5 p-5 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                {Array.from({ length: 10 }).map((_, i) => (
                  <li
                    key={i}
                    className="text-sm hover:underline hover:cursor-pointer"
                  >
                    <a className="flex flex-row gap-2">Acessórios</a>
                  </li>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      <div className="flex flex-row items-center border border-input px-3 rounded">
        <Search strokeWidth={2} className=" h-4 w-4" />
        <Input
          type="search"
          autoComplete="search"
          name="search"
          id="search"
          placeholder="Buscar produtos"
          required
          className="flex-1 sm:text-sm focus-visible:ring-0 focus-visible:ring-offset-0 border-0 text-sm"
        />
      </div>
      <div className="flex flex-row items-center gap-6">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <UserRound strokeWidth={1} className="h-6 w-6" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Minha conta</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Perfil</DropdownMenuItem>
            <DropdownMenuItem>
              <Link to="/">Sair</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Sheet defaultOpen={false} open={open} onOpenChange={setOpen}>
          <SheetTrigger className="flex flex-row items-center gap-2 ">
            <ShoppingBag strokeWidth={1} className="h-6 w-6" />
            <Badge
              variant="default"
              className="w-6 h-6 rounded-full border-0 flex items-center justify-center"
            >
              {products.length}
            </Badge>
          </SheetTrigger>
          <SheetContent className="flex flex-col items-center justify-between gap-2 w-full h-full">
            <SheetHeader>
              <SheetTitle className="text-center text-2xl">Sacola </SheetTitle>
            </SheetHeader>
            <div className="flex flex-col items-center justify-center w-full h-5/6 ">
              <ScrollArea className="w-full h-screen rounded-md border overflow-auto">
                <div className="p-2">
                  {products.length > 0 &&
                    products.map((product) => (
                      <div key={product.id} className="py-2 ">
                        <div className="flex flex-row items-center justify-between w-full gap-2">
                          <Link to={`/product/${product.id}`}>
                            <img
                              src={product.image}
                              alt={product.image}
                              className="w-20 h-20 rounded-md object-cover"
                            />
                          </Link>
                          <div className="flex flex-col items-center justify-between w-full py-1 gap-2 overscroll-container">
                            <div className="flex flex-col items-center justify-between w-full gap-2">
                              <div className="flex flex-row items-center justify-between w-full gap-2">
                                <p className="text-sm">{product.title}</p>
                                <Trash2
                                  onClick={() => removeProduct(product.id)}
                                  strokeWidth={2}
                                  className="w-4 h-4 hover:text-red-600 hover:cursor-pointer"
                                />
                              </div>

                              <div className="flex flex-row items-center justify-start w-full gap-2">
                                <p className="text-sm">Valor</p>
                                <p className="text-sm">R$ {product.price}</p>
                              </div>

                              <div className="flex flex-row items-center justify-start w-full gap-2">
                                <Button
                                  variant="outline"
                                  size="icon"
                                  disabled={product.quantity === 1}
                                  className="w-6 h-5 border-0  hover:cursor-pointer hover:text-red-600 hover:bg-transparent "
                                  onClick={() => {
                                    removeQuantity(product.id);
                                  }}
                                >
                                  <Minus strokeWidth={2} size={16} />
                                </Button>
                                <p className="text-sm text-center w-full ">
                                  {product.quantity}
                                </p>
                                <Button
                                  variant="outline"
                                  disabled={product.quantity === product.stock}
                                  size="icon"
                                  className="w-6 h-5 border-0  hover:cursor-pointer hover:text-green-600 hover:bg-transparent "
                                  onClick={() => {
                                    addQuantity(product.id);
                                  }}
                                >
                                  <Plus strokeWidth={2} size={16} />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                        <Separator className="w-full mt-4" />
                      </div>
                    ))}
                  {products.length === 0 && (
                    <div className="flex flex-col items-center justify-between w-full gap-2 py-40">
                      <ShoppingBag size={48} strokeWidth={1} />
                      <p className="text-sm">Nenhum item na sacola</p>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </div>
            <SheetFooter className="flex flex-col items-center w-full">
              <div className="flex flex-col items-between w-full gap-2">
                <SheetClose className="w-full">
                  <Button
                    type="submit"
                    variant="default"
                    size="lg"
                    className="flex  w-full justify-between"
                  >
                    <Link
                      to={"Checkout"}
                      className="flex flex-row items-center justify-between w-full"
                    >
                      Finalizar compra
                      <div className="">R$ {sum.toFixed(2)}</div>
                    </Link>
                  </Button>
                  <Button
                    type="submit"
                    variant="link"
                    size="sm"
                    className="w-full text-muted-foreground"
                    onClick={() => console.log("clicked")}
                  >
                    Continuar comprando
                  </Button>
                </SheetClose>
              </div>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};
