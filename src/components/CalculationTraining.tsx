import { useCalculationSettings } from '../utils/hooks/useCalculationSettings';
import { randomCalculation } from '../utils/generateRandom';
import Heading from './Heading';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '../components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../components/ui/form';
import { Input } from '../components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';

function CalculationTraining() {
  const settings = useCalculationSettings((state) => state.settings);
  const { sets, values, rangefrom, rangeto, operators } = settings;
  const problems = randomCalculation(sets, values, rangefrom, rangeto, [
    ...operators,
  ]);

  const formSchemaData = {};

  // problems.map((problem, i) => {
  //   formSchemaData[`problem-${i}`] = ;
  // });

  const formSchema = z.object({
    problem0: z.string(),
    problem1: z.string(),
    problem2: z.string(),
    problem3: z.string(),
    problem4: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  console.log(
    randomCalculation(sets, values, rangefrom, rangeto, [...operators])
  );

  return (
    <div className="flex flex-col items-center p-8">
      <Heading>Calculation Training</Heading>
      <div className="flex">
        <div className="flex flex-col gap-2">
          {problems.map((problem, i) => {
            return <div key={i}>{problem.expression}</div>;
          })}
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {problems.map((problem, i) => {
              return (
                <FormField
                  key={`problem${i}`}
                  control={form.control}
                  name={`problem${i}`}
                  render={({ field }) => (
                    <FormItem>
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
                          {problem.options.map((option, j) => {
                            return (
                              <SelectItem
                                key={`problem${i}${String(option)}`}
                                value={`problem${i}${String(option)}`}
                              >
                                {option}
                              </SelectItem>
                            );
                          })}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
              );
            })}

            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default CalculationTraining;
