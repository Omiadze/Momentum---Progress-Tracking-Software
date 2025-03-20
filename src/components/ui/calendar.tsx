import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

interface CalendarProps {
  className?: string;
  selected?: string;
  onChange?: (date: string) => void;
}

export function Calendar({
  className,
  selected,
  onChange,
  ...props
}: CalendarProps) {
  const [startDate, setStartDate] = React.useState<string>(selected || "");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const date = event.target.value;
    setStartDate(date);
    if (onChange) onChange(date);
  };

  const changeMonth = (direction: "prev" | "next") => {
    const currentDate = new Date(startDate);
    const newDate = new Date(
      currentDate.setMonth(
        currentDate.getMonth() + (direction === "prev" ? -1 : 1)
      )
    );
    const formattedDate = newDate.toISOString().split("T")[0]; // 'YYYY-MM-DD' format
    setStartDate(formattedDate);
    if (onChange) onChange(formattedDate);
  };

  return (
    <div className={cn("p-3", className)}>
      <div className="flex justify-between items-center mb-2">
        <button
          onClick={() => changeMonth("prev")}
          className={cn(
            buttonVariants({ variant: "outline" }),
            "size-7 bg-transparent p-0 opacity-50 hover:opacity-100"
          )}
        >
          <ChevronLeft size={16} />
        </button>
        <input
          type="date"
          value={startDate}
          onChange={handleChange}
          {...props}
          className={cn(
            "custom-datepicker",
            "text-center p-2 border rounded-md", // Make sure the input is visible
            "w-full" // Ensure it takes up the full width
          )}
        />
        <button
          onClick={() => changeMonth("next")}
          className={cn(
            buttonVariants({ variant: "outline" }),
            "size-7 bg-transparent p-0 opacity-50 hover:opacity-100"
          )}
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
