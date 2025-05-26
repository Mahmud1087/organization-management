import { Toaster } from 'sonner';
import router from './routes';
import { GlobalContextProvider } from './store/context';
import { RouterProvider } from 'react-router';

function App() {
  return (
    <GlobalContextProvider>
      <Toaster richColors position='top-center' />
      <RouterProvider router={router} />
    </GlobalContextProvider>
  );
}

export default App;
