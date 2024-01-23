import CalculationTraining from "./components/trainings/CalculationTraining";
import { Home } from "./components/Home";
import { Navbar } from "./components/Navbar";
import { CalculationSetting } from "./components/settings/CalculationSetting";
import { PowerSetting } from "./components/settings/PowerSetting";
import { TableSetting } from "./components/settings/TableSetting";
import { Routes, Route } from "react-router-dom";
import TableTraining from "./components/trainings/TableTraining";
import PowerTraining from "./components/trainings/PowerTraining";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/calculation-setting" element={<CalculationSetting />} />
        <Route path="/table-setting" element={<TableSetting />} />
        <Route path="/power-setting" element={<PowerSetting />} />
        <Route path="/calculation-training" element={<CalculationTraining />} />
        <Route path="/table-training" element={<TableTraining />} />
        <Route path="/power-training" element={<PowerTraining />} />
      </Routes>
    </>
  );
}

export default App;
