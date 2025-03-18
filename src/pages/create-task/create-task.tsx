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

const CreateTask = () => {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      name: "",
      description: "",
      priority_id: "",
      status_id: "",
      department: "",
      employee_id: "",
      due_date: new Date().toISOString().split("T")[0],
    },
  });

  //   const [departments, setDepartments] = useState([]);
  //   const [employees, setEmployees] = useState([]);
  const selectedDepartment = watch("department");
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

  const onSubmit = (data: any) => {
    console.log("Task Created:", data);
    const dataWithoutDepartment = { ...data };
    delete dataWithoutDepartment.department;
    console.log(dataWithoutDepartment);
    handleCreateTask(data);
  };

  return (
    <div className="h-full ">
      <h1 className="text-left ml-30 text-4xl mb-3 font-semibold">
        შექმენი ახალი დავალება
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 max-w-[1684px] bg-[#FBF9FFA6] dark:bg-purple-100 border-[0.3px] max-h-[958px] m-auto pb-40"
      >
        <div className="flex p-10">
          <div className="max-w-[550px] mr-52">
            <div className="h-28">
              <Label className="mb-2">სათაური*</Label>
              <Controller
                name="name"
                control={control}
                render={({ field }) => {
                  const isEmpty = !field.value || field.value.trim() === ""; // Check if the input is empty
                  return (
                    <>
                      <Input className="bg-white" {...field} />
                      <div className="text-[#6C757D] text-xs">
                        <div
                          className={`flex items-center ${
                            isEmpty
                              ? "text-gray-400" // Show gray if empty
                              : errors.name
                                ? "text-red-500"
                                : "text-green-600"
                          }`}
                        >
                          <CheckSvg />
                          <p>მინიმუმ 2 სიმბოლო</p>
                        </div>
                        <div
                          className={`flex items-center ${
                            isEmpty
                              ? "text-gray-400" // Show gray if empty
                              : errors.name
                                ? "text-red-500"
                                : "text-green-600"
                          }`}
                        >
                          <CheckSvg />
                          <p>მაქსიმუმ 255 სიმბოლო</p>
                        </div>
                      </div>
                      {errors.name && (
                        <p className="text-red-500">{errors.name.message}</p>
                      )}
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
                  const isEmpty = !field.value || field.value.trim() === ""; // Check if empty

                  return (
                    <>
                      <Textarea {...field} className="h-32 bg-white mb-1" />
                      <div className="text-[#6C757D] text-xs">
                        <div
                          className={`flex items-center ${
                            isEmpty
                              ? "text-gray-400" // Gray if empty
                              : errors.description
                                ? "text-red-500"
                                : "text-green-600"
                          }`}
                        >
                          <CheckSvg /> <p>მინიმუმ 2 სიმბოლო</p>
                        </div>
                        <div
                          className={`flex items-center ${
                            isEmpty
                              ? "text-gray-400"
                              : errors.description
                                ? "text-red-500"
                                : "text-green-600"
                          }`}
                        >
                          <CheckSvg /> <p>მინიმუმ 255 სიმბოლო</p>
                        </div>
                      </div>
                      {errors.description && (
                        <p className="text-red-500">
                          {errors.description.message}
                        </p>
                      )}
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
                {errors.priority_id?.message}
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
                {errors.status_id?.message}
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
              {errors.department?.message}
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
                            <div className="flex  items-center gap-1 mb-1 p-1">
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
              {errors.employee_id?.message}
            </div>

            <div className="relative">
              <Label className="mb-2">დედლაინი*</Label>
              <Controller
                name="due_date"
                control={control}
                render={({ field }) => (
                  <>
                    <Input
                      className="bg-white text-[#ADB5BD] w-[318px] pl-7 "
                      type="date"
                      {...field}
                      min={new Date().toISOString().split("T")[0]}
                    />
                    <DatePickerSvg />
                  </>
                )}
              />
              {errors.due_date?.message}
            </div>
          </div>
        </div>
        <div className="text-right pr-[520px]">
          <Button className="text-right">დავალების შექმნა</Button>
        </div>
      </form>
    </div>
  );
};

export default CreateTask;
