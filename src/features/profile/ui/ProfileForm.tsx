'use client'

import { api } from '../../../trpc/react'
import { useEffect, useState } from 'react'

export const ProfileForm = () => {
  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  const [age, setAge] = useState(0)

  const utils = api.useUtils()
  const { data: user } = api.profile.me.useQuery(undefined, {
    retry: false,
  })

  useEffect(() => {
    if (user) {
      setName(user.name || '')
      setSurname(user.surname || '')
      setAge(user.age || 0)
    }
  }, [user])

  const updateMutation = api.profile.update.useMutation({
    onSuccess: () => {
      utils.profile.me.invalidate()
      alert('Profile updated!')
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    updateMutation.mutate({
      name,
      surname,
      age: Number(age),
    })
  }

  if (!user) return null

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto mt-4 max-w-md rounded-lg border p-4"
    >
      <h2 className="mb-4 text-xl font-bold">Edit Profile</h2>
      <div className="mb-4">
        <label className="mb-1 block text-sm font-medium">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded border bg-transparent px-3 py-2"
        />
      </div>
      <div className="mb-4">
        <label className="mb-1 block text-sm font-medium">Surname</label>
        <input
          type="text"
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
          className="w-full rounded border bg-transparent px-3 py-2"
        />
      </div>
      <div className="mb-4">
        <label className="mb-1 block text-sm font-medium">Age</label>
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(Number(e.target.value))}
          className="w-full rounded border bg-transparent px-3 py-2"
        />
      </div>
      <button
        type="submit"
        disabled={updateMutation.isPending}
        className="w-full rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700"
      >
        {updateMutation.isPending ? 'Saving...' : 'Save Profile'}
      </button>
    </form>
  )
}
