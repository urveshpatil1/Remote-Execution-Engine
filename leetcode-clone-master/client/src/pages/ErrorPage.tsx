import { useRouteError, ErrorResponse } from 'react-router-dom';
import Card from '../components/common/Card'; // Adjust the path based on your project structure

function ErrorPage() {
  const error = useRouteError() as ErrorResponse;

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-r from-black to-gray-800">
      <div className="max-w-md mx-auto">
        <Card>
          <h1 className="text-3xl font-bold mb-4">Oops!</h1>
          <p className="text-lg mb-4">Sorry, an unexpected error has occurred.</p>
          <p className="italic text-red-500">{error.statusText || error.data}</p>
        </Card>
      </div>
    </div>
  );
}

export default ErrorPage;
