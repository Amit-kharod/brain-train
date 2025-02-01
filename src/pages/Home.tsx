import { Link } from "react-router-dom";

const Home: React.FC = () => {
  return (
    <div className="flex flex-col items-center p-8">
      <Link
        to="/bodmas-calculator"
        className="flex items-center gap-2 bg-gray-800 p-4 rounded-lg hover:bg-gray-700 transition-colors"
      >
        <div className="flex flex-col">
          <span className="text-lg font-semibold">BODMAS Calculator</span>
          <span className="text-sm text-gray-400">
            Solve expressions step by step
          </span>
        </div>
      </Link>
    </div>
  );
};

export default Home;
