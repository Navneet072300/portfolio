import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div>
      <nav className="flex items-center justify-between my-3 mx-8 text-xl font-semibold">
        <div>
          <h1>Navneet</h1>
        </div>
        <div className="flex space-x-4 items-center list-none text-[#708090] font-semibold">
          <li>
            {" "}
            <Link
              to={"/"}
              className=" hover:underline cursor-pointer focus:underline active:underline"
            >
              Home
            </Link>
          </li>
          <li>
            {" "}
            <Link
              to={"/profile"}
              className=" hover:underline cursor-pointer focus:underline active:underline"
            >
              About
            </Link>
          </li>
          <li>
            {" "}
            <Link
              to={"/projects"}
              className=" hover:underline cursor-pointer focus:underline active:underline"
            >
              Projects
            </Link>
          </li>
        </div>
      </nav>
    </div>
  );
}
