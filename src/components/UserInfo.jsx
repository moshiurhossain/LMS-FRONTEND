

const UserInfo = ({ username, useremail, userrole }) => {
  return (
    <div className='font-bold text-[#85216f] pl-2 pt-2'>
      <h2 className='text-[13px]'>Welcome, {username}</h2>
      <p className='text-[13px]'>Email: {useremail}</p>
      <p className='text-[13px]'>Role: {userrole}</p>
    </div>
  )
}

export default UserInfo