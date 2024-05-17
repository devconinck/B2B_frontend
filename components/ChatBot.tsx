import React, { useState, FormEvent, useCallback } from "react";
import { BotMessageSquare, Car, Moon, Send, Sun, X } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "./ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Input } from "./ui/input";
import ChatMessage from "./ChatMessage";
import { sendChatMessage } from "@/pages/api/chat";

export default function ChatBot() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);
  const [chats, setChats] = useState([
    { type: "A", timestamp: "1713287290627", msg: "Hello, how can I help" },
  ]);

  const [question, setQuestion] = useState("");

  const handleClickBot = useCallback(() => {
    setVisible(!visible);
    console.log(visible);
  }, [visible]);

  async function sendQuestion(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setError(null); // Clear previous errors when a new request starts

    try {
      if (question === null || question === "" || question.length <= 0) {
        throw new Error("Gelieve iets in te vullen");
      }
      const answer = await sendChatMessage(question);
      setChats([
        ...chats,
        { type: "Q", timestamp: "", msg: question },
        { type: "A", timestamp: "", msg: answer },
      ]);
      setQuestion("");
    } catch (error) {
      // Capture the error message to display to the user
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      {visible && (
        <>
          <div className="fixed md:bottom-8 md:end-24 bottom-24 w-full end-0 px-2 md:w-80">
            <Card className="float-right z-10 border-0 w-full shadow-md">
              <CardHeader className="p-0 rounded-t-xl text-white text-left bg-primary  dark:bg-slate-100 dark:text-black">
                <div className="flex justify-between items-center px-2">
                  <h1 className="m-2">DelBot</h1>
                  <X className="cursor-pointer" onClick={handleClickBot}></X>
                </div>
              </CardHeader>
              <CardContent
                className="max-w-full p-0 overflow-y-scroll flex flex-col-reverse"
                style={{ height: "400px" }}
              >
                {chats
                  .map((chat) => {
                    return (
                      <>
                        <ChatMessage
                          type={chat.type}
                          msg={chat.msg}
                          timestamp={chat.timestamp}
                        ></ChatMessage>
                      </>
                    );
                  })
                  .reverse()}
              </CardContent>
              <CardFooter className="w-full p-0">
                <form
                  onSubmit={sendQuestion}
                  className="flex p-2 w-full border-t-2"
                >
                  <Input
                    name="question"
                    placeholder="Type your question here"
                    className={`mx-2 ${error && "border-red-500 text-red-500"}`}
                    value={question} // Stel de waarde in van het invoerveld
                    onChange={(e) => setQuestion(e.target.value)}
                  />

                  <button type="submit">
                    <Send className="mx-2"></Send>
                  </button>
                </form>
                {error && (
                  <label className="text-xs text-red-500 mb-2 text-left mt-0">
                    {error}
                  </label>
                )}
              </CardFooter>
            </Card>
          </div>
        </>
      )}
      <div className="fixed md:bottom-8 md:end-8 bottom-8 end-5  z-10">
        <BotMessageSquare
          size={50}
          className="p-3 hover:cursor-pointer rounded-full shadow-lg bg-primary dark:bg-slate-600"
          color="white"
          onClick={handleClickBot}
        ></BotMessageSquare>
      </div>
    </>
  );
}
