import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { PageLayout } from '../../components/layout/PageLayout';
import { Button } from '../../components/common/Button';

export const NotFoundPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <PageLayout>
      <div className="py-40 bg-[#111715] text-[#F8F7F4] min-h-[80vh] flex items-center justify-center text-center px-4">
        <div className="max-w-md mx-auto space-y-6">
          <span className="text-xs uppercase tracking-[0.3em] text-[#B49A70] font-semibold block">
            {t('notFound.badge')}
          </span>
          <h1 className="font-serif text-5xl sm:text-6xl text-white font-normal tracking-tight">
            {t('notFound.title')}
          </h1>
          <p className="text-sm text-[#777C76] font-light leading-relaxed">
            {t('notFound.description')}
          </p>
          <div className="pt-4 flex items-center justify-center gap-4">
            <Link to="/">
              <Button variant="primary" size="md">
                {t('notFound.returnHome')}
              </Button>
            </Link>
            <Link to="/properties">
              <Button variant="outline-light" size="md">
                {t('notFound.viewPortfolio')}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};
