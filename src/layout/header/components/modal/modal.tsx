import { Button } from "@/components/ui/button";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import TrashSvg from "../trashSvg";
import CheckSvg from "../checkSvg";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { modalSchema } from "./schema";
import PhotoUploaderSvg from "../photo-uploader-svg";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createEmployee, GetDepartments } from "@/api/momentum";
import { Department } from "@/api/momentum/index.types";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

const Modal = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitted },
    watch,
    reset,
  } = useForm({
    resolver: zodResolver(modalSchema),
    defaultValues: {
      name: "",
      surname: "",
      avatar: null,
      department_id: "",
    },
    mode: "onChange",
  });

  const nameValue = watch("name");
  const surnameValue = watch("surname");

  const { data: departments } = useQuery({
    queryKey: ["departments"],
    queryFn: GetDepartments,
  });

  const [avatar, setAvatar] = useState<File | null>(null);

  const { mutate: handleCreateEmployee } = useMutation({
    mutationKey: ["create-task"],
    mutationFn: createEmployee,
    onSuccess: () => {
      window.location.reload();
    },
  });

  const onSubmit = (data: any) => {
    data.avatar = avatar;
    console.log("Form submitted:", data);
    handleCreateEmployee(data);
  };

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      setAvatar(file);
    }
  };

  return (
    <div>
      <DialogContent className="sm:max-w-[913px] h-[766px]">
        <DialogHeader>
          <DialogTitle className="text-center text-3xl font-medium mt-12">
            თანამშრომლის დამატება
          </DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="flex justify-between h-28">
          <div className="grid gap-2 w-96">
            <label htmlFor="firstName">სახელი*</label>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <>
                  <Input
                    {...field}
                    placeholder="სახელი"
                    className="border border-muted-foreground h-11"
                  />
                </>
              )}
            />
            <div className="text-[#6C757D]">
              <div
                className={`flex items-center ${
                  nameValue.length === 0 && !isSubmitted
                    ? "text-gray-500"
                    : errors.name?.message ===
                        "First name must be at least 2 characters"
                      ? "text-red-500"
                      : "text-green-500"
                }`}
              >
                <CheckSvg /> <p>მინიმუმ 2 სიმბოლო</p>
              </div>
              <div
                className={`flex items-center ${
                  nameValue.length === 0 && !isSubmitted
                    ? "text-gray-500"
                    : errors.name?.message ===
                        "First name must be at most 255 characters"
                      ? "text-red-500"
                      : "text-green-500"
                }`}
              >
                <CheckSvg /> <p>მინიმუმ 255 სიმბოლო</p>
              </div>
            </div>
          </div>
          <div className="grid gap-2 w-96">
            <label htmlFor="lastName">გვარი*</label>
            <Controller
              name="surname"
              control={control}
              render={({ field }) => (
                <>
                  <Input
                    {...field}
                    placeholder="გვარი"
                    className="border border-muted-foreground h-11"
                  />
                </>
              )}
            />
            <div className="text-[#6C757D]">
              <div
                className={`flex items-center ${
                  surnameValue.length === 0 && !isSubmitted
                    ? "text-gray-500"
                    : errors.surname?.message ===
                        "Last name must be at least 2 characters"
                      ? "text-red-500"
                      : "text-green-500"
                }`}
              >
                <CheckSvg /> <p>მაქსიმუმ 2 სიმბოლო</p>
              </div>
              <div
                className={`flex items-center ${
                  surnameValue.length === 0 && !isSubmitted
                    ? "text-gray-500"
                    : errors.surname?.message ===
                        "Last name must be at most 255 characters"
                      ? "text-red-500"
                      : "text-green-500"
                }`}
              >
                <CheckSvg /> <p>მაქსიმუმ 255 სიმბოლო</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid h-[145px]">
          <label htmlFor="avatar">ავატარი*</label>
          <div className="border-dashed border-2 p-4 flex justify-center items-center relative rounded-sm">
            {avatar ? (
              <div className="relative">
                <Avatar className="w-24 h-24 rounded-full">
                  <AvatarImage
                    src={URL.createObjectURL(avatar)}
                    alt="Avatar"
                    className="w-24 h-24 rounded-full "
                  />
                </Avatar>
                <button
                  onClick={() => setAvatar(null)}
                  className="absolute bottom-0 -right-1.5 p-1 rounded-full cursor-pointer"
                >
                  <TrashSvg />
                </button>
              </div>
            ) : (
              <label
                htmlFor="avatar-upload"
                className="flex flex-col justify-center items-center cursor-pointer px-4 py-2 rounded-md  transition"
              >
                <PhotoUploaderSvg />
                ატვირთე ფოტო
              </label>
            )}
            <input
              id="avatar-upload"
              type="file"
              onChange={handleAvatarChange}
              className="hidden"
              accept="image/*"
            />
            {errors.avatar && (
              <div className="text-red-500 text-sm">
                {errors.avatar.message}
              </div>
            )}
          </div>
        </div>
        <div className="grid gap-2 h-[80px]">
          <label htmlFor="department">დეპარტამენტი*</label>
          <Controller
            name="department_id"
            control={control}
            render={({ field }) => (
              <>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="w-96 border border-muted-foreground p-2 rounded-md">
                    <SelectValue placeholder="აირჩიეთ დეპარტამენტი" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {departments.map((department: Department) => (
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
                {errors.department_id && (
                  <div className="text-red-500 text-sm">
                    {errors.department_id.message}
                  </div>
                )}
              </>
            )}
          />
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              variant={"ghost"}
              className="border-2 border-primary cursor-pointer"
              onClick={() => {
                reset();
              }}
            >
              გაუქმება
            </Button>
          </DialogClose>

          <Button className="cursor-pointer" onClick={handleSubmit(onSubmit)}>
            დაამატე თანამშრომელი
          </Button>
        </DialogFooter>
      </DialogContent>
    </div>
  );
};

export default Modal;
