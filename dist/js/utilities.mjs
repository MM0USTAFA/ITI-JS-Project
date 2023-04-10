const BASE_URL = 'http://localhost:3000'

const dealWithAPIs =  async (path, method="GET", body=null) => {
  const fetchOptions = {
    method: method,
    body: body,
    headers: {'Content-Type': 'application/json'}
  }
  const response = await fetch(`${BASE_URL}/${path}`, fetchOptions)
  const data = await response.json()
  return data
}

export {dealWithAPIs}


