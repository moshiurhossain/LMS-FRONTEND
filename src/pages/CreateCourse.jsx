import { useState } from "react";
import UserInfo from "../components/UserInfo";
import {
  useCreateCourseApiMutation,
  useGetUserApiQuery,
} from "../services/api";
import { useNavigate } from "react-router";
import {
  FiBookOpen,
  FiFileText,
  FiPlusCircle,
  FiArrowLeft,
  FiLayers,
  FiCheckCircle,
  FiEdit3,
} from "react-icons/fi";
import { FaGraduationCap } from "react-icons/fa";

const CreateCourse = () => {
  const navigate = useNavigate();

  const { data } = useGetUserApiQuery();

  const username = data?.data?.name;
  const useremail = data?.data?.email;
  const userrole = data?.data?.role;
  const userID = data?.data?._id;

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    createdBy: "",
  });

  const [createCourseApi] = useCreateCourseApiMutation();

  const handleCreateCourse = async (e) => {
    e.preventDefault();

    try {
      const res = await createCourseApi({
        ...formData,
        createdBy: userID,
      }).unwrap();

      console.log(res);

      navigate("/admin/createdcourse", {
        state: { courseDetails: res },
      });
    } catch (err) {
      console.log("this error from create-course:", err);
    }
  };

  return (
    <div className="min-h-screen w-full bg-slate-50">
      {/* Top Header */}
      <header className="flex w-full flex-col justify-between gap-3 border-b border-slate-200 bg-white px-5 py-4 shadow-sm sm:flex-row sm:items-center sm:px-8 lg:px-10">
        <UserInfo
          username={username}
          useremail={useremail}
          userrole={userrole}
        />
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-8 sm:py-10 lg:px-10">
        {/* Page Heading */}
        <div className="mb-8">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="mb-5 flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-indigo-600"
          >
            <FiArrowLeft size={18} />
            Back
          </button>

          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="mb-2 text-sm font-bold uppercase tracking-[2px] text-indigo-600">
                Admin Dashboard
              </p>

              <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                Create New Course
              </h1>

              <p className="mt-3 max-w-xl text-sm leading-6 text-slate-500 sm:text-base">
                Build a new learning experience by adding a course name and
                description. Your course will be ready for classes and lessons.
              </p>
            </div>

            <div className="flex items-center gap-3 rounded-2xl border border-indigo-100 bg-white px-5 py-4 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                <FaGraduationCap size={27} />
              </div>

              <div>
                <p className="text-sm font-bold text-slate-800">
                  Learning Management
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  Course Creator
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-5">
          {/* Left Side: Form */}
          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm lg:col-span-3">
            {/* Form Header */}
            <div className="relative overflow-hidden bg-gradient-to-r from-[#241052] via-[#4c23ad] to-indigo-600 px-6 py-8 text-white sm:px-8">
              <div className="absolute -right-10 -top-16 h-48 w-48 rounded-full bg-white/10" />
              <div className="absolute -bottom-20 right-1/3 h-40 w-40 rounded-full bg-white/5" />

              <div className="relative z-10 flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/20 bg-white/15">
                  <FiPlusCircle size={28} />
                </div>

                <div>
                  <h2 className="text-2xl font-bold">
                    Course Details
                  </h2>
                  <p className="mt-1 text-sm text-indigo-100">
                    Enter the basic information for your course.
                  </p>
                </div>
              </div>
            </div>

            {/* Form Body */}
            <form onSubmit={handleCreateCourse} className="p-6 sm:p-8">
              {/* Course Name */}
              <div className="mb-6">
                <label
                  htmlFor="courseName"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Course Name
                  <span className="ml-1 text-red-500">*</span>
                </label>

                <div className="relative">
                  <FiBookOpen
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    id="courseName"
                    type="text"
                    value={formData.name}
                    placeholder="e.g. Complete React JS Course"
                    required
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        name: e.target.value,
                      })
                    }
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-4 pl-12 pr-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
                  />
                </div>

                <p className="mt-2 text-xs text-slate-400">
                  Choose a clear and descriptive name for your course.
                </p>
              </div>

              {/* Course Description */}
              <div className="mb-7">
                <label
                  htmlFor="courseDescription"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Course Description
                  <span className="ml-1 text-red-500">*</span>
                </label>

                <div className="relative">
                  <FiFileText
                    size={19}
                    className="absolute left-4 top-4 text-slate-400"
                  />

                  <textarea
                    id="courseDescription"
                    value={formData.description}
                    placeholder="Describe what students will learn in this course..."
                    required
                    rows={6}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        description: e.target.value,
                      })
                    }
                    className="w-full resize-y rounded-xl border border-slate-200 bg-slate-50 py-4 pl-12 pr-4 text-sm leading-6 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
                  />
                </div>

                <p className="mt-2 text-xs text-slate-400">
                  Explain the course content, goals, and learning outcomes.
                </p>
              </div>

              {/* Submit */}
              <div className="border-t border-slate-100 pt-6">
                <button
                  type="submit"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-4 font-semibold text-white shadow-lg shadow-indigo-200 transition duration-200 hover:-translate-y-0.5 hover:bg-indigo-700 hover:shadow-xl"
                >
                  <FiPlusCircle size={20} />
                  Create Course
                </button>

                <p className="mt-4 text-center text-xs text-slate-400">
                  You can add classes to your course after creating it.
                </p>
              </div>
            </form>
          </div>

          {/* Right Side */}
          <div className="space-y-6 lg:col-span-2">
            {/* Live Preview */}
            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-100 px-6 py-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
                    <FiEdit3 size={21} />
                  </div>

                  <div>
                    <h3 className="font-bold text-slate-900">
                      Course Preview
                    </h3>
                    <p className="mt-1 text-xs text-slate-500">
                      Preview your course details
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6">
                {/* Preview Banner */}
                <div className="relative flex h-36 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-800">
                  <div className="absolute -right-8 -top-10 h-32 w-32 rounded-full bg-white/10" />
                  <div className="absolute -bottom-12 -left-6 h-32 w-32 rounded-full bg-white/10" />

                  <FaGraduationCap
                    size={60}
                    className="relative text-white/90"
                  />

                  <span className="absolute left-4 top-4 rounded-full border border-white/20 bg-white/15 px-3 py-1 text-xs font-semibold text-white">
                    NEW COURSE
                  </span>
                </div>

                <div className="mt-5">
                  <p className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
                    Course Title
                  </p>

                  <h3 className="mt-2 break-words text-xl font-bold text-slate-900">
                    {formData.name || "Your Course Name"}
                  </h3>

                  <p className="mt-3 whitespace-pre-wrap break-words text-sm leading-6 text-slate-500">
                    {formData.description ||
                      "Your course description will appear here. Add a description to tell students what they can expect to learn."}
                  </p>
                </div>

                <div className="mt-6 flex items-center gap-3 border-t border-slate-100 pt-5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
                    <FaGraduationCap size={20} />
                  </div>

                  <div className="min-w-0">
                    <p className="text-xs text-slate-400">
                      Created by
                    </p>
                    <p className="truncate text-sm font-semibold text-slate-800">
                      {username || "Administrator"}
                    </p>
                  </div>

                  <div className="ml-auto flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
                    <FiCheckCircle size={14} />
                    Draft
                  </div>
                </div>
              </div>
            </div>

            {/* Helpful Information */}
            <div className="rounded-3xl border border-indigo-100 bg-indigo-50/70 p-6">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-indigo-600 shadow-sm">
                  <FiLayers size={21} />
                </div>

                <div>
                  <h3 className="font-bold text-slate-900">
                    What happens next?
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    After creating your course, you can open its management
                    page, add classes, attach video links, and organize your
                    learning content.
                  </p>
                </div>
              </div>

              <div className="mt-5 space-y-3">
                <div className="flex items-center gap-3 rounded-xl bg-white/80 p-3">
                  <FiCheckCircle
                    size={18}
                    className="shrink-0 text-indigo-600"
                  />
                  <span className="text-sm text-slate-700">
                    Add your course information
                  </span>
                </div>

                <div className="flex items-center gap-3 rounded-xl bg-white/80 p-3">
                  <FiCheckCircle
                    size={18}
                    className="shrink-0 text-indigo-600"
                  />
                  <span className="text-sm text-slate-700">
                    Create and organize classes
                  </span>
                </div>

                <div className="flex items-center gap-3 rounded-xl bg-white/80 p-3">
                  <FiCheckCircle
                    size={18}
                    className="shrink-0 text-indigo-600"
                  />
                  <span className="text-sm text-slate-700">
                    Add learning videos
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CreateCourse;