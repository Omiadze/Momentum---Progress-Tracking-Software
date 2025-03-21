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
import { useParams } from "react-router-dom";
import {
  changeTaskStatusId,
  createComment,
  getComments,
  getSingleTask,
  GetStatuses,
} from "@/api/momentum";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Status } from "@/api/momentum/index.types";
import { setDateToConvert } from "../home/components/date-converter";
import { toast } from "sonner";
import Loading from "../loading";

const InfoTask = () => {
  const { id } = useParams();

  const [showReplyInput, setShowReplyInput] = useState<string | null>(null);

  const {
    data: task,
    isLoading,
    isError,
    refetch: refetchTask,
  } = useQuery({
    queryKey: ["task", id],
    queryFn: () => getSingleTask(id as string),
    enabled: !!id,
  });

  const { data: comments, refetch } = useQuery({
    queryKey: ["comments", id],
    queryFn: () => getComments(id as string),
    enabled: !!id,
  });

  const { data: statuses } = useQuery({
    queryKey: ["statuses"],
    queryFn: GetStatuses,
  });

  const { mutate: handleCreateComment } = useMutation({
    mutationKey: ["create-comment"],
    mutationFn: (commentData: { text: string; commentId: string | null }) => {
      return createComment(id as string, commentData);
    },
    onSuccess: () => {
      refetch();
    },
  });

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      message: "",
    },
  });

  const {
    control: replyControl,
    handleSubmit: handleReplySubmit,
    reset: replyReset,
  } = useForm({
    defaultValues: {
      replyMessage: "",
    },
  });
  const { mutate: updateTaskStatus } = useMutation({
    mutationFn: ({ taskId, statusId }: { taskId: string; statusId: string }) =>
      changeTaskStatusId(taskId, statusId),
    onSuccess: () => {
      refetchTask();
      // Optionally, refetch relevant queries to get the updated task list
      // queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    onError: (err) => {
      console.error("Error updating task:", err);
    },
  });

  const onSubmit = (commentId: string | null, values: any) => {
    const commentData = { text: values.message };

    // Pass both id and text to handleCreateComment
    if (commentData.text === "") {
      toast("Event has been created");
    } else {
      handleCreateComment({ ...commentData, commentId });
    }

    reset();
  };

  const onReplySubmit = (commentId: string, values: any) => {
    const replyData = { text: values.replyMessage };

    if (replyData.text === "") {
      toast("Event has been created");
    } else {
      handleCreateComment({ ...replyData, commentId });
    }
    replyReset();
    setShowReplyInput(null);
  };

  const handleStatusBtn = (statusId: string) => {
    if (!id) return; // Ensure task ID is available

    updateTaskStatus({ taskId: id, statusId });
  };

  const totalCommentsAndSubcomments = comments
    ? comments.reduce(
        (acc, comment) => acc + 1 + (comment?.sub_comments?.length || 0),
        0
      )
    : 0;

  if (isLoading) return <Loading />;
  if (isError) return <p>Error</p>;
  return (
    <div className="flex justify-between pl-24 pr-24 h-screnn pt-20">
      <div className="w-1/2 text-left">
        <div className="mb-5 flex">
          <Button
            variant={"ghost"}
            className="border-[1px] border-amber-300 mr-2"
          >
            <img src={task?.priority.icon} alt={task?.priority.name} />
            {task?.priority.name}
          </Button>
          <Badge className="bg-pink-400 rounded-4xl">
            {task?.department.name}
          </Badge>
        </div>
        <div className="mb-14 flex flex-col gap-3">
          <h1 className="font-semibold text-3xl ">{task?.name}</h1>
          <p>{task?.description}</p>
        </div>
        <div>
          <h1 className="mb-9 text-2xl">დავალების დეტალები</h1>
          <div className="w-[500px] text-[#474747] dark:text-white">
            <div className="flex items-center mb-9">
              <div className="flex w-[260px] gap-3">
                <PieChartSvg />
                <p>სტატუსი</p>
              </div>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="link" className="dark:text-white">
                    {task?.status.name}
                    <DownArrowSvg />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="ml-24 w-[688px] p-4 ">
                  {statuses?.map((status: Status) => (
                    <div
                      key={status.id}
                      className={cn(
                        "p-2 rounded cursor-pointer hover:bg-gray-200 dark:hover:bg-black"
                      )}
                      onClick={() => handleStatusBtn(status.id.toString())}
                    >
                      <p className="">{status.name}</p>
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
              <div className="flex gap-1 justify-center items-center ">
                <Avatar>
                  <AvatarImage
                    src={task?.employee.avatar}
                    alt={task?.employee.name}
                  />
                  <AvatarFallback>{task?.employee.name[0]}</AvatarFallback>
                </Avatar>
                <div className="">
                  <p className="text-xs text-[#474747] dark:text-white">
                    {task?.department.name}
                  </p>
                  <p className="text-[#0D0F10] dark:text-white">
                    {task?.employee.name} {task?.employee.surname}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex mb-9">
              <div className="flex w-[260px] gap-2">
                <CalendarSvg />
                <p>დავალების დედლაინი</p>
              </div>
              {task ? <p>{setDateToConvert(task?.due_date)}</p> : null}
            </div>
          </div>
        </div>
      </div>
      <div className="w-[40%] bg-[#F8F3FEA6] p-10 rounded-xl h-[900px] mb-10 dark:bg-gray-950">
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
                  className="border-[0.5px] border-[#ADB5BD] h-[135px] bg-white pb-16"
                />

                <Button
                  onClick={handleSubmit((value) => onSubmit(null, value))}
                  disabled={!value.trim()}
                  className="absolute rounded-3xl right-5 bottom-4"
                >
                  დააკომენტარე
                </Button>
              </div>
            )}
          />
        </div>
        <div className="h-[600px] hidden-scrollbar">
          <div className="flex gap-2">
            <h1 className="text-left mb-9 text-xl font-medium">კომენტარები</h1>
            <Button className="w-3 h-6 rounded-full">
              {totalCommentsAndSubcomments}
            </Button>
          </div>
          {comments?.map((comment) => (
            <div key={comment.id} className="mb-10">
              <div className="flex mb-3">
                <Avatar className="mr-2">
                  <AvatarImage src={comment.author_avatar} alt="@shadcn" />
                  <AvatarFallback>{comment?.author_nickname[0]}</AvatarFallback>
                </Avatar>

                <div className="text-left w-full">
                  <h1 className="text-xl font-medium">
                    {comment?.author_nickname}
                  </h1>{" "}
                  <p>{comment?.text}</p>
                  <Button
                    variant={"ghost"}
                    onClick={() =>
                      setShowReplyInput((prev) =>
                        prev === comment.id.toString()
                          ? null
                          : comment.id.toString()
                      )
                    }
                  >
                    <ReplySvg />
                    <p className="text-primary">უპასუხე</p>
                  </Button>
                  {/* Render the reply input only if showReplyInput is the current comment id */}
                  {showReplyInput === comment.id.toString() && (
                    <div className="text-start relative mb-11">
                      <Controller
                        name="replyMessage"
                        control={replyControl}
                        render={({ field: { onChange, value } }) => (
                          <div className="w-full flex gap-2 flex-col">
                            <Textarea
                              id="replyMessage"
                              placeholder={"დაწერე კომენტარი"}
                              onChange={onChange}
                              value={value}
                              className="border-[0.5px] border-[#ADB5BD] h-[135px] bg-white pb-16"
                            />

                            <Button
                              onClick={handleReplySubmit((value) =>
                                onReplySubmit(comment.id.toString(), value)
                              )}
                              disabled={!value.trim()}
                              className="absolute rounded-3xl right-5 bottom-4"
                            >
                              დააკომენტარე
                            </Button>
                          </div>
                        )}
                      />
                    </div>
                  )}
                </div>
              </div>
              {comment.sub_comments?.map((sub_comment) => (
                <div key={sub_comment.id} className="flex gap-4 pl-10">
                  <Avatar>
                    <AvatarImage
                      src={sub_comment.author_avatar}
                      alt={sub_comment.author_nickname}
                    />
                    <AvatarFallback>
                      {comment?.author_nickname[0]}
                    </AvatarFallback>
                  </Avatar>

                  <div className="text-left">
                    <h1 className="text-xl font-medium">
                      {sub_comment?.author_nickname}
                    </h1>{" "}
                    <p>{sub_comment?.text}</p>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InfoTask;
