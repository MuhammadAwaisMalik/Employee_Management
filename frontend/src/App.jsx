import Login from "./pages/login";
import { Route, Routes } from "react-router-dom";
import MainLayout from "./layout";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/*" element={<MainLayout />} />
    </Routes>
  );
}

export default App;
