import { useLocation } from "react-router"
import { useGetCourseApiQuery } from "../services/api"
import { useState } from "react"

const CreatedCourse = () => {
     const [formData,setFormData] = useState({
        name :'',
        videoUrl :'',
        courseId :'',
        createdBy :'',
    })

    // ///get course start///// //
    // use location
    const location = useLocation()

    // Get the course details passed from CreateCourse
    const courseDetails = location.state?.courseDetails

    // Get course ID from the response
    const courseId = courseDetails?.data?._id

    // Get the course using RTK Query
    const {
        data: courseData,
        isLoading,
        isError,
        error
    } = useGetCourseApiQuery(courseId, {
        skip: !courseId
    })

    console.log("Course Data:", courseData)


    if (isLoading) {
        return <div>Loading course...</div>
    }

    if (isError) {
        return (
            <div>
                Error: {error?.data?.message || "Failed to load course"}
            </div>
        )
    }

    const course = courseData?.data
    ///////// get course ends ////////
    // start add class //

   
    

    const handleAddClass = (e)=>{
        e.preventDefault()
    }
    // end add class //

    return (
        <>
        <div className="flex w-full">
            {/*left-side-display  */}
        <div className="p-10 bg-[#9762d4] ">
           <div className="flex justify-between items-center mt-3">
            <div>
            <h1 className="text-3xl font-bold mb-6 text-white">
                Course Details
            </h1>
            </div>
             <div>
                <button className="p-2 bg-[#21426d] mb-6 rounded-xl text-white font-bold ">Visit Course</button>
             </div>
           </div>
           

            <div className="bg-gray-100 p-6 rounded-xl">

                <h2 className="text-2xl font-bold mb-4">
                    {course?.name}
                </h2>

                <p className="mb-3">
                    <strong>Description:</strong>{" "}
                    {course?.description}
                </p>

                <p className="mb-3">
                    <strong>Course ID:</strong>{" "}
                    {course?._id}
                </p>

                <p>
                    <strong>Created By:</strong>{" "}
                    {course?.createdBy}
                </p>

            </div>
            <div className=" bg-[#a6cfc9] flex flex-col mt-2 rounded-2xl justify-center items-center">
                <h2 className=" font-bold text-2xl text-white mt-1">Add Class</h2>
                <div className="">
                <input 
                onChange={(e)=>setFormData({...formData,name:e.target.value})}
                type="text" placeholder="Class Name" 
                className="bg-white mt-2" />
                </div>
                <div>
                <input 
                onChange={(e)=>setFormData({...formData,videoUrl:e.target.value})}
                type="text" placeholder="Video URL" 
                className="bg-white mt-2"/>
                </div>

               <div>
                <button
                 onClick={handleAddClass}
                className="p-2 mt-2 bg-[#21426d] mb-6 rounded-xl text-white font-bold ">Create Class</button>
             </div>
               
            </div>
          
        </div>
            {/* right-side-display */}
        <div className="flex flex-1 justify-center items-center bg-[#853b3b]">
         Right side display   
        </div>    
        </div>
        </>
    )
}

export default CreatedCourse