import Heading from "../Heading";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useCalculationSettings } from "../../utils/hooks/useCalculationSettings";

export const CalculationSetting = () => {
  const navigate = useNavigate();
  const settings = useCalculationSettings((state) => state.settings);
  const setSettings = useCalculationSettings((state) => state.setSettings);
  console.log(settings);

  const formSchema = z.object({
    sets: z.string(),
    values: z.string(),
    rangefrom: z.string(),
    rangeto: z.string(),
    operators: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const newSettings = {
      sets: Number(values.sets),
      values: Number(values.values),
      rangefrom: Number(values.rangefrom),
      rangeto: Number(values.rangeto),
      operators: values.operators,
    };
    setSettings(newSettings);
    navigate("/calculation-training");
  }

  return (
    <section className="flex flex-col gap-6 items-center w-full justify-center pt-16 ">
      <Heading>Calculation Training</Heading>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col justify-center items-center lg:grid lg:grid-cols-5 lg:items-end gap-2 px-16"
        >
          <FormField
            control={form.control}
            name="sets"
            render={({ field }) => (
              <FormItem>
                <FormLabel>No. of sets</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl className="w-[80vw] lg:w-full ">
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="1">1</SelectItem>
                    <SelectItem value="2">2</SelectItem>
                    <SelectItem value="3">3</SelectItem>
                    <SelectItem value="4">4</SelectItem>
                    <SelectItem value="5">5</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="values"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Values in a set</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl className="w-[80vw] lg:w-full">
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="1">1</SelectItem>
                    <SelectItem value="2">2</SelectItem>
                    <SelectItem value="3">3</SelectItem>
                    <SelectItem value="4">4</SelectItem>
                    <SelectItem value="5">5</SelectItem>
                    <SelectItem value="6">6</SelectItem>
                    <SelectItem value="7">7</SelectItem>
                    <SelectItem value="8">8</SelectItem>
                    <SelectItem value="9">9</SelectItem>
                    <SelectItem value="10">10</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          <div className="flex col-span-2 items-end gap-1 mb-[3px]">
            <FormField
              control={form.control}
              name="rangefrom"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Range</FormLabel>
                  <FormControl className="w-[40vw] lg:w-full">
                    <Input
                      type="number"
                      min={0}
                      max={100000}
                      placeholder="from"
                      {...field}
                      className="text-black"
                      defaultValue={field.value}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="rangeto"
              render={({ field }) => (
                <FormItem className="!mt-2">
                  <FormControl className="w-[40vw] lg:w-full">
                    <Input
                      type="number"
                      min={0}
                      max={100000}
                      placeholder="to"
                      {...field}
                      className="text-black"
                      defaultValue={field.value}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="operators"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Operators</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl className="w-[80vw] lg:w-full">
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="+">+</SelectItem>
                    <SelectItem value="-">-</SelectItem>
                    <SelectItem value="*">*</SelectItem>
                    <SelectItem value="/">/</SelectItem>
                    <SelectItem value="+-">+ -</SelectItem>
                    <SelectItem value="*/">* /</SelectItem>
                    <SelectItem value="+-*">+ - *</SelectItem>
                    <SelectItem value="+-*/">+ - * /</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          <Button type="submit" className="col-span-5" variant={"secondary"}>
            Start Training
          </Button>
        </form>
      </Form>
    </section>
  );
};
