import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
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
import PrimaryButton from "./PrimaryButton";

const formSchema = z
  .object({
    description: z.string().min(4, {
      message: "Description must be at least 4 characters.",
    }),
    fromTime: z.date().refine(
      (date) => {
        if (!date) {
          return { message: "This field is required" };
        }
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
    if (!data) {
      return { message: "This field is required" };
    }
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
      fromTime: undefined,
      toTime: undefined,
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 flex flex-col"
      >
        <FormItem className="flex gap-2 flex-col">
          <FormLabel>Description</FormLabel>
          <FormControl>
            <Controller
              name="description"
              control={form.control}
              render={({ field, fieldState }) => (
                <>
                  <Input
                    placeholder="Write blog about JS closures"
                    {...field}
                    className="border bg-gray-100 p-2 border-gray-400 rounded-md"
                  />
                  {fieldState.error && (
                    <FormMessage className="text-red-500">
                      {fieldState.error.message}
                    </FormMessage>
                  )}
                </>
              )}
            />
          </FormControl>
        </FormItem>

        <FormItem className="flex gap-2 flex-col">
          <FormLabel>From Time</FormLabel>
          <FormControl>
            <Controller
              name="fromTime"
              control={form.control}
              render={({ field, fieldState }) => (
                <>
                  <DatePicker
                    minDate={new Date()}
                    selected={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    className="border bg-gray-100 p-2 border-gray-400 rounded-md"
                    showTimeSelect
                    icon={true}
                    dateFormat="Pp"
                  />
                  {fieldState.error && (
                    <FormMessage className="text-red-500">
                      {fieldState.error.message}
                    </FormMessage>
                  )}
                </>
              )}
            />
          </FormControl>
        </FormItem>

        <FormItem className="flex flex-col gap-2">
          <FormLabel>To Time</FormLabel>
          <FormControl>
            <Controller
              name="toTime"
              control={form.control}
              render={({ field, fieldState }) => (
                <>
                  <DatePicker
                    minDate={new Date()}
                    className="border bg-gray-100 p-2 border-gray-400 rounded-md"
                    selected={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    showTimeSelect
                    dateFormat="Pp"
                  />
                  {fieldState.error && (
                    <FormMessage className="text-red-500">
                      {fieldState.error.message}
                    </FormMessage>
                  )}
                </>
              )}
            />
          </FormControl>
        </FormItem>

        <PrimaryButton
          buttonText="Submit"
          type="submit"
          classes="border border-red-500 rounded-md p-4 text-red-500"
          handleClick={() => {}}
        />
      </form>
    </Form>
  );
};

export default TaskForm;
