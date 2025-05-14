import { Link, useLocation } from "react-router";

export default function Footer() {
  const location = useLocation();

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl shadow-md border-t border-gray-200 flex justify-around items-center h-16 z-50 md:mx-[560px]">
      <Link
        to="/"
        className={`flex flex-col items-center ${
          location.pathname === "/" ? "text-black" : "text-gray-400"
        }`}
      >
        <img
          src="/src/assets/home.svg"
          alt="home"
          className={`w-6 h-6 ${
            location.pathname === "/"
              ? "invert-0"
              : "invert-[60%] brightness-75"
          }`}
        />
        <span className="text-xs mt-1">Home</span>
      </Link>

      <Link
        to="/menu"
        className={`flex flex-col items-center ${
          location.pathname === "/menu" ? "text-black" : "text-gray-400"
        }`}
      >
        <img
          src="/src/assets/Menu.svg"
          alt="menu"
          className={`w-6 h-6 ${
            location.pathname === "/menu"
              ? "invert-0"
              : "invert-[60%] brightness-75"
          }`}
        />
        <span className="text-xs mt-1">Menu</span>
      </Link>
    </div>
  );
}
