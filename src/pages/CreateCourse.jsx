import UserInfo from "../components/UserInfo"
import { useGetUserApiQuery } from "../services/api"

const CreateCourse = () => {
    const { data } = useGetUserApiQuery()

    const username = data?.data?.name
    const useremail = data?.data?.email
    const userrole = data?.data?.role
    const userData = data?.data
    // const userID = data?.data?._id

    return (
        <div className="w-full flex flex-col">

            {/* Top Header */}
            <div className="h-[100px] px-5 flex items-center justify-between w-full bg-gray-100">
                <UserInfo
                    username={username}
                    useremail={useremail}
                    userrole={userrole}
                />
            </div>

            {/* Create Course Content */}
            <div className="w-full flex">
                hello create course{userData}
            </div>

        </div>
    )
}

export default CreateCourse