"use client";

import axios from "axios";
import * as z from "zod";
import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Bot, Camera, Upload, Mic, MicOff } from "lucide-react";

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
  image?: string;
}

const ChatBotPage = () => {
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [pendingImage, setPendingImage] = useState<string | null>(null);
  const [isListening, setIsListening] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [cropDetails, setCropDetails] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmitForm = async (values: z.infer<typeof formSchema>) => {
    try {
      if (pendingImage) {
        const userMessage: Message = {
          role: "user",
          content: values.prompt || "Image analysis request",
          image: pendingImage,
        };

        setMessages((current) => [...current, userMessage]);

        const response = await axios.post("/api/chatbot", {
          messages: [userMessage],
        });

        setMessages((current) => [
          ...current,
          { role: "assistant", content: response.data.message },
        ]);

        // Clear the pending image after sending
        setPendingImage(null);
      } else if (values.prompt.trim()) {
        // If there's only text, send it normally
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
      }

      form.reset();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleImageUpload = async (file: File) => {
    if (!file) return;

    setIsUploading(true);
    try {
      const base64 = await convertToBase64(file);

      const userMessage: Message = {
        role: "user",
        content: "Image analysis request",
        image: base64,
      };

      setMessages((current) => [...current, userMessage]);

      const response = await axios.post("/api/chatbot", {
        messages: [{ role: "user", content: "Image analysis request" }],
        b64: base64,
      });

      setMessages((current) => [
        ...current,
        { role: "assistant", content: response.data.message },
      ]);
    } catch (error) {
      console.error("Error uploading image:", error);
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

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });
      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }

      const modal = document.getElementById("camera-modal");
      if (modal) modal.style.display = "flex";
    } catch (error) {
      console.error("Error accessing camera:", error);
      alert(
        "Unable to access camera. Please ensure you have given camera permissions."
      );
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }

    const modal = document.getElementById("camera-modal");
    if (modal) modal.style.display = "none";
  };

  const capturePhoto = async () => {
    try {
      if (!videoRef.current) return;

      const canvas = document.createElement("canvas");
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.drawImage(videoRef.current, 0, 0);
      const base64Image = canvas.toDataURL("image/jpeg");

      stopCamera();

      const userMessage: Message = {
        role: "user",
        content: "Photo analysis request",
        image: base64Image,
      };

      setMessages((current) => [...current, userMessage]);

      setIsUploading(true);
      const response = await axios.post("/api/chatbot", {
        messages: [{ role: "user", content: "Photo analysis request" }],
        b64: base64Image,
      });

      setMessages((current) => [
        ...current,
        { role: "assistant", content: response.data.message },
      ]);
    } catch (error) {
      console.error("Error capturing photo:", error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="pb-11">
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
            <button
              type="button"
              disabled={isLoading || isUploading}
              className="bg-gray-100 text-black flex justify-center items-center h-8 w-8 sm:h-9 sm:w-9 p-2 rounded-full hover:bg-black/10 disabled:opacity-50"
            >
              {isListening ? <Mic size={20} /> : <MicOff size={20} />}
            </button>

            <FormField
              name="prompt"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl className="m-0 p-0">
                    <Input
                      className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent sm:pl-2"
                      disabled={isLoading || isUploading}
                      placeholder="Ask your queries..."
                      autoComplete="off"
                      {...field}
                      value={form.getValues("prompt")}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <div className="flex items-center ml-auto gap-2">
              <button
                type="button"
                onClick={startCamera}
                disabled={isLoading || isUploading}
                className="bg-gray-100 text-black  flex justify-center items-center h-8 w-8 sm:h-9 sm:w-9 p-2 rounded-full hover:bg-black/10 disabled:opacity-50"
              >
                <Camera size={20} />
              </button>

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
                onClick={() => document.getElementById("image-upload")?.click()}
                disabled={isLoading || isUploading}
                className="bg-gray-100 text-black  flex justify-center items-center h-8 w-8 sm:h-9 sm:w-9 p-2 rounded-full hover:bg-black/10 disabled:opacity-50"
              >
                <Upload size={20} />
              </button>

              <button
                type="submit"
                disabled={isLoading || isUploading || !form.getValues("prompt")}
                className="bg-black text-white flex justify-center items-center h-8 w-8 sm:h-9 sm:w-9 p-2 rounded-full hover:bg-black/70"
              >
                <ArrowRight size={20} />
              </button>
            </div>
          </form>
        </Form>

        {/* Camera Modal */}
        <div
          id="camera-modal"
          className="fixed inset-0 bg-black bg-opacity-50 hidden items-center justify-center z-50"
        >
          <div className="bg-white p-4 rounded-lg shadow-lg max-w-xl w-full mx-4">
            <div className="relative">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                className="w-full rounded-lg"
              />
              <div className="flex justify-center gap-4 mt-4">
                <button
                  onClick={capturePhoto}
                  className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600"
                >
                  Capture
                </button>
                <button
                  onClick={stopCamera}
                  className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Messages Section */}
        <div className="space-y-4 mt-4">
          {(isLoading || isUploading) && (
            <div className="pt-5 w-full flex items-center justify-center">
              <Loader label="Agrobot is thinking" src="logo.png" />
            </div>
          )}

          {messages.length === 0 && !isLoading && !isUploading && (
            <Empty label="Start conversation with Chatbot" src="/empty.png" />
          )}

          <div className="flex flex-col gap-y-4">
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
                  {message.image && (
                    <div className="mb-3">
                      <img
                        src={message.image}
                        alt="Uploaded content"
                        className="max-w-full rounded-lg"
                      />
                    </div>
                  )}
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
