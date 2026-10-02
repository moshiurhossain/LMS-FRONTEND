import { Link } from 'react-router'


const AdminNavbar = () => {
  return (
    <div className='bg-[#4c23ad] text-white  flex items-center justify-between  min-h-screen  w-[15%]'>

        
        
        
        {/* links */}
        <div className='flex flex-col gap-2 mt-5 w-full'>
        <Link to='/admin' className='block px-4 py-2 hover:bg-[#3a1a8c] w-full font-bold text-[15px] '>My Profile</Link>
        <Link to='/admin' className='block px-4 py-2 hover:bg-[#3a1a8c] w-full font-bold text-[15px]'>Created courses</Link>
        <Link to='/admin' className='block px-4 py-2 hover:bg-[#3a1a8c] w-full font-bold text-[15px]'>Analytics</Link>
        </div>

    </div>
  )
}

export default AdminNavbar