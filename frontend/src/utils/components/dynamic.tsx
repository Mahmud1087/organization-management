import { Spin } from 'antd';
import React from 'react';
import { Navigate } from 'react-router';

// React.lazy<React.ComponentType<any>>(factory: () => Promise<{
//   default: React.ComponentType<any>;
// }>): React.LazyExoticComponent<React.ComponentType<any>>

function Dynamic({
  fallback,
  component: DynamicComponent,
  to,
}: {
  component: React.LazyExoticComponent<React.ComponentType<unknown>>;
  fallback?: React.ReactNode;
  to: string;
}) {
  return (
    <React.Suspense
      fallback={
        fallback || (
          <div className='flex h-full items-center justify-center min-h-[45vh] w-full'>
            <Spin spinning />
          </div>
        )
      }
    >
      <DynamicComponent />
      <Navigate to={to} />
    </React.Suspense>
  );
}

export default Dynamic;
