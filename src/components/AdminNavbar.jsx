
import { NavLink } from "react-router";
import {
  FiGrid,
  FiUser,
  FiBookOpen,
  FiBarChart2,
  FiChevronRight,
  FiLayers,
} from "react-icons/fi";

const AdminNavbar = () => {
  const navItems = [
    {
      title: "My Profile",
      path: "/admin",
      icon: FiUser,
    },
    {
      title: "Created Courses",
      path: "/admin/mycreatedcourse",
      icon: FiBookOpen,
    },
    {
      title: "Analytics",
      path: "/admin/analytics",
      icon: FiBarChart2,
    },
  ];

  return (
    <aside className="sticky top-0 flex min-h-screen w-full flex-col overflow-hidden bg-white text-slate-700 shadow-xl md:w-64">
      {/* Logo section */}
      <div className="border-b border-slate-100 px-5 py-7">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-700 text-white shadow-lg shadow-violet-200">
            <FiLayers className="text-2xl" />
          </div>

          <div>
            <h1 className="text-lg font-extrabold tracking-tight text-slate-900">
              LearnHub
            </h1>
            <p className="text-xs font-medium text-slate-400">
              Admin Workspace
            </p>
          </div>
        </div>
      </div>

      {/* Dashboard heading */}
      <div className="px-5 pb-2 pt-7">
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400">
          Workspace
        </p>
      </div>

      {/* Navigation links */}
      <nav className="flex flex-1 flex-col gap-2 px-3 py-3">
        {navItems.map(({ title, path, icon: Icon }) => (
          <NavLink
            key={title}
            to={path}
            end={path === "/admin"}
            className={({ isActive }) =>
              `group flex items-center justify-between rounded-xl px-4 py-3.5 transition-all duration-200 ${
                isActive
                  ? "bg-violet-600 text-white shadow-md shadow-violet-200"
                  : "text-slate-500 hover:bg-violet-50 hover:text-violet-700"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <span className="flex items-center gap-3">
                  <Icon
                    className={`text-xl transition-transform duration-200 ${
                      isActive
                        ? "text-white"
                        : "text-slate-400 group-hover:scale-110 group-hover:text-violet-600"
                    }`}
                  />
                  <span className="text-sm font-semibold">{title}</span>
                </span>

                <FiChevronRight
                  className={`text-base transition-all ${
                    isActive
                      ? "translate-x-0 text-white"
                      : "-translate-x-1 text-transparent group-hover:translate-x-0 group-hover:text-violet-400"
                  }`}
                />
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Bottom information */}
      <div className="mt-auto p-4">
        <div className="rounded-2xl border border-violet-100 bg-gradient-to-br from-violet-50 to-indigo-50 p-4">
          <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-xl bg-white text-violet-600 shadow-sm">
            <FiGrid className="text-lg" />
          </div>

          <h3 className="text-sm font-bold text-slate-800">
            Learning Management
          </h3>

          <p className="mt-1 text-xs leading-5 text-slate-500">
            Manage your courses and learning content in one place.
          </p>
        </div>

        <p className="mt-4 text-center text-[11px] text-slate-400">
          LearnHub Admin Panel
        </p>
      </div>
    </aside>
  );
};

export default AdminNavbar;
