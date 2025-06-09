import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { FaArrowLeft } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useCartStore } from "@/store/useCartStore";
import { FaCreditCard } from "react-icons/fa";
import { IoIosPaper } from "react-icons/io";
import { MdPix } from "react-icons/md";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const formSchema = z.object({
  username: z.string().min(2).max(50),
  adress: z.string().min(2).max(100),
  city: z.string().min(2).max(50),
  state: z.string().min(2).max(50),
  cep: z.string().min(2).max(20),
  phone: z.string().min(2).max(20),
  pagamento: z.string().min(1, "Selecione uma forma de pagamento"),
});

export const Checkout = () => {
  const [products, removeProduct] = useCartStore((state) => [
    state.products,
    state.removeProduct,
  ]);
  const [open, setOpen] = useState(false);

  console.log("Produtos no carrinho:", products);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      adress: "",
      city: "",
      state: "",
      cep: "",
      phone: "",
      pagamento: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Formulário enviado com sucesso:", values);
    setOpen(false);
    products.forEach((product) => {
      console.log(
        `Produto: ${product.title}, Preço: R$ ${product.price.toFixed(
          2
        )}, Quantidade: ${product.quantity}`
      );
    });
    if (!form.formState.isValid) {
      console.error("Formulário inválido:", form.formState.errors);
      setOpen(true);
      return;
    }
  }

  return (
    <div className="h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-5xl mx-auto mb-10">
        <div className="mt-10">
          <Button className="flex flex-row items-center justify-center gap-2">
            <Link
              to="/"
              className="flex flex-row items-center justify-center gap-2 text-white"
            >
              <FaArrowLeft />
              Voltar
            </Link>
          </Button>
        </div>
        <h1 className="text-3xl font-bold text-center mb-10 ">Checkout</h1>
        <div className="max-w-5xl mx-auto bg-white shadow-md rounded-lg p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Formulário de Entrega */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">
              Informações de Entrega
            </h2>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Nome Completo
                    </label>
                    <Input
                      type="text"
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                      placeholder="João Silva"
                      {...form.register("username")}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Endereço
                    </label>
                    <Input
                      type="text"
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                      placeholder="Rua Exemplo, 123"
                      {...form.register("adress")}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Cidade
                      </label>
                      <Input
                        type="text"
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                        placeholder="São Paulo"
                        {...form.register("city")}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Estado
                      </label>
                      <Input
                        type="text"
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                        placeholder="SP"
                        {...form.register("state")}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      CEP
                    </label>
                    <Input
                      type="text"
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                      placeholder="000-000"
                      {...form.register("cep")}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Telefone
                    </label>
                    <Input
                      type="tel"
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                      placeholder="(11) 99999-9999"
                      {...form.register("phone")}
                    />
                  </div>
                </div>

                {/* Formas de Pagamento */}
                <h2 className="text-2xl font-semibold mt-8 mb-4">
                  Forma de Pagamento
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Input
                      type="radio"
                      id="cartao"
                      value="cartao"
                      {...form.register("pagamento")}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />{" "}
                    <label
                      htmlFor="cartao"
                      className=" flex items-center gap-2 ml-2 text-sm text-gray-700"
                    >
                      Cartão de Crédito
                      <FaCreditCard />
                    </label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Input
                      type="radio"
                      id="boleto"
                      value="boleto"
                      {...form.register("pagamento")}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />

                    <label
                      htmlFor="boleto"
                      className=" flex items-center gap-2 ml-2 text-sm text-gray-700"
                    >
                      Boleto Bancário
                      <IoIosPaper />
                    </label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Input
                      type="radio"
                      id="pix"
                      value="pix"
                      {...form.register("pagamento")}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />{" "}
                    <label
                      htmlFor="pix"
                      className=" flex items-center gap-2 ml-2 text-sm text-gray-700"
                    >
                      PIX
                      <MdPix />
                    </label>
                  </div>
                </div>
                <Button
                  type="submit"
                  className="mt-6 w-full text-white py-3 rounded-md hover:bg-zinc-700 transition duration-300"
                >
                  {!open ? (
                    <AlertDialog>
                      <AlertDialogTrigger>Finalizar Compra</AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Tem alguma coisa errada!
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            Por favor, preencha todos os campos corretamente
                            antes de finalizar a compra.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogAction>Continue</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  ) : (
                    <AlertDialog>
                      <AlertDialogTrigger>Finalizar Compra</AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Compra Finalizada!
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            Obrigado por sua compra! Seu pedido foi recebido e
                            está sendo processado. Você receberá um e-mail de
                            confirmação em breve.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Fechar</AlertDialogCancel>
                          <AlertDialogAction>
                            <Link
                              to="/"
                              onClick={() =>
                                products.forEach((product) =>
                                  removeProduct(product.id)
                                )
                              }
                            >
                              Continue
                            </Link>
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  )}
                </Button>
              </form>
            </Form>
          </div>
          {/* Resumo do Pedido */}
          <div className="flex flex-col h-full">
            <h2 className="text-2xl font-semibold mb-4">Resumo do Pedido</h2>
            <div className=" py-4 flex-1 flex flex-col">
              <div className="flex flex-col text-sm mb-2 overflow-y-auto max-h-64 pr-2">
                {products.length > 0 ? (
                  products.map((product) => (
                    <div
                      key={product.id}
                      className="flex justify-between mb-2 items-center text-gray-700 hover:bg-gray-50 p-2 rounded-md transition duration-200"
                    >
                      <Link to={`/product/${product.id}`}>
                        <img
                          src={product.image}
                          alt={product.title}
                          className="w-16 h-16 object-cover mr-4"
                        />
                      </Link>
                      <span>
                        {product.title} (x{product.quantity})
                      </span>
                      <span>R$ {product.price.toFixed(2)}</span>
                    </div>
                  ))
                ) : (
                  <span className="text-gray-500">
                    Nenhum produto no carrinho
                  </span>
                )}
              </div>
              <div className="flex justify-between text-lg font-semibold mt-4">
                <span>Total</span>
                <span>
                  R${" "}
                  {products
                    .reduce(
                      (total, product) =>
                        total + product.price * product.quantity,
                      0
                    )
                    .toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
