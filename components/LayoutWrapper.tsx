'use client';

import { usePathname } from 'next/navigation';
import { Navbar, Footer, WhatsAppFAB } from '@/components/Shared';

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isStudio = pathname?.startsWith('/studio');

  if (isStudio) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
      <WhatsAppFAB />
    </>
  );
}
