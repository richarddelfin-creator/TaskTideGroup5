import { useEffect, useRef } from 'react'

function getLocalDateKey() {
  const now = new Date()
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`
}

export default function ReminderManager({ tasks }) {
  const notified = useRef(new Set())

  useEffect(() => {
    if (!('Notification' in window)) return

    let timer
    const checkDueTasks = () => {
      if (Notification.permission !== 'granted') return
      const today = getLocalDateKey()
      tasks
        .filter(task => task.dueDate === today && task.status !== 'done')
        .forEach(task => {
          if (!notified.current.has(task.id)) {
            new Notification('TaskTide reminder', {
              body: `“${task.title}” is due today.`,
            })
            notified.current.add(task.id)
          }
        })
    }

    const startReminderChecks = () => {
      if (Notification.permission !== 'granted') return
      checkDueTasks()
      if (!timer) timer = window.setInterval(checkDueTasks, 60_000)
    }

    startReminderChecks()
    window.addEventListener('tasktide:notification-permission-changed', startReminderChecks)
    return () => {
      if (timer) window.clearInterval(timer)
      window.removeEventListener('tasktide:notification-permission-changed', startReminderChecks)
    }
  }, [tasks])

  return null
}
