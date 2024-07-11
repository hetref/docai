"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import axios from "axios";
import { Plus } from "lucide-react";
import { useToast } from "./ui/use-toast";
import { useRouter } from "next/navigation";

const NewDocument = () => {
  const router = useRouter();
  const { toast } = useToast();

  const createNewDoc = async (
    title: string = "Untitled Document",
    description: string = ""
  ) => {
    try {
      const response = await axios.post("/api/document/new", {
        title: title,
        description: description,
      });
      toast({
        title: "Document Successfully Created!",
      });
      router.push(`/document/${response.data.id}`);
    } catch (error) {}
  };

  // Pre Build Templates for the user to create the documents.
  const templateMap = [
    {
      component: (
        <button onClick={() => createNewDoc()}>
          <Card className="w-[150px] hover:border hover:border-blue-500 hover:cursor-pointer">
            <CardHeader></CardHeader>
            <CardContent className="flex justify-center mx-auto">
              <Plus size={80} color="#9e9e9e" />
            </CardContent>
            <CardFooter></CardFooter>
          </Card>
        </button>
      ),
      footer: "Blank Document",
    },
    {
      component: (
        <button
          onClick={() =>
            createNewDoc(
              "Simple Mail",
              `Dear sir/mam,

[subject]

[opening]

[body]

[closure]`
            )
          }
        >
          <Card className="w-[150px] hover:border hover:border-blue-500 hover:cursor-pointer">
            <CardHeader></CardHeader>
            <CardContent className="flex justify-center mx-auto">
              <Plus size={80} color="#9e9e9e" />
            </CardContent>
            <CardFooter></CardFooter>
          </Card>
        </button>
      ),
      footer: "Simple Mail",
    },
    {
      component: (
        <button
          onClick={() =>
            createNewDoc(
              "Professional Resume",
              `[Name]

[Experience]

[Projects]

[Education]

[Skills]`
            )
          }
        >
          <Card className="w-[150px] hover:border hover:border-blue-500 hover:cursor-pointer">
            <CardHeader></CardHeader>
            <CardContent className="flex justify-center mx-auto">
              <Plus size={80} color="#9e9e9e" />
            </CardContent>
            <CardFooter></CardFooter>
          </Card>
        </button>
      ),
      footer: "Professional Resume",
    },
    {
      component: (
        <button
          onClick={() =>
            createNewDoc(
              "Project Info",
              `[Project Name]

[Introduction]

[Body]

[Closure]`
            )
          }
        >
          <Card className="w-[150px] hover:border hover:border-blue-500 hover:cursor-pointer">
            <CardHeader></CardHeader>
            <CardContent className="flex justify-center mx-auto">
              <Plus size={80} color="#9e9e9e" />
            </CardContent>
            <CardFooter></CardFooter>
          </Card>
        </button>
      ),
      footer: "Project Info",
    },
  ];

  return (
    <div className="flex flex-row md:flex-col justify-center items-center flex-wrap">
      <div className="flex flex-col space-y-4 mx-auto flex-wrap max-w-7xl w-full py-6 border-b-2 md:border-none">
        <h3 className="text-muted-foreground text-sm">Start a new document</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 2xl:grid-cols-8 text-center gap-6">
          {templateMap.map((template) => (
            <div key={template.footer}>
              {template.component}
              <p className="text-sm mt-2 ml-2 text-center">{template.footer}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewDocument;
