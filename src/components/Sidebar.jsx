import { NavLink } from 'react-router-dom'
import { Activity, CalendarDays, CheckCircle2, CircleHelp, Clock3, LayoutDashboard, ListTodo, Waves } from 'lucide-react'
import { useTasks } from '../context/TaskContext'

const linkClass = ({ isActive }) =>
  `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${isActive ? 'bg-violet-400/20 text-violet-200 ring-1 ring-violet-300/25 shadow-[0_0_22px_rgba(139,92,246,.12)]' : 'text-slate-400 hover:bg-white/[.08] hover:text-white'}`

function NavCount({ value }) {
  return <span className="ml-auto min-w-6 rounded-full bg-white/[.06] px-2 py-0.5 text-center text-[10px] text-slate-400">{value}</span>
}

export default function Sidebar() {
  const { tasks } = useTasks()
  const today = new Date()
  const todayKey = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`
  const todayCount = tasks.filter(task => task.dueDate === todayKey && task.status !== 'done').length
  const upcomingCount = tasks.filter(task => task.dueDate && task.dueDate > todayKey && task.status !== 'done').length
  const completedCount = tasks.filter(task => task.status === 'done').length

  return (
    <aside className="glass-panel relative z-10 w-full shrink-0 border-b border-white/10 bg-slate-950/45 p-4 md:sticky md:top-0 md:m-4 md:min-h-[calc(100vh-2rem)] md:w-64 md:self-start md:rounded-3xl md:border md:p-6">
      <NavLink to="/" className="mb-7 flex items-center gap-3 px-2">
        <span className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-violet-400 via-fuchsia-500 to-cyan-300 text-white shadow-lg shadow-violet-950/50 ring-1 ring-white/25"><Waves size={22}/></span>
        <span><span className="block text-lg font-bold tracking-tight text-white">TaskTide</span><span className="text-xs text-slate-500">Stay in your flow</span></span>
      </NavLink>

      <p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-[.2em] text-slate-600">Workspace</p>
      <nav className="flex flex-wrap gap-1 md:flex-col">
        <NavLink to="/" end className={linkClass}><LayoutDashboard size={17}/> Board</NavLink>
      </nav>

      <p className="mb-2 mt-6 px-3 text-[10px] font-bold uppercase tracking-[.2em] text-slate-600">My Tasks</p>
      <nav className="flex flex-wrap gap-1 md:flex-col">
        <NavLink to="/today" className={linkClass}><CalendarDays size={17}/> Today <NavCount value={todayCount}/></NavLink>
        <NavLink to="/upcoming" className={linkClass}><Clock3 size={17}/> Upcoming <NavCount value={upcomingCount}/></NavLink>
        <NavLink to="/completed" className={linkClass}><CheckCircle2 size={17}/> Completed <NavCount value={completedCount}/></NavLink>
      </nav>

      <p className="mb-2 mt-6 px-3 text-[10px] font-bold uppercase tracking-[.2em] text-slate-600">More</p>
      <nav className="flex flex-wrap gap-1 md:flex-col">
        <NavLink to="/about" className={linkClass}><CircleHelp size={17}/> About TaskTide</NavLink>
      </nav>

      <div className="mt-8 hidden rounded-2xl glass-panel border border-violet-300/20 bg-gradient-to-br from-violet-500/15 to-cyan-400/10 p-4 md:block">
        <div className="mb-2 flex items-center gap-2 text-violet-300"><Activity size={16}/><span className="text-xs font-semibold">Small steps matter</span></div>
        <p className="text-xs leading-5 text-slate-400">Keep your tasks moving. Focus on one thing at a time and make progress visible.</p>
      </div>
      <div className="mt-6 hidden items-center gap-2 px-3 text-[11px] text-slate-600 md:flex"><ListTodo size={13}/> {tasks.length} tasks in your workspace</div>
    </aside>
  )
}
