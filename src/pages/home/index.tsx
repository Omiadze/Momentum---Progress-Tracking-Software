import { Button } from "@/components/ui/button";
import TaskCard from "./task-card/task-card";
import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import DownArrowSvg from "./components/down-arrow-svg";
import { Badge } from "@/components/ui/badge";
import XSvg from "./components/x-svg";

const Home = () => {
  const departments = ["მარკეტინგი", "დიზაინი", "ლოგისტიკა", "IT"];
  const priorities = ["მაღალი", "საშუალო", "დაბალი"];
  const employees = ["გიორგი", "ანა", "ნინო", "დათო"];

  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
  const [selectedPriorities, setSelectedPriorities] = useState<string[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState<string | null>(null);

  const toggleSelection = (list: any, setList: any, item: any) => {
    setList((prev: any) =>
      prev.includes(item)
        ? prev.filter((i: any) => i !== item)
        : [...prev, item]
    );
  };
  const clearFilter = () => {
    setSelectedDepartments([]);
    setSelectedPriorities([]);
    setSelectedEmployee(null);
  };
  return (
    <div className=" pl-24 pr-24">
      <div>
        <div>
          <h1 className="text-left text-4xl font-semibold mb-10">
            დავალებების გვერდი
          </h1>
          <div className="mb-10">
            <div className="flex border-[0.5px] rounded-sm justify-between mb-2 w-[688px]">
              {/* დეპარტამენტი Multiselect */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="link" className="">
                    დეპარტამენტი
                    <DownArrowSvg />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="ml-24 w-[688px]">
                  {departments.map((dep) => (
                    <div key={dep} className="flex items-center space-x-2">
                      <Checkbox
                        checked={selectedDepartments.includes(dep)}
                        onCheckedChange={() =>
                          toggleSelection(
                            selectedDepartments,
                            setSelectedDepartments,
                            dep
                          )
                        }
                      />
                      <span>{dep}</span>
                    </div>
                  ))}
                </PopoverContent>
              </Popover>

              {/* პრიორიტეტი Multiselect */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="link" className="">
                    პრიორიტეტი
                    <DownArrowSvg />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className=" p-4 ml-24 w-[688px]">
                  {priorities.map((priority) => (
                    <div key={priority} className="flex items-center space-x-2">
                      <Checkbox
                        checked={selectedPriorities.includes(priority)}
                        onCheckedChange={() =>
                          toggleSelection(
                            selectedPriorities,
                            setSelectedPriorities,
                            priority
                          )
                        }
                      />
                      <span>{priority}</span>
                    </div>
                  ))}
                </PopoverContent>
              </Popover>

              {/* თანამშრომელი Singleselect */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="link" className="">
                    თანამშრომელი
                    <DownArrowSvg />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="ml-24 w-[688px] p-4">
                  {employees.map((emp) => (
                    <div
                      key={emp}
                      className={cn(
                        "p-2 rounded cursor-pointer hover:bg-gray-200",
                        selectedEmployee === emp && "bg-gray-300"
                      )}
                      onClick={() => setSelectedEmployee(emp)}
                    >
                      {emp}
                    </div>
                  ))}
                </PopoverContent>
              </Popover>
            </div>
            <div className="text-left flex gap-1.5 ">
              {selectedDepartments?.map((department) => (
                <Badge
                  key={department}
                  className="text-[#CED4DA] bg-white border-[0.5px] border-[#CED4DA]"
                >
                  {department}
                  <XSvg />
                </Badge>
              ))}
              {selectedPriorities?.map((priority) => (
                <Badge
                  key={priority}
                  className="text-[#CED4DA] bg-white border-[0.5px] border-[#CED4DA]"
                >
                  {priority}
                  <XSvg />
                </Badge>
              ))}
              {selectedEmployee && (
                <Badge className="text-[#CED4DA] bg-white border-[0.5px] border-[#CED4DA]">
                  {selectedEmployee} <XSvg />
                </Badge>
              )}
              {(selectedDepartments.length > 0 ||
                selectedPriorities.length > 0 ||
                selectedEmployee) && (
                <Button onClick={clearFilter} variant={"link"} className="">
                  გასუფთავება
                </Button>
              )}
            </div>
          </div>
        </div>

        <div className="flex h-[1042px] justify-between flex-wrap">
          <div>
            <Button className="w-full h-[54px] bg-[#F7BC30] mb-8">
              დასაწყები
            </Button>
            <div>
              <TaskCard />
            </div>
          </div>
          <div>
            <Button className="w-full h-[54px] bg-[#FB5607] mb-8">
              პროგრესში
            </Button>
            <div>
              <TaskCard />
            </div>
          </div>
          <div>
            <Button className="w-full h-[54px] bg-[#FF006E] mb-8">
              მზად ტესტირებისთვის
            </Button>
            <div>
              <TaskCard />
            </div>
          </div>
          <div>
            <Button className="w-full h-[54px] bg-[#3A86FF] mb-8">
              დასრულებული
            </Button>
            <div>
              <TaskCard />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
