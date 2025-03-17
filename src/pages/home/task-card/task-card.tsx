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
import { useNavigate } from "react-router-dom";

interface TaskCardProps {
  singleTask: Task;
  borderColor: string;
}
const departmentColors: { [key: string]: string } = {
  ადმინისტრაციის: "bg-blue-400",
  ადამიანური: "bg-green-400",
  ფინანსების: "bg-red-400",
  გაყიდვები: "bg-yellow-400",
  ლოჯოსტიკის: "bg-purple-400",
  ტექნოლოგიების: "bg-teal-400",
  მედიის: "bg-orange-400",
};

const TaskCard: React.FC<TaskCardProps> = ({ singleTask, borderColor }) => {
  const navigate = useNavigate();

  // Get the first word from the department name
  const departmentName = singleTask.department.name.split(" ")[0];

  // Get the background color for the department
  const badgeColor = departmentColors[departmentName] || "bg-gray-400";

  const priorityColorPicker = () => {
    let priorityColor = "";
    if (singleTask.priority.name == "დაბალი") {
      priorityColor = "border-[#08A508] text-[#08A508]";
    } else if (singleTask.priority.name == "საშუალო") {
      priorityColor = "border-[#FFBE0B] text-[#FFBE0B]";
    } else {
      priorityColor = "border-[#FA4D4D] text-[#FA4D4D]";
    }
    console.log(priorityColor);

    return priorityColor;
  };

  return (
    <Card
      className="w-[381px] mb-4 "
      style={{ borderColor, borderWidth: "1px", borderStyle: "solid" }}
      onClick={() =>
        navigate(`/task/${singleTask.id}`, { state: { singleTask } })
      }
    >
      <CardHeader>
        <CardTitle></CardTitle>
        <CardDescription className="flex justify-between items-center">
          <div className="w-[184px] flex">
            <Button
              variant={"ghost"}
              className={`border-[1px] p-1 ${priorityColorPicker()} mr-2`}
            >
              <img src={singleTask.priority.icon} />
              {singleTask.priority.name}
            </Button>
            <Badge className={`${badgeColor} text-xs font rounded-full`}>
              {departmentName}
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
