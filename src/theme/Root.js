import React from 'react';
import { SpeedInsights } from '@vercel/speed-insights/react';

function Root({ children }) {
  return (
    <>
      {children}
      <SpeedInsights />
    </>
  );
}

export default Root;