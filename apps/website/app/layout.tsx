import "./globals.css";

export const metadata = {
  title: "Experience Website",
  description: "Website powered by Experience Builder"
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white text-slate-900">{children}</body>
    </html>
  );
}
