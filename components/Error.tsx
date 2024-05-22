import { isAxiosError } from "axios";
import { useRouter } from "next/router";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
} from "./ui/alert-dialog";

interface ErrorProps {
  error: typeof isAxiosError;
}

export default function Error({ error }: ErrorProps) {
  const router = useRouter();
  const path = process.env.NEXT_PUBLIC_SITE
    ? process.env.NEXT_PUBLIC_SITE
    : "http://localhost:3000";

  const loginPath = `/login?redirect=${router.asPath}`;
  const registerPath = `/register?redirect=${router.asPath}`;

  const handleLogin = () => {
    router.replace(loginPath);
  };

  const handleRegister = () => {
    router.replace(registerPath);
  };
  if (
    isAxiosError(error) &&
    error.response?.data.statusCode === 401 &&
    !router.pathname.includes("/login")
  ) {
    return (
      <AlertDialog defaultOpen>
        <AlertDialogContent>
          <div className="container flex max-w-2xl flex-col gap-y-4">
            <AlertDialogHeader>Your session has expired</AlertDialogHeader>
            <AlertDialogDescription></AlertDialogDescription>
            <AlertDialogFooter>
              <AlertDialogAction className="" onClick={handleRegister}>
                I don`t have an account
              </AlertDialogAction>
              <AlertDialogAction onClick={handleLogin}>
                Go to sign in
              </AlertDialogAction>
            </AlertDialogFooter>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    );
  } else if (isAxiosError(error)) {
    return (
      <div
        data-cy="error"
        className="flex flex-col items-center text-xl font-semibold text-red-500"
      >
        <p text-lg>{error.response?.data.message}</p>
      </div>
    );
  } else {
    return null;
  }
}
