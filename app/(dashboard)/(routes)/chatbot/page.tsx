"use client";

import axios from "axios";
import * as z from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Bot, Camera, Upload } from "lucide-react";

import Heading from "@/components/heading";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Empty } from "@/components/empty";
import { Loader } from "@/components/loader";
import { UserAvatar } from "@/components/user-avatar";
import { BotAvatar } from "@/components/bot-avatar";
import { cn } from "@/lib/utils";
import { formSchema } from "./constants";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const ChatBotPage = () => {
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmitForm = async (values: z.infer<typeof formSchema>) => {
    try {
      const userMessage: Message = {
        role: "user",
        content: values.prompt,
      };

      setMessages((current) => [...current, userMessage]);

      const response = await axios.post("/api/chatbot", {
        messages: [userMessage],
      });

      setMessages((current) => [
        ...current,
        { role: "assistant", content: response.data.message },
      ]);

      form.reset();
    } catch (error) {
      console.error("Error submitting form:", error);
      // Add error handling UI feedback here
    }
  };

  const handleImageUpload = async (file: File) => {
    if (!file) return;

    setIsUploading(true);
    try {
      const base64 = await convertToBase64(file);

      const response = await axios.post("/api/chatbot", {
        messages: [{ role: "user", content: "Image analysis request" }],
        b64: base64,
      });

      setMessages((current) => [
        ...current,
        { role: "user", content: "Image uploaded" },
        { role: "assistant", content: response.data.message },
      ]);
    } catch (error) {
      console.error("Error uploading image:", error);
      // Add error handling UI feedback here
    } finally {
      setIsUploading(false);
    }
  };

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  return (
    <div>
      <Heading
        title="Chatbot"
        description="Our most advanced conversational agent"
        icon={Bot}
        iconColor="text-violet-500"
        bgColor="bg-violet-500/10"
      />
      <div className="px-4 lg:px-8">
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
                      disabled={isLoading || isUploading}
                      placeholder="Ask about your crops..."
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <div className="flex items-center ml-auto gap-2">
              <input
                id="image-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleImageUpload(file);
                }}
              />

              <button
                type="button"
                // disabled={isLoading || isUploading}
                className="bg-black text-white flex justify-center items-center h-8 w-8 sm:h-9 sm:w-9 p-2 rounded-full hover:bg-black/70 disabled:opacity-50"
              >
                <Camera size={20} />
              </button>
              
              <button
                type="button"
                onClick={() => document.getElementById("image-upload")?.click()}
                disabled={isLoading || isUploading}
                className="bg-black text-white flex justify-center items-center h-8 w-8 sm:h-9 sm:w-9 p-2 rounded-full hover:bg-black/70 disabled:opacity-50"
              >
                <Upload size={20} />
              </button>

              <button
                type="submit"
                disabled={isLoading || isUploading}
                className="bg-black text-white flex justify-center items-center h-8 w-8 sm:h-9 sm:w-9 p-2 rounded-full hover:bg-black/70 disabled:opacity-50"
              >
                <ArrowRight size={20} />
              </button>
            </div>
          </form>
        </Form>

        <div className="space-y-4 mt-4">
          {(isLoading || isUploading) && (
            <div className="pt-5 w-full flex items-center justify-center">
              <Loader />
            </div>
          )}

          {messages.length === 0 && !isLoading && !isUploading && (
            <Empty label="Start conversation with Chatbot" src="/empty.png" />
          )}

          <div className="flex flex-col-reverse gap-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={cn(
                  "flex gap-2 w-full",
                  message.role === "user" ? "justify-end" : "justify-start"
                )}
              >
                {message.role === "user" ? <UserAvatar /> : <BotAvatar />}
                <div
                  className={cn(
                    "p-4 max-w-[70%] rounded-lg",
                    message.role === "user"
                      ? "border border-black/10"
                      : "bg-muted"
                  )}
                >
                  <p className="text-sm">{message.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBotPage;
