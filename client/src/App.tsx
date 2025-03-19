import '../css/App.css';
import { Routes,Route } from 'react-router-dom';
import Redeem from './pages/redeem';
import Home from './pages/home';
import { BrowserRouter } from 'react-router-dom';
import { AppProvider } from './contexts/userContexts';
import { RewardProvider } from './contexts/rewardContexts';
import { RewardsHistoryProvider } from './contexts/rewardsHistoryContext';
import { PrizePopularityProvider } from './contexts/prizePopularityContext';
import { UserMedicationsProvider } from './contexts/userMedicationsContexts';
import Navbar from './components/navbar';
import Login from './pages/login';
import Register from './pages/register';
import Learn from './pages/learn';
import Medication from './pages/medications';
import Admin from './pages/admin';
import AdminRewards from './pages/admin-rewards';
import Footer from './components/footer';


function App() {
  return (
    <>
    <AppProvider>
      <RewardProvider>
        <RewardsHistoryProvider>
        <PrizePopularityProvider>
        <UserMedicationsProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/rewards' element={<Redeem />} />
            <Route path='/learn' element= {<Learn />} />
            <Route path ='/medication' element={<Medication />} />
            <Route path ='/login' element={<Login />} />
            <Route path ='/register' element={<Register/>} />
            <Route path='/admin' element={<Admin /> } />
            <Route path='/adminrewards' element={<AdminRewards /> } />
          </Routes>
          <Footer />
        </BrowserRouter>
        </UserMedicationsProvider>
        </PrizePopularityProvider>
        </RewardsHistoryProvider>
      </RewardProvider>
    </AppProvider>
    </>
  )
}

export default App
