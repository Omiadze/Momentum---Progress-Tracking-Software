import TaskCard from "./task-card/task-card";

const Home = () => {
  return (
    <div className="h-screen ">
      <div>
        <h1>დავალებების გვერდი</h1>
        <div>
          <TaskCard />
        </div>
      </div>
    </div>
  );
};

export default Home;
