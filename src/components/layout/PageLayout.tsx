import React, { useState } from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { BackToTop } from '../common/BackToTop';
import { ScheduleViewingModal } from '../property/ScheduleViewingModal';

interface PageLayoutProps {
  children: React.ReactNode;
}

export const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  const [viewingModalOpen, setViewingModalOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F7F4] text-[#17201C] antialiased">
      <Navbar onOpenViewingModal={() => setViewingModalOpen(true)} />
      <main className="flex-grow">{children}</main>
      <Footer />
      <BackToTop />

      <ScheduleViewingModal
        isOpen={viewingModalOpen}
        onClose={() => setViewingModalOpen(false)}
      />
    </div>
  );
};
