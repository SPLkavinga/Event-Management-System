import { BrowserRouter,Routes,Route } from 'react-router-dom';
import EventDetails from './Pages/EventDetails/EventDetails';
import AddEvent from './Pages/AddEvent/AddEvent';
import BuyTicket from './Pages/BuyTicket/BuyTicket';
import LoginForm from './Pages/AddCustomer/LoginForm';
import RegisterForm from './Pages/AddCustomer/RegisterForm'
import QRCodeScanner from './Pages/QRScanner/QRCodeScanner'
import ADDCustomerForm from './Pages/RegisterCustomer/RegisterForm';
import ShowCustomer from './Pages/ShowCustomer/ShowCustomer';

function App() {
 

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<LoginForm/>}/>
      <Route path='/show' element={<EventDetails/>}/>
      <Route path='/event' element={<AddEvent/>}/>
      <Route path='/BuyTicket' element={<BuyTicket/>}/>    
      <Route path='/Register' element={<RegisterForm/>}/>
      <Route path='/QRCodeScanner' element={<QRCodeScanner/>}/>
      <Route path='/ADDCustomerForm' element={<ADDCustomerForm/>}/>
      <Route path='/showCustomer' element={<ShowCustomer/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App
