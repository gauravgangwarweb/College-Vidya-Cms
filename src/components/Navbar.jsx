import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="w-full flex justify-center shadow-md">
      <div className="w-full max-w-[1320px] flex justify-between items-center px-4 py-3">
        <span>
            <h2 className="text-xl font-bold">Admin Panel</h2>
        </span>
        <div className="flex gap-4 text-lg">
          <Link to="/university" className="border rounded-md px-4 py-1 hover:bg-primary hover:text-white">Universities</Link>
          <Link className="border rounded-md px-4 py-1 hover:bg-primary hover:text-white">Courses</Link>
          <Link className="border rounded-md px-4 py-1 hover:bg-primary hover:text-white">Blogs</Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
