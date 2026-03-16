import CartManager from "@/components/order/CartManager";
import OrderSidebar from "@/components/order/OrderSidebar";
import Logo from "@/components/ui/Logo";
import ToastNotification from "@/components/ui/ToastNotification";

export default function OrderLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex flex-col">
      <Logo />
      <OrderSidebar />
      <main className="w-full p-3 md:p-5">{children}</main>

      <CartManager />

      <ToastNotification />
    </div>
  );
}
