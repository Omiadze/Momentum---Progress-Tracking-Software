const Skeleton = () => {
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="rounded-md h-12 w-12 border-4 border-t-4 border-primary animate-spin absolute"></div>
    </div>
  );
};

export default Skeleton;
