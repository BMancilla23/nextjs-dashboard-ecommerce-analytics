export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full min-h-screen dark:bg-[#030712] grid">{children}</div>
  );
}
