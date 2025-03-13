import { Button } from "@/components/ui/button";
import {
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

const Modal = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(modalSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      avatar: null,
      department: "",
    },
  });
  const [avatar, setAvatar] = useState<File | null>(null);

  const onSubmit = (data: any) => {
    console.log("Form submitted:", data);
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
              name="firstName"
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
                  errors.firstName ? "text-red-500" : "text-green-600"
                }`}
              >
                <CheckSvg /> <p>მინიმუმ 2 სიმბოლო</p>
              </div>
              <div
                className={`flex items-center ${
                  errors.firstName ? "text-red-500" : "text-green-600"
                }`}
              >
                <CheckSvg /> <p>მინიმუმ 255 სიმბოლო</p>
              </div>
            </div>
          </div>
          <div className="grid gap-2 w-96">
            <label htmlFor="lastName">გვარი*</label>
            <Controller
              name="lastName"
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
                  errors.lastName ? "text-red-500" : ""
                }`}
              >
                <CheckSvg /> <p>მინიმუმ 2 სიმბოლო</p>
              </div>
              <div
                className={`flex items-center ${
                  errors.lastName ? "text-red-500" : ""
                }`}
              >
                <CheckSvg /> <p>მინიმუმ 255 სიმბოლო</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid h-[145px]">
          <label htmlFor="avatar">ავატარი*</label>
          <div className="border-dashed border-2 p-4 flex justify-center items-center relative rounded-sm">
            {avatar ? (
              <div className="relative">
                <img
                  src={URL.createObjectURL(avatar)} // Display the avatar image
                  alt="Avatar"
                  className="w-24 h-24 rounded-full"
                />
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
              className="hidden" // Hide default file input
              accept="image/*" // Only accept image files
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
            name="department"
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
                      <SelectItem value="IT">IT</SelectItem>
                      <SelectItem value="HR">HR</SelectItem>
                      <SelectItem value="Marketing">Marketing</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                {errors.department && (
                  <div className="text-red-500 text-sm">
                    {errors.department.message}
                  </div>
                )}
              </>
            )}
          />
        </div>
        <DialogFooter>
          <Button variant={"ghost"} className="border-2 border-primary">
            გაუქმება
          </Button>
          <Button onClick={handleSubmit(onSubmit)}>დაამატე თანამშრომელი</Button>
        </DialogFooter>
      </DialogContent>
    </div>
  );
};

export default Modal;
