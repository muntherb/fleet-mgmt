"use client";
import { IconPlus } from "@tabler/icons-react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { DialogHeader, DialogFooter } from "./ui/dialog";
import { Input } from "./ui/input";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useBoundStore } from "@/store";
import { toast } from "sonner";
import { useEffect, useState } from "react";

const formSchema = z.object({
  model: z.string().min(2, {
    message: "Model must be at least 2 characters.",
  }),
  type: z.string().min(2, {
    message: "Type must be at least 2 characters.",
  }),
  status: z.string().min(2, {
    message: "Status must be at least 2 characters.",
  }),
});

export function VehicleForm() {
  const addVehicle = useBoundStore((state) => state.addVehicle);
  const loading = useBoundStore((state) => state.loading);
  const error = useBoundStore((state) => state.error);
  const [open, setOpen] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      model: "",
      type: "",
      status: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const randomId = Math.floor(Math.random() * 1000) + 41;
    const res = await addVehicle({ id: randomId, ...values });
    if (res) {
      toast.success("Vehicle added successfully");
      form.reset();
      setOpen(false);
    }
  }

  useEffect(() => {
    if (loading) {
      toast.loading("Updating...");
    } else {
      toast.dismiss();
    }
    if (error && !loading) {
      toast.error(error);
    }
    return;
  }, [loading, error]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="cursor-pointer">
          <IconPlus />
          <span className="hidden lg:inline">Add Vehicle</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add vehicle</DialogTitle>
          <DialogDescription>
            Add a vehicle to your dashboard.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="model"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="model">Model</FormLabel>
                    <FormControl>
                      <Input id="model" placeholder="Volvo FH..." {...field} />
                    </FormControl>
                    <FormDescription>
                      The model of your vehicle.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="type">Type</FormLabel>
                    <FormControl>
                      <Input id="type" placeholder="Truck.." {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="status">Status</FormLabel>
                    <FormControl>
                      <Input id="status" placeholder="Inactive.." {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button type="submit">Submit</Button>
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
