// components/CartManager.tsx
"use client";

import { useState } from "react";
import OrderSummary from "./OrderSummary";
import CartIcon from "../ui/CartIcon";

export default function CartManager() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleCart = () => setIsCartOpen(!isCartOpen);
  const closeCart = () => setIsCartOpen(false);

  return (
    <>
      <CartIcon onClick={toggleCart} isOpen={isCartOpen} />
      <OrderSummary isOpen={isCartOpen} onClose={closeCart} />
    </>
  );
}
