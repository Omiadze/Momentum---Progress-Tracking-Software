import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { useForm, Controller } from "react-hook-form";

const CreateTask = () => {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      priority: "Medium",
      status: "Starting",
      department: "",
      employee: "",
      deadline: new Date().toISOString().split("T")[0],
    },
  });

  //   const [departments, setDepartments] = useState([]);
  //   const [employees, setEmployees] = useState([]);
  const selectedDepartment = watch("department");

  //

  const onSubmit = (data: any) => {
    console.log("Task Created:", data);
  };

  return (
    <div className="h-screen ">
      <h1 className="text-left ml-30 text-4xl mb-3 font-semibold">
        შექმენი ახალი დავალება
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 max-w-[1684px] bg-[#FBF9FFA6] border-[0.3px] max-h-[958px] m-auto pb-40"
      >
        <div className="flex p-10">
          <div className="max-w-[550px] mr-52">
            <div className="h-28">
              <Label className="mb-2">სათაური*</Label>
              <Controller
                name="title"
                control={control}
                render={({ field }) => (
                  <Input className="bg-white" {...field} />
                )}
              />
              <div className="text-[#6C757D] text-xs">
                <div
                  className={`flex items-center ${
                    errors.title ? "text-red-500" : "text-green-600"
                  }`}
                >
                  <CheckSvg /> <p>მინიმუმ 2 სიმბოლო</p>
                </div>
                <div
                  className={`flex items-center ${
                    errors.title ? "text-red-500" : "text-green-600"
                  }`}
                >
                  <CheckSvg /> <p>მინიმუმ 255 სიმბოლო</p>
                </div>
              </div>
              {errors.title && (
                <p className="text-red-500">{errors.title.message}</p>
              )}
            </div>

            <div className="h-72">
              <Label className="mb-2">აღწერა*</Label>
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <Textarea {...field} className="h-32 bg-white" />
                )}
              />
              <div className="text-[#6C757D] text-xs">
                <div
                  className={`flex items-center ${
                    errors.description ? "text-red-500" : "text-green-600"
                  }`}
                >
                  <CheckSvg /> <p>მინიმუმ 2 სიმბოლო</p>
                </div>
                <div
                  className={`flex items-center ${
                    errors.description ? "text-red-500" : "text-green-600"
                  }`}
                >
                  <CheckSvg /> <p>მინიმუმ 255 სიმბოლო</p>
                </div>
              </div>
              {errors.description && (
                <p className="text-red-500">{errors.description.message}</p>
              )}
            </div>
            <div className="flex gap-4">
              <div className="">
                <Label className="mb-2">პრიორიტეტი*</Label>
                <Controller
                  name="priority"
                  control={control}
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-[259px] border border-muted-foreground p-2 rounded-md bg-white">
                        <SelectValue placeholder="აირჩიეთ დეპარტამენტი" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="IT">IT</SelectItem>
                          <SelectItem value="HR">HR</SelectItem>
                          <SelectItem value="Marketing">Marketing</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>

              <div className="">
                <Label className="mb-2">სტატუსი*</Label>
                <Controller
                  name="status"
                  control={control}
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-[259px] border border-muted-foreground p-2 rounded-md bg-white">
                        <SelectValue placeholder="აირჩიეთ დეპარტამენტი" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="IT">IT</SelectItem>
                          <SelectItem value="HR">HR</SelectItem>
                          <SelectItem value="Marketing">Marketing</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  )}
                />
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
                        <SelectItem value="IT">IT</SelectItem>
                        <SelectItem value="HR">HR</SelectItem>
                        <SelectItem value="Marketing">Marketing</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            <div
              className={` ${
                !selectedDepartment ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              <Label className="mb-2">პასუხისმგებელი თანამშრომელი*</Label>
              <Controller
                name="employee"
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
                        <SelectItem value="IT">IT</SelectItem>
                        <SelectItem value="HR">HR</SelectItem>
                        <SelectItem value="Marketing">Marketing</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            <div>
              <Label className="mb-2">დედლაინი*</Label>
              <Controller
                name="deadline"
                control={control}
                render={({ field }) => (
                  <Input
                    className="bg-white text-[#ADB5BD] w-[318px]"
                    type="date"
                    {...field}
                    min={new Date().toISOString().split("T")[0]}
                  />
                )}
              />
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
