import React from 'react';
import TopBar from './TopBar';
import Navbar from './Navbar';
import Footer from './Footer';
import DemoDisclaimerBanner from './DemoDisclaimerBanner';

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      <DemoDisclaimerBanner />
      <TopBar />
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
