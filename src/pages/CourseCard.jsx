const CourseCard = ({ course }) => {
    return (
        <div className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

            {/* Course Image */}
            <div className="relative h-48 overflow-hidden bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-5xl font-bold text-white/90">
                        {course.name?.charAt(0).toUpperCase()}
                    </span>
                </div>

                {/* Course badge */}
                <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-gray-700 backdrop-blur-sm">
                    Course
                </div>
            </div>

            {/* Content */}
            <div className="p-5">

                <h2 className="mb-2 line-clamp-1 text-xl font-bold text-gray-900">
                    {course.name}
                </h2>

                <p className="mb-5 line-clamp-2 min-h-[48px] text-sm leading-6 text-gray-500">
                    {course.description}
                </p>

                {/* Course information */}
                <div className="mb-5 flex items-center justify-between border-t border-gray-100 pt-4">

                    <div className="flex items-center gap-2 text-sm text-gray-500">
                        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                            📚
                        </span>
                        <span>
                            {course.classes?.length || 0} Classes
                        </span>
                    </div>

                    <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-600">
                        Active
                    </span>

                </div>

                {/* Button */}
                <button className="w-full rounded-xl bg-gray-900 px-4 py-3 text-sm font-semibold text-white transition-colors duration-300 hover:bg-indigo-600">
                    View Course
                </button>

            </div>
        </div>
    );
};

export default CourseCard;