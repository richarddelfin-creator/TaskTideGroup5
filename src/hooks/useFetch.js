import { useEffect, useState } from 'react'

export default function useFetch(url) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(Boolean(url))
  const [error, setError] = useState('')

  useEffect(() => {
    if (!url) return
    const controller = new AbortController()
    async function load() {
      try {
        setLoading(true)
        setError('')
        const response = await fetch(url, { signal: controller.signal })
        if (!response.ok) throw new Error(`Request failed (${response.status})`)
        setData(await response.json())
      } catch (err) {
        if (err.name !== 'AbortError') setError(err.message || 'Unable to load tasks.')
      } finally {
        if (!controller.signal.aborted) setLoading(false)
      }
    }
    load()
    return () => controller.abort()
  }, [url])

  return { data, loading, error }
}