import { BotMessageSquare, CircleHelp, CircleUserRound } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Avatar } from "@radix-ui/react-avatar";
import { useTheme } from "next-themes";

type ChatMessageProps = {
  type: string;
  timestamp: string;
  msg: string;
};

export default function ChatMessage({
  type,
  timestamp,
  msg,
}: ChatMessageProps) {
  const { theme, setTheme } = useTheme();
  const oppositeTheme = theme === "dark" ? "black" : "white";

  return (
    <div className={`w-full my-2 flex px-2 ${type === "Q" && "justify-end"}`}>
      {type === "A" && (
        <div className="flex-shrink-0">
          <BotMessageSquare size={25} className="m-2 p-1 rounded-full" />
        </div>
      )}
      <Card
        className={`max-w-full rounded-none rounded-t-xl ${
          type === "A"
            ? "rounded-br-xl"
            : `justify-content-end bg-primary text-primary-foreground rounded-bl-xl`
        }`}
      >
        <CardContent className="p-2">
          <p className="text-sm text-ellipsis overflow-hidden text-left w-full text-wrap break-word">
            {msg}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
