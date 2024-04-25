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
import { useState } from "react";

const mockData = [
  { id: 1, name: "Company 1" },
  { id: 2, name: "Company 2" },
  { id: 3, name: "Company 3" },
  { id: 4, name: "Company 4" },
  { id: 5, name: "Company 5" },
  { id: 6, name: "Company 6" },
  { id: 7, name: "Company 7" },
  { id: 8, name: "Company 8" },
  { id: 9, name: "Company 9" },
  { id: 10, name: "Company 10" },
  { id: 11, name: "Company 11" },
  { id: 12, name: "Company 12" },
];

const Header = () => {
  const [search, setSearch] = useState("");
  const [numResults, setNumResults] = useState(5);

  const filteredCompanies = mockData
    .filter((company) =>
      company.name.toLowerCase().includes(search.toLowerCase())
    )
    .slice(0, numResults);

  const handleLoadMore = () => {
    setNumResults(numResults + 5);
  };

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

          <div className="w-full flex-1 mx-6 justify-end  items-center space-x-4 md:block lg:space-x-6">
            <form>
              <div className="flex justify-end">
                <div className="relative w-full appearance-none bg-background shadow-none md:w-2/3 lg:w-1/3">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search companies..."
                    className="w-full appearance-none bg-background pl-8 shadow-none "
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  {search && (
                    <div className="absolute flex flex-col left-0 mt-2 w-full max-w-xl bg-white dark:bg-gray-900 rounded-md shadow-lg">
                      {filteredCompanies.map((company) => (
                        <Link
                          key={company.id}
                          href={`/companies/${company.id}`}
                          onClick={() => setSearch("")}
                        >
                          {company.name}
                        </Link>
                      ))}
                      {filteredCompanies.length < mockData.length && (
                        <Button
                          onClick={handleLoadMore}
                          type="button"
                          variant={"ghost"}
                          className="block w-full p-2 text-center hover:bg-gray-200 dark:hover:bg-gray-700"
                        >
                          Load more
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </form>
          </div>
          <div className="mr-2 flex items-center hidden md:block">
            <NotificationButton />
            <ModeToggle />
            <ProfileButton />
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
