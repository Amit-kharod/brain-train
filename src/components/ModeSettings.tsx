import { useNavigate } from "react-router-dom";
import Heading from "./Heading";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useState } from "react";

export const ModeSettings = () => {
  const [mode, setMode] = useState("calculation");
  const navigate = useNavigate();

  const modeHandler = () => {
    navigate(`/${mode}-setting`);
  };

  return (
    <section className="flex flex-col gap-6 items-center w-full justify-center pt-16">
      <Heading>Choose training mode</Heading>
      <Select
        onValueChange={(value) => {
          setMode(value);
        }}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Calculation" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="calculation">Calculation</SelectItem>
          <SelectItem value="table">Table</SelectItem>
          <SelectItem value="square">Square/Cube</SelectItem>
        </SelectContent>
      </Select>
      <Button onClick={modeHandler} className="bg-blue-700">
        Next
      </Button>
    </section>
  );
};
