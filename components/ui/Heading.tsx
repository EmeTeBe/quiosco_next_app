
export default function Heading({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white w-fit pl-20 py-2 left-72 top-8 text-sm font-normal md:text-xl lg:text-2xl md:font-bold uppercase px-2 mt-4">
      {children}
    </div>
  );
}
