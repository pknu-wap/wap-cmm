export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <div>AuthLayout</div>
      <div>{children}</div>
    </div>
  );
}
