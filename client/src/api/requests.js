import axios from 'axios'

const updateTheme = async ({ theme, token }) => {
  const data = {
    theme: theme,
  }
  const config = {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  }
  try {
    const response = await axios.put(
      'http://localhost:3500/api/user/updateTheme',
      data,
      config
    )
    return response
  } catch (err) {
    return err.response
  }
}

const updateName = async ({ name, token }) => {
  const data = {
    name: name,
  }
  const config = {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  }
  try {
    const response = await axios.put(
      'http://localhost:3500/api/user/updateName',
      data,
      config
    )
    return response
  } catch (err) {
    return err.response
  }
}

const createDateIdea = async ({
  name,
  location,
  description,
  price,
  topics,
  type,
  token,
}) => {
  const data = {
    name: name,
    location: location,
    description: description,
    price: price,
    topics: topics,
    type: type,
  }

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  try {
    const response = await axios.post(
      'http://localhost:3500/api/dateIdea',
      data,
      config
    )
    return response.data
  } catch (err) {
    return err.response
  }
}

const deleteDateIdea = async ({ dateIdeaId, token }) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  try {
    const response = await axios.delete(
      `http://localhost:3500/api/dateIdea/${dateIdeaId}`,
      null,
      config
    )
    return response.data
  } catch (err) {
    return err.response
  }
}

const updateDateIdea = async ({
  name,
  location,
  description,
  price,
  topics,
  type,
  token,
  dateIdeaId,
}) => {
  const data = {
    name: name,
    location: location,
    description: description,
    price: price,
    topics: topics,
    type: type,
  }

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  try {
    const response = await axios.put(
      `http://localhost:3500/api/dateIdea/${dateIdeaId}`,
      data,
      config
    )
    return response.data
  } catch (err) {
    return err.response
  }
}

const getDateIdeas = async (token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

    const response = await axios.get(
      `http://localhost:3500/api/dateIdea`,
      config
    )

    return response.data
  } catch (err) {
    return err.response
  }
}

export {
  updateTheme,
  updateName,
  createDateIdea,
  updateDateIdea,
  deleteDateIdea,
  getDateIdeas,
}
