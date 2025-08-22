"use client"
import React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Checkbox } from "@/components/ui/checkbox"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

const items = [
  { id: "sunday", label: "Sunday" },
  { id: "monday", label: "Monday" },
  { id: "tuesday", label: "Tuesday" },
  { id: "wednesday", label: "Wednesday" },
  { id: "thursday", label: "Thursday" },
  { id: "friday", label: "Friday" },
  { id: "saturday", label: "Saturday" },
] as const

const FormSchema = z.object({
  items: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one item.",
  }),
})

// Define props for DayPicker component
type DayPickerProps = {
  initialDays?: string[];
  onDaysChange: (selectedDays: string[]) => void;
};

// Update the component signature to accept props
export default function DayPicker({ initialDays = [], onDaysChange }: DayPickerProps) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      items: initialDays,
    },
  })

  return (
    <Form {...form}>
      <div className="space-y-4">
        <FormField
          control={form.control}
          name="items"
          render={() => (
            <FormItem>
              <div className="mb-3 mt-3">
                <FormLabel className="text-sm">Select Doctor Availability Days</FormLabel>
              </div>
              {items.map((item) => (
                <FormField
                  key={item.id}
                  control={form.control}
                  name="items"
                  render={({ field }) => (
                    <FormItem key={item.id} className="flex flex-row items-center gap-2">
                      <FormControl>
                        <Checkbox
                          checked={field.value?.includes(item.id)}
                          onCheckedChange={(checked) => {
                            const newValue = checked
                              ? [...field.value, item.id]
                              : field.value?.filter((value) => value !== item.id) || [];
                            
                            field.onChange(newValue);
                            // Call onDaysChange directly here
                            onDaysChange(newValue);
                          }}
                        />
                      </FormControl>
                      <FormLabel className="text-sm font-normal">
                        {item.label}
                      </FormLabel>
                    </FormItem>
                  )}
                />
              ))}
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </Form>
  )
}
