import { Protect, useClerk, useUser } from "@clerk/clerk-react";
import {
  Eraser,
  FileText,
  Hash,
  House,
  Image,
  LogOut,
  Scissors,
  SquarePen,
  Users,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const navItems = [
  { to: "/ai", label: "Dashboard", Icon: House },
  { to: "/ai/write-article", label: "Write Article", Icon: SquarePen },
  { to: "/ai/blog-titles", label: "Blog Titles", Icon: Hash },
  { to: "/ai/generate-images", label: "Generate Images", Icon: Image },
  { to: "/ai/remove-background", label: "Remove Background", Icon: Eraser },
  { to: "/ai/remove-object", label: "Remove Object", Icon: Scissors },
  { to: "/ai/review-resume", label: "Review Resume", Icon: FileText },
  { to: "/ai/community", label: "Community", Icon: Users },
];

const Sidebar = ({ sidebar, setSidebar }) => {
  const { user } = useUser();
  const { signOut, openUserProfile } = useClerk();

  return (
    <div
      className={`w-60 border-r flex flex-col justify-between items-center max-sm:absolute top-14 bottom-0 ${
        sidebar ? "translate-x-0" : "max-sm:-translate-x-full"
      } transition-all`}
    >
      {/* Top Section */}
      <div className="my-4 w-full">
        <img
          src={user.imageUrl}
          alt="User"
          className="w-10 rounded-full mx-auto"
        />
        <h1 className="mt-1 text-center text-sm">{user.fullName}</h1>

        {/* Nav Items */}
        <div className="px-4 mt-4 text-sm">
          {navItems.map(({ to, label, Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/ai"}
              onClick={() => setSidebar(false)}
              className={({ isActive }) =>
                `px-2 py-2 flex items-center gap-2 rounded ${
                  isActive ? "bg-gray-200" : ""
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon className="w-4 h-4" />
                  <span>{label}</span>
                </>
              )}
            </NavLink>
          ))}
        </div>
      </div>

      {/* Bottom Section */}
      <div className="w-full border-t px-4 py-3 flex items-center justify-between">
        <div
          onClick={openUserProfile}
          className="flex gap-2 items-center cursor-pointer"
        >
          <img
            src={user.imageUrl}
            alt="User"
            className="w-6 h-6 rounded-full"
          />
          <div>
            <h1 className="text-sm">{user.fullName}</h1>
            <p className="text-xs">
              <Protect plan="premium" fallback="Free">Premium</Protect> Plan
            </p>
          </div>
        </div>
        <LogOut
          onClick={signOut}
          className="w-4 h-4 cursor-pointer"
          title="Sign out"
        />
      </div>
    </div>
  );
};

export default Sidebar;
