import { Button } from "@/components/ui/button";
import { NavLink } from "react-router-dom";
import LostImg from "@/assets/lost.jpg";

const NotFoundPage = () => {
  return (
    <section className="flex flex-col items-center w-full py-12 text-center md:py-24 gap-8 h-screen">
      <img
        src={LostImg}
        width="400"
        height="300"
        alt="Illustration"
        className="rounded-xl object-cover"
        style={{ aspectRatio: "400/300", objectFit: "cover" }}
      />
      <div className="container flex flex-col items-center justify-center gap-2 px-4 md:gap-4 lg:gap-6">
        <div className="space-y-2 flex justify-center items-center flex-col">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">
            Lost in the clouds
          </h1>
          <p className="text-gray-500 md:w-2/4 lg:w-1/2 xl:w-1/3 dark:text-gray-400 text-center">
            Whoops, looks like you took a wrong turn. Let&#x27;s get you back
            home.
          </p>
        </div>
        <NavLink
          to={"/"}
          className="inline-flex h-9 items-center rounded-md border"
        >
          <Button variant={"destructive"}>Go back home</Button>
        </NavLink>
      </div>
    </section>
  );
};

export default NotFoundPage;
