import axios from 'axios';
import Avatar from 'boring-avatars'
import { useEffect, useState } from 'react'
import { SpinnerCircular } from 'spinners-react';
import { BASE_URL } from '../utils';
import './styles/index.css'
import './styles/style.css'

export const Home = () => {

  const [staffers, setStaffers] = useState([]);

  const [recentUsers, setRecentUsers] = useState([])

  const [serverStats, setServerStats] = useState({})

  const [newses, setNewses] = useState([])

  const [isLoading, setIsLoading] = useState(true);

  const getStaffers = async () => {
    setIsLoading(true)
    await axios.get(BASE_URL + '/user/get/staffers')
      .then(response => { setStaffers(response.data); getRecentUsers() })
      .catch(error => console.log(error))
  }

  const getRecentUsers = () => {
    axios.get(BASE_URL + '/user/get/recent')
      .then(response => { setRecentUsers(response.data); getServerStats() })
      .catch(error => console.log(error))
  }

  const stafferColor = (staffer) => {
    switch (staffer) {
      case 'Owner':
        return 'red'
        break;
      case 'Admin':
        return 'purple'
        break;
      case 'Moderatore':
        return 'yellow'
        break;
      case 'Developer':
        return 'blue'
        break;
      case 'Pluginner':
        return 'purple'
        break;
      case 'Builder':
        return 'red'
        break;
      case 'Helper SS':
        return 'orange'
        break;
      case 'Helper':
        return 'green'
        break;
      default:
        return 'gray'
        break;
    }
  }

  useEffect(() => {
    getStaffers()
    getRecentUsers()
    getServerStats()
    getNewses()
  }, [])


  const getServerStats = () => {
    axios.get(BASE_URL + '/server/get')
      .then(response => {
        setServerStats(response.data)
        getNewses()
      })
      .catch(error => console.log(error))
  }
  const getNewses = () => {
    axios.get(BASE_URL + '/news/get')
      .then(response => {
        setNewses(response.data)
      })
      .catch(error => console.log(error))
    setIsLoading(false)
  }

  return (
    <div className="justify-around flex w-screen bg-[#242a33]">
      {
        isLoading ? (
          <SpinnerCircular/>
        ) : (
          <div className='border justify-around bodyhome flex'>
            <div>
              {
                newses.map(iterationNews => (
                  <div style={{ maxWidth: 1040 }} className='pl-8 mt-14 pr-14'>
                    <div style={{ fontFamily: 'League Spartan', height: 64 }} className='pl-10 pr-10 font-bold flex items-center text-[#ffffff] bg-[#262D37]'>
                      <div>
                        <h2>{iterationNews.title}</h2>
                        <h2 className='text-[gray]'>{iterationNews.created_on.substring(0, 16)}</h2>
                      </div>
                    </div>
                    <div className='mt-4 flex p-10 bg-[#262D37]'>
                      <div>
                        <div style={{ width: 114 }}>
                          <Avatar
                            size={40}
                            name={iterationNews.owner.minecraft_username}
                            variant="beam"
                            colors={["#9d2b88", "#9d2b87", "#d880d9", "#d164bd", "#d173bf"]}
                          />
                        </div>
                        <div className='justify-around items-center flex'><h2 style={{ fontFamily: 'League Spartan' }} className='mt-4 text-xl text-[#ffffff]'>{iterationNews.owner.minecraft_username}</h2></div>
                        <div className='mt-4 text-xl items-center justify-around flex' style={{ borderRadius: 5, backgroundColor: stafferColor(iterationNews.owner.role) }}><h2 style={{ fontSize: 14, fontWeight: 600, fontFamily: 'League Spartan' }} className='text-[#ffffff]'>{iterationNews.owner.role}</h2></div>
                      </div>
                      <div className='p-10'>
                        <h4 className='text-[#ffffff]' style={{ fontSize: 16, fontFamily: 'League Spartan' }}>{iterationNews.body}</h4>
                      </div>
                    </div>
                  </div>
                ))
              }
            </div>
            <div className='justify-around flex'>
              <div>
                <div style={{ minHeight: 154, borderRadius: 10, width: 284 }} className='mt-14 h-auto bg-[#262D37]'>
                  <div className='p-5 items-center justify-around flex'>
                    <h2 style={{ fontFamily: 'League Spartan' }} className='font-bold text-[#ffffff]'>Staff</h2>
                  </div>
                  <div>
                    {
                      staffers.map(staffer => (
                        <div style={{ borderTopColor: '#384554', borderTopWidth: 1, height: 74 }} className='items-center flex'>
                          <div className='ml-4' style={{ width: 38 }}>
                            <Avatar
                              size={40}
                              name={staffer.minecraft_username}
                              variant="beam"
                              colors={["#9d2b88", "#9d2b87", "#d880d9", "#d164bd", "#d173bf"]}
                            />
                          </div>
                          <div className='ml-4'>
                            <h2 style={{ fontFamily: 'League Spartan' }} className='text-sm text-[#ffffff]'>@{staffer.minecraft_username}</h2>
                            <div className='text-sm items-center justify-around flex' style={{ borderRadius: 5, backgroundColor: stafferColor(staffer.role) }}><h2 style={{ fontSize: 10, fontWeight: 600, fontFamily: 'League Spartan' }} className='text-[#ffffff]'>{staffer.role.toUpperCase()}</h2></div>
                          </div>
                        </div>
                      ))
                    }
                  </div>
                </div>
                <div style={{ minHeight: 154, borderRadius: 10, width: 284 }} className='mt-8 h-auto bg-[#262D37]'>
                  <div className='p-5 items-center justify-around flex'>
                    <h2 style={{ fontFamily: 'League Spartan' }} className='font-bold text-[#ffffff]'>Utenti più attivi</h2>
                  </div>
                  <div>
                    {
                      recentUsers.map((recentUser, iteration) => (
                        <div style={{ borderTopColor: '#384554', borderTopWidth: 1, height: 74 }} className='justify-between items-center flex'>
                          <div className='flex'>
                            <div className='ml-4' style={{ width: 38 }}>
                              <Avatar
                                size={40}
                                name={recentUser.minecraft_username}
                                variant="beam"
                                colors={["#9d2b88", "#9d2b87", "#d880d9", "#d164bd", "#d173bf"]}
                              />
                            </div>
                            <div className='ml-4'>
                              <h2 style={{ fontFamily: 'League Spartan' }} className='text-sm text-[#ffffff]'>@{recentUser.minecraft_username}</h2>
                              <h2 style={{ fontFamily: 'League Spartan' }} className='text-sm text-[gray]'>{recentUser.name}</h2>
                            </div>
                          </div>
                          {
                            iteration == 0 &&
                            <div style={{ width: 40 }}>
                              <span className='font-bold text-[#f5c269]'>1°</span>
                            </div>
                          }
                          {
                            iteration == 1 &&
                            <div style={{ width: 40 }}>
                              <span className='font-bold text-[#a6a6a6]'>2°</span>
                            </div>
                          }
                          {
                            iteration == 2 &&
                            <div style={{ width: 40 }}>
                              <span className='font-bold text-[#78554a]'>3°</span>
                            </div>
                          }
                        </div>
                      ))
                    }
                  </div>
                </div>
                <div style={{ minHeight: 194, borderRadius: 10, width: 284 }} className='mt-8 h-auto bg-[#262D37]'>
                  <div className='p-5 items-center justify-around flex'>
                    <h2 style={{ fontFamily: 'League Spartan' }} className='font-bold text-[#ffffff]'>Attività del forum</h2>
                  </div>
                  <div style={{ borderTopColor: '#384554', borderTopWidth: 1 }}>
                    <div style={{ width: 284 }} className='mt-3 justify-between flex'>
                      <div style={{ height: 34, width: 154 }} className='ml-4 items-center flex'><span style={{ fontFamily: 'League Spartan' }} className='text-[gray] font-bold'>Utenti registrati:</span></div>
                      <div style={{ height: 34, width: 74 }} className='items-center flex'><span style={{ fontFamily: 'League Spartan' }} className='text-[#ffffff] font-bold'>{serverStats.registered_users}</span></div>
                    </div>
                    <div style={{ width: 284 }} className='justify-between flex'>
                      <div style={{ height: 34, width: 154 }} className='ml-4 items-center flex'><span style={{ fontFamily: 'League Spartan' }} className='text-[gray] font-bold'>Discussioni:</span></div>
                      <div style={{ height: 34, width: 74 }} className='items-center flex'><span style={{ fontFamily: 'League Spartan' }} className='text-[#ffffff] font-bold'>{serverStats.questions}</span></div>
                    </div>
                    <div style={{ width: 284 }} className='justify-between flex'>
                      <div style={{ height: 34, width: 154 }} className='ml-4 items-center flex'><span style={{ fontFamily: 'League Spartan' }} className='text-[gray] font-bold'>Messaggi:</span></div>
                      <div style={{ height: 34, width: 74 }} className='items-center flex'><span style={{ fontFamily: 'League Spartan' }} className='text-[#ffffff] font-bold'>{serverStats.messages}</span></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      }
    </div>
  )
}