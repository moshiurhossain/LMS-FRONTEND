import { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import {
  FiArrowLeft,
  FiEdit3,
  FiVideo,
  FiFileText,
  FiLink,
  FiSave,
  FiX,
  FiBookOpen,
  FiAlertCircle,
} from "react-icons/fi";
import { useEditClassApiMutation } from "../services/api";

const EditClass = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { classId } = useParams();

  const classDetails = location.state?.classDetails;
  const courseId = location.state?.courseId || classDetails?.courseId;

  const [editClassApi, { isLoading }] = useEditClassApiMutation();

  const [formData, setFormData] = useState({
    name: "",
    videoUrl: "",
    description: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  // Populate form with the selected class details
  useEffect(() => {
    if (classDetails) {
      setFormData({
        name: classDetails.name || "",
        videoUrl: classDetails.videoUrl || "",
        description: classDetails.description || "",
      });
    }
  }, [classDetails]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Submit updated class details
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!classId) {
      setErrorMessage("Class ID is missing.");
      return;
    }

    try {
      await editClassApi({
        classId,
        name: formData.name.trim(),
        videoUrl: formData.videoUrl.trim(),
        description: formData.description.trim(),
      }).unwrap();

      alert("Class updated successfully!");

      if (courseId) {
        navigate(`/admin/course/${courseId}`);
      } else {
        navigate(-1);
      }
    } catch (error) {
      console.error("Edit class failed:", error);

      setErrorMessage(
        error?.data?.message || "Failed to update class. Please try again."
      );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-5xl">
        {/* Back Button */}
        <button
          type="button"
          onClick={() => {
            if (courseId) {
              navigate(`/admin/course/${courseId}`);
            } else {
              navigate(-1);
            }
          }}
          className="mb-6 flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-indigo-600"
        >
          <FiArrowLeft size={19} />
          Back to Course
        </button>

        {/* Page Header */}
        <div className="mb-8">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-600 shadow-sm">
            <FiEdit3 size={27} />
          </div>

          <h1 className="mt-5 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Edit Class
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
            Update your class information, video content, and description.
          </p>
        </div>

        {/* Form Layout */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
              {/* Form Header */}
              <div className="border-b border-slate-100 px-6 py-5 sm:px-8">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                    <FiBookOpen size={20} />
                  </div>

                  <div>
                    <h2 className="font-bold text-slate-900">
                      Class Information
                    </h2>
                    <p className="mt-1 text-xs text-slate-500">
                      Update the details of your class
                    </p>
                  </div>
                </div>
              </div>

              {/* Form Fields */}
              <form onSubmit={handleSubmit} className="space-y-6 p-6 sm:p-8">
                {/* Error Message */}
                {errorMessage && (
                  <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                    <FiAlertCircle size={19} className="mt-0.5 shrink-0" />
                    <p>{errorMessage}</p>
                  </div>
                )}

                {/* Class Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Class Name <span className="text-red-500">*</span>
                  </label>

                  <div className="relative">
                    <FiEdit3
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your class name"
                      required
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-3.5 pl-11 pr-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
                    />
                  </div>
                </div>

                {/* Video URL */}
                <div>
                  <label
                    htmlFor="videoUrl"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Video URL <span className="text-red-500">*</span>
                  </label>

                  <div className="relative">
                    <FiLink
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      id="videoUrl"
                      name="videoUrl"
                      type="url"
                      value={formData.videoUrl}
                      onChange={handleChange}
                      placeholder="https://www.youtube.com/watch?v=..."
                      required
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-3.5 pl-11 pr-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
                    />
                  </div>

                  <p className="mt-2 text-xs text-slate-400">
                    Enter the video URL students will use to watch this class.
                  </p>
                </div>

                {/* Description */}
                <div>
                  <label
                    htmlFor="description"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Class Description
                  </label>

                  <div className="relative">
                    <FiFileText
                      size={18}
                      className="absolute left-4 top-4 text-slate-400"
                    />

                    <textarea
                      id="description"
                      name="description"
                      rows={6}
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="Describe what students will learn in this class..."
                      className="w-full resize-y rounded-xl border border-slate-200 bg-slate-50/50 py-3.5 pl-11 pr-4 text-sm leading-6 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
                    />
                  </div>
                </div>

                {/* Form Actions */}
                <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-6 sm:flex-row sm:justify-end">
                  <button
                    type="button"
                    onClick={() => {
                      if (courseId) {
                        navigate(`/admin/course/${courseId}`);
                      } else {
                        navigate(-1);
                      }
                    }}
                    disabled={isLoading}
                    className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 disabled:opacity-50"
                  >
                    <FiX size={17} />
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <FiSave size={17} />
                    {isLoading ? "Saving Changes..." : "Save Changes"}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Video Preview */}
            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-100 px-5 py-4">
                <h3 className="font-bold text-slate-900">Video Preview</h3>
                <p className="mt-1 text-xs text-slate-500">
                  Current class video
                </p>
              </div>

              <div className="p-5">
                {formData.videoUrl ? (
                  <div className="flex aspect-video items-center justify-center overflow-hidden rounded-2xl bg-slate-900">
                    <a
                      href={formData.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col items-center gap-3 text-white transition hover:text-indigo-300"
                    >
                      <FiVideo size={42} />
                      <span className="text-sm font-medium">
                        Open Video
                      </span>
                    </a>
                  </div>
                ) : (
                  <div className="flex aspect-video flex-col items-center justify-center rounded-2xl border-2 border-dashed border-indigo-200 bg-gradient-to-br from-indigo-50 to-slate-50">
                    <FiVideo size={35} className="text-indigo-400" />
                    <p className="mt-3 text-sm font-semibold text-slate-700">
                      No video URL
                    </p>
                    <p className="mt-1 text-xs text-slate-400">
                      Enter a video URL to see the link.
                    </p>
                  </div>
                )}

                <div className="mt-4 rounded-xl bg-amber-50 p-3.5 text-xs leading-5 text-amber-800">
                  Make sure the video URL is correct and accessible to your students.
                </div>
              </div>
            </div>

            {/* Editing Tips */}
            <div className="rounded-3xl bg-gradient-to-br from-indigo-600 to-violet-700 p-6 text-white shadow-lg shadow-indigo-200/40">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15">
                <FiEdit3 size={22} />
              </div>

              <h3 className="mt-5 text-lg font-bold">Editing Tips</h3>

              <ul className="mt-4 space-y-4 text-sm leading-6 text-indigo-100">
                <li className="flex gap-3">
                  <span className="font-bold text-white">01.</span>
                  Use a short, meaningful class title.
                </li>
                <li className="flex gap-3">
                  <span className="font-bold text-white">02.</span>
                  Double-check your video link before saving.
                </li>
                <li className="flex gap-3">
                  <span className="font-bold text-white">03.</span>
                  Keep your description helpful and easy to understand.
                </li>
              </ul>
            </div>
          </div>
        </div>

        <p className="mt-8 text-center text-xs text-slate-400">
          LMS Admin Dashboard · Class Management
        </p>
      </div>
    </div>
  );
};

export default EditClass;