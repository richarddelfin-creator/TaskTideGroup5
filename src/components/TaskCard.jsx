import { CalendarDays, GripVertical, Pencil, Trash2 } from 'lucide-react'
import { Link } from 'react-router-dom'

const priorityStyle = {
  low: 'bg-emerald-400/10 text-emerald-300',
  medium: 'bg-amber-400/10 text-amber-300',
  high: 'bg-rose-400/10 text-rose-300',
}

export default function TaskCard({ task, onDelete, onDragStart, onEdit }) {
  return (
    <article draggable onDragStart={event => onDragStart(event, task.id)}
      className="group glass-panel rounded-2xl border border-white/[.12] bg-white/[.055] p-4 shadow-lg shadow-black/20 transition hover:-translate-y-0.5 hover:border-violet-400/30">
      <div className="mb-3 flex items-start justify-between gap-2">
        <span className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${priorityStyle[task.priority] || priorityStyle.medium}`}>{task.priority || 'medium'}</span>
        <div className="flex items-center gap-1 text-slate-600">
          <GripVertical size={15} className="cursor-grab"/>
          <button onClick={() => onEdit(task)} aria-label="Edit task" className="rounded-lg p-1.5 hover:bg-white/10 hover:text-violet-300"><Pencil size={14}/></button>
          <button onClick={() => onDelete(task.id)} aria-label="Delete task" className="rounded-lg p-1.5 hover:bg-rose-500/10 hover:text-rose-300"><Trash2 size={14}/></button>
        </div>
      </div>
      <Link to={`/tasks/${encodeURIComponent(task.id)}`} className="block text-sm font-semibold leading-6 text-slate-100 hover:text-violet-300">{task.title}</Link>
      <p className="mt-1 line-clamp-2 text-xs leading-5 text-slate-500">{task.description || 'No description added.'}</p>
      <div className="mt-4 flex items-center justify-between border-t border-white/[.06] pt-3">
        <span className="flex items-center gap-1.5 text-[11px] text-slate-500"><CalendarDays size={13}/>{task.dueDate || 'No due date'}</span>
        <span className="text-[10px] text-slate-600">{task.source === 'api' ? 'API task' : 'Your task'}</span>
      </div>
    </article>
  )
}