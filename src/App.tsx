import CalculationTraining from "./components/trainings/CalculationTraining";
import { Home } from "./components/Home";
import { Navbar } from "./components/Navbar";
import { CalculationSetting } from "./components/settings/CalculationSetting";
import { SquareSetting } from "./components/settings/SquareSetting";
import { TableSetting } from "./components/settings/TableSetting";
import { Routes, Route } from "react-router-dom";
import TableTraining from "./components/trainings/TableTraining";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/calculation-setting" element={<CalculationSetting />} />
        <Route path="/table-setting" element={<TableSetting />} />
        <Route path="/square-setting" element={<SquareSetting />} />
        <Route path="/calculation-training" element={<CalculationTraining />} />
        <Route path="/table-training" element={<TableTraining />} />
      </Routes>
    </>
  );
}

export default App;
