import { Link } from 'react-router-dom'
import { ArrowLeft, Code2, Database, Layers3, ShieldCheck } from 'lucide-react'

const features = [
  [Database, 'Live API starter data', 'Loads sample todos from JSONPlaceholder with loading and error handling.'],
  [Layers3, 'Three-step workflow', 'Organize work into To Do, Doing, and Done. Drag cards to move them.'],
  [ShieldCheck, 'Saved automatically', 'Your tasks are stored in localStorage on this browser.'],
  [Code2, 'Built with React', 'Uses Vite, Tailwind CSS, Router, Context API, and custom hooks.'],
]

export default function About() {
  return <div className="mx-auto max-w-4xl p-5 sm:p-9"><Link to="/" className="mb-8 inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white"><ArrowLeft size={16}/> Back to board</Link><p className="text-xs font-bold uppercase tracking-[.2em] text-violet-400">About the project</p><h1 className="mt-2 text-3xl font-black text-white">A calmer way to get things done.</h1><p className="mt-4 max-w-2xl text-sm leading-7 text-slate-400">TaskTide is a Kanban-style task manager created for the IT322 JavaScript and React midterm project. It helps users organize tasks, track progress, and keep work moving.</p><div className="mt-8 grid gap-3 sm:grid-cols-2">{features.map(([Icon, title, description]) => <div key={title} className="glass-panel rounded-2xl border border-white/10 bg-slate-900/50/60 p-5"><Icon className="mb-4 text-violet-300" size={22}/><h2 className="font-bold text-white">{title}</h2><p className="mt-2 text-xs leading-6 text-slate-500">{description}</p></div>)}</div><div className="mt-8 rounded-2xl border border-violet-400/15 bg-violet-400/5 p-5"><h2 className="font-bold text-violet-200">Group 5 · TaskTide</h2><p className="mt-2 text-xs leading-6 text-slate-400">API: JSONPlaceholder · Persistence: localStorage · Reminder: Browser Notifications</p></div></div>
}