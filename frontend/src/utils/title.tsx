import React from 'react';

import { APP_NAME } from '@/config/app';

function Title({ title }: { title: string }) {
  React.useEffect(() => {
    document.title = title + ` - ${APP_NAME}`;
  }, [title]);

  return <></>;
}

export default Title;
