import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav className="p-2 border-b-2">
      <Link to={"/"}>
        <h2 className="text-yellow-400 text-2xl font-bold text-center">
          Brain Train
        </h2>
      </Link>
    </nav>
  );
};
