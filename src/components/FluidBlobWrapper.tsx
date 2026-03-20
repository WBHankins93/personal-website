'use client';

import dynamic from 'next/dynamic';

const FluidBlob = dynamic(() => import('./FluidBlob'), { ssr: false });

export default function FluidBlobWrapper() {
  return <FluidBlob />;
}
