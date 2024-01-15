import { Link } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import SignOutButton from "./SignOutButton";

const Header = () => {
  const { isLoggedIn } = useAppContext();
  return (
    <div className="bg-blue-800 py-6">
      <div className=" max-w-7xl mx-auto px-5 md:px-10 flex justify-between items-center">
        <span className=" text-3xl text-white font-bold tracking-tight">
          <Link to="/">Booking.com</Link>
        </span>

        <span className=" flex space-x-2 items-center">
          {isLoggedIn ? (
            <>
              <Link className=" text-white px-3 py-2 font-bold rounded hover:bg-blue-600" to="/my-bookings">My Bookings</Link>
              <Link className=" text-white px-3 py-2 font-bold rounded hover:bg-blue-600" to="/my-hotels">My Hotels</Link>
              <SignOutButton />
            </>
          ) : (
            <Link
              to="/sign-in"
              className=" flex bg-white items-center text-blue-600 px-4 py-2 font-bold hover:bg-gray-100 rounded"
            >
              Sign In
            </Link>
          )}
        </span>
      </div>
    </div>
  );
};

export default Header;
