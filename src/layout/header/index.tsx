import { ModeToggle } from "@/components/ui/mode-toggle";
import HourglassSvg from "./components/hourglassSvg";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import Modal from "./components/modal/modal";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-between h-28 items-center pl-24 pr-24 ">
      <div className="flex justify-center items-center">
        <h1 className="text-primary text-3xl">Momentum</h1>
        <HourglassSvg />
      </div>
      <div className=" flex justify-center gap-2.5 items-center ">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant={"ghost"} className="border-2 border-primary mr-4">
              თანამშრომლის შექმნა
            </Button>
          </DialogTrigger>
          <Modal />
        </Dialog>

        <Button onClick={() => navigate("/create/task")}>
          <Plus />
          შექმენი ახალი დავალება
        </Button>

        <ModeToggle />
      </div>
    </div>
  );
};

export default Header;
