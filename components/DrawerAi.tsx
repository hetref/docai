"use client";

import { useState } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import ai from "@/app/utils/ai";
import { Loader } from "lucide-react";
import { useToast } from "./ui/use-toast";
import { Button } from "./ui/button";

const DrawerAi = ({
  title,
  description,
}: {
  title: string | null;
  description: string | null;
}) => {
  const [wizardSuggestion, setWizardSuggestion] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { toast } = useToast();

  const convertNewlinesToBreaks = (text: string) => {
    return text.replace(/\n/g, "<br />");
  };

  const handleWizardSuggestion = async () => {
    setIsLoading(true);
    if (wizardSuggestion === "") {
      try {
        const response = await ai(title!, description!);
        setWizardSuggestion(response.text);
        console.log("RESPOSE", response);
        console.log("RESPOSE", response.text);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    } else {
      setIsLoading(false);
      toast({
        title:
          "Already Generated! Please press clear button to regenerate the content!",
      });
    }
  };

  return (
    <div className="flex justify-end">
      <AlertDialog>
        <AlertDialogTrigger onClick={handleWizardSuggestion}>
          Generate With AI 🧙‍♂️
        </AlertDialogTrigger>
        <AlertDialogContent className="max-h-[300px] lg:max-h-[500px] overflow-y-scroll">
          <AlertDialogHeader>
            <AlertDialogTitle>
              {wizardSuggestion.length > 0
                ? "Well, here's your content!"
                : "Please wait till the AI generate the content!"}
            </AlertDialogTitle>
            <span className="text-sm text-muted-foreground leading-tight">
              If the output is in Markdown Code, then you can{" "}
              <a
                href="https://mdxjs.com/playground/"
                className="underline"
                target="_blank"
              >
                visit this link
              </a>{" "}
              to decode it!
            </span>
            <div className="w-full h-0" />
            <div className="w-full h-[2px] bg-black/60 rounded-full" />
            <div className="w-full h-3" />
            <AlertDialogDescription>
              {isLoading ? (
                <Loader className="flex mx-auto justify-center animate-spin" />
              ) : (
                <span>
                  {/* {wizardSuggestion.length > 0 && <p>{wizardSuggestion}</p>} */}
                  {wizardSuggestion.length > 0 && (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: convertNewlinesToBreaks(wizardSuggestion),
                      }}
                      style={{ whiteSpace: "pre-line" }} // Preserve whitespace and line breaks
                    />
                  )}
                </span>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="sticky bottom-0 left-1">
            <AlertDialogCancel>Close</AlertDialogCancel>
            <AlertDialogAction className="flex gap-2">
              <Button
                onClick={async () => {
                  await navigator.clipboard.writeText(wizardSuggestion);
                }}
              >
                Copy
              </Button>
            </AlertDialogAction>
            <AlertDialogAction>
              <Button
                onClick={() => {
                  toast({
                    title:
                      "History Cleared, now you can regenerate the content with AI!",
                  });
                  setWizardSuggestion("");
                }}
              >
                Clear
              </Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger
          className="flex float-right border border-1 py-2 px-4 rounded hover:opacity-80"
          onClick={handleWizardSuggestion}
        >
          Ask Your Wizard 🧙‍♂️
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>
              🧙‍♂️ Oyyy! Wizard here! am helping you you with your wizarly
              storytelling or resume writing 🪄✨Apereciiiuuummm✨?
            </DrawerTitle>
            {isLoading ? (
              <Loader className="flex mx-auto justify-center animate-spin" />
            ) : (
              //   <span>Done Loading</span>
              <DrawerDescription className="whitespace-pre-wrap min-h-[400px] overflow-scroll">
                {wizardSuggestion.length > 0 && <p>{wizardSuggestion}</p>}
              </DrawerDescription>
            )}
          </DrawerHeader>
          <DrawerFooter></DrawerFooter>
        </DrawerContent>
      </Drawer> */}
    </div>
  );
};

export default DrawerAi;
