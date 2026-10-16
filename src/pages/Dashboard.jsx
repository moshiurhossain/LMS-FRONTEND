// // import { useLocation } from "react-router"
// import { useGetUserApiQuery } from "../services/api"
// import UserInfo from "../components/UserInfo"
// import { useNavigate } from "react-router"


// const Dashboard = () => {
//   const navigate = useNavigate()
//   // const location = useLocation()
//   // const user = location.state?.user
//   // console.log(user)
//   const {data} =useGetUserApiQuery()
//   const userData = data?.data
//   const userRole = data?.data?.role
//   const username = data?.data?.name
//   const useremail = data?.data?.email
//   const userrole = data?.data?.role
//   // handle create course button click
//   const handleCreateCourse = (e) => {
//    e.preventDefault()
//    navigate('/admin/createcourse',{
//      state :{
//       user:userData,
//       role:userRole,
//      }
//    })

//   }
//   return (
//     <>
//     <div className="h-[100px] px-5 flex items-center justify-between w-full bg-gray-100 ">
//       <div>
//      <UserInfo username={username} useremail={useremail} userrole={userrole}/>

//       </div>
//     <button
//     onClick={handleCreateCourse}
//     className="bg-[#2e31ddb6] text-white font-bold p-4 cursor-pointer rounded-lg hover:bg-[#16199eb6]">Create Course</button>       
//     </div>
//     </>
//   )
// }

// export default Dashboard

import { useGetUserApiQuery, useGetCoursesByCreatorApiQuery } from "../services/api";
import UserInfo from "../components/UserInfo";
import { useNavigate } from "react-router";
import { FiBookOpen, FiEdit, FiPlus } from "react-icons/fi";

const Dashboard = () => {
  const navigate = useNavigate();

  const { data: userResponse, isLoading: isUserLoading } =
    useGetUserApiQuery();

  const userData = userResponse?.data;
  const userRole = userData?.role;

  const {
    data: coursesResponse,
    isLoading: isCoursesLoading,
    isError,
    error,
  } = useGetCoursesByCreatorApiQuery(undefined, {
    skip: !userData,
  });

  const courses = coursesResponse?.data || [];

  const handleCreateCourse = () => {
    navigate("/admin/createcourse", {
      state: {
        user: userData,
        role: userRole,
      },
    });
  };

  const handleEditCourse = (courseId) => {
    navigate(`/admin/editcourse/${courseId}`);
  };

  if (isUserLoading) {
    return <div className="p-8 text-slate-600">Loading dashboard...</div>;
  }

  return (
    <div className="min-h-screen bg-slate-50 w-full">
      {/* Dashboard header */}
      <div className="flex flex-col gap-4 border-b border-slate-200 bg-white px-6 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-10">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Admin Dashboard
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Manage your courses and learning content.
          </p>
        </div>

        <button
          type="button"
          onClick={handleCreateCourse}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-3 font-semibold text-white transition hover:bg-violet-700"
        >
          <FiPlus />
          Create Course
        </button>
      </div>

      <div className="p-6 sm:p-10">
        {/* User information */}
        <div className="mb-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <UserInfo
            username={userData?.name}
            useremail={userData?.email}
            userrole={userRole}
          />
        </div>

        {/* Courses section */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-800">
              My Courses
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              View and update the courses you've created.
            </p>
          </div>

          <span className="rounded-full bg-violet-100 px-3 py-1 text-sm font-semibold text-violet-700">
            {courses.length} courses
          </span>
        </div>

        {isCoursesLoading ? (
          <p className="py-8 text-slate-500">Loading courses...</p>
        ) : isError ? (
          <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
            {error?.data?.message || "Failed to load courses."}
          </div>
        ) : courses.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center">
            <FiBookOpen className="mx-auto mb-4 text-4xl text-slate-400" />
            <h3 className="text-lg font-bold text-slate-800">
              No courses yet
            </h3>
            <p className="mt-2 text-sm text-slate-500">
              Create your first course to get started.
            </p>
            <button
              type="button"
              onClick={handleCreateCourse}
              className="mt-5 rounded-xl bg-violet-600 px-5 py-3 font-semibold text-white hover:bg-violet-700"
            >
              Create Your First Course
            </button>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3 max-h-80 overflow-y-scroll border-slate-600">
            {courses.map((course) => (
              <div
                key={course._id}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
             

                <div className="flex gap-5">
                
                {/* class number */}
                <div className="mb-4 flex h-12 items-center justify-center gap-2 rounded-xl bg-violet-100 px-3 text-violet-700">
                <span className="text-lg font-bold">
                  {Array.isArray(course.classes) ? course.classes.length : 0}
                </span>
                <span className="text-sm font-medium">
                  {course.classes?.length === 1 ? "Class" : "Classes"}
                </span>
              </div>        
                {/* class number */}
                {/* Book symbol */}
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-violet-100 text-violet-700">
                  <FiBookOpen className="text-2xl" />
                </div>
                {/* Book symbol */}


                </div>

                <h3 className="break-words text-lg font-bold text-slate-800">
                  {course.name}
                </h3>

                <p className="mt-2 line-clamp-3 min-h-12 text-sm leading-6 text-slate-500">
                  {course.description || "No description provided."}
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() =>
                      navigate(`/admin/course/${course._id}`)
                    }
                    className="flex-1 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                  >
                    View Course
                  </button>

                  <button
                    type="button"
                    onClick={() => handleEditCourse(course._id)}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-700"
                  >
                    <FiEdit />
                    Edit
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
