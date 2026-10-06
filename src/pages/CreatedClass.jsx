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

      // Normal YouTube URL
      if (urlObject.hostname.includes("youtube.com")) {
        videoId = urlObject.searchParams.get("v");
      }

      // Short YouTube URL
      if (urlObject.hostname === "youtu.be") {
        videoId = urlObject.pathname.slice(1);
      }

      if (!videoId) return "";

      return `https://www.youtube.com/embed/${videoId}`;
    } catch (error) {
      return "";
    }
  };

  const youtubeEmbedUrl = getYoutubeEmbedUrl(videoUrl);

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">

        {/* Header */}
        <div className="mb-8">
          <p className="mb-2 text-sm font-medium text-indigo-600">
            Course Management
          </p>

          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Created Class
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            View the details and information of your newly created class.
          </p>
        </div>

        {/* Main Card */}
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

          {/* Top Section */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-8 sm:px-8">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">

              <div>
                <span className="inline-flex rounded-full bg-white/20 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                  Class Created
                </span>

                <h2 className="mt-4 text-2xl font-bold text-white sm:text-3xl">
                  {name || "Class Name"}
                </h2>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-indigo-100">
                  Learn and explore this class through the provided video
                  lesson.
                </p>
              </div>

              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white/15 text-2xl font-bold text-white backdrop-blur-sm">
                CL
              </div>

            </div>
          </div>

          {/* Content */}
          <div className="p-6 sm:p-8">

            {/* Video Section */}
            <div className="mb-8">

              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">
                  Class Video
                </h3>

                <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                  Available
                </span>
              </div>

              <div className="overflow-hidden rounded-2xl border border-gray-200 bg-gray-50 p-4">

                {/* YouTube Video */}
                {youtubeEmbedUrl ? (
                  <div className="aspect-video overflow-hidden rounded-xl bg-black">
                    <iframe
                      className="h-full w-full"
                      src={youtubeEmbedUrl}
                      title={name || "Class Video"}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    ></iframe>
                  </div>
                ) : (
                  <div className="flex aspect-video items-center justify-center rounded-xl bg-gray-900">
                    <div className="text-center">
                      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white text-xl text-gray-900 shadow-lg">
                        ▶
                      </div>

                      <p className="mt-4 text-sm font-medium text-white">
                        Video Not Available
                      </p>

                      <p className="mt-1 text-xs text-gray-400">
                        No valid YouTube video URL was provided.
                      </p>
                    </div>
                  </div>
                )}

                {/* Video URL */}
                <div className="mt-4 rounded-lg bg-white px-4 py-3">
                  <p className="mb-1 text-xs font-medium uppercase tracking-wide text-gray-400">
                    Video URL
                  </p>

                  <p className="break-all text-sm text-gray-700">
                    {videoUrl || "No video URL available"}
                  </p>
                </div>

              </div>
            </div>

            {/* Details */}
            <div>
              <h3 className="mb-4 text-lg font-semibold text-gray-900">
                Class Information
              </h3>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

                {/* Class ID */}
                <div className="rounded-xl border border-gray-200 bg-gray-50 p-5">
                  <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                    Class ID
                  </p>

                  <p className="mt-2 break-all text-sm font-semibold text-gray-800">
                    {classID || "N/A"}
                  </p>
                </div>

                {/* Class Name */}
                <div className="rounded-xl border border-gray-200 bg-gray-50 p-5">
                  <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                    Class Name
                  </p>

                  <p className="mt-2 text-sm font-semibold text-gray-800">
                    {name || "N/A"}
                  </p>
                </div>

                {/* Course ID */}
                <div className="rounded-xl border border-gray-200 bg-gray-50 p-5">
                  <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                    Course ID
                  </p>

                  <p className="mt-2 break-all text-sm font-semibold text-gray-800">
                    {courseId || "N/A"}
                  </p>
                </div>

                {/* Created By */}
                <div className="rounded-xl border border-gray-200 bg-gray-50 p-5">
                  <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                    Created By
                  </p>

                  <p className="mt-2 break-all text-sm font-semibold text-gray-800">
                    {createdBy || "N/A"}
                  </p>
                </div>

              </div>
            </div>

          </div>

          {/* Footer */}
          <div className="border-t border-gray-200 bg-gray-50 px-6 py-5 sm:px-8">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

              <p className="text-sm text-gray-500">
                Your class has been successfully created.
              </p>

              <div className="flex gap-3">
                <button className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100">
                  Back
                </button>

                <button className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-700">
                  View Course
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CreatedClass;