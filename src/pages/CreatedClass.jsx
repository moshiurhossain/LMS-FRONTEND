
import { useLocation } from "react-router";

const CreatedClass = () => {
  const location = useLocation();

  const classDetails = location.state?.classDetails;

  const classData = classDetails?.data?.class;
  const courseData = classDetails?.data?.course;

  const classID = classData?._id;
  const name = classData?.name;
  const videoUrl = classData?.videoUrl;
  const courseId = classData?.courseId;
  const createdBy = courseData?.createdBy;

  // Convert YouTube URL to embed URL
  const getYoutubeEmbedUrl = (url) => {
    if (!url) return "";

    try {
      const urlObject = new URL(url);

      let videoId = "";

      if (urlObject.hostname.includes("youtube.com")) {
        videoId = urlObject.searchParams.get("v");
      }

      if (urlObject.hostname === "youtu.be") {
        videoId = urlObject.pathname.slice(1);
      }

      if (!videoId) return "";

      return `https://www.youtube.com/embed/${videoId}`;
    } catch (error) {
      console.log(error);
      return "";
    }
  };

  const youtubeEmbedUrl = getYoutubeEmbedUrl(videoUrl);

  return (
    <div className="min-h-screen bg-[#f5f7fc] px-4 py-8 text-slate-800 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">

        {/* Breadcrumb */}
        <div className="mb-8 flex flex-wrap items-center gap-2 text-sm">
          <span className="font-medium text-slate-400">
            Dashboard
          </span>
          <span className="text-slate-300">/</span>
          <span className="font-medium text-slate-400">
            Course Management
          </span>
          <span className="text-slate-300">/</span>
          <span className="font-semibold text-indigo-600">
            Created Class
          </span>
        </div>

        {/* Page Header */}
        <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-indigo-600">
              <span className="h-2 w-2 rounded-full bg-indigo-500" />
              Learning Management System
            </div>

            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Class Overview
            </h1>

            <p className="mt-3 max-w-xl text-sm leading-6 text-slate-500 sm:text-base">
              Everything you need to manage and review your newly created
              class in one place.
            </p>
          </div>

          <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>

            <div>
              <p className="text-sm font-bold text-slate-800">
                Class Created
              </p>
              <p className="mt-1 text-xs text-slate-500">
                Successfully saved
              </p>
            </div>
          </div>
        </div>

        {/* Main Layout */}
        <div className="grid grid-cols-1 items-start gap-7 lg:grid-cols-3">

          {/* Main Content */}
          <div className="space-y-7 lg:col-span-2">

            {/* Class Banner */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-700 p-6 shadow-xl shadow-indigo-200/50 sm:p-9">
              <div className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full border-[35px] border-white/10" />
              <div className="pointer-events-none absolute -bottom-28 right-28 h-56 w-56 rounded-full bg-purple-400/20 blur-2xl" />

              <div className="relative z-10">
                <div className="mb-6 flex items-center justify-between gap-4">
                  <span className="rounded-full border border-white/20 bg-white/15 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-md">
                    CLASS DETAILS
                  </span>

                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/20 bg-white/15 text-lg font-extrabold text-white shadow-lg backdrop-blur-md sm:h-16 sm:w-16 sm:text-xl">
                    CL
                  </div>
                </div>

                <p className="mb-2 text-sm font-medium text-indigo-100">
                  Welcome to your new class
                </p>

                <h2 className="max-w-2xl break-words text-2xl font-extrabold leading-tight text-white sm:text-4xl">
                  {name || "Your Class Name"}
                </h2>

                <p className="mt-4 max-w-lg text-sm leading-7 text-indigo-100 sm:text-base">
                  Your class is ready. Access the lesson video and review
                  the information associated with this class below.
                </p>

                <div className="mt-7 flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-bold text-indigo-700 shadow-md">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.868v4.264a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    Video Lesson
                  </span>

                  <span className="text-xs font-medium text-indigo-100">
                    Your learning content is ready to view
                  </span>
                </div>
              </div>
            </div>

            {/* Video Card */}
            <div className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-sm">
              <div className="flex flex-col justify-between gap-3 border-b border-slate-100 px-5 py-5 sm:flex-row sm:items-center sm:px-7">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-rose-50 text-rose-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M23.5 6.2a3 3 0 00-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 00.5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 002.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 002.1-2.1c.5-1.9.5-5.8.5-5.8s0-3.9-.5-5.8zM9.6 15.6V8.4l6.3 3.6-6.3 3.6z" />
                    </svg>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-slate-900 sm:text-lg">
                      Class Video
                    </h3>
                    <p className="mt-1 text-xs text-slate-500">
                      Watch your lesson directly below
                    </p>
                  </div>
                </div>

                <span className="inline-flex w-fit items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  {youtubeEmbedUrl ? "Video Available" : "No Video"}
                </span>
              </div>

              <div className="p-4 sm:p-7">
                {/* YouTube Video */}
                {youtubeEmbedUrl ? (
                  <div className="aspect-video overflow-hidden rounded-2xl bg-black shadow-lg shadow-slate-900/10 ring-1 ring-black/5">
                    <iframe
                      className="h-full w-full"
                      src={youtubeEmbedUrl}
                      title={name || "Class Video"}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    ></iframe>
                  </div>
                ) : (
                  <div className="flex aspect-video flex-col items-center justify-center rounded-2xl bg-slate-950 px-4 text-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full border border-white/10 bg-white/10 text-2xl text-white">
                      ▶
                    </div>

                    <p className="mt-5 text-base font-bold text-white">
                      Video Not Available
                    </p>

                    <p className="mt-2 max-w-sm text-sm leading-6 text-slate-400">
                      No valid YouTube video URL was provided for this class.
                    </p>
                  </div>
                )}

                {/* Video URL */}
                <div className="mt-5 rounded-2xl border border-slate-100 bg-slate-50 p-4 sm:p-5">
                  <div className="mb-3 flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-indigo-600 shadow-sm">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M13.828 10.172a4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M10.172 13.828a4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5"
                        />
                      </svg>
                    </div>

                    <p className="text-xs font-bold uppercase tracking-widest text-slate-500">
                      Source Video URL
                    </p>
                  </div>

                  <p className="break-all text-sm leading-6 text-slate-700">
                    {videoUrl || "No video URL available"}
                  </p>
                </div>
              </div>
            </div>

            {/* Class Information */}
            <div className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-7">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 5a2 2 0 002 2h2a2 2 0 002-2 2 2 0 00-2-2h-2a2 2 0 00-2 2z"
                    />
                  </svg>
                </div>

                <div>
                  <h3 className="text-lg font-extrabold text-slate-900">
                    Class Information
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">
                    Essential details about your class
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                {/* Class ID */}
                <div className="group rounded-2xl border border-slate-100 bg-slate-50/70 p-5 transition duration-200 hover:border-indigo-200 hover:bg-indigo-50/40">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-indigo-500" />
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Class ID
                    </p>
                  </div>

                  <p className="mt-3 break-all text-sm font-semibold leading-6 text-slate-800">
                    {classID || "N/A"}
                  </p>
                </div>

                {/* Class Name */}
                <div className="group rounded-2xl border border-slate-100 bg-slate-50/70 p-5 transition duration-200 hover:border-violet-200 hover:bg-violet-50/40">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-violet-500" />
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Class Name
                    </p>
                  </div>

                  <p className="mt-3 break-words text-sm font-semibold leading-6 text-slate-800">
                    {name || "N/A"}
                  </p>
                </div>

                {/* Course ID */}
                <div className="group rounded-2xl border border-slate-100 bg-slate-50/70 p-5 transition duration-200 hover:border-sky-200 hover:bg-sky-50/40">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-sky-500" />
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Course ID
                    </p>
                  </div>

                  <p className="mt-3 break-all text-sm font-semibold leading-6 text-slate-800">
                    {courseId || "N/A"}
                  </p>
                </div>

                {/* Created By */}
                <div className="group rounded-2xl border border-slate-100 bg-slate-50/70 p-5 transition duration-200 hover:border-emerald-200 hover:bg-emerald-50/40">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-emerald-500" />
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Created By
                    </p>
                  </div>

                  <p className="mt-3 break-all text-sm font-semibold leading-6 text-slate-800">
                    {createdBy || "N/A"}
                  </p>
                </div>

              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">

            {/* Status Card */}
            <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm">
              <h3 className="text-base font-extrabold text-slate-900">
                Class Status
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Current class overview
              </p>

              <div className="mt-6 rounded-2xl border border-emerald-100 bg-emerald-50/70 p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>

                  <div>
                    <p className="text-sm font-bold text-emerald-800">
                      Successfully Created
                    </p>
                    <p className="mt-1 text-xs text-emerald-700">
                      Class details are available
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-5 space-y-4">
                <div className="flex items-center justify-between gap-3 border-b border-slate-100 pb-4">
                  <span className="text-sm text-slate-500">
                    Class Name
                  </span>
                  <span className="max-w-[60%] truncate text-right text-sm font-semibold text-slate-800">
                    {name || "N/A"}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm text-slate-500">
                    Video Lesson
                  </span>
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-bold ${
                      youtubeEmbedUrl
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {youtubeEmbedUrl ? "Available" : "Unavailable"}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Details */}
            <div className="overflow-hidden rounded-3xl bg-slate-900 p-6 text-white shadow-lg shadow-slate-900/10">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-indigo-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.8}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v6l4 2"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>

              <h3 className="mt-5 text-lg font-bold">
                Ready to Learn?
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-400">
                Your class details and lesson video are organized and ready
                for review.
              </p>

              <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-white/10">
                <div className="h-full w-full rounded-full bg-gradient-to-r from-indigo-400 to-violet-400" />
              </div>

              <p className="mt-3 text-xs font-medium text-slate-400">
                Class setup complete
              </p>
            </div>
          </aside>
        </div>

        {/* Footer */}
        <div className="mt-8 flex flex-col justify-between gap-4 rounded-3xl border border-slate-200/80 bg-white px-5 py-5 shadow-sm sm:flex-row sm:items-center sm:px-7">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>

            <div>
              <p className="text-sm font-bold text-slate-800">
                Everything looks good!
              </p>
              <p className="mt-1 text-sm leading-6 text-slate-500">
                Your class has been successfully created.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <button className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-600 transition duration-200 hover:border-slate-300 hover:bg-slate-50">
              Back
            </button>

            <button className="rounded-xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-200 transition duration-200 hover:-translate-y-0.5 hover:bg-indigo-700 hover:shadow-indigo-300">
              View Course
              <span className="ml-2">→</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CreatedClass;
