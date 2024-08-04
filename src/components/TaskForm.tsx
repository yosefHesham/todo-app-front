import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const formSchema = z
  .object({
    description: z.string().min(4, {
      message: "Description must be at least 4 characters.",
    }),
    fromTime: z.date().refine(
      (date) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return date >= today;
      },
      {
        message: "From time must be today or later",
      }
    ),
    toTime: z.date(),
  })
  .superRefine((data, ctx) => {
    if (data.toTime <= data.fromTime) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["toTime"],
        message: "ToTime must be after FromTime",
      });
    }
  });

const TaskForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: "",
      fromTime: new Date(),
      toTime: new Date(),
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormItem>
          <FormLabel>Description</FormLabel>
          <FormControl>
            <Controller
              name="description"
              control={form.control}
              render={({ field }) => (
                <Input placeholder="Write blog about js closures" {...field} />
              )}
            />
          </FormControl>
          <FormMessage />
        </FormItem>

        <FormItem>
          <FormLabel>From Time</FormLabel>
          <FormControl>
            <Controller
              name="fromTime"
              control={form.control}
              render={({ field: { onChange, onBlur, value } }) => (
                <DatePicker
                  selected={value ? new Date(value) : null}
                  onChange={onChange}
                  onBlur={onBlur}
                  showTimeSelect
                  dateFormat="Pp"
                />
              )}
            />
          </FormControl>
          <FormMessage />
        </FormItem>

        <FormItem>
          <FormLabel>To Time</FormLabel>
          <FormControl>
            <Controller
              name="toTime"
              control={form.control}
              render={({ field: { onChange, onBlur, value } }) => (
                <DatePicker
                  selected={value ? new Date(value) : null}
                  onChange={onChange}
                  onBlur={onBlur}
                  showTimeSelect
                  dateFormat="Pp"
                />
              )}
            />
          </FormControl>
          <FormMessage />
        </FormItem>

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};
export default TaskForm;
