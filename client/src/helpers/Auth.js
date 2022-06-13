
export const getToken = () => {
  return window.localStorage.getItem('brogress-token')
}

export const getPayLoad = () => {
  const token = getToken()
  if (!token) return
  const payLoad = token.split('.')[1]
  return JSON.parse(atob(payLoad))
}

export const isUserAuth = () => {
  const payLoad = getPayLoad()
  if (!payLoad) return 
  const currentTime = Math.floor(Date.now() / 1000)
  return payLoad.exp > currentTime
}

export const isUserOwner = (plant) => {
  const payLoad = getPayLoad()
  if (!payLoad) return
  return plant.addedBy._id === payLoad.sub
}

export const getUserToken = () => {
  return window.localStorage.getItem('brogress-token')
}

export const getUserName = () => {
  return window.localStorage.getItem('brogress-username')
}