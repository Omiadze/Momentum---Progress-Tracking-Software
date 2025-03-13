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

const TaskCard = () => {
  return (
    <Card className="w-[381px]">
      <CardHeader>
        <CardTitle></CardTitle>
        <CardDescription className="flex justify-between items-center">
          <div className="">
            <Button
              variant={"ghost"}
              className="border-[1px] border-amber-300 mr-2"
            >
              საშუალო
            </Button>
            <Badge className="bg-pink-400">დიზაინი</Badge>
          </div>
          <p>22 იანვ, 2022 </p>
        </CardDescription>
      </CardHeader>
      <CardContent className="text-left">
        <h1 className="font-medium text-black mb-2 pl-1.5">
          Redberry-ს საიტის ლენდინგის დიზაინი{" "}
        </h1>
        <p className="font-normal text-[#343A40] text-sm pl-1.5">
          შექმენი საიტის მთავარი გვერდი, რომელიც მოიცავს მთავარ სექციებს,
          ნავიგაციას.
        </p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <CommentSvg />
      </CardFooter>
    </Card>
  );
};

export default TaskCard;
