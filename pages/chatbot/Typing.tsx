import { BotMessageSquare } from "lucide-react";
import "./typing.css";
import { Card, CardContent } from "@/components/ui/card";

export default function Typing() {
  return <>
  <div className={`w-full my-2 flex px-2`}>

        <div className="flex-shrink-0">
          <BotMessageSquare size={25} className="m-2 p-1 rounded-full" />
        </div>
      <Card
        className={`max-w-full rounded-none rounded-t-xl rounded-br-xl`}
      >
        <CardContent className="p-2">
          <div className="typing">
            <div className="typing__dot"></div>
            <div className="typing__dot"></div>
            <div className="typing__dot"></div>
          </div>
        </CardContent>
      </Card>
    </div>

  </>
}