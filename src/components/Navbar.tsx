import { Link } from "react-router-dom";
import { Button } from "./ui/button";

export const Navbar = () => {
  return (
    <div className="flex justify-between items-center p-4 bg-gray-900">
      <Link to="/">
        <h1 className="text-2xl font-bold">Math Training</h1>
      </Link>
      <div className="flex gap-4">
        <Link to="/bodmas-calculator">
          <Button
            variant="outline"
            className="bg-transparent text-white hover:text-black"
          >
            BODMAS Calculator
          </Button>
        </Link>
      </div>
    </div>
  );
};
