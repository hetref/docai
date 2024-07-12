"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { redirect, useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Editor from "./Editor";
import axios from "axios";
import { revalidatePath } from "next/cache";
import { useToast } from "./ui/use-toast";
import DrawerAi from "./DrawerAi";

const FormSchema = z.object({
  title: z.string().min(2).max(30),
  description: z.string().min(2),
});

interface DocumentProps {
  id: string;
  userId: string;
  title: string | null;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
}

interface EditorBlockProps {
  document?: DocumentProps | null;
}

const EditorBlock: React.FC<EditorBlockProps> = ({ document }) => {
  if (!document) redirect("/");

  const router = useRouter();
  const { toast } = useToast();

  const [documentValues, setDocumentValues] = useState({
    title: document?.title,
    description: document?.description,
  });

  const EditorForm = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: document.title || "",
      description: document.description || "",
    },
  });

  const onUpdateChange = async (values: z.infer<typeof FormSchema>) => {
    try {
      await axios.put(`/api/document/${document?.id}`, values);
      toast({ title: "Document Successfully Updated" });

      setDocumentValues({
        title: values.title,
        description: values.description,
      });
      //   revalidatePath("/");
      //   revalidatePath(`/document/${document.id}`);
    } catch (error) {
      toast({
        title: "Document Update Failed",
      });
      console.log("ON UPDATE ERROR", error);
    }
  };

  const onDocumentDelete = async () => {
    try {
      const resp = await axios.delete(`/api/document/${document?.id}`);
      console.log("RESP", resp);
      if (resp.status === 200) {
        toast({
          title: "Document Delete Successfully",
        });
        router.push("/");
      } else {
        toast({
          title: "Document Delete Failed",
        });
      }
    } catch (error) {
      toast({
        title: "Document Delete Failed",
      });
      console.log(error);
    }
  };

  return (
    <div>
      <DrawerAi
        title={documentValues.title}
        description={documentValues.description}
      />
      <Form {...EditorForm}>
        <form
          onSubmit={EditorForm.handleSubmit(onUpdateChange)}
          className="flex flex-col gap-3"
        >
          <FormField
            control={EditorForm.control}
            name="title"
            render={({ field }) => (
              <FormItem className="my-4">
                <FormControl>
                  <>
                    <label className="text-muted-foreground text-sm">
                      Title
                    </label>
                    <Input placeholder="Enter Title here" {...field} />
                  </>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          ></FormField>

          <FormField
            control={EditorForm.control}
            name="description"
            render={({ field }) => (
              <FormItem className="my-4">
                <FormControl>
                  <>
                    <label className="text-muted-foreground text-sm">
                      Content
                    </label>
                    <Editor {...field} />
                  </>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          ></FormField>
          <Button type="submit" className="mt-[80px]">
            Save Changes
          </Button>

          {/* <div className="flex justify-end items-center">
            <DrawerAI description={document.description} /> 
            <form onSubmit={onDocumentDelete} className=""> */}
          {/* </form> */}
          {/* </div> */}
        </form>
      </Form>
      <Button
        onClick={onDocumentDelete}
        variant="destructive"
        className="w-full mt-4"
      >
        Delete
      </Button>
    </div>
  );
};

export default EditorBlock;
