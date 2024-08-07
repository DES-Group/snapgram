
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Button } from '../ui/button'
import { useSignOutAccount } from '@/lib/react-query/queriesAndMutations'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUSerContext } from '@/context/AuthContext'
import { sidebarLinks } from '@/constants'
import { INavLink } from '@/types'



const LeftSidebar = () => {

  const {pathname} = useLocation()
  const { mutate: signOut, isSuccess } = useSignOutAccount()
  const navigate = useNavigate()
  const {user} = useUSerContext()

  useEffect(() => {
    if (isSuccess) {
      navigate(0) //Navigate either to signup or signin 
    }
  }, [isSuccess]) 
  

  return (
    <nav className='leftsidebar'>
      <div className='flex flex-col gap-2'>
          <Link to="/" className="flex gap-3 items-center">
          <img
            src='/assets/images/logo.svg'
            width={170}
            height={36}
          />    
        </Link>

        <Link to={`/profile/${user.id}`} className='flex w-14 gap-3 items-center'>
          <img
            src={user.imageUrl || "/assets/icons/profile-placeholder.svg"}
            alt="profile"
            className='w-14 h-14 rounded-full'
          />
          <div className='flex flex-col'>
            <p className='body-bold'>
              {user.name}
            </p>
            <p className='small-regular text-light-3'>
              @{user.username}
            </p>
          </div>
        </Link>

        <ul className='flex flex-col gap-3'>
          {
            sidebarLinks.map((link: INavLink) => {
                
              const isActive = pathname === link.route 
              
                return (
                  <li key={link.label} className={`leftsidebar-link group ${isActive && 'bg-primary-500'}`}>
                    <NavLink
                      to={link.route}
                      className="flex gap-4 items-center p-4"
                    >
                      <img
                        src={link.imgURL}
                        alt={link.label}
                        className={`group-hover:invert-white ${isActive && 'invert-white'}`}
                      />
                      {link.label}
                    </NavLink>
                  </li> 
                )
            })
          }
        </ul>

      </div>

      <Button variant="ghost" className='shad-button_ghost' onClick={()=> signOut()}>
        <img src='/assets/icons/logout.svg' alt='logout' />
        <p className='small-medium lg:base-medium'>Se déconnecter</p>
      </Button>
    </nav>
  )
}

export default LeftSidebar
