import { useEffect, useRef, useState } from 'react'
import { X } from 'lucide-react'

const empty = { title: '', description: '', status: 'todo', dueDate: '', priority: 'medium' }

export default function TaskForm({ open, onClose, onSave, editing }) {
  const [form, setForm] = useState(empty)
  const titleRef = useRef(null)

  useEffect(() => {
    if (open) {
      setForm(editing ? {
        title: editing.title || '', description: editing.description || '',
        status: editing.status || 'todo', dueDate: editing.dueDate || '',
        priority: editing.priority || 'medium',
      } : empty)
      titleRef.current?.focus()
    }
  }, [open, editing])

  if (!open) return null
  const change = event => setForm(current => ({ ...current, [event.target.name]: event.target.value }))
  const submit = event => {
    event.preventDefault()
    if (!form.title.trim()) return
    onSave({ ...form, title: form.title.trim() })
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/70 p-4 backdrop-blur-sm" onMouseDown={event => event.target === event.currentTarget && onClose()}>
      <form onSubmit={submit} className="glass-panel w-full max-w-lg rounded-3xl border border-white/15 bg-slate-900/75 p-6 shadow-2xl shadow-black/50">
        <div className="mb-6 flex items-center justify-between"><div><p className="text-xs font-bold uppercase tracking-[.2em] text-violet-400">{editing ? 'Update details' : 'Make it happen'}</p><h2 className="mt-1 text-xl font-bold text-white">{editing ? 'Edit task' : 'Create a task'}</h2></div><button type="button" onClick={onClose} className="rounded-xl p-2 text-slate-400 hover:bg-white/10 hover:text-white"><X size={18}/></button></div>
        <label className="mb-2 block text-xs font-semibold text-slate-300">Task title *</label>
        <input ref={titleRef} name="title" value={form.title} onChange={change} required maxLength={100} placeholder="What needs to get done?" className="mb-4 w-full glass-panel rounded-xl border border-white/10 bg-slate-950/45 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 focus:border-violet-400"/>
        <label className="mb-2 block text-xs font-semibold text-slate-300">Description</label>
        <textarea name="description" value={form.description} onChange={change} rows="3" maxLength={500} placeholder="Add a few helpful details..." className="mb-4 w-full resize-none glass-panel rounded-xl border border-white/10 bg-slate-950/45 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 focus:border-violet-400"/>
        <div className="mb-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div><label className="mb-2 block text-xs font-semibold text-slate-300">Status</label><select name="status" value={form.status} onChange={change} className="w-full glass-panel rounded-xl border border-white/10 bg-slate-950/45 px-3 py-3 text-sm text-white"><option value="todo">To Do</option><option value="doing">Doing</option><option value="done">Done</option></select></div>
          <div><label className="mb-2 block text-xs font-semibold text-slate-300">Priority</label><select name="priority" value={form.priority} onChange={change} className="w-full glass-panel rounded-xl border border-white/10 bg-slate-950/45 px-3 py-3 text-sm text-white"><option value="low">Low</option><option value="medium">Medium</option><option value="high">High</option></select></div>
          <div><label className="mb-2 block text-xs font-semibold text-slate-300">Due date</label><input type="date" name="dueDate" value={form.dueDate} onChange={change} className="w-full glass-panel rounded-xl border border-white/10 bg-slate-950/45 px-3 py-3 text-sm text-white"/></div>
        </div>
        <div className="flex justify-end gap-2"><button type="button" onClick={onClose} className="rounded-xl px-4 py-2.5 text-sm text-slate-400 hover:bg-white/5">Cancel</button><button type="submit" className="rounded-xl border border-violet-300/30 bg-gradient-to-r from-violet-500 to-fuchsia-500 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-violet-950/40 hover:bg-violet-400">{editing ? 'Save changes' : 'Add task'}</button></div>
      </form>
    </div>
  )
}