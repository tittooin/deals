import Navbar from './components/Navbar'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import AuthPage from './pages/Auth'
import Dashboard from './pages/Dashboard'
import DealsPage from './pages/Deals'
import ChatPage from './pages/Chat'
import EditorPage from './pages/Editor'
import Protected from './components/Protected'

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen">
        <Navbar />
        <nav className="container mt-4 flex gap-3 text-sm">
          <Link to="/" className="underline-offset-4 hover:underline">Home</Link>
          <Link to="/deals" className="underline-offset-4 hover:underline">Deals</Link>
          <Link to="/chat" className="underline-offset-4 hover:underline">Chat</Link>
          <Link to="/editor" className="underline-offset-4 hover:underline">Write</Link>
          <Link to="/auth" className="underline-offset-4 hover:underline">Auth</Link>
          <Link to="/dashboard" className="underline-offset-4 hover:underline">Dashboard</Link>
        </nav>
        <main className="container py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/dashboard" element={<Protected><Dashboard /></Protected>} />
            <Route path="/deals" element={<DealsPage />} />
            <Route path="/chat" element={<Protected><ChatPage /></Protected>} />
            <Route path="/editor" element={<Protected><EditorPage /></Protected>} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}
