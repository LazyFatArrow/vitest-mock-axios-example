import { beforeEach, describe, expect, test, vi } from 'vitest'
import { createUser, fetchUsers } from './users.service'
import axios from 'axios'

vi.mock('axios')

describe('Users Service', () => {
  beforeEach(() => {
    axios.get.mockReset()
    axios.post.mockReset()
  })

  describe('fetchUsers', () => {
    test('makes a GET request to fetch users', async () => {
      const usersMock = [{ id: 1 }, { id: 2 }]

      axios.get.mockResolvedValue({
        data: usersMock,
      })

      const users = await fetchUsers()

      expect(axios.get).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/users')
      expect(users).toStrictEqual(usersMock)
    })
  })

  describe('createUser', () => {
    test('makes a POST request to create a new user', async () => {
      const newUserPayload = {
        name: 'john doe',
      }

      const newUserMock = {
        id: 1,
        ...newUserPayload,
      }

      axios.post.mockResolvedValue({
        data: newUserMock,
      })

      const newUser = await createUser(newUserPayload)

      expect(axios.post).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/users', newUserPayload)
      expect(newUser).toStrictEqual(newUserMock)
    })
  })
})
