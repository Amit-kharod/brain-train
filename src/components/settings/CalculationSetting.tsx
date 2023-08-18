import Heading from "../Heading";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export const CalculationSetting = () => {
  const form = useForm();
  const navigate = useNavigate();
  const formSchema = z.object({
    rangefrom: z.number().min(0).max(100000),
    rangeto: z.number().min(0).max(100000),
    sets: z.string(),
    values: z.string(),
    operators: z.string(),
  });

  function ProfileForm() {
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        sets: "5",
        values: "5",
        rangefrom: 0,
        rangeto: 1000,
        operators: "1",
      },
    });
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <section className="flex flex-col gap-6 items-center w-full justify-center pt-16 ">
      <Heading>Calculation Training</Heading>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid grid-cols-4 items-end gap-2 px-36"
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
                  <FormControl>
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
                  <FormControl>
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
          <div className="flex items-end gap-1 mb-[3px]">
            <FormField
              control={form.control}
              name="rangefrom"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Range</FormLabel>
                  <FormControl>
                    <Input
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
                  <FormControl>
                    <Input
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
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="1">+</SelectItem>
                    <SelectItem value="2">-</SelectItem>
                    <SelectItem value="3">*</SelectItem>
                    <SelectItem value="4">/</SelectItem>
                    <SelectItem value="5">+ -</SelectItem>
                    <SelectItem value="6">* /</SelectItem>
                    <SelectItem value="7">+ - *</SelectItem>
                    <SelectItem value="8">+ - * /</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          <Button type="submit">Start Training</Button>
        </form>
      </Form>
    </section>
  );
};
