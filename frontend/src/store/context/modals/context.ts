import React from 'react';

import { ModalContext } from './provider';

import type { ModalContextType } from './provider';

export const useModalContext = () => {
  return React.useContext(ModalContext) as ModalContextType;
};
