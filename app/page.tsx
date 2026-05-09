'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import SocialProof from '@/components/SocialProof';
import Problems from '@/components/Problems';
import Features from '@/components/Features';
import HowItWorks from '@/components/HowItWorks';
import FinalCTA from '@/components/FinalCTA';
import Footer from '@/components/Footer';

const Testimonials = dynamic(() => import('@/components/Testimonials'));
const Pricing = dynamic(() => import('@/components/Pricing'));
const FAQ = dynamic(() => import('@/components/FAQ'));

type Lang = 'id' | 'en';

export default function Home() {
  const [lang, setLang] = useState<Lang>('id');

  return (
    <>
      <Nav lang={lang} setLang={setLang} />
      <main>
        <Hero lang={lang} />
        <SocialProof lang={lang} rhythm={true} />
        <Problems lang={lang} />
        <Features lang={lang} rhythm={true} />
        <HowItWorks lang={lang} rhythm={true} />
        <Testimonials lang={lang} rhythm={true} />
        <Pricing lang={lang} rhythm={true} />
        <FAQ lang={lang} />
        <FinalCTA lang={lang} />
      </main>
      <Footer lang={lang} />
    </>
  );
}
