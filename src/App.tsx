import {BrowserRouter, Routes, Route} from "react-router-dom";
import { NavbarComponent } from './components/navbar';
import ContactPages from './Pages/ContactPages';
import HomePages from './Pages/HomePages';
import TaskPages from "./Pages/TaskPages";
import TestPages from "./Pages/TestPages";
import UseMemoPages from "./Pages/UseMemoPages";
import UseCallbackPages from "./Pages/UseCallbackPages";
import UseReducerPages from "./Pages/UseReducerPages";


const App: React.FC = () => (
  <BrowserRouter>
  <NavbarComponent />
    <Routes>
      <Route path="/" element={<HomePages />} />
      <Route path="/contact" element={<ContactPages />} />
      <Route path="/to-do" element={<TaskPages />} />
      <Route path="/examen" element={<TestPages />} />
      <Route path="/useMemo" element={<UseMemoPages />} />
      <Route path="/useCallback" element={<UseCallbackPages />} />
      <Route path="/useReducer" element={<UseReducerPages />} />
    </Routes>
  </BrowserRouter>
);


export default App
