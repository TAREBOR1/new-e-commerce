import { HousePlug, LogOut, Menu, ShoppingCart, UserCog } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";
import { ShoppingViewHeaderMenuItems } from "@/config";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { useDispatch } from "react-redux";
import { logoutUser } from "@/redux/authSlice";
import { toast } from "sonner";
import CartWrapper from "./CartWrapper";
import { getCart } from "@/redux/shop/cartSlice";
import { Label } from "../ui/label";

const MenuItem = () => {
  const navigate=useNavigate()
  const location=useLocation()
  const [searchParams,setSearchParams]=useSearchParams()
  const handleNavigateTolistingPage=(getCurrentMenuItem)=>{
    sessionStorage.removeItem('filters')
    const currentFilter= getCurrentMenuItem.id !== "home" && getCurrentMenuItem.id !=="search" && getCurrentMenuItem.id !=="products" ? {
      category:[getCurrentMenuItem.id]
    }:null;
    sessionStorage.setItem('filters',JSON.stringify(currentFilter))
    location.pathname.includes('listing') && currentFilter !==null ? setSearchParams(new URLSearchParams(`?category=${getCurrentMenuItem.id}`)) :navigate(getCurrentMenuItem.path)
  }
  return (
    <nav className="flex flex-col lg:mb-0 mb-3 lg-items-center gap-6 lg:flex-row">
      {ShoppingViewHeaderMenuItems.map((menuItem) => {
        return (
          <Label
           onClick={()=>{ handleNavigateTolistingPage(menuItem)}}
            className="text-sm font-medium cursor-pointer"
            key={menuItem.id}
          >
            {menuItem.label}
          </Label>
        );
      })}
    </nav>
  );
};
const HeaderRightContent = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
    const {cartItems}=useSelector((state)=>state.shopcart);
  const [openCartSheet,setOpenCartSheet]=useState(false)
  const navigate = useNavigate();
  const HandleLogout = () => {
    dispatch(logoutUser()).then((data) => {
      if (data?.payload?.success) {
        toast.success(data?.payload?.message);
      }
    });
  };

  useEffect(()=>{
    dispatch(getCart(user?.id))
  },[dispatch])
  return (
    <div className="flex lg:items-center lg:flex-row flex-col gap-4">
      <Sheet open={openCartSheet} onOpenChange={()=>setOpenCartSheet(false)}>
      <Button onClick={()=>{setOpenCartSheet(true)}} variant="outline" size="icon" className='relative'>
        <ShoppingCart className="h-6 w-6" />
        <span className="absolute top-0 right-0 text-sm font-bold">{cartItems?.items?.length ||0}</span>
        <span className="sr-only">user cart</span>
      </Button>
      <CartWrapper setOpenCartSheet={setOpenCartSheet} cartItems={cartItems && cartItems.items && cartItems.items.length>0 ? cartItems.items : []}/>
      </Sheet>
   
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="bg-black">
            <AvatarFallback className="bg-black text-white font-extrabold">
              {user?.userName[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="right" className="w-56">
          <DropdownMenuLabel>Logged in as {user?.userName}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => {
              navigate("/shop/account");
            }}
          >
            <UserCog className="mr-2 w-4 h-4" />
            Account
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={HandleLogout}>
            <LogOut className="mr-2 w-4 h-4" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

const Header = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  console.log(user, "thisuser");
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        <Link className="flex items-center gap-2" to={"/shop/home"}>
          <HousePlug className="h-6 w-6" />
          <span className="font-bold">Ecommerce</span>
        </Link>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className={"lg:hidden"}>
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle header menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-full max-w-xs">
            <MenuItem onClick={()=>{setOpenCartSheet(false)}} />
            <HeaderRightContent/>

          </SheetContent>
        </Sheet>
        <div className="hidden lg:block">
          <MenuItem />
        </div>
        <div className="hidden lg:block" >
        <HeaderRightContent/>
        </div>
      </div>
    </header>
  );
};

export default Header;
