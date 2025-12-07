import HeaderNav from '@/components/atoms/HeaderNav'
import FloatingNav from './components/molecules/FloatingNav'
import DashboardContent from './components/organisms/DashboardContent'

function App() {
  return (
    <div className="bg-white p-4">
      <HeaderNav />
      <FloatingNav />
      <DashboardContent />
    </div>
  )
}

export default App
