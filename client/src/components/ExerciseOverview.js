import react, { useState, useEffect } from 'react'
import axios from 'axios'
import { getUserName } from '../helpers/Auth'


const ExerciseOverview = () => {
  const [userInfo, setUserInfo] = useState('')
  const [filterGroup, setFilterGroup] = useState('')

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const { data } = await axios.get(`/api/auth/${getUserName()}`)
        setUserInfo(data)
        console.log(data)
      } catch (error) {
        console.log(error)
      }
    }

    getUserInfo()
  }, [])

  const groupArray = ['Abs', 'Back', 'Biceps', 'Cardio', 'Chest', 'Legs', 'Shoulders', 'Triceps']

  const handleClick = (e) => {
    setFilterGroup(e.target.value)
    console.log(e.target.value)
  }

  const handleFilter = () => {
    return userInfo.exercises.filter(exercise => {
      return exercise.grouping.includes(filterGroup)
    })
  }

  const imageDisplay = () => {
    if (filterGroup === 'Abs'){
      return <img src='/images/abs.png' alt='abs diagram' />
    } else if (filterGroup === 'Back'){
      return <img src='/images/back.png' alt='back diagram' />
    } else if (filterGroup === 'Biceps'){
      return <img src='/images/biceps.png' alt='biceps diagram' />
    } else if (filterGroup === 'Cardio'){
      return <img src='/images/cardio.png' alt='cardio diagram' />
    } else if (filterGroup === 'Chest'){
      return <img src='/images/chest.png' alt='chest diagram' />
    } else if (filterGroup === 'Legs'){
      return <img src='/images/legs.png' alt='legs diagram' />
    } else if (filterGroup === 'Shoulders'){
      return <img src='/images/shoulders.png' alt='shoulders diagram' />
    } else if (filterGroup === 'Triceps'){
      return <img src='/images/triceps.png' alt='triceps diagram' />
    }
  }



  return (
    <main className="exercises">
      <h1>My Exercises</h1>
      <ul>
        {filterGroup === '' ?
          <button value={''} className='selected-group grouping-filter'>All</button>
          :
          <button value={''} className='grouping-filter' onClick={handleClick}>All</button>
        }
        {groupArray.map((group, index) => {
          return (
            filterGroup === group
              ?
              <button value={group} key={index} className='selected-group grouping-filter'>{group}</button>
              :
              <button value={group} key={index} className='grouping-filter' onClick={handleClick}>{group}</button>
          )
        })}
      </ul>
      <div className='exercise-container'>
        <div className='exercise-list-view'>
          {!userInfo ?
            <p>Loading...</p>
            :
            <>
              {
                handleFilter().length === 0 ?
                  <p>No exercises found, please add some</p>
                  :
                  <>
                    {handleFilter().map((exercise) => {
                      return (
                        <div key={exercise.id} className='exercise-card'>
                          <h3>{exercise.name}</h3>
                          <p>{exercise.description}</p>
                          <a target='_blank' rel='noreferrer' href='exercise.video_url'>Video Guide</a>
                        </div>
                      )
                    })}
                  </>
              }
            </>
          }
        </div>
        
        <div className='image-container'>
          {imageDisplay()}
          
        </div>
      </div>

    </main>
  )
}

export default ExerciseOverview