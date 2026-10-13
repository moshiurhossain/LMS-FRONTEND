

const UserInfo = ({ username, useremail, userrole }) => {
  return (
    <div className="flex w-full items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition duration-300 hover:shadow-md sm:w-fit">
      {/* Avatar */}
      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 text-xl font-bold uppercase text-white shadow-md shadow-indigo-200">
        {username?.charAt(0) || "U"}
      </div>

      {/* User Details */}
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <h2 className="text-base font-bold text-slate-900">
            Welcome, {username || "User"}
          </h2>

          <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-700 ring-1 ring-emerald-200">
            {userrole || "User"}
          </span>
        </div>

        <p className="mt-1 break-all text-sm text-slate-500">
          {useremail || "No email available"}
        </p>

        <div className="mt-2 flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
          <span className="text-xs font-medium text-slate-500">
            Account Information
          </span>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;