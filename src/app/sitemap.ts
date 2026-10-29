import { MetadataRoute } from 'next';
import { getBeritaList, getPengumumanList, getLayananList } from '@/lib/storage';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://lpka-lomboktengah.kemenkumham.go.id';

  const [berita, pengumuman, layanan] = await Promise.all([
    getBeritaList(),
    getPengumumanList(),
    getLayananList()
  ]);

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}`, lastModified: new Date(), changeFrequency: 'daily', priority: 1.0 },
    { url: `${baseUrl}/profil`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/profil/struktur-organisasi`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/berita`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/pengumuman`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/informasi-publik`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/layanan`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/galeri`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/kontak`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 }
  ];

  const beritaRoutes: MetadataRoute.Sitemap = berita
    .filter(b => b.status === 'published')
    .map(b => ({
      url: `${baseUrl}/berita/${b.slug}`,
      lastModified: new Date(b.updatedAt || b.tanggalPublikasi),
      changeFrequency: 'weekly',
      priority: 0.7
    }));

  const pengumumanRoutes: MetadataRoute.Sitemap = pengumuman
    .filter(p => p.status === 'aktif')
    .map(p => ({
      url: `${baseUrl}/pengumuman/${p.slug}`,
      lastModified: new Date(p.updatedAt || p.tanggalTerbit),
      changeFrequency: 'weekly',
      priority: 0.7
    }));

  const layananRoutes: MetadataRoute.Sitemap = layanan
    .filter(l => l.isAktif)
    .map(l => ({
      url: `${baseUrl}/layanan/${l.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8
    }));

  return [...staticRoutes, ...beritaRoutes, ...pengumumanRoutes, ...layananRoutes];
}
