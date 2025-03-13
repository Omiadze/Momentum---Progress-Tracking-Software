import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import PieChartSvg from "./components/pie-chart-svg";
import UserSvg from "./components/user-svg";

import CalendarSvg from "./components/calendar-svg";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import DownArrowSvg from "../home/components/down-arrow-svg";
import { useState } from "react";
import { cn } from "@/lib/utils";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Controller, useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";

import ReplySvg from "./components/reply-svg";

const InfoTask = () => {
  const conditions = [
    "დასაწყები",
    "პროგრესში",
    "მზად ტესტირებისთვის",
    "დასრულებული",
  ];
  const [selectedCondition, setSelectedCondition] = useState(
    "მზად ტესტირებისთვის"
  );
  const { control, handleSubmit, formState, reset } = useForm({
    defaultValues: {
      message: "",
    },
  });

  const onSubmit = (values: any) => {
    console.log(values);
  };
  return (
    <div className="flex justify-between pl-24 pr-24 h-full pt-20">
      <div className="w-1/2 text-left">
        <div className="mb-5">
          <Button
            variant={"ghost"}
            className="border-[1px] border-amber-300 mr-2"
          >
            საშუალო
          </Button>
          <Badge className="bg-pink-400">დიზაინი</Badge>
        </div>
        <div className="mb-14 flex flex-col gap-3">
          <h1 className="font-semibold text-3xl ">
            Redberry-ს საიტის ლენდინგის დიზაინი{" "}
          </h1>
          <p>
            მიზანია რომ შეიქმნას თანამედროვე, სუფთა და ფუნქციონალური დიზაინი,
            რომელიც უზრუნველყოფს მარტივ ნავიგაციას და მკაფიო ინფორმაციის
            გადაცემას. დიზაინი უნდა იყოს ადაპტირებადი (responsive), გამორჩეული
            ვიზუალით, მინიმალისტური სტილით და ნათელი ტიპოგრაფიით.
          </p>
        </div>
        <div>
          <h1 className="mb-9 text-2xl">დავალების დეტალები</h1>
          <div className="w-[500px] text-[#474747]">
            <div className="flex items-center mb-9">
              <div className="flex w-[260px] gap-3">
                <PieChartSvg />
                <p>სტატუსი</p>
              </div>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="link">
                    თანამშრომელი
                    <DownArrowSvg />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="ml-24 w-[688px] p-4">
                  {conditions.map((con) => (
                    <div
                      key={con}
                      className={cn(
                        "p-2 rounded cursor-pointer hover:bg-gray-200"
                      )}
                      onClick={() => setSelectedCondition(con)}
                    >
                      {con}
                    </div>
                  ))}
                </PopoverContent>
              </Popover>
            </div>
            <div className="flex items-center mb-9">
              <div className="flex w-[260px] gap-3">
                <UserSvg />
                <p>თანამშრომელი</p>
              </div>
              <div className="flex ">
                <Avatar>
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div>
                  <p>department</p>
                  <p>saxeli gvari</p>
                </div>
              </div>
            </div>
            <div className="flex mb-9">
              <div className="flex w-[260px]">
                <CalendarSvg />
                <p>დავალების დედლაინი</p>
              </div>
              <p>22/02/2002</p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-[40%] bg-[#F8F3FEA6] p-10 rounded-xl h-[975px]">
        <div className="text-start relative mb-11">
          <Controller
            name="message"
            control={control}
            render={({ field: { onChange, value } }) => (
              <div className="w-full flex gap-2 flex-col">
                <Textarea
                  id="message"
                  placeholder={"დაწერე კომენტარი"}
                  onChange={onChange}
                  value={value}
                  className="border-[0.5px] border-[#ADB5BD] h-[135px] bg-white"
                />

                <Button
                  onClick={handleSubmit(onSubmit)}
                  className="absolute rounded-3xl right-5 bottom-4"
                >
                  დააკომენტარე
                </Button>
              </div>
            )}
          />
        </div>
        <div>
          <div className="flex gap-2">
            <h1 className="text-left mb-9 text-xl font-medium">კომენტარები</h1>
            <Button className="w-3 h-6 rounded-full">3</Button>
          </div>
          <div className="flex gap-4">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>

            <div className="text-left">
              <h1 className="text-xl font-medium">emilia</h1>{" "}
              <p>
                დიზაინი სუფთად ჩანს, მაგრამ კოდირებისას მნიშვნელოვანი იქნება,
                რომ ელემენტებს ჰქონდეს შესაბამისი რეზოლუცია.
              </p>
              <Button variant={"ghost"}>
                <ReplySvg />
                <p className="text-primary">უპასუხე</p>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoTask;
