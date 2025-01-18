"use client";

import axios from "axios";
import * as z from "zod";
import Heading from "@/components/heading";
import { Download, ImageIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Empty } from "@/components/empty";
import { Loader } from "@/components/loader";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { amountOptions, formSchema, resolutionOptions } from "./constants"; // Imported from constants
import { Card, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const ImagePage = () => {
  const router = useRouter();
  const [images, setImages] = useState<string[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
      amount: "1",
      resolution: "512x512",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmitForm = async (values: z.infer<typeof formSchema>) => {
    try {
      setImages([]);
      const { prompt, amount, resolution } = values;
      const [width, height] = resolution.split('x');

      const jsonData = JSON.stringify({
        prompt,
        width,
        height,
        samples: amount,
      });
  
      const response = await axios.post(
        "/api/image",
        jsonData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const urls = response.data.proxy_links;
     
      setImages(urls)

      form.reset();
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        console.error('Axios Error:', error.message);
        console.error('Axios Error Details:', error.response?.data || error.response?.status);
      } else {
        console.error('Unexpected Error:', error);
      }
    } finally {
      router.refresh();
    }
  };

  return (
    <div>
      <Heading
        title="Image Generation"
        description="Turn your prompts into images"
        icon={ImageIcon}
        iconColor="text-pink-700"
        bgColor="bg-pink-700/10"
      />
      <div className="px-4 lg:px-8">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmitForm)}
            className="rounded-lg border w-full pb-4 p-2 px-3 sm:px-5 md:px-3 shadow-md flex flex-col gap-4"
          >
            <div className="flex pt-1 px-3 sm:px-1">
              <FormField
                name="prompt"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl className="m-0 p-0">
                      <Input
                        className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent sm:pl-2"
                        disabled={isLoading}
                        placeholder="Enter prompt..."
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
                className="bg-[#111827] text-white flex justify-center items-center mt-1 sm:mt-0 px-3 sm:p-2 rounded-sm sm:px-4 text-sm py-1 sm:text-md cursor-pointer hover:bg-[#111827]/70"
              >
                Imagify
              </button>
            </div>
             
            <div className="flex justify-start gap-4 items-center px-2">
              <FormField
                name="amount"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <Select
                      disabled={isLoading}
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue defaultValue={field.value} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {amountOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />

              <FormField
                name="resolution"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <Select
                      disabled={isLoading}
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue defaultValue={field.value} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {resolutionOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            </div>
          </form>
        </Form>

        <div className="space-y-4 mt-2 py-4">
          {isLoading && (
            <div className="pt-5 rounded-lg w-full flex items-center justify-center">
              <Loader />
            </div>
          )}
          {images.length === 0 && !isLoading && (
            <Empty label="Start generating images with CreaFive" />
          )}
  
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 ">
            {images.map((image, idx) => (
            
              <Card
              key={idx}
              className="rounded-sm overflow-hidden"
              >
                <div className="relative aspect-square">
                  <Image alt="image" fill src={image} />
                </div>
                <CardFooter className="p-2">
                  <Button variant="secondary" className="w-full"
                    onClick={() => window.open(image)}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};

export default ImagePage;




