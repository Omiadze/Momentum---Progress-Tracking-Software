import { Button } from "@/components/ui/button";
import TaskCard from "./task-card/task-card";
import { useEffect, useMemo, useState } from "react";
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
import { useQuery } from "@tanstack/react-query";
import {
  getAllTasks,
  GetDepartments,
  GetEmployees,
  GetPriorities,
  GetStatuses,
} from "@/api/momentum";
import { Department, Employee, Priority } from "@/api/momentum/index.types";
import { Avatar } from "@radix-ui/react-avatar";
import { AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Loading from "../loading";
import { useSearchParams } from "react-router-dom";

const Home = () => {
  const [activePopover, setActivePopover] = useState<string | null>(null);

  const handlePopoverClick = (popoverName: string) => {
    setActivePopover((prev) => (prev === popoverName ? null : popoverName)); // Toggle popover active state
  };
  const [searchParams, setSearchParams] = useSearchParams();
  const cardBorderColors = {
    დასაწყები: "#F7BC30",
    პროგრესში: "#FB5607",
    "მზად ტესტირებისთვის": "#FF006E",
    დასრულებული: "#3A86FF",
  };
  const { data: departments } = useQuery({
    queryKey: ["departments"],
    queryFn: GetDepartments,
  });

  const { data: priorities } = useQuery({
    queryKey: ["priorities"],
    queryFn: GetPriorities,
  });

  const { data: employees } = useQuery({
    queryKey: ["employees"],
    queryFn: GetEmployees,
  });

  const { data: statuses } = useQuery({
    queryKey: ["statuses"],
    queryFn: GetStatuses,
  });

  const { data: Tasks, isLoading } = useQuery({
    queryKey: ["tasks"],
    queryFn: getAllTasks,
  });

  // Temporary state for selections before applying filters
  const [tempDepartments, setTempDepartments] = useState<string[]>([]);
  const [tempPriorities, setTempPriorities] = useState<string[]>([]);
  const [tempEmployee, setTempEmployee] = useState<string | null>(null);

  // Applied filter states (used for filtering the tasks)
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
  const [selectedPriorities, setSelectedPriorities] = useState<string[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState<string | null>(null);

  const applyFilters = () => {
    setSelectedDepartments(tempDepartments);
    setSelectedPriorities(tempPriorities);
    setSelectedEmployee(tempEmployee);

    setSearchParams({
      departments: tempDepartments.join(","),
      priorities: tempPriorities.join(","),
      employee: tempEmployee || "",
    });
  };

  useEffect(() => {
    const paramsDepartments = searchParams.get("departments");
    const paramsPriorities = searchParams.get("priorities");
    const paramsEmployee = searchParams.get("employee");

    // Set filters from search params if available
    if (paramsDepartments) setTempDepartments(paramsDepartments.split(","));
    if (paramsPriorities) setTempPriorities(paramsPriorities.split(","));
    if (paramsEmployee) setTempEmployee(paramsEmployee);

    // After setting temp states, apply the filters
    setSelectedDepartments(tempDepartments);
    setSelectedPriorities(tempPriorities);
    setSelectedEmployee(tempEmployee);
  }, [searchParams]);

  useEffect(() => {
    // Update search params whenever filters change
    setSearchParams({
      departments: selectedDepartments.join(","),
      priorities: selectedPriorities.join(","),
      employee: selectedEmployee || "",
    });
  }, [selectedDepartments, selectedPriorities, selectedEmployee]);

  // Toggle selection function for temp states
  const toggleSelection = (setList: any, item: any) => {
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

    setTempDepartments([]);
    setTempPriorities([]);
    setTempEmployee(null);
    // Clear the URL search parameters (set empty filters)
    setSearchParams({
      departments: "",
      priorities: "",
      employee: "",
    });
  };

  // Memoized filtered tasks
  const filteredTasks = useMemo(() => {
    return Tasks?.filter((task) => {
      const matchesDepartment = selectedDepartments.length
        ? selectedDepartments.includes(task.department.name)
        : true;

      const matchesPriority = selectedPriorities.length
        ? selectedPriorities.includes(task.priority.name)
        : true;

      const matchesEmployee = selectedEmployee
        ? task.employee.name === selectedEmployee
        : true;

      return matchesDepartment && matchesPriority && matchesEmployee;
    });
  }, [Tasks, selectedDepartments, selectedPriorities, selectedEmployee]);

  if (isLoading) {
    return <Loading />;
  }

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
                  <Button
                    variant="link"
                    className={cn(
                      "dark:text-white",
                      activePopover === "department" && "text-primary" // Apply active color
                    )}
                    onClick={() => handlePopoverClick("department")}
                  >
                    დეპარტამენტი
                    <DownArrowSvg />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="ml-24 w-[688px] border-[0.5px] border-primary">
                  {departments &&
                    departments.map((dep: Department) => (
                      <div
                        key={dep.id}
                        className="flex items-center space-x-4 mb-4"
                      >
                        <Checkbox
                          checked={tempDepartments.includes(dep.name)}
                          onCheckedChange={() =>
                            toggleSelection(setTempDepartments, dep.name)
                          }
                        />
                        <span>{dep.name}</span>
                      </div>
                    ))}
                  <div className="text-right">
                    <Button
                      onClick={applyFilters}
                      className="rounded-4xl pl-10 pr-10"
                    >
                      არჩევა
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>

              {/* Similar for other popovers */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="link"
                    className={cn(
                      "dark:text-white",
                      activePopover === "priority" && "text-primary"
                    )}
                    onClick={() => handlePopoverClick("priority")}
                  >
                    პრიორიტეტი
                    <DownArrowSvg />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className=" p-4 ml-24 w-[688px] border-[0.5px] border-primary">
                  {priorities &&
                    priorities.map((priority: Priority) => (
                      <div
                        key={priority.id}
                        className="flex items-center space-x-2"
                      >
                        <Checkbox
                          checked={tempPriorities.includes(priority.name)}
                          onCheckedChange={() =>
                            toggleSelection(setTempPriorities, priority.name)
                          }
                        />
                        <span>{priority.name}</span>
                      </div>
                    ))}
                  <div className="text-right">
                    <Button
                      onClick={applyFilters}
                      className="rounded-4xl pl-10 pr-10"
                    >
                      არჩევა
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>

              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="link"
                    className={cn(
                      "dark:text-white",
                      activePopover === "employee" && "text-primary"
                    )}
                    onClick={() => handlePopoverClick("employee")}
                  >
                    თანამშრომელი
                    <DownArrowSvg />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="ml-24 w-[688px] p-4 border-[0.5px] border-primary h-96 hidden-scrollbar">
                  {employees &&
                    employees.map((emp: Employee) => (
                      <div
                        key={emp.id}
                        className={cn(
                          "flex items-center gap-5 p-2 w-full rounded cursor-pointer hover:bg-gray-200",
                          tempEmployee === emp.name && "bg-gray-300"
                        )}
                        onClick={() => setTempEmployee(emp.name)}
                      >
                        <Avatar className="w-[31px] h-[31px] rounded-full">
                          <AvatarImage
                            className="rounded-full"
                            src={emp.avatar}
                            alt="@shadcn"
                          />
                          <AvatarFallback>{emp.name[0]}</AvatarFallback>
                        </Avatar>
                        <p>
                          {emp.name} {emp.surname}
                        </p>
                      </div>
                    ))}
                  <div className="text-right">
                    <Button
                      onClick={applyFilters}
                      className="rounded-4xl pl-10 pr-10"
                    >
                      არჩევა
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
            <div className="text-left flex gap-1.5 flex-wrap">
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
                <Button
                  onClick={clearFilter}
                  variant={"link"}
                  className="dark:bg-primary"
                >
                  გასუფთავება
                </Button>
              )}
            </div>
          </div>
        </div>

        <div className="flex h-[1200px] justify-between flex-wrap hidden-scrollbar  ">
          <div>
            {statuses && (
              <Button className="w-[381px] h-[54px] bg-[#F7BC30] mb-8">
                {statuses[0].name}
              </Button>
            )}

            <div>
              {filteredTasks?.map(
                (task) =>
                  task.status.name == statuses[0].name && (
                    <TaskCard
                      key={task.id}
                      singleTask={task}
                      borderColor={cardBorderColors.დასაწყები}
                    />
                  )
              )}
            </div>
          </div>
          <div>
            {statuses && (
              <Button className="w-[381px] h-[54px] bg-[#FB5607] mb-8">
                {statuses[1].name}
              </Button>
            )}

            <div>
              {filteredTasks?.map(
                (task) =>
                  task.status.name == statuses[1].name && (
                    <TaskCard
                      key={task.id}
                      singleTask={task}
                      borderColor={cardBorderColors.პროგრესში}
                    />
                  )
              )}
            </div>
          </div>
          <div>
            {statuses && (
              <Button className="w-[381px] h-[54px] bg-[#FF006E] mb-8">
                {statuses[2].name}
              </Button>
            )}

            <div>
              {filteredTasks?.map(
                (task) =>
                  task.status.name == statuses[2].name && (
                    <TaskCard
                      key={task.id}
                      singleTask={task}
                      borderColor={cardBorderColors["მზად ტესტირებისთვის"]}
                    />
                  )
              )}
            </div>
          </div>
          <div>
            {statuses && (
              <Button className="w-[381px] h-[54px] bg-[#3A86FF] mb-8">
                {statuses[3].name}
              </Button>
            )}

            <div>
              {filteredTasks?.map(
                (task) =>
                  task.status.name == statuses[3].name && (
                    <TaskCard
                      key={task.id}
                      singleTask={task}
                      borderColor={cardBorderColors.დასრულებული}
                    />
                  )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
