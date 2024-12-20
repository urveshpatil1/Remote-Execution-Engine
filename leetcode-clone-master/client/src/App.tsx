import './index.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CustomRoutes } from './routes/CustomRoutes.component';
import { RecoilRoot } from 'recoil';

function App() {
  const queryClient = new QueryClient();

  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={true} />
        <ToastContainer />
        <CustomRoutes />
      </QueryClientProvider>
    </RecoilRoot>
  );
}

export default App;
