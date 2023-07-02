import { Home } from "./components/Home";
import { Navbar } from "./components/Navbar";
import { CalculationSetting } from "./components/settings/CalculationSetting";
import { SquareSetting } from "./components/settings/SquareSetting";
import { TableSetting } from "./components/settings/TableSetting";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/calculation-setting" element={<CalculationSetting />} />
        <Route path="/table-setting" element={<TableSetting />} />
        <Route path="/square-setting" element={<SquareSetting />} />
      </Routes>
    </>
  );
}

export default App;
