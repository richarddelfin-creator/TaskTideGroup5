import { Route, Routes } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Board from './pages/Board'
import TaskDetails from './pages/TaskDetails'
import About from './pages/About'
import TaskCollection from './pages/TaskCollection'

export default function App() {
  return (
    <div className="min-h-screen md:flex">
      <Sidebar />
      <main className="min-w-0 flex-1">
        <Routes>
          <Route path="/" element={<Board />} />
          <Route path="/today" element={<TaskCollection type="today" />} />
          <Route path="/upcoming" element={<TaskCollection type="upcoming" />} />
          <Route path="/completed" element={<TaskCollection type="completed" />} />
          <Route path="/tasks/:id" element={<TaskDetails />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<div className="p-8 text-slate-300">Page not found.</div>} />
        </Routes>
      </main>
    </div>
  )
}
