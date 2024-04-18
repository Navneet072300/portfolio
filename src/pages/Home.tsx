import { FaReact } from "react-icons/fa";
import { SiNextdotjs } from "react-icons/si";
import { SiNodedotjs } from "react-icons/si";
import { SiTailwindcss } from "react-icons/si";

const Home = () => {
  return (
    <>
      <div className=" home-container grid grid-cols-2 items-center justify-center my-[5rem] mx-[10rem]">
        <div className="">
          <div className="text-4xl font-semibold">
            <h1>
              <span>&#128075;</span>Hi, I'm Navneet Shahi
            </h1>
            <p className=" text-lg font-medium text-gray-500 max-w-[542px] my-3 ml-[3.25rem]">
              I'm a passionate web developer from India. Currently a student at
              Chandigarh University, Punjab.
            </p>
            <p className=" text-lg my-[10rem] ml-[3.25rem] flex items-center justify-center gap-4">
              Tech Stack <span className=" text-3xl font-bold">|</span>{" "}
              <span className="flex items-center justify-center text-4xl font-normal gap-4">
                <FaReact />
                <SiNextdotjs />
                <SiNodedotjs />
                <SiTailwindcss />
              </span>
            </p>
          </div>
        </div>
        <div className="home-container-img mb-[30rem]">
          <img src="/background.jpg" alt="" />
        </div>
      </div>
    </>
  );
};

export default Home;
