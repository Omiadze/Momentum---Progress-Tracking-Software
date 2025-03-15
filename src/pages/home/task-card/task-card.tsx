import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CommentSvg from "../components/comment-svg";
import { Task } from "@/api/momentum/index.types";
import { setDateToConvert } from "../components/date-converter";

interface TaskCardProps {
  singleTask: Task;
}
const TaskCard: React.FC<TaskCardProps> = ({ singleTask }) => {
  return (
    <Card className="w-[381px] mb-4">
      <CardHeader>
        <CardTitle></CardTitle>
        <CardDescription className="flex justify-between items-center">
          <div className="w-[184px] flex">
            <Button
              variant={"ghost"}
              className="border-[1px] p-1 border-amber-300 mr-2"
            >
              <img src={singleTask.priority.icon} />
              {singleTask.priority.name}
            </Button>
            <Badge className="bg-pink-400 text-xs font rounded-full">
              {singleTask.department.name.split(" ")[0]}
            </Badge>
          </div>
          <p className="text-xs">{setDateToConvert(singleTask.due_date)} </p>
        </CardDescription>
      </CardHeader>
      <CardContent className="text-left">
        <h1 className="font-medium text-black mb-2 pl-1.5">
          {singleTask.name}
        </h1>
        <p className="font-normal text-[#343A40] text-sm pl-1.5 line-clamp-2">
          {singleTask.description}
        </p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Avatar>
          <AvatarImage src={singleTask.employee.avatar} alt="@shadcn" />
          <AvatarFallback>{singleTask.employee.name[0]}</AvatarFallback>
        </Avatar>
        <div className="flex justify-center items-center gap-1">
          <CommentSvg />
          <p>{singleTask.total_comments}</p>
        </div>
      </CardFooter>
    </Card>
  );
};

export default TaskCard;
