import { RootProvider } from 'fumadocs-ui/provider';
import { Inter } from 'next/font/google';
import './global.css';

const inter = Inter({
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <body>
        <RootProvider  search={{
            enabled: false,
          }}>
          {children}
        </RootProvider>
      </body>
    </html>
  );
}
