export const STATUSES = ['todo', 'doing', 'done']

export function normalizeApiTasks(items = []) {
  // Use a loop and conditionals to transform JSONPlaceholder records.
  const normalized = []
  for (const item of items) {
    if (!item || typeof item.title !== 'string') continue
    normalized.push({
      id: `api-${item.id}`,
      title: item.title.charAt(0).toUpperCase() + item.title.slice(1),
      description: 'Imported from JSONPlaceholder. Add your own notes here.',
      status: item.completed ? 'done' : 'todo',
      dueDate: '',
      priority: item.completed ? 'low' : 'medium',
      source: 'api',
      createdAt: new Date().toISOString(),
    })
  }
  return normalized
}

export function filterTasks(tasks, { search = '', status = 'all' } = {}) {
  const term = search.trim().toLowerCase()
  return tasks.filter(task => {
    const matchesText = !term || task.title.toLowerCase().includes(term) ||
      (task.description || '').toLowerCase().includes(term)
    const matchesStatus = status === 'all' || task.status === status
    return matchesText && matchesStatus
  })
}

export function getTaskStats(tasks) {
  return tasks.reduce((stats, task) => {
    stats.total += 1
    stats[task.status] = (stats[task.status] || 0) + 1
    return stats
  }, { total: 0, todo: 0, doing: 0, done: 0 })
}

export function createTask(values) {
  return {
    ...values,
    id: `task-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    source: 'local',
    createdAt: new Date().toISOString(),
  }
}