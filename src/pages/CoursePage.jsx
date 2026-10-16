
import { useParams, useNavigate } from "react-router";
import { useGetCourseApiQuery,useDeleteClassApiMutation } from "../services/api";
import {
  FiArrowLeft,
  FiBookOpen,
  FiPlayCircle,
  FiLayers,
  FiCalendar,
  FiAlertCircle,
  FiEdit,
  
} from "react-icons/fi";
import { useDeleteCourseApiMutation } from "../services/api";

const CoursePage = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  // delete class api
  const [deleteClassApi, { isLoading: isDeletingClass }] =
  useDeleteClassApiMutation();
  // delete class function
  const handleDeleteClass = async (classId) => {
  if (!window.confirm("Are you sure you want to delete this class?")) {
    return;
  }

  try {
    await deleteClassApi(classId).unwrap();

    alert("Class deleted successfully");
  } catch (error) {
    console.error("Delete class failed:", error);

    alert(error?.data?.message || "Failed to delete class");
  }
};

  const {
    data,
    isLoading,
    isError,
    error,
  } = useGetCourseApiQuery(courseId, {
    skip: !courseId,
  });
  const [deleteCourseApi] = useDeleteCourseApiMutation();

  // handledelete course function
  const handleDeleteCourse = async () => {
  if (!window.confirm("Delete this course and all its classes?")) {
    return;
  }

  try {
    await deleteCourseApi(course._id).unwrap();

    alert("Course and classes deleted successfully");

    navigate("/admin/createdcourse");
  } catch (error) {
    console.error("Delete course failed:", error);

    alert(
      error?.data?.message || "Failed to delete course"
    );
  }
};

  const course = data?.data;
  const classes = course?.classes || [];

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-indigo-100 border-t-indigo-600" />
          <p className="mt-4 text-sm font-medium text-slate-500">
            Loading course details...
          </p>
        </div>
      </div>
    );
  }

  if (isError || !course) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 p-5">
        <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <FiAlertCircle className="mx-auto text-red-500" size={42} />

          <h2 className="mt-4 text-xl font-bold text-slate-900">
            Unable to load course
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            {error?.data?.message ||
              "The course could not be found. Please try again."}
          </p>

          <button
            onClick={() => navigate("/admin/createdcourse")}
            className="mt-6 rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white transition hover:bg-indigo-700"
          >
            Back to My Courses
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen cursor-pointer bg-slate-50 px-4 py-8 sm:px-8 lg:px-10">
      {/* Back Button */}
      <button
        onClick={() => navigate("/admin/mycreatedcourse")}
        className="mb-6 flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-indigo-600"
      >
        <FiArrowLeft size={19} />
        Back to My Courses
      </button>

      {/* Course Hero */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#241052] via-[#4c23ad] to-indigo-600 p-6 text-white shadow-xl shadow-indigo-200/50 sm:p-10">
        <div className="absolute -right-16 -top-20 h-64 w-64 rounded-full bg-white/10" />
        <div className="absolute -bottom-28 right-1/4 h-64 w-64 rounded-full bg-white/5" />

        <div className="relative z-10 max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-wider">
            <FiBookOpen size={15} />
            Course Overview
          </span>

          <h1 className="mt-6 break-words text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            {course.name}
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-indigo-100 sm:text-base">
            {course.description || "No description has been added to this course yet."}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <div className="flex items-center gap-2 rounded-xl border border-white/15 bg-white/10 px-4 py-3">
              <FiLayers size={19} />
              <span className="text-sm font-medium">
                {classes.length} {classes.length === 1 ? "Class" : "Classes"}
              </span>
            </div>

            <div className="flex items-center gap-2 rounded-xl border border-white/15 bg-white/10 px-4 py-3">
              <FiCalendar size={19} />
              <span className="text-sm font-medium">
                {course.createdAt
                  ? new Date(course.createdAt).toLocaleDateString()
                  : "Date unavailable"}
              </span>
            </div>
            {/* add class button */}
            <div className=" flex items-center ml-3 rounded-xl border border-white/15 bg-white/10 px-4 py-3" >
              <button className="text-sm font-medium cursor-pointer"
                onClick={() =>
                navigate("/admin/createdcourse", {
                  state: {
                    courseDetails: {
                      data: course,
                    },
                  },
                })
              }
              >
                Add Class
              </button>
            </div>
            {/* add class button */}
            {/* delete course  */}
            <div className=" flex items-center ml-3 rounded-xl border border-white/15 bg-white/10 px-4 py-3">
             <button className="text-sm font-medium cursor-pointer"
             onClick={handleDeleteCourse}
           
             >Delete Course</button>
            </div>
            {/* delete course  */}
            {/* Edit course  */}
                        <div className=" flex items-center ml-3 rounded-xl border border-white/15 bg-white/10 px-4 py-3">
             <button className="text-sm font-medium cursor-pointer"
              onClick={() => navigate(`/admin/editcourse/${course._id}`)}
           
             >Edit Course</button>
            </div>
            {/* Edit course  */}
          </div>
        </div>

        <div className="absolute bottom-8 right-10 hidden opacity-20 lg:block">
          <FiBookOpen size={140} />
        </div>
      </div>

      {/* Course Information */}
      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-1">
          <h2 className="text-lg font-bold text-slate-900">
            Course Information
          </h2>

          <div className="mt-5 space-y-5">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Course Name
              </p>
              <p className="mt-2 break-words font-semibold text-slate-800">
                {course.name}
              </p>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Course ID
              </p>
              <p className="mt-2 break-all text-sm text-slate-600">
                {course._id}
              </p>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                URL Slug
              </p>
              <p className="mt-2 break-all text-sm text-slate-600">
                {course.slug || "Not available"}
              </p>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Total Classes
              </p>
              <p className="mt-2 text-2xl font-bold text-indigo-600">
                {classes.length}
              </p>
            </div>
          </div>
        </div>

        {/* Classes Section */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2 sm:p-8 ">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                Course Classes
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Explore all classes belonging to this course.
              </p>
            </div>

            <span className="w-fit rounded-full bg-indigo-50 px-4 py-2 text-sm font-semibold text-indigo-700">
              {classes.length} total
            </span>
          </div>

          {classes.length === 0 ? (
            <div className="mt-8 rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-5 py-12 text-center">
              <FiLayers
                size={38}
                className="mx-auto text-slate-400"
              />

              <h3 className="mt-4 font-bold text-slate-800">
                No classes available
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                There are no classes associated with this course yet.
              </p>
            </div>
          ) : (
            <div className="mt-6 space-y-4 max-h-52 overflow-y-scroll">
              {classes.map((classItem, index) => (
                <div
                  key={classItem._id || index}
                  className="group flex flex-col gap-4 rounded-2xl border border-slate-200 p-4 transition hover:border-indigo-200 hover:bg-indigo-50/40 sm:flex-row sm:items-center sm:p-5"
                >
                  <div className="flex shrink-0 items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600 transition group-hover:bg-indigo-600 group-hover:text-white">
                      <FiPlayCircle size={25} />
                    </div>

                    <div className="sm:hidden">
                      <p className="text-xs font-medium text-slate-400">
                        CLASS {index + 1}
                      </p>
                      <h3 className="mt-1 font-bold text-slate-800">
                        {classItem.name || `Class ${index + 1}`}
                      </h3>
                    </div>
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="hidden text-xs font-semibold uppercase tracking-wider text-indigo-500 sm:block">
                      Class {String(index + 1).padStart(2, "0")}
                    </p>

                    <h3 className="mt-1 hidden break-words font-bold text-slate-900 sm:block">
                      {classItem.name || `Class ${index + 1}`}
                    </h3>

                    <p className="mt-1 line-clamp-2 text-sm leading-6 text-slate-500">
                      {classItem.description || "No class description available."}
                    </p>
                  </div>

                  {classItem.videoUrl ? (
                    <a
                      href={classItem.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex shrink-0 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
                    >
                      <FiPlayCircle size={17} />
                      Watch 
                    
                    </a>
                  ) : (
                    <span className="shrink-0 rounded-xl bg-slate-100 px-4 py-3 text-center text-sm font-medium text-slate-400">
                      No video available
                    </span>
                  )}
                  {/* delete class*/}
                  <div className="flex shrink-0 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700">
                    <button className="text-sm font-semibold text-white cursor-pointer"
                     onClick={() => handleDeleteClass(classItem._id)}
                     disabled={isDeletingClass}
                    >
                     Delete
                    </button>
                  </div>
                   {/* delete class*/}
                   {/* Edit  class*/}
                     <div className="flex shrink-0 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700">
                    <button className="text-sm font-semibold flex items-center gap-0.5 text-white cursor-pointer"
                     onClick={() =>
                      navigate(`/admin/editclass/${classItem._id}`, {
                        state: {
                          classDetails: classItem,
                          courseId: course._id,
                        },
                      })
                    }
                    >
                     <FiEdit /> Edit
                    </button>
                    </div>
                   {/* Edit class*/}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CoursePage;