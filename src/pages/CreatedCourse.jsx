import { useLocation, useNavigate } from "react-router";
import {
  useCreateClassApiMutation,
  useGetCourseApiQuery,
} from "../services/api";
import { useState } from "react";
import {
  FiArrowLeft,
  FiBookOpen,
  FiVideo,
  FiPlus,
  FiEdit3,
  FiTrash2,
  FiExternalLink,
  FiUser,
  FiHash,
  FiFileText,
  FiLayers,
} from "react-icons/fi";
import { FaGraduationCap } from "react-icons/fa";

const CreatedCourse = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    videoUrl: "",
    courseId: "",
    createdBy: "",
  });

  const [createClassApi] = useCreateClassApiMutation();

  const location = useLocation();
  const courseDetails = location.state?.courseDetails;
  const courseId = courseDetails?.data?._id;

  const {
    data: courseData,
    isLoading,
    isError,
    error,
  } = useGetCourseApiQuery(courseId, {
    skip: !courseId,
  });

  console.log("Course Data:", courseData);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-indigo-100 border-t-indigo-600" />
          <p className="mt-4 font-medium text-slate-600">
            Loading course details...
          </p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 p-5">
        <div className="w-full max-w-md rounded-2xl border border-red-100 bg-white p-8 text-center shadow-sm">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-red-500">
            <FiFileText size={26} />
          </div>
          <h2 className="mt-4 text-xl font-bold text-slate-900">
            Unable to load course
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            {error?.data?.message || "Failed to load course"}
          </p>
          <button
            onClick={() => navigate(-1)}
            className="mt-6 rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white transition hover:bg-indigo-700"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const course = courseData?.data;

  const handleAddClass = async (e) => {
    e.preventDefault();

    try {
      const res = await createClassApi({
        ...formData,
        courseId: course?._id,
        createdBy: course?.createdBy,
      }).unwrap();

      console.log(res);

      navigate("/admin/createdclass", {
        state: {
          classDetails: res,
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top Navigation */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 px-5 py-5 sm:flex-row sm:items-center sm:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-lg shadow-indigo-200">
              <FaGraduationCap size={27} />
            </div>

            <div>
              <h1 className="text-xl font-bold tracking-tight text-slate-900">
                Course Studio
              </h1>
              <p className="mt-0.5 text-sm text-slate-500">
                Manage your course and classes
              </p>
            </div>
          </div>

          <button
            onClick={() => navigate(-1)}
            className="flex items-center justify-center gap-2 self-start rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700 sm:self-auto"
          >
            <FiArrowLeft size={17} />
            Back
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-5 py-8 sm:px-8 sm:py-10">
        {/* Page Heading */}
        <div className="mb-8">
          <p className="mb-2 text-xs font-bold uppercase tracking-[2px] text-indigo-600">
            Admin Dashboard / Courses
          </p>

          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                Course Management
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
                View your course information and create classes to organize
                your learning content in one place.
              </p>
            </div>

            <div className="flex w-fit items-center gap-3 rounded-2xl border border-indigo-100 bg-white px-4 py-3 shadow-sm">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                <FiLayers size={21} />
              </div>
              <div>
                <p className="text-lg font-bold text-slate-900">Course</p>
                <p className="text-xs text-slate-500">Management panel</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-5">
          {/* Course Details */}
          <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm lg:col-span-3">
            {/* Course Banner */}
            <div className="relative overflow-hidden bg-gradient-to-br from-[#211047] via-indigo-700 to-violet-600 px-6 py-9 text-white sm:px-8">
              <div className="absolute -right-10 -top-16 h-56 w-56 rounded-full bg-white/10" />
              <div className="absolute -bottom-24 right-1/3 h-48 w-48 rounded-full bg-white/5" />

              <div className="relative z-10 flex items-start gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-white/20 bg-white/15">
                  <FiBookOpen size={28} />
                </div>

                <div className="min-w-0 flex-1">
                  <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-indigo-100">
                    Course Details
                  </span>

                  <h3 className="mt-3 break-words text-2xl font-bold sm:text-3xl">
                    {course?.name || "Untitled Course"}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-indigo-100">
                    Your course information and configuration
                  </p>
                </div>
              </div>
            </div>

            {/* Details Body */}
            <div className="p-6 sm:p-8">
              <div className="mb-6">
                <h4 className="text-lg font-bold text-slate-900">
                  Overview
                </h4>
                <p className="mt-1 text-sm text-slate-500">
                  Basic information about this course.
                </p>
              </div>

              <div className="space-y-5">
                {/* Description */}
                <div className="flex gap-4 rounded-2xl border border-slate-100 bg-slate-50 p-4 sm:p-5">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-indigo-600 shadow-sm">
                    <FiFileText size={21} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Description
                    </p>
                    <p className="mt-2 whitespace-pre-wrap break-words text-sm leading-6 text-slate-700">
                      {course?.description || "No description provided yet."}
                    </p>
                  </div>
                </div>

                {/* Course ID */}
                <div className="flex gap-4 rounded-2xl border border-slate-100 bg-slate-50 p-4 sm:p-5">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-indigo-600 shadow-sm">
                    <FiHash size={21} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Course ID
                    </p>
                    <p className="mt-2 break-all font-mono text-xs leading-5 text-slate-700 sm:text-sm">
                      {course?._id || "Not available"}
                    </p>
                  </div>
                </div>

                {/* Creator */}
                <div className="flex gap-4 rounded-2xl border border-slate-100 bg-slate-50 p-4 sm:p-5">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-indigo-600 shadow-sm">
                    <FiUser size={21} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Created By
                    </p>
                    <p className="mt-2 break-all text-sm font-semibold text-slate-700">
                      {course?.createdBy || "Not available"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Course Actions */}
              <div className="mt-8 flex flex-col gap-3 border-t border-slate-100 pt-6 sm:flex-row">
                <button
                  type="button"
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 font-semibold text-white shadow-md shadow-indigo-100 transition hover:bg-indigo-700"
                >
                  <FiExternalLink size={18} />
                  Visit Course
                </button>

                <button
                  type="button"
                  className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 font-semibold text-slate-600 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700"
                >
                  <FiEdit3 size={17} />
                  Edit
                </button>

                <button
                  type="button"
                  className="flex items-center justify-center gap-2 rounded-xl border border-red-100 bg-red-50 px-5 py-3 font-semibold text-red-600 transition hover:bg-red-100"
                >
                  <FiTrash2 size={17} />
                  Delete
                </button>
              </div>
            </div>
          </section>

          {/* Create Class */}
          <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm lg:col-span-2">
            <div className="border-b border-slate-100 px-6 py-6 sm:px-7">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
                  <FiPlus size={24} />
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-900">
                    Create a Class
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">
                    Add a lesson to your course
                  </p>
                </div>
              </div>
            </div>

            <form onSubmit={handleAddClass} className="p-6 sm:p-7">
              {/* Class Name */}
              <div className="mb-6">
                <label
                  htmlFor="className"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Class Name
                </label>

                <div className="relative">
                  <FiBookOpen
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    id="className"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="e.g. Introduction to React"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
                  />
                </div>
              </div>

              {/* Video URL */}
              <div className="mb-7">
                <label
                  htmlFor="videoUrl"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Video URL
                </label>

                <div className="relative">
                  <FiVideo
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    id="videoUrl"
                    type="url"
                    required
                    value={formData.videoUrl}
                    onChange={(e) =>
                      setFormData({ ...formData, videoUrl: e.target.value })
                    }
                    placeholder="https://www.youtube.com/..."
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
                  />
                </div>

                <p className="mt-2 text-xs leading-5 text-slate-400">
                  Paste the video link students will use to access this lesson.
                </p>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-4 font-bold text-white shadow-lg shadow-indigo-100 transition duration-200 hover:-translate-y-0.5 hover:bg-indigo-700 hover:shadow-xl"
              >
                <FiPlus size={20} />
                Create Class
              </button>

              <div className="mt-5 flex items-start gap-3 rounded-xl bg-indigo-50 p-4">
                <FiLayers
                  size={19}
                  className="mt-0.5 shrink-0 text-indigo-600"
                />
                <p className="text-xs leading-5 text-slate-600">
                  Your new class will be associated with this course. You can
                  organize your learning content by creating additional classes.
                </p>
              </div>
            </form>
          </section>
        </div>

        {/* Footer Note */}
        <div className="mt-8 flex flex-col gap-2 border-t border-slate-200 pt-5 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <p>Course Studio · Learning Management System</p>
          <p>Manage your courses and lessons in one place.</p>
        </div>
      </main>
    </div>
  );
};

export default CreatedCourse;