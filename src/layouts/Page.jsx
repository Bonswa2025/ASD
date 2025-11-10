import Sidebar from '../components/Sidebar'
import Header from '../components/Header'

export default function Page({ title, children }) {
  return (
    <div className="min-h-screen bg-white">
      <div className="flex">
        <Sidebar />
        <div className="flex-1 min-w-0">
          <Header title={title} />
          <main className="container-page py-6">
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}
