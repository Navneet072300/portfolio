import { FaPerson } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { BiLogoGmail } from "react-icons/bi";
import { FaArrowRightLong } from "react-icons/fa6";

export default function About() {
  return (
    <>
      <div className=" mx-[20rem] my-[6rem]">
        <div>
          <h1 className=" text-5xl font-medium">Personal Details</h1>
          <div className=" h-2 w-full bg-gray-500 rounded-lg mt-2"></div>
          <div className="my-[4rem]">
            <p className=" flex items-center gap-6 text-xl font-medium">
              {" "}
              <span className=" text-2xl">
                <FaPerson />
              </span>{" "}
              Navneet Shahi
            </p>
            <p className=" flex items-center gap-6 text-xl font-medium mt-4">
              {" "}
              <span className=" text-2xl">
                <FaPhoneAlt />
              </span>{" "}
              +91 7068903862
            </p>
            <p className=" flex items-center gap-6 text-xl font-medium mt-4">
              {" "}
              <span className=" text-2xl">
                <BiLogoGmail />
              </span>{" "}
              navneetshahi345@gmail.com
            </p>
          </div>
        </div>
        <div>
          <h1 className=" text-5xl font-medium">Education Details</h1>
          <div className=" h-2 w-full bg-gray-500 rounded-lg mt-2"></div>
          <div className="my-[4rem]">
            <p className=" flex items-center gap-6 text-lg font-medium">
              CHANDIGARH UNIVERSITY
              <br />
              Bachelor of Engineering - BE, Computer Science
              <br />
              2021 - 2025
            </p>
            <p className=" flex items-center gap-6 text-lg font-medium mt-6">
              St. Joseph's School
              <br />
              12th
              <br />
              2019 - 2020
            </p>
            <p className=" flex items-center gap-6 text-lg font-medium mt-6">
              St. Joseph's School
              <br />
              10th
              <br />
              2017 - 2018
            </p>
          </div>
        </div>
        <div>
          <h1 className=" text-5xl font-medium">Certificates</h1>
          <div className=" h-2 w-full bg-gray-500 rounded-lg mt-2"></div>
          <div className="my-[4rem]">
            <p className=" flex items-center gap-6 text-lg font-medium">
              AWS ACADEMY GRADUATE - AWS ACADEMY CLOUD FOUNDATIONS
              <br />
              Amazon Web Services (AWS)
              <br />
              Issued Apr 2023
              <div>
                <a
                  href="https://drive.google.com/file/d/10DAsoY4c2WIc3yXg15NZd1GaxAdh1cWs/view?usp=sharing"
                  className=" text-lg text-purple-600 hover:underline flex items-center gap-2"
                >
                  Varification Link{" "}
                  <span>
                    <FaArrowRightLong />
                  </span>
                </a>
              </div>
            </p>
            <p className=" flex items-center gap-6 text-lg font-medium mt-6">
              St. Joseph's School
              <br />
              12th
              <br />
              2019 - 2020
            </p>
            <p className=" flex items-center gap-6 text-lg font-medium mt-6">
              St. Joseph's School
              <br />
              10th
              <br />
              2017 - 2018
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
