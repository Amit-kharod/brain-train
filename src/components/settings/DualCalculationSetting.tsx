import Heading from "../Heading";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

import { Input } from "../ui/input";
import { useDualCalculationSettings } from "../../utils/hooks/useCalculationSettings";

export const DualCalculationSetting = () => {
  // const settings = usePowerSettings((state) => state.settings);
  const setSettings = useDualCalculationSettings((state) => state.setSettings);
  const formSchema = z.object({
    firstValRange: z.string(),
    secondValRange: z.string(),
    operator: z.string(),
  });
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const newSettings = {
      fistValueRange: values.firstValRange,
      secondValueRange: values.secondValRange,
      operator: values.operator,
    };
    setSettings(newSettings);
    navigate("/dual-calculation-training");
  }

  return (
    <section className="flex flex-col gap-6 items-center w-full justify-center pt-16 ">
      <Heading>Dual Calculation Training</Heading>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-2 lg:gap-10 px-36"
        >
          <div className="flex flex-col lg:flex-row gap-1 mb-[3px]">
            <FormField
              control={form.control}
              name="firstValRange"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>1st Value range</FormLabel>
                  <FormControl className="w-[80vw] lg:w-[30vw]">
                    <Input
                      placeholder="eg. 1-10, 90-100, 150"
                      className=" text-black"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="secondValRange"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>2nd Value range</FormLabel>
                  <FormControl className="w-[80vw] lg:w-[30vw]">
                    <Input
                      placeholder="eg. 1-10, 90-100, 150"
                      className=" text-black"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="operator"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Operator</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl className="w-[80vw] lg:w-[30vw]">
                      <SelectTrigger>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="+">Addition</SelectItem>
                      <SelectItem value="-">Subtract</SelectItem>
                      <SelectItem value="*">Multiply</SelectItem>
                      <SelectItem value="/">Divide</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
          </div>
          <Button className="bg-red-500 col-span-4" type="submit">
            Start Training
          </Button>
        </form>
      </Form>
    </section>
  );
};
