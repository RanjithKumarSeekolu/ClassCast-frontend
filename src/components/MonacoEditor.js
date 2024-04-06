import React, { useEffect, useState } from "react";
import Editor from "@monaco-editor/react";
import axios from "axios";
import { FaPython, FaJava } from "react-icons/fa";
import { TbBrandCpp } from "react-icons/tb";
import { MdOutlineMenu } from "react-icons/md";
import Tabs from "./Tabs";
import { baseApiUrl } from "../utils/config";

const userRole = "teacher";

const MonacoEditor = () => {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("python");
  const [output, setOutput] = useState("");
  const [studentCode, setStudentsCode] = useState("");
  const [studentOutput, setStudentOutput] = useState("");
  const [activeTab, setActiveTab] = useState("editor");

  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  useEffect(() => {
    switch (language) {
      case "python":
        setCode(`def hello_world():
    print("Hello, World!")

hello_world()`);
        break;
      case "java":
        setCode(`public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`);
        break;
      case "cpp":
        setCode(`#include <iostream>

int main() {
    std::cout << "Hello, World!" << std::endl;
    return 0;
}`);
        break;
      default:
        setCode("");
        break;
    }
  }, [language]);

  function handleEditorChange(value, event) {
    setCode(value);
  }

  const submitCode = async () => {
    try {
      const res = await axios.post(`${baseApiUrl}`, {
        language,
        code,
      });
      console.log(res);
      if (res.status === 200 && res.data) {
        setActiveTab("output");
        setOutput(res.data.data);
      }
    } catch (err) {
      console.log("fetch error :", err);
    }
  };

  return (
    <>
      <div className="text-center bg-purple-300 p-4 w-full">
        <h1 className="sm:text-6xl text-3xl font-bold sm:pb-4">
          {language.charAt(0).toUpperCase() + language.slice(1) + " Compiler"}
        </h1>
        <p className="sm:block hidden">
          Our live classes offer students the opportunity to engage in real-time
          learning sessions led by experienced instructors. Through live
          interaction, students can actively participate, ask questions, and
          receive immediate feedback.
        </p>
        <span className="relative top-7  bg-purple-500 p-2 rounded-lg">
          XLIOEIU
        </span>
      </div>

      <div className="sm:hidden flex justify-center mt-10">
        <div className="flex gap-4 border">
          <button
            className={`p-2 ${activeTab === "editor" ? " bg-gray-200" : ""}`}
            onClick={() => setActiveTab("editor")}
          >
            Editor
          </button>
          <button
            className={`p-2 ${activeTab === "output" ? " bg-gray-200" : ""}`}
            onClick={() => setActiveTab("output")}
          >
            Output
          </button>
        </div>
      </div>
      <div className="flex w-full flex-wrap sm:mt-8 mt-2 p-2">
        <div
          className={`sm:w-1/2 w-full ${
            activeTab === "editor" ? "block" : "sm:block hidden"
          }`}
        >
          <div className="flex">
            {/* Side Navbar */}
            <div className={`sm:block ${isNavbarOpen ? "block" : "hidden"}`}>
              <ul className="p-2 border flex flex-col gap-2 h-full">
                <li>
                  <button onClick={() => setLanguage("python")}>
                    <FaPython className="w-9 h-9 border p-1" />
                  </button>
                </li>
                <li>
                  <button onClick={() => setLanguage("cpp")}>
                    <TbBrandCpp className="w-9 h-9 border p-1" />
                  </button>
                </li>
                <li>
                  <button onClick={() => setLanguage("java")}>
                    <FaJava className="w-9 h-9 border p-1" />
                  </button>
                </li>
                {/* Add more language options as needed */}
              </ul>
            </div>

            {/* Code Editor */}
            <div className={`${isNavbarOpen ? "w-5/6" : "w-full"} sm:auto`}>
              <div>
                <div className="w-full flex justify-between shadow-md border p-2">
                  <button
                    className="sm:hidden block"
                    onClick={() => setIsNavbarOpen((prev) => !prev)}
                  >
                    <MdOutlineMenu />
                  </button>
                  <h1 className="text-purple-600 font-bold">
                    {"Teacher Editor {}"}
                  </h1>
                  <button
                    onClick={submitCode}
                    className="bg-purple-500 px-3 py-1 text-white rounded-md shadow-md font-bold"
                  >
                    Run
                  </button>
                </div>
                <Editor
                  value={code}
                  onChange={handleEditorChange}
                  height="90vh"
                  language={language}
                  theme="vs-dark"
                />
              </div>
            </div>
          </div>
        </div>
        {userRole === "student" && (
          <div className={`sm:w-1/2 sm:block hidden`}>
            <div className="flex">
              {/* Side Navbar */}
              <div className={`sm:block ${isNavbarOpen ? "block" : "hidden"}`}>
                <ul className="p-2 border flex flex-col gap-2 h-full">
                  <li>
                    <button onClick={() => setLanguage("python")}>
                      <FaPython className="w-9 h-9 border p-1" />
                    </button>
                  </li>
                  <li>
                    <button onClick={() => setLanguage("cpp")}>
                      <TbBrandCpp className="w-9 h-9 border p-1" />
                    </button>
                  </li>
                  <li>
                    <button onClick={() => setLanguage("java")}>
                      <FaJava className="w-9 h-9 border p-1" />
                    </button>
                  </li>
                  {/* Add more language options as needed */}
                </ul>
              </div>

              {/* Code Editor */}
              <div className={`${isNavbarOpen ? "w-5/6" : "w-full"} sm:auto`}>
                <div>
                  <div className="w-full flex justify-between shadow-md border p-2">
                    <button
                      className="sm:hidden block"
                      onClick={() => setIsNavbarOpen((prev) => !prev)}
                    >
                      <MdOutlineMenu />
                    </button>
                    <h1 className="text-purple-600 font-bold">
                      {"Student Editor {}"}
                    </h1>
                    <button
                      onClick={submitCode}
                      className="bg-purple-500 px-3 py-1 text-white rounded-md shadow-md font-bold"
                    >
                      Run
                    </button>
                  </div>
                  <Editor
                    value={code}
                    onChange={handleEditorChange}
                    height="90vh"
                    language={language}
                    theme="vs-dark"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
        <div
          className={`border min-h-96 sm:w-1/2   ${
            activeTab === "output" ? "w-full" : "sm:block hidden"
          }`}
        >
          <div className="border border-l-0 p-2 pb-4 text-gray-400">
            Teacher Output
          </div>
          <span className="p-2">{output}</span>
        </div>
        {userRole === "student" && (
          <div className={`border min-h-96  sm:w-1/2 sm:block hidden`}>
            <div className="border border-l-0 p-2 pb-4 text-gray-400">
              Student Output
            </div>
            <span className="p-2">{output}</span>
          </div>
        )}
      </div>
    </>
  );
};

export default MonacoEditor;
