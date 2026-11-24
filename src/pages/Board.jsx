import { useMemo, useState } from 'react'
import { Bell, CheckCheck, CirclePlus, Search, Sparkles } from 'lucide-react'
import { useTasks } from '../context/TaskContext'
import { filterTasks, getTaskStats } from '../utils/dataHelpers'
import TaskCard from '../components/TaskCard'
import TaskForm from '../components/TaskForm'
import ReminderManager from '../components/ReminderManager'

const columns = [
  { id: 'todo', title: 'To Do', color: 'bg-slate-400', hint: 'Ready when you are' },
  { id: 'doing', title: 'Doing', color: 'bg-violet-400', hint: 'Keep the momentum' },
  { id: 'done', title: 'Done', color: 'bg-emerald-400', hint: 'Look at you go' },
]

export default function Board() {
  const { tasks, addTask, updateTask, deleteTask, moveTask, apiLoading, apiError } = useTasks()
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('all')
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const stats = getTaskStats(tasks)
  const visible = useMemo(() => filterTasks(tasks, { search, status }), [tasks, search, status])

  const save = values => editing ? updateTask(editing.id, values) : addTask(values)
  const edit = task => { setEditing(task); setModalOpen(true) }
  const openNew = () => { setEditing(null); setModalOpen(true) }
  const dragStart = (event, id) => event.dataTransfer.setData('text/task-id', id)
  const drop = (event, statusId) => {
    event.preventDefault()
    const id = event.dataTransfer.getData('text/task-id')
    if (id) moveTask(id, statusId)
  }
  const requestNotifications = async () => {
    if ('Notification' in window) {
      await Notification.requestPermission()
      window.dispatchEvent(new Event('tasktide:notification-permission-changed'))
    } else {
      window.alert('This browser does not support notifications.')
    }
  }

  return (
    <div className="mx-auto max-w-7xl p-4 sm:p-7 lg:p-9">
      <ReminderManager tasks={tasks}/>
      <header className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div><div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[.22em] text-violet-300"><Sparkles size={14}/> Your personal workspace</div><h1 className="text-3xl font-black tracking-tight text-white sm:text-4xl">Make waves today<span className="text-violet-400">.</span></h1><p className="mt-2 text-sm text-slate-500">A clear mind starts with a clear plan.</p></div>
        <div className="flex gap-2"><button onClick={requestNotifications} className="flex items-center gap-2 glass-panel rounded-xl border border-white/10 px-3 py-2.5 text-xs font-semibold text-slate-300 hover:bg-white/5"><Bell size={15}/> Reminders</button><button onClick={openNew} className="flex items-center gap-2 rounded-xl border border-violet-300/30 bg-gradient-to-r from-violet-500/90 to-fuchsia-500/80 px-4 py-2.5 text-xs font-bold text-white shadow-lg shadow-violet-950/40 hover:bg-violet-400"><CirclePlus size={16}/> New task</button></div>
      </header>
      <section className="mb-7 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {[['All tasks', stats.total, 'text-white'], ['To do', stats.todo, 'text-slate-200'], ['In progress', stats.doing, 'text-violet-300'], ['Completed', stats.done, 'text-emerald-300']].map(([label, value, color]) => <div key={label} className="glass-panel rounded-2xl border border-white/[.10] bg-white/[.045] p-4"><p className="text-xs text-slate-500">{label}</p><p className={`mt-2 text-2xl font-black ${color}`}>{value}</p></div>)}
      </section>
      <section className="mb-6 flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1"><Search size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"/><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search your tasks..." className="w-full glass-panel rounded-xl border border-white/10 bg-white/[.045] py-3 pl-11 pr-4 text-sm text-white outline-none placeholder:text-slate-600 focus:border-violet-400"/></div>
        <select value={status} onChange={e => setStatus(e.target.value)} className="glass-panel rounded-xl border border-white/10 bg-white/[.045] px-4 py-3 text-sm text-slate-300 outline-none"><option value="all">All statuses</option><option value="todo">To Do</option><option value="doing">Doing</option><option value="done">Done</option></select>
      </section>
      {apiLoading && <p className="mb-4 text-xs text-violet-300">Loading starter tasks from JSONPlaceholder…</p>}
      {apiError && tasks.length === 0 && <p className="mb-4 rounded-xl border border-amber-400/20 bg-amber-400/5 p-3 text-xs text-amber-200">Could not load starter tasks: {apiError}. You can still create your own tasks.</p>}
      <div className="grid items-start gap-4 lg:grid-cols-3">
        {columns.map(column => {
          const columnTasks = visible.filter(task => task.status === column.id)
          return <section key={column.id} onDragOver={e => e.preventDefault()} onDrop={e => drop(e, column.id)} className="glass-panel min-h-72 rounded-2xl border border-white/[.10] bg-slate-950/25 p-3">
            <div className="mb-4 flex items-center justify-between px-1 pt-1"><div><div className="flex items-center gap-2"><span className={`h-2 w-2 rounded-full ${column.color}`}/><h2 className="text-sm font-bold text-slate-200">{column.title}</h2><span className="rounded-full bg-white/[.07] px-2 py-0.5 text-[10px] text-slate-400">{columnTasks.length}</span></div><p className="mt-1 text-[10px] text-slate-600">{column.hint}</p></div><button onClick={openNew} aria-label={`Add task to ${column.title}`} className="rounded-lg p-2 text-slate-500 hover:bg-white/5 hover:text-white"><CirclePlus size={16}/></button></div>
            <div className="space-y-3">{columnTasks.map(task => <TaskCard key={task.id} task={task} onDelete={deleteTask} onEdit={edit} onDragStart={dragStart}/>)}
              {columnTasks.length === 0 && <div className="rounded-xl border border-dashed border-white/10 px-3 py-8 text-center text-xs text-slate-600">Drop a task here or add one</div>}
            </div>
          </section>
        })}
      </div>
      <div className="mt-6 flex items-center gap-2 text-[11px] text-slate-600"><CheckCheck size={14}/> Drag cards between columns to update their status. Changes are saved on this device.</div>
      <TaskForm open={modalOpen} editing={editing} onClose={() => setModalOpen(false)} onSave={save}/>
    </div>
  )
}