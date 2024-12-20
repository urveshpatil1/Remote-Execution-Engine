import { RotatingSquare } from 'react-loader-spinner';

const CustomLoader = () => {
  return (
    <div className="flex items-center justify-center h-[92vh] w-screen bg-gradient-to-r from-black to-gray-800 text-white p-8">
      <RotatingSquare
        visible={true}
        height="100"
        width="100"
        color="#4fa94d"
        ariaLabel="rotating-square-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
};

export default CustomLoader;
