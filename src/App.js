import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FormValidation from './components/form/FormValidation';
import BankDetails from './components/bankDetails/BankDetails';
import VendorServices from './components/venderServices/VendorServices';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<FormValidation />} />
          <Route path="/bank-details" element={<BankDetails />} />
          <Route path="/vendor-services" element={<VendorServices/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;