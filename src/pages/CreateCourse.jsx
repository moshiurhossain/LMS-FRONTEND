import { useState } from "react"
import UserInfo from "../components/UserInfo"
import {
    useCreateCourseApiMutation,
    useGetUserApiQuery
} from "../services/api"
import { useNavigate } from "react-router"

const CreateCourse = () => {

    const navigate = useNavigate()

    const { data } = useGetUserApiQuery()

    const username = data?.data?.name
    const useremail = data?.data?.email
    const userrole = data?.data?.role
    const userID = data?.data?._id

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        createdBy: '',
    })

    const [createCourseApi] = useCreateCourseApiMutation()

    const handleCreateCourse = async (e) => {
        e.preventDefault()

        try {

            const res = await createCourseApi({
                ...formData,
                createdBy: userID
            }).unwrap()

            console.log(res)
            navigate('/admin/createdcourse',navigate('/admin/createdcourse', {
            state: {
                user: data?.data,
                course: res?.data,
                    },
            }))

        } catch (err) {
            console.log('this error from create-course:', err)
        }
    }

    return (
        <div className="w-full flex flex-col">

            {/* Top Header */}
            <div className="px-5 flex items-center justify-between w-full bg-gray-100">
                <UserInfo
                    username={username}
                    useremail={useremail}
                    userrole={userrole}
                />
            </div>

            {/* Create Course Content */}
            <div className="w-[30%] rounded-2xl text-white font-bold p-2 mx-auto mt-2 flex flex-col items-center bg-[#bdb9da]">

                <h2>Create Your New Course.....</h2>

                <form
                    onSubmit={handleCreateCourse}
                    className="flex flex-col items-center"
                >

                    <div className="m-2">
                        <input
                            className="bg-amber-50 text-black"
                            type="text"
                            value={formData.name}
                            placeholder="Course Name"
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    name: e.target.value
                                })
                            }
                        />
                    </div>

                    <div className="m-2">
                        <input
                            className="bg-amber-50 text-black"
                            type="text"
                            value={formData.description}
                            placeholder="Course Description"
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    description: e.target.value
                                })
                            }
                        />
                    </div>

                    <button
                        type="submit"
                        className="bg-[#5f3fd1] text-white font-bold p-3 rounded-xl"
                    >
                        Create Course
                    </button>

                </form>

            </div>

        </div>
    )
}

export default CreateCourse