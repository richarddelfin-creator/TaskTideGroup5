import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { CalendarDays, CheckCircle2, Clock3, ListTodo } from 'lucide-react'
import { useTasks } from '../context/TaskContext'

const pageConfig = {
  today: {
    title: "Today's Tasks",
    subtitle: 'Focus on the tasks scheduled for today.',
    icon: CalendarDays,
    empty: 'Nothing scheduled for today. Add a task with today’s due date.',
  },
  upcoming: {
    title: 'Upcoming Tasks',
    subtitle: 'See what is coming up next.',
    icon: Clock3,
    empty: 'No upcoming tasks yet. Add a future due date to a task.',
  },
  completed: {
    title: 'Completed Tasks',
    subtitle: 'A record of the progress you have made.',
    icon: CheckCircle2,
    empty: 'No completed tasks yet. Finish a task on your board and it will appear here.',
  },
}

export default function TaskCollection({ type }) {
  const { tasks } = useTasks()
  const config = pageConfig[type]
  const Icon = config.icon
  const today = new Date()
  const todayKey = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`

  const filteredTasks = useMemo(() => tasks.filter(task => {
    if (type === 'completed') return task.status === 'done'
    if (type === 'today') return task.dueDate === todayKey && task.status !== 'done'
    return Boolean(task.dueDate) && task.dueDate > todayKey && task.status !== 'done'
  }).sort((a, b) => (a.dueDate || '').localeCompare(b.dueDate || '')), [tasks, type, todayKey])

  return (
    <div className="mx-auto max-w-7xl p-4 sm:p-7 lg:p-9">
      <header className="mb-8 flex items-center gap-3">
        <div className="grid h-12 w-12 place-items-center rounded-2xl border border-violet-400/20 bg-violet-500/10 text-violet-300"><Icon size={23}/></div>
        <div><p className="text-xs font-semibold uppercase tracking-[.2em] text-violet-300">TaskTide / My Tasks</p><h1 className="mt-1 text-3xl font-black tracking-tight text-white">{config.title}</h1><p className="mt-1 text-sm text-slate-500">{config.subtitle}</p></div>
      </header>
      <div className="mb-4 flex items-center justify-between rounded-2xl border border-white/[.07] bg-slate-900/60 p-4">
        <div className="flex items-center gap-3"><ListTodo size={18} className="text-slate-400"/><span className="text-sm text-slate-300">{config.title}</span></div>
        <span className="rounded-full bg-violet-500/15 px-3 py-1 text-xs font-bold text-violet-300">{filteredTasks.length} {filteredTasks.length === 1 ? 'task' : 'tasks'}</span>
      </div>
      {filteredTasks.length ? <div className="space-y-3">{filteredTasks.map(task => (
        <Link key={task.id} to={`/tasks/${encodeURIComponent(task.id)}`} className="block rounded-2xl border border-white/[.07] bg-slate-900/60 p-4 transition hover:border-violet-400/40 hover:bg-slate-900">
          <div className="flex flex-wrap items-start justify-between gap-3"><div className="min-w-0"><h2 className="font-semibold text-white">{task.title}</h2><p className="mt-1 line-clamp-2 text-sm text-slate-400">{task.description || 'No description added.'}</p></div><span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${task.status === 'done' ? 'bg-emerald-400/10 text-emerald-300' : task.status === 'doing' ? 'bg-violet-400/10 text-violet-300' : 'bg-slate-700/60 text-slate-300'}`}>{task.status === 'doing' ? 'In progress' : task.status === 'done' ? 'Completed' : 'To do'}</span></div>
          <div className="mt-3 flex flex-wrap gap-3 text-xs text-slate-500">{task.dueDate && <span className="flex items-center gap-1"><CalendarDays size={13}/>{task.dueDate}</span>}<span className="capitalize">{task.priority || 'medium'} priority</span></div>
        </Link>
      ))}</div> : <div className="rounded-2xl border border-dashed border-white/10 bg-slate-900/30 px-6 py-14 text-center"><div className="mx-auto mb-3 grid h-12 w-12 place-items-center rounded-2xl bg-white/5 text-slate-400"><Icon size={22}/></div><p className="font-semibold text-white">All clear!</p><p className="mx-auto mt-2 max-w-md text-sm text-slate-500">{config.empty}</p><Link to="/" className="mt-5 inline-flex rounded-xl bg-violet-500 px-4 py-2.5 text-xs font-bold text-white hover:bg-violet-400">Go to board</Link></div>}
    </div>
  )
}
