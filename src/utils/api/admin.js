import service from "..";

export const register = (username, password) => {
  return service({
    method: 'POST',
    url: '/admin/register',
    params: {
      username,
      password
    }
  })
}

export const login = (username, password) => {
  return service({
    method: 'POST',
    url: '/admin/login',
    params: {
      username,
      password
    }
  })
}