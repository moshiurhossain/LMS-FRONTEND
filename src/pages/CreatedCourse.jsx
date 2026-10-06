import { useLocation, useNavigate } from "react-router"
import { useCreateClassApiMutation, useGetCourseApiQuery } from "../services/api"
import { useState } from "react"

const CreatedCourse = () => {
    const navigate = useNavigate()
     const [formData,setFormData] = useState({
        name :'',
        videoUrl :'',
        courseId :'',
        createdBy :'',
    })

    const [createClassApi] =useCreateClassApiMutation()

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


    

    const handleAddClass = async(e)=>{
        e.preventDefault()
        try{
        const res = await createClassApi({...formData,
            courseId:course?._id,
            createdBy:course?.createdBy,
        }).unwrap()
        console.log(res)
        navigate('/admin/createdclass',{
            state:{
                classDetails:res,
            }
        })
        }catch(err){
            console.log(err)
        }
    
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
                <button className="cursor-pointer hover:bg-[#1b3b66] p-2 bg-[#21426d] mb-6 rounded-xl text-white font-bold ">Visit Course</button>
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
                <div className="flex">
                    <button className="p-2 m-2 bg-[#dd1b1b] text-white font-bold rounded-xl">Delete</button>
                    <button className="p-2 m-2 bg-[#dd1b1b] text-white font-bold rounded-xl">Edit</button>
                    
                </div>

          
        </div>
            {/* right-side-display */}
        <div className="flex flex-1 flex-col justify-center items-center bg-[#853b3b]">
            <h2 className="font-bold text-xl text-[#9e95b4]">Create Class</h2>

       {/* create class form */}
                     <div className="w-[60%] bg-[#a6cfc9] flex flex-col mt-2 rounded-2xl justify-center items-center">
                <h2 className=" font-bold text-2xl text-white mt-1">Add Class</h2>
                <div className="w-[70%]">
                <input 
                onChange={(e)=>setFormData({...formData,name:e.target.value})}
                type="text" placeholder="Class Name" 
                className="bg-white mt-2 w-full " />
                </div>
                <div className="w-[70%]">
                <input 
                onChange={(e)=>setFormData({...formData,videoUrl:e.target.value})}
                type="text" placeholder="Video URL" 
                className="bg-white mt-2 w-full"/>
                </div>
                

               <div>
                <button
                 onClick={handleAddClass}
                className="cursor-pointer hover:bg-[#1b3b66] p-2 mt-2 bg-[#21426d] mb-6 rounded-xl text-white font-bold ">Create Class</button>
             </div>
               
            </div>
            {/* create class form ends*/}
        </div>    
        </div>
        </>
    )
}

export default CreatedCourse