"use client";

import axios from "axios";
import * as z from "zod";
import Heading from "@/components/heading";
import { Download, ChartNoAxesColumn } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Empty } from "@/components/empty";
import { Loader } from "@/components/loader";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { amountOptions, formSchema, resolutionOptions } from "./constants"; // Imported from constants
import { Card, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Dashboard } from "@/components/Dashboard";

const ImagePage = () => {
  const router = useRouter();
  const [images, setImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
      amount: "1",
      resolution: "512x512",
    },
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // 2 seconds delay

    return () => clearTimeout(timer); // Clean up the timer if the component unmounts
  }, []);

  const onSubmitForm = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(false); // Set loading to true when the form is submitted
    try {
      setImages([]);
      const { prompt, amount, resolution } = values;
      const [width, height] = resolution.split("x");

      const jsonData = JSON.stringify({
        prompt,
        width,
        height,
        samples: amount,
      });

      const response = await axios.post("/api/image", jsonData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const urls = response.data.proxy_links;

      setImages(urls); // Set images on successful response
      form.reset(); // Reset form
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        console.error("Axios Error:", error.message);
        console.error(
          "Axios Error Details:",
          error.response?.data || error.response?.status
        );
      } else {
        console.error("Unexpected Error:", error);
      }
    } finally {
      setIsLoading(false); // Set loading to false after request completion
      router.refresh(); // Optionally refresh the router after finishing
    }
  };

  return (
    <div>
      <Heading
        title="Analysis"
        description="Analysis of your crop and cattle data"
        icon={ChartNoAxesColumn}
        iconColor="text-pink-700"
        bgColor="bg-pink-700/10"
      />
      <div className="px-4 lg:px-8">
        <div className="space-y-4 mt-2 py-4">
          {isLoading && (
            <div className="pt-5 rounded-lg w-full flex items-center justify-center">
              <Loader label="Loading visuals" src = "logo.png"/>
            </div>
          )}

          {images.length === 0 && !isLoading ? (
            <Dashboard />
          ) : (
            <Empty
              label="Start analysing your crops and cattle"
              src="/analysis.gif"
            />
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 ">
            {images.map((image, idx) => (
              <Card key={idx} className="rounded-sm overflow-hidden">
                <div className="relative aspect-square">
                  <Image alt="image" fill src={image} />
                </div>
                <CardFooter className="p-2">
                  <Button
                    variant="secondary"
                    className="w-full"
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
