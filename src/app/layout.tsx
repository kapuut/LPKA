import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'LPKA Kelas II Lombok Tengah | Portal Informasi Publik Resmi',
    template: '%s | LPKA Kelas II Lombok Tengah'
  },
  description: 'Portal Informasi Publik dan Layanan Terpadu Lembaga Pembinaan Khusus Anak (LPKA) Kelas II Lombok Tengah, Kantor Wilayah Kementerian Hukum dan HAM Nusa Tenggara Barat.',
  keywords: [
    'LPKA Lombok Tengah',
    'Lembaga Pembinaan Khusus Anak',
    'Kemenkumham NTB',
    'Ditjenpas',
    'Pemasyarakatan',
    'Layanan Kunjungan Anak Binaan',
    'PPID LPKA Lombok Tengah',
    'Praya Lombok Tengah'
  ],
  authors: [{ name: 'LPKA Kelas II Lombok Tengah' }],
  robots: {
    index: true,
    follow: true
  }
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#0f2042'
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className="h-full antialiased scroll-smooth">
      <body className="min-h-full flex flex-col font-sans bg-slate-50 text-slate-800">
        {children}
      </body>
    </html>
  );
}
