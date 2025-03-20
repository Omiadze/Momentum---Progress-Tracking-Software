const Loading = () => {
  return (
    <div className="flex gap-2 justify-center items-center pt-7 h-screen">
      <div className="w-2 h-2 rounded-full animate-pulse bg-primary"></div>
      <div className="w-2 h-2 rounded-full animate-pulse bg-primary"></div>
      <div className="w-2 h-2 rounded-full animate-pulse bg-primary"></div>
    </div>
  );
};

export default Loading;
