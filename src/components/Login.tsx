import { useState } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "./ui/input-otp";
import {
  Copy,
  CopyCheck,
  Loader2,
  SendHorizonal,
  Smartphone,
  SquareCheckBig,
} from "lucide-react";
import { sendSMS } from "@/API/PostSMS";
import { Link } from "react-router-dom";

export const Login = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [codValid, setCodValid] = useState<string>("");
  const [phone, setPhone] = useState<number>(0);
  const [phoneInvalid, setPhoneInvalid] = useState<boolean>(false);
  const [loadingValid, setLoadingValid] = useState<boolean>(false);
  const [codError, setCodError] = useState<boolean>(false);
  const [codigo, setCodigo] = useState<string>("");
  const [copy, setCopy] = useState<boolean>(false);

  const copyCode = () => {
    navigator.clipboard.writeText(codigo);
    setCopy(true);
  };
  const handleSend = async () => {
    const codigo = Math.floor(100000 + Math.random() * 900000);
    setCodigo(codigo.toString());

    const validPhone =
      /^\+?\d{1,3}?[- .]?\(?(?:\d{2,3})\)?[- .]?\d\d\d[- .]?\d\d\d\d$/.test(
        phone.toString()
      );

    if (validPhone) {
      setOpen(true);

      await sendSMS(String(phone), String(codigo))
        .then((res) => {
          console.log("res: ", res);
        })
        .catch((err) => console.log("err: ", err));
    }

    if (!validPhone) {
      setPhoneInvalid(true);
    }
  };

  const handleValidCod = () => {
    setLoadingValid(true);
    setTimeout(() => {
      if (codValid.length === 6 && codValid === codigo) {
        setLoadingValid(false);
        setCodError(false);
      } else {
        setLoadingValid(false);
        setCodError(true);
      }
    }, 2000);
  };
  return (
    <div className="flex flex-row items-center justify-between w-full h-full">
      <div className="= w-1/2 h-svh flex items-center justify-center">
        <img
          src="src/assets/capa2.jpg"
          alt=""
          className="h-full w-full cover"
        />
      </div>
      <Card className="w-full max-w-sm  mx-36 rounded-none border-0 shadow-none ">
        <CardHeader className=" flex flex-col items-start">
          <CardTitle>Login</CardTitle>
          <CardDescription>Digite seu telefone abaixo</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 rounded-none border-0">
          <div className="flex flex-row items-center border border-input px-3 rounded">
            <Smartphone className=" h-4 w-4 text-muted-foreground" />
            <Input
              type="phone"
              autoComplete="phone"
              name="phone"
              id="phone"
              value={phone || ""}
              placeholder="Telefone"
              onChange={(e) => setPhone(Number(e.target.value))}
              required
              className="w-full flex-1 sm:text-sm focus-visible:ring-0 focus-visible:ring-offset-0 border-0"
            />
          </div>
          {phoneInvalid && (
            <p className="text-xs px-1 py-1 text-red-500">Telefone invalido</p>
          )}
        </CardContent>
        <CardFooter className="flex flex-col items-start rounded-none border-0">
          <AlertDialog open={open}>
            <AlertDialogTrigger asChild>
              <Button onClick={handleSend} variant="ghost">
                Enviar codigo
                <SendHorizonal className="ml-2 h-4 w-4 text-muted-foreground" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className=" w-90 flex flex-col items-center gap-5">
              <AlertDialogHeader className=" flex flex-col items-center">
                <AlertDialogTitle className="flex flex-row items-center gap-2">
                  Enviado{" "}
                  <SquareCheckBig className="mr-2 h-4 w-4 text-muted-foreground" />
                </AlertDialogTitle>
                <AlertDialogDescription className="">
                  {`Por favor, digite o código "${codigo}"`}{" "}
                  <Button variant="link" onClick={copyCode} className="p-0 m-0">
                    {copy ? (
                      <CopyCheck
                        size={16}
                        className=" ml-2 text-muted-foreground"
                      />
                    ) : (
                      <Copy size={16} className=" ml-2 text-muted-foreground" />
                    )}
                  </Button>
                </AlertDialogDescription>
              </AlertDialogHeader>
              <InputOTP
                onChange={(e) => {
                  setCodValid(e);
                }}
                minLength={6}
                maxLength={6}
                value={codValid}
              >
                <InputOTPGroup>
                  <InputOTPSlot
                    className={
                      codError && !loadingValid
                        ? "border-red-500 text-red-500"
                        : ""
                    }
                    key={0}
                    index={0}
                  />
                  <InputOTPSlot
                    className={
                      codError && !loadingValid
                        ? "border-red-500 text-red-500"
                        : ""
                    }
                    key={1}
                    index={1}
                  />
                  <InputOTPSlot
                    className={
                      codError && !loadingValid
                        ? "border-red-500 text-red-500"
                        : ""
                    }
                    key={2}
                    index={2}
                  />
                </InputOTPGroup>
                <InputOTPSeparator
                  className={
                    codError && !loadingValid
                      ? "border-red-500 text-red-500"
                      : ""
                  }
                />
                <InputOTPGroup>
                  <InputOTPSlot
                    className={
                      codError && !loadingValid
                        ? "border-red-500 text-red-500"
                        : ""
                    }
                    key={3}
                    index={3}
                  />
                  <InputOTPSlot
                    className={
                      codError && !loadingValid
                        ? "border-red-500 text-red-500"
                        : ""
                    }
                    key={4}
                    index={4}
                  />
                  <InputOTPSlot
                    className={
                      codError && !loadingValid
                        ? "border-red-500 text-red-500"
                        : ""
                    }
                    key={5}
                    index={5}
                  />
                </InputOTPGroup>
              </InputOTP>
              <AlertDialogDescription className="text-center text-xs">
                Por favor, digite a senha de uso único enviada para o seu
                telefone.
                <p className=" text-xs px-0 py-1 text-zinc-900">{phone}</p>
              </AlertDialogDescription>

              <AlertDialogFooter className="flex flex-row items-center">
                <Button
                  disabled={codValid.length < 6}
                  onClick={() => {
                    handleValidCod();
                  }}
                  variant="ghost"
                  className="flex flex-row items-center gap-2"
                >
                  {!loadingValid && <Link to="/">Validar</Link>}
                  {loadingValid && (
                    <Loader2 className=" h-6 w-6 animate-spin" />
                  )}
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardFooter>
      </Card>
    </div>
  );
};
