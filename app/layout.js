export const metadata = {
  title: 'Skill Icons API',
  description: 'Generate dynamic SVG skill icons for your GitHub profile or resume!',
  icons: {
    icon: '/icon.svg',
    apple: '/apple-icon.svg',
  },
};

/**
 * Root layout component that renders a minimal HTML document and places the provided content inside the body.
 *
 * @param {{ children: React.ReactNode }} props - The content to render inside the document body.
 * @returns {JSX.Element} The top-level `<html lang="en">` element containing a `<body>` with `children`.
 */
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
