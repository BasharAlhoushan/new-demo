import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Share2, Copy, Check, MessageSquare, Mail } from 'lucide-react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  url?: string;
}

export const ShareModal: React.FC<ShareModalProps> = ({
  isOpen,
  onClose,
  title,
  url = window.location.href,
}) => {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: `Explore this luxury property: ${title}`,
          url,
        });
      } catch {
        // User cancelled
      }
    } else {
      handleCopy();
    }
  };

  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(
    `Exclusive Residence on THE ONE Real Estate:\n${title}\n${url}`
  )}`;

  const mailtoUrl = `mailto:?subject=${encodeURIComponent(
    `Private Residence: ${title}`
  )}&body=${encodeURIComponent(`I would like to share this property with you:\n\n${title}\n${url}`)}`;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={t('properties.shareProperty')}
      subtitle={t('modals.share.subtitle')}
      maxWidth="sm"
    >
      <div className="space-y-5">
        {/* URL Box & Copy */}
        <div>
          <label className="block text-xs uppercase tracking-wider text-[#777C76] font-medium mb-1.5">
            {t('modals.share.propertyLink')}
          </label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              readOnly
              value={url}
              className="flex-1 bg-[#F8F7F4] border border-[#E8E6E0] rounded-sm px-3.5 py-2.5 text-xs text-[#17201C] outline-none select-all font-mono"
            />
            <Button
              variant={copied ? 'primary' : 'dark'}
              size="sm"
              onClick={handleCopy}
              icon={copied ? <Check className="w-4 h-4 text-emerald-800" /> : <Copy className="w-4 h-4" />}
            >
              {copied ? t('modals.share.copied') : t('modals.share.copy')}
            </Button>
          </div>
          {copied && (
            <p className="text-[11px] text-[#B49A70] mt-1.5 font-medium">
              {t('properties.linkCopied')}
            </p>
          )}
        </div>

        {/* Channels */}
        <div className="pt-2 border-t border-[#E8E6E0] grid grid-cols-2 gap-3">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 py-3 px-4 rounded-sm bg-[#25D366]/10 text-[#128C7E] border border-[#25D366]/30 text-xs font-semibold uppercase tracking-wider hover:bg-[#25D366]/20 transition-colors"
          >
            <MessageSquare className="w-4 h-4" />
            <span>WhatsApp</span>
          </a>

          <a
            href={mailtoUrl}
            className="flex items-center justify-center gap-2 py-3 px-4 rounded-sm bg-[#18201D] text-[#F8F7F4] text-xs font-semibold uppercase tracking-wider hover:bg-[#2A3530] transition-colors"
          >
            <Mail className="w-4 h-4 text-[#B49A70]" />
            <span>{t('modals.share.email')}</span>
          </a>
        </div>

        {typeof navigator !== 'undefined' && 'share' in navigator && (
          <div className="pt-2">
            <Button
              variant="outline"
              size="md"
              className="w-full"
              onClick={handleNativeShare}
              icon={<Share2 className="w-4 h-4" />}
            >
              {t('modals.share.deviceShare')}
            </Button>
          </div>
        )}
      </div>
    </Modal>
  );
};
