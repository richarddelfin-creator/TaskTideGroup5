import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import useFetch from '../hooks/useFetch'
import { createTask, normalizeApiTasks } from '../utils/dataHelpers'
import { TASKS_API_URL } from '../services/taskApi'

const TaskContext = createContext(null)
const STORAGE_KEY = 'tasktide.tasks.v1'

export function TaskProvider({ children }) {
  const { data: apiTasks, loading: apiLoading, error: apiError } =
    useFetch(TASKS_API_URL)
  const [tasks, setTasks] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })
  const [initialized, setInitialized] = useState(() => {
    try { return Boolean(localStorage.getItem(STORAGE_KEY)) } catch { return false }
  })

  useEffect(() => {
    // Finish initialization after the API request succeeds OR fails.
    // This also lets newly-created tasks persist when the API is offline.
    if (!initialized && !apiLoading) {
      if (apiTasks) setTasks(normalizeApiTasks(apiTasks))
      setInitialized(true)
    }
  }, [apiTasks, apiLoading, initialized])

  useEffect(() => {
    if (initialized) localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
  }, [tasks, initialized])

  const addTask = values => setTasks(current => [createTask(values), ...current])
  const updateTask = (id, changes) => setTasks(current =>
    current.map(task => task.id === id ? { ...task, ...changes } : task))
  const deleteTask = id => setTasks(current => current.filter(task => task.id !== id))
  const moveTask = (id, status) => updateTask(id, { status })
  const resetDemo = () => {
    localStorage.removeItem(STORAGE_KEY)
    setTasks([])
    setInitialized(false)
  }

  const value = useMemo(() => ({
    tasks, addTask, updateTask, deleteTask, moveTask, resetDemo,
    apiLoading: apiLoading && !initialized, apiError,
  }), [tasks, apiLoading, initialized, apiError])

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>
}

export function useTasks() {
  const context = useContext(TaskContext)
  if (!context) throw new Error('useTasks must be used inside TaskProvider')
  return context
}