
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import {
  FiBookOpen,
  FiFileText,
  FiArrowLeft,
  FiSave,
  FiLoader,
  FiAlertCircle,
} from "react-icons/fi";

import {
  useGetCourseApiQuery,
  useEditCourseApiMutation,
} from "../services/api";

const EditCourse = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();

  // Fetch existing course details
  const {
    data,
    isLoading: isCourseLoading,
    isError,
    error,
  } = useGetCourseApiQuery(courseId, {
    skip: !courseId,
  });

  // Edit course mutation
  const [editCourseApi, { isLoading: isSaving }] =
    useEditCourseApiMutation();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const course = data?.data;

  // Fill form after course data loads
  useEffect(() => {
    if (course) {
      setFormData({
        name: course.name || "",
        description: course.description || "",
      });
    }
  }, [course]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Submit updated course
  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrorMessage("");
    setSuccessMessage("");

    if (!courseId) {
      setErrorMessage("Course ID is missing.");
      return;
    }

    if (!formData.name.trim()) {
      setErrorMessage("Please enter a course name.");
      return;
    }

    try {
      await editCourseApi({
        courseId,
        name: formData.name.trim(),
        description: formData.description.trim(),
      }).unwrap();

      setSuccessMessage("Course updated successfully!");

      // Go back to the updated course page
      setTimeout(() => {
        navigate(`/admin/course/${courseId}`);
      }, 700);
    } catch (err) {
      console.error("Edit course failed:", err);

      setErrorMessage(
        err?.data?.message ||
          "Failed to update course. Please try again."
      );
    }
  };

  // Loading state
  if (isCourseLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="flex items-center gap-3 text-violet-700">
          <FiLoader className="animate-spin text-2xl" />
          <p className="font-medium">Loading course details...</p>
        </div>
      </div>
    );
  }

  // Fetch error state
  if (isError) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
        <div className="w-full max-w-md rounded-2xl border border-red-100 bg-white p-8 text-center shadow-sm">
          <FiAlertCircle className="mx-auto mb-4 text-4xl text-red-500" />
          <h2 className="text-xl font-bold text-slate-800">
            Unable to load course
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            {error?.data?.message ||
              "Something went wrong while fetching the course."}
          </p>

          <button
            type="button"
            onClick={() => navigate(-1)}
            className="mt-6 rounded-xl bg-violet-600 px-5 py-3 font-semibold text-white transition hover:bg-violet-700"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="text-center">
          <h2 className="text-xl font-bold text-slate-800">
            Course not found
          </h2>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="mt-4 text-violet-700 hover:underline"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-violet-700"
            >
              <FiArrowLeft />
              Back
            </button>

            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-100 text-violet-700">
                <FiBookOpen className="text-2xl" />
              </div>

              <div>
                <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
                  Edit Course
                </h1>
                <p className="mt-1 text-sm text-slate-500">
                  Update your course information.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Form layout */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main form */}
          <div className="lg:col-span-2">
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8"
            >
              <div className="mb-7 border-b border-slate-100 pb-5">
                <h2 className="text-lg font-bold text-slate-800">
                  Course Information
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Make changes to the fields below and save them.
                </p>
              </div>

              {/* Course name */}
              <div className="mb-6">
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Course Name <span className="text-red-500">*</span>
                </label>

                <div className="relative">
                  <FiBookOpen className="absolute left-4 top-1/2 -translate-y-1/2 text-lg text-slate-400" />

                  <input
                    id="name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your course name"
                    required
                    maxLength={120}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-12 pr-4 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-violet-500 focus:bg-white focus:ring-4 focus:ring-violet-100"
                  />
                </div>
              </div>

              {/* Course description */}
              <div className="mb-6">
                <label
                  htmlFor="description"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Course Description
                </label>

                <div className="relative">
                  <FiFileText className="absolute left-4 top-4 text-lg text-slate-400" />

                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Describe what students will learn in this course..."
                    rows={6}
                    maxLength={5000}
                    className="w-full resize-y rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-12 pr-4 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-violet-500 focus:bg-white focus:ring-4 focus:ring-violet-100"
                  />
                </div>

                <p className="mt-2 text-right text-xs text-slate-400">
                  {formData.description.length}/5000 characters
                </p>
              </div>

              {/* Error message */}
              {errorMessage && (
                <div className="mb-5 flex items-start gap-2 rounded-xl border border-red-100 bg-red-50 p-4 text-sm text-red-700">
                  <FiAlertCircle className="mt-0.5 shrink-0 text-lg" />
                  <p>{errorMessage}</p>
                </div>
              )}

              {/* Success message */}
              {successMessage && (
                <div className="mb-5 rounded-xl border border-green-100 bg-green-50 p-4 text-sm font-medium text-green-700">
                  {successMessage}
                </div>
              )}

              {/* Buttons */}
              <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-6 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  disabled={isSaving}
                  className="rounded-xl border border-slate-200 px-6 py-3 font-semibold text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={isSaving || Boolean(successMessage)}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-6 py-3 font-semibold text-white shadow-sm transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSaving ? (
                    <>
                      <FiLoader className="animate-spin" />
                      Saving Changes...
                    </>
                  ) : (
                    <>
                      <FiSave />
                      Save Changes
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Preview panel */}
          <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-5 flex h-32 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-indigo-800">
              <FiBookOpen className="text-5xl text-white/90" />
            </div>

            <p className="mb-2 text-xs font-bold uppercase tracking-wider text-violet-600">
              Live Preview
            </p>

            <h3 className="break-words text-xl font-bold text-slate-800">
              {formData.name || "Your course name"}
            </h3>

            <p className="mt-3 whitespace-pre-wrap break-words text-sm leading-6 text-slate-500">
              {formData.description ||
                "Your course description will appear here."}
            </p>

            <div className="mt-6 border-t border-slate-100 pt-5">
              <p className="text-xs font-medium text-slate-400">
                COURSE ID
              </p>
              <p className="mt-1 break-all font-mono text-xs text-slate-600">
                {courseId}
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default EditCourse;
