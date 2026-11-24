import { Link, useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, CalendarDays, Pencil, Trash2 } from 'lucide-react'
import { useTasks } from '../context/TaskContext'
import { useState } from 'react'
import TaskForm from '../components/TaskForm'

export default function TaskDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { tasks, updateTask, deleteTask } = useTasks()
  const [editing, setEditing] = useState(false)
  const task = tasks.find(item => item.id === id)
  if (!task) return <div className="p-8"><p className="mb-4 text-slate-300">Task not found.</p><Link to="/" className="text-violet-300">← Back to board</Link></div>
  const save = values => updateTask(task.id, values)
  return <div className="mx-auto max-w-3xl p-5 sm:p-9">
    <Link to="/" className="mb-8 inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white"><ArrowLeft size={16}/> Back to board</Link>
    <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 sm:p-9">
      <div className="mb-5 flex items-center justify-between"><span className="rounded-full bg-violet-400/10 px-3 py-1 text-xs font-bold uppercase text-violet-300">{task.status}</span><div className="flex gap-2"><button onClick={() => setEditing(true)} className="rounded-xl border border-white/10 p-2 text-slate-300 hover:bg-white/5"><Pencil size={16}/></button><button onClick={() => { deleteTask(task.id); navigate('/') }} className="rounded-xl border border-white/10 p-2 text-rose-300 hover:bg-rose-400/10"><Trash2 size={16}/></button></div></div>
      <p className="mb-2 text-xs font-bold uppercase tracking-[.2em] text-violet-400">Task details</p><h1 className="text-3xl font-black text-white">{task.title}</h1><p className="mt-4 whitespace-pre-wrap text-sm leading-7 text-slate-400">{task.description || 'No description added.'}</p>
      <div className="mt-8 flex flex-wrap gap-4 border-t border-white/10 pt-5 text-xs text-slate-400"><span className="flex items-center gap-2"><CalendarDays size={15}/> Due: {task.dueDate || 'Not set'}</span><span>Priority: {task.priority}</span><span>Source: {task.source}</span></div>
    </div>
    <TaskForm open={editing} editing={task} onClose={() => setEditing(false)} onSave={save}/>
  </div>
}