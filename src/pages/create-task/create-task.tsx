import {
  createTask,
  GetDepartments,
  GetEmployees,
  GetPriorities,
  GetStatuses,
} from "@/api/momentum";
import {
  Department,
  Employee,
  Priority,
  Status,
} from "@/api/momentum/index.types";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import PlusSvg from "@/components/ui/plus-svg";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import CheckSvg from "@/layout/header/components/checkSvg";
import Modal from "@/layout/header/components/modal/modal";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useForm, Controller } from "react-hook-form";
import { taskSchema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import DatePickerSvg from "@/components/ui/date-picker-svg";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { format } from "date-fns";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { useEffect } from "react";
import Loading from "../loading";

const CreateTask = () => {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isSubmitted },
  } = useForm({
    resolver: zodResolver(taskSchema),
    defaultValues: JSON.parse(localStorage.getItem("formData") || "{}") || {
      name: "",
      description: "",
      priority_id: "",
      status_id: "",
      department: "",
      employee_id: "",
      due_date: new Date().toISOString().split("T")[0],
    },
    mode: "onChange",
  });

  //   const [departments, setDepartments] = useState([]);
  //   const [employees, setEmployees] = useState([]);
  const nameValue = watch("name");
  const descriptionValue = watch("description");
  const selectedDepartment = watch("department");
  const priorityValue = watch("priority_id");
  const statusValue = watch("status_id");
  const employeeValue = watch("employee_id");
  const navigate = useNavigate();

  const { data: statuses } = useQuery({
    queryKey: ["statuses"],
    queryFn: GetStatuses,
  });

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

  const { mutate: handleCreateTask } = useMutation({
    mutationKey: ["create-task"],
    mutationFn: createTask,
    onSuccess: () => {
      navigate("/home");
    },
  });

  useEffect(() => {
    const dueDateValue = watch("due_date");
    // Ensure the due_date is a valid date object or fallback to a valid date
    const validDueDate = dueDateValue ? new Date(dueDateValue) : new Date();

    // Check if validDueDate is a valid Date object
    const formattedDueDate =
      validDueDate instanceof Date && !isNaN(validDueDate.getTime())
        ? validDueDate.toISOString().split("T")[0] // If valid, format as YYYY-MM-DD
        : ""; // If invalid, fallback to an empty string or handle accordingly

    const formData = {
      name: nameValue,
      description: descriptionValue,
      priority_id: priorityValue,
      status_id: statusValue,
      department: selectedDepartment,
      employee_id: employeeValue,
      due_date: formattedDueDate, // Use formatted string for due_date
    };
    localStorage.setItem("formData", JSON.stringify(formData));
  }, [
    nameValue,
    descriptionValue,
    selectedDepartment,
    statusValue,
    priorityValue,
    employeeValue,
  ]);

  const onSubmit = (data: any) => {
    const dataWithoutDepartment = { ...data };
    delete dataWithoutDepartment.department;

    handleCreateTask(data);
    localStorage.removeItem("formData");
  };
  if (!statuses || !departments || !priorities || !employees) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  return (
    <div className=" h-screen">
      <h1 className="text-left ml-30 text-4xl mb-3 font-semibold">
        შექმენი ახალი დავალება
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 max-w-[1684px] bg-[#FBF9FFA6] dark:bg-gray-900 border-[0.3px] max-h-[958px] m-auto pb-40"
      >
        <div className="flex p-10">
          <div className="max-w-[550px] mr-52">
            <div className="h-28">
              <Label className="mb-2">სათაური*</Label>
              <Controller
                name="name"
                control={control}
                render={({ field }) => {
                  return (
                    <>
                      <Input className="bg-white" {...field} />
                      <div className="text-[#6C757D] text-xs">
                        <div
                          className={`flex items-center ${
                            nameValue?.length === 0 && !isSubmitted
                              ? "text-gray-500"
                              : errors.name?.message ===
                                  "Title must be at least 3 characters"
                                ? "text-red-500"
                                : "text-green-500"
                          }`}
                        >
                          <CheckSvg />
                          <p>მინიმუმ 2 სიმბოლო</p>
                        </div>
                        <div
                          className={`flex items-center ${
                            nameValue?.length === 0 && !isSubmitted
                              ? "text-gray-500"
                              : errors.name?.message ===
                                  "Title must be at most 255 characters"
                                ? "text-red-500"
                                : "text-green-500"
                          }`}
                        >
                          <CheckSvg />
                          <p>მაქსიმუმ 255 სიმბოლო</p>
                        </div>
                      </div>
                    </>
                  );
                }}
              />
            </div>
            <div className="h-72">
              <Label className="mb-2">აღწერა*</Label>
              <Controller
                name="description"
                control={control}
                render={({ field }) => {
                  return (
                    <>
                      <Textarea {...field} className="h-32 bg-white mb-1" />
                      <div className="text-[#6C757D] text-xs">
                        <div
                          className={`flex items-center ${
                            descriptionValue?.length === 0 && !isSubmitted
                              ? "text-gray-500"
                              : errors.name?.message ===
                                  "Description must be at most 255 characters"
                                ? "text-red-500"
                                : "text-green-500"
                          }`}
                        >
                          <CheckSvg /> <p>მინიმუმ 2 სიმბოლო</p>
                        </div>
                        <div
                          className={`flex items-center ${
                            descriptionValue?.length === 0 && !isSubmitted
                              ? "text-gray-500"
                              : errors.name?.message ===
                                  "Description must be at least 4 words if provided"
                                ? "text-red-500"
                                : "text-green-500"
                          }`}
                        >
                          <CheckSvg /> <p>მინიმუმ 255 სიმბოლო</p>
                        </div>
                      </div>
                    </>
                  );
                }}
              />
            </div>

            <div className="flex gap-4">
              <div className="">
                <Label className="mb-2">პრიორიტეტი*</Label>
                <Controller
                  name="priority_id"
                  control={control}
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-[259px] border border-muted-foreground text-black p-2 rounded-md bg-white">
                        {priorities?.length ? (
                          <div className="flex items-center">
                            <img
                              src={priorities[1].icon}
                              className="w-5 h-5 mr-2"
                            />
                            {priorities[1].name}
                          </div>
                        ) : (
                          <SelectValue placeholder="აირჩიეთ პრიორიტეტი" />
                        )}
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {priorities &&
                            priorities?.map((priority: Priority) => (
                              <SelectItem
                                key={priority.id}
                                value={priority.id.toString()}
                              >
                                <img src={priority.icon} alt={priority.name} />
                                {priority.name}
                              </SelectItem>
                            ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  )}
                />
                <p className="text-red-500 text-left">
                  {errors.priority_id?.message &&
                  typeof errors.priority_id?.message === "string"
                    ? errors.priority_id.message
                    : null}
                </p>
              </div>

              <div className="">
                <Label className="mb-2">სტატუსი*</Label>
                <Controller
                  name="status_id"
                  control={control}
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-[259px] border border-muted-foreground p-2 rounded-md bg-white">
                        {statuses?.length ? (
                          <div className="flex items-center">
                            {statuses[0].name}
                          </div>
                        ) : (
                          <SelectValue placeholder="აირჩიეთ პრიორიტეტი" />
                        )}
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {statuses &&
                            statuses?.map((statuse: Status) => (
                              <SelectItem
                                key={statuse.id}
                                value={statuse.id.toString()}
                              >
                                {statuse.name}
                              </SelectItem>
                            ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  )}
                />
                <p className="text-red-500 text-left">
                  {errors.status_id?.message &&
                  typeof errors.status_id?.message === "string"
                    ? errors.status_id.message
                    : null}
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-between max-w-[550px]">
            <div>
              <Label className="mb-2">დეპარტამენტი*</Label>
              <Controller
                name="department"
                control={control}
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="w-96 border border-muted-foreground p-2 rounded-md bg-white">
                      <SelectValue placeholder="აირჩიეთ დეპარტამენტი" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {departments &&
                          departments?.map((department: Department) => (
                            <SelectItem
                              key={department.id}
                              value={department.id.toString()}
                            >
                              {department.name}
                            </SelectItem>
                          ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
              <p className="text-red-500 text-left">
                {errors.department?.message &&
                typeof errors.department?.message === "string"
                  ? errors.department.message
                  : null}
              </p>
            </div>

            <div
              className={` ${
                !selectedDepartment ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              <Label className="mb-2">პასუხისმგებელი თანამშრომელი*</Label>
              <Controller
                name="employee_id"
                control={control}
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={!selectedDepartment}
                  >
                    <SelectTrigger className="w-96 border border-muted-foreground p-2 rounded-md bg-white">
                      <SelectValue placeholder="აირჩიეთ დეპარტამენტი" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <Dialog>
                          <DialogTrigger asChild>
                            <div className="flex  items-center gap-1 mb-1 p-1 cursor-pointer">
                              <PlusSvg />
                              <p className="text-primary">
                                დაამატე თანამშრომელი
                              </p>
                            </div>
                          </DialogTrigger>
                          <Modal />
                        </Dialog>
                        {employees &&
                          employees.map((employee: Employee) =>
                            employee.department.id.toString() ===
                            selectedDepartment ? (
                              <SelectItem
                                key={employee.id}
                                value={employee.id.toString()}
                              >
                                <Avatar>
                                  <AvatarImage
                                    src={employee.avatar}
                                    alt={employee.name}
                                  />
                                  <AvatarFallback></AvatarFallback>
                                </Avatar>
                                {employee.name}
                              </SelectItem>
                            ) : (
                              <p></p>
                            )
                          )}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
              <p className="text-red-500 text-left">
                {errors.employee_id?.message &&
                typeof errors.employee_id?.message === "string"
                  ? errors.employee_id.message
                  : null}
              </p>
            </div>

            <div className=" flex flex-col">
              <Label className="mb-2">დედლაინი*</Label>
              <Controller
                name="due_date"
                control={control}
                render={({ field }) => {
                  return (
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={`w-[318px] justify-start text-left pl-7 ${
                            !field.value && "text-muted-foreground"
                          }`}
                        >
                          <DatePickerSvg />
                          {field.value
                            ? format(new Date(field.value), "yyyy-MM-dd")
                            : "აირჩიე თარიღი"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-4">
                        <div className="calendar-container">
                          <label htmlFor="task-date" className="sr-only">
                            აირჩიე თარიღი
                          </label>
                          <input
                            id="task-date"
                            type="date"
                            value={field.value || ""}
                            onChange={(e) => field.onChange(e.target.value)}
                            min={new Date().toISOString().split("T")[0]}
                            className="border p-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-blue-400 transition"
                          />
                        </div>
                      </PopoverContent>
                    </Popover>
                  );
                }}
              />
              <p className="text-red-500 text-left">
                {errors.due_date?.message &&
                typeof errors.due_date?.message === "string"
                  ? errors.due_date.message
                  : null}
              </p>
            </div>
          </div>
        </div>
        <div className="text-right pr-[520px] ">
          <Button className="text-right cursor-pointer">
            დავალების შექმნა
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateTask;
