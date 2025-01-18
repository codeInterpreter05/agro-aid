"use client";

import axios from "axios";
import * as z from "zod";
import Heading from "@/components/heading";
import { ArrowRight, Music } from "lucide-react";
import { formSchema } from "./constants";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Empty } from "@/components/empty";
import { Loader } from "@/components/loader";

const MusicPage = () => {
  const router = useRouter();
  const [music, setMusic] = useState<string>();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmitForm = async (values: z.infer<typeof formSchema>) => {
    try {
      setMusic(undefined);
  
      const response = await axios.post("/api/music", values);

      setMusic(response.data.audio)
  
      form.reset();
    } catch (error: any) {
      console.log(error);
    } finally {
      router.refresh();
    }
  };
  

  return (
    <div>
      <Heading
        title="Music Generation"
        description="Turn your prompt into beautiful melodies"
        icon={Music}
        iconColor="text-emerald-500"
        bgColor="bg-emerald-500/10"
      />
      <div className="px-4 lg:px-8">
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmitForm)}
              className="rounded-lg border w-full p-2 px-3 sm:px-5 md:px-3 shadow-md flex items-center gap-2"
            >
              <FormField
                name="prompt"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl className="m-0 p-0">
                      <Input
                        className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent sm:pl-2"
                        disabled={isLoading}
                        placeholder="Your prompt..."
                        autoComplete="off"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <button
                type="submit"
                disabled={isLoading}
                className="bg-black text-white flex justify-center items-center h-8 w-8 mt-1 sm:mt-0 sm:h-9 sm:w-9 p-2 rounded-full text-2xl cursor-pointer hover:bg-black/70"
              >
                <ArrowRight />
              </button>
            </form>
          </Form>
        </div>
        <div className="space-y-4 mt-2 py-4">
          {isLoading && (
            <div className="pt-5 rounded-lg w-full flex items-center justify-center">
              <Loader />
            </div>
          )}
          {!music && !isLoading && (
            <Empty label="Start Music with CreaFive" />
          )}
          {
            music && (
              <audio controls className="w-full mt-8">
                <source src={music} />
              </audio>
            )
          }
        </div>
      </div>
    </div>
  );
};

export default MusicPage;



