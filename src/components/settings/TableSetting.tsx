import Heading from "../Heading";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import { useTableSettings } from "../../utils/hooks/useCalculationSettings";

export const TableSetting = () => {
  // const settings = useTableSettings((state) => state.settings);
  const setSettings = useTableSettings((state) => state.setSettings);
  const formSchema = z.object({
    firstValueRange: z.string(),
    secondValueRange: z.string(),
  });
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const newSettings = {
      fistValueRange: values.firstValueRange,
      secondValueRange: values.secondValueRange,
    };
    setSettings(newSettings);
    navigate("/table-training");
  }

  return (
    <section className="flex flex-col gap-6 items-center w-full justify-center pt-16 ">
      <Heading>Table Training</Heading>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-2 lg:gap-10"
        >
          <div className="flex flex-col lg:flex-row gap-1 mb-[3px]">
            <FormField
              control={form.control}
              name="firstValueRange"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First value range</FormLabel>
                  <FormControl className="w-[80vw] lg:w-[30vw]">
                    <Input
                      placeholder="eg. 1-10, 90-100, 150"
                      className="text-black"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="secondValueRange"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Second value range</FormLabel>
                  <FormControl className="w-[80vw] lg:w-[30vw]">
                    <Input
                      placeholder="eg. 1-10, 90-100, 150"
                      className="text-black"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <Button className="bg-red-500 col-span-4 w-full" type="submit">
            Start Training
          </Button>
        </form>
      </Form>
    </section>
  );
};
