import Heading from "../Heading";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

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

export const TableSetting = () => {
  const form = useForm();
  const formSchema = z.object({
    username: z.string().min(2).max(50),
  });

  function ProfileForm() {
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        username: "",
      },
    });
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <section className="flex flex-col gap-6 items-center w-full justify-center pt-16 ">
      <Heading>Table Training</Heading>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid grid-cols-4 items-end gap-2 px-36"
        >
          <div className="flex col-span-4 items-end gap-1 mb-[3px]">
            <FormField
              control={form.control}
              name="rangefrom"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Enter Table Range(Using commas or dash)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="from"
                      className="w-[600px]"
                      {...field}
                    />
                  </FormControl>
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
