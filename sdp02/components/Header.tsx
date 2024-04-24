import Link from "next/link";
import Container from "./ui/container";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Menu, Moon, ShoppingCart, Sun, Bell, Search } from "lucide-react";
import { Input } from "./ui/input";

import ModeToggle from "./ModeToggle";
import Image from "next/image";
import { ProfileButton } from "./ProfileButton";
import { NotificationButton } from "./NotificationButton";
import { Separator } from "./ui/separator";

const Header = () => {
  const routes = [
    {
      href: "/orders",
      label: "My Orders",
    },
    {
      href: "/profile",
      label: "Profile",
    },
    {
      href: "/notifications",
      label: "Notifications",
    },
  ];

  return (
    <header className="border-b px-4 py-3 sm:flex sm:justify-between">
      <link rel="shortcut icon" href="favicon.png" type="image/x-icon" />
      <Container>
        <div className="relative flex h-16 w-full items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center">
            <Sheet>
              <SheetTrigger>
                <Menu className="h-6 w-6 md:hidden" />
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col gap-4">
                  {routes.map((route, i) => (
                    <Link
                      key={i}
                      href={route.href}
                      className="block px-2 py-1 text-lg"
                    >
                      {route.label}
                    </Link>
                  ))}
                  <Separator />
                  <Link
                    href="/"
                    /*onClick={handleLogout} */
                    className="block px-2 py-1 text-lg "
                  >
                    Logout
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
            <Link href="/" className="ml-4 lg:ml-0">
              <Image
                src="/Delaware-logo.svg.png"
                width={100}
                height={100}
                className=""
                alt="delaware logo"
              />
              {/*                <h1 className="text-xl font-bold">delaware</h1>
               */}{" "}
            </Link>
          </div>

          <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
            <form className="ml-auto flex-1 sm:flex-initial">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search company..."
                  className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
                />
              </div>
            </form>
            <div className="mr-2 flex items-center hidden md:block">
              <NotificationButton />
              <ModeToggle />
              <ProfileButton />
            </div>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
