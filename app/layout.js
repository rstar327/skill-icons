export const metadata = {
  title: 'Skill Icons API',
  description: 'Generate dynamic SVG skill icons for your GitHub profile or resume!',
  icons: {
    icon: '/icon.svg',
    apple: '/apple-icon.svg',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
