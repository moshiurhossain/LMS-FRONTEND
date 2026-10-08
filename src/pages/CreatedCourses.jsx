import { useGetCoursesByCreatorApiQuery } from "../services/api";

const CreatedCourses = () => {
    const {
        data,
        isLoading,
        isError,
        error,
    } = useGetCoursesByCreatorApiQuery();

    console.log("API DATA:", data);
    console.log("API ERROR:", error);

    // Loading
    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="text-xl font-semibold text-gray-700">
                    Loading courses...
                </div>
            </div>
        );
    }

    // Error
    if (isError) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="bg-white rounded-xl shadow-md p-8 text-center">
                    <h2 className="text-2xl font-bold text-red-600 mb-3">
                        Failed to load courses
                    </h2>

                    <p className="text-gray-600">
                        {error?.data?.message || "Something went wrong"}
                    </p>
                </div>
            </div>
        );
    }

    // API response:
    // {
    //   success: true,
    //   message: "...",
    //   data: [...]
    // }

    const courses = data?.data || [];

    return (
        <div className="min-h-screen bg-gray-100 px-6 py-10">

            {/* Header */}
            <div className="max-w-7xl mx-auto mb-10">
                <h1 className="text-3xl font-bold text-gray-900">
                    My Created Courses
                </h1>

                <p className="text-gray-500 mt-2">
                    Manage all the courses you have created.
                </p>
            </div>

            {/* No Courses */}
            {courses.length === 0 ? (
                <div className="max-w-7xl mx-auto">
                    <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
                        <h2 className="text-2xl font-semibold text-gray-800">
                            No courses found
                        </h2>

                        <p className="text-gray-500 mt-2">
                            You haven't created any courses yet.
                        </p>
                    </div>
                </div>
            ) : (

                /* Course Grid */
                <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

                    {courses.map((course) => (
                        <div
                            key={course._id}
                            className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition duration-300 overflow-hidden border border-gray-100"
                        >

                            {/* Course Top */}
                            <div className="h-36 bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center">
                                <h2 className="text-2xl font-bold text-white text-center px-5">
                                    {course.name}
                                </h2>
                            </div>

                            {/* Course Content */}
                            <div className="p-6">

                                <p className="text-gray-600 text-sm leading-6 line-clamp-3">
                                    {course.description}
                                </p>

                                {/* Course Info */}
                                <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">

                                    <div>
                                        <p className="text-xs text-gray-400">
                                            Classes
                                        </p>

                                        <p className="font-semibold text-gray-800">
                                            {course.classes?.length || 0}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-xs text-gray-400">
                                            Students
                                        </p>

                                        <p className="font-semibold text-gray-800">
                                            {course.subscribedUsers?.length || 0}
                                        </p>
                                    </div>

                                </div>

                                {/* Button */}
                                <button
                                    type="button"
                                    className="w-full mt-6 bg-gray-900 hover:bg-gray-800 text-white py-3 rounded-xl font-medium transition"
                                >
                                    View Course
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