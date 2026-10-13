import { useGetCoursesByCreatorApiQuery } from "../services/api";
import { useNavigate } from "react-router";
import {
  FiBookOpen,
  FiEye,
  FiPlus,
  FiLayers,
  FiArrowRight,
} from "react-icons/fi";

const CreatedCourses = () => {
  const navigate = useNavigate();

  const {
    data,
    isLoading,
    isError,
    error,
  } = useGetCoursesByCreatorApiQuery();

  const courses = data?.data || [];

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-indigo-100 border-t-indigo-600" />
          <p className="mt-4 font-medium text-slate-600">
            Loading your courses...
          </p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="m-8 rounded-2xl border border-red-200 bg-red-50 p-6 text-red-600">
        <h2 className="font-bold">Failed to load courses</h2>
        <p className="mt-2 text-sm">
          {error?.data?.message || "Something went wrong. Please try again."}
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-slate-50 px-4 py-8 sm:px-8 lg:px-10">
      {/* Header */}
      <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
        <div>
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-indigo-600">
            Admin Dashboard
          </p>

          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            My Courses
          </h1>

          <p className="mt-2 text-sm text-slate-500 sm:text-base">
            Manage your courses and explore their classes.
          </p>
        </div>

        <button
          onClick={() => navigate("/admin/createcourse")}
          className="flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-700"
        >
          <FiPlus size={19} />
          Create Course
        </button>
      </div>

      {/* Stats */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
            <FiBookOpen size={24} />
          </div>

          <div>
            <p className="text-sm text-slate-500">Total Courses</p>
            <h2 className="text-2xl font-bold text-slate-900">
              {courses.length}
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
            <FiLayers size={24} />
          </div>

          <div>
            <p className="text-sm text-slate-500">Total Classes</p>
            <h2 className="text-2xl font-bold text-slate-900">
              {courses.reduce(
                (total, course) => total + (course.classes?.length || 0),
                0
              )}
            </h2>
          </div>
        </div>
      </div>

      {/* Course Cards */}
      {courses.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
            <FiBookOpen size={30} />
          </div>

          <h2 className="mt-5 text-xl font-bold text-slate-900">
            No courses yet
          </h2>

          <p className="mt-2 text-slate-500">
            Create your first course to get started.
          </p>

          <button
            onClick={() => navigate("/admin/createcourse")}
            className="mt-6 rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white hover:bg-indigo-700"
          >
            Create Your First Course
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {courses.map((course) => (
            <div
              key={course._id}
              className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-100/50"
            >
              {/* Card Banner */}
              <div className="relative flex h-36 items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-800">
                <div className="absolute -right-8 -top-12 h-40 w-40 rounded-full bg-white/10" />
                <div className="absolute -bottom-16 -left-8 h-40 w-40 rounded-full bg-white/10" />

                <FiBookOpen
                  size={52}
                  className="relative text-white transition duration-300 group-hover:scale-110"
                />

                <span className="absolute right-4 top-4 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
                  Course
                </span>
              </div>

              {/* Card Content */}
              <div className="p-6">
                <h2 className="line-clamp-1 text-xl font-bold text-slate-900">
                  {course.name}
                </h2>

                <p className="mt-3 min-h-12 text-sm leading-6 text-slate-500">
                  {course.description || "No description available."}
                </p>

                <div className="my-5 flex items-center justify-between border-y border-slate-100 py-4">
                  <div className="flex items-center gap-2 text-sm text-slate-500">
                    <FiLayers size={17} className="text-indigo-500" />
                    <span>Classes</span>
                  </div>

                  <span className="rounded-lg bg-indigo-50 px-3 py-1.5 text-sm font-bold text-indigo-700">
                    {course.classes?.length || 0}
                  </span>
                </div>

                <button
                  onClick={() =>
                    navigate(`/admin/course/${course._id}`)
                  }
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 font-semibold text-white transition hover:bg-indigo-700"
                >
                  <FiEye size={18} />
                  View Course
                  <FiArrowRight
                    size={17}
                    className="ml-1 transition-transform group-hover:translate-x-1"
                  />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CreatedCourses;