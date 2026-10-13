import React from "react";
import { useRef, useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

const Manager = () => {
  // delete: const ref = useRef();
  // delete: const passwordRef = useRef();
  const [showFormPassword, setShowFormPassword] = useState(false);
  const [form, setform] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setpasswordArray] = useState([]);
  const [showWarning, setShowWarning] = useState(false);
  const [warningMessage, setWarningMessage] = useState("");
  const [visiblePasswords, setVisiblePasswords] = useState({});

  useEffect(() => {
    let passwords = localStorage.getItem("passwords");
    let passwordArray;
    if (passwords) {
      setpasswordArray(JSON.parse(passwords));
    } else {
      passwordArray = [];
    }

    let scrollTimeout;
    const handleScroll = () => {
      document.body.classList.add("is-scrolling");
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        document.body.classList.remove("is-scrolling");
      }, 300);
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);

  const toggleFormPassword = () => setShowFormPassword((prev) => !prev);

  const toggleSavedPassword = (index) => {
    setVisiblePasswords((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const savePassword = () => {
    // Check if any field is empty
    if (!form.site || !form.username || !form.password) {
      setWarningMessage("⚠️ Please fill in all fields!");
      setShowWarning(true);
      setTimeout(() => setShowWarning(false), 3000);
      return;
    }

    //Password validation
    // At least:
    // - one lowercase letter - one uppercase letter
    // - one number - one special character from @$%&*
    // - minimum 3 characters - maximum 14 characters
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$%&*]).{3,14}$/;

    if (!passwordRegex.test(form.password)) {
      setWarningMessage(
        "⚠️ Password must contain uppercase, lowercase, number, special character (@$%&*) and be 3-14 characters long!",
      );
      setShowWarning(true);
      setTimeout(() => {
        setShowWarning(false);
      }, 5000);
      return;
    }

    // Implementation for saving password
    setpasswordArray([...passwordArray, { ...form, id: uuidv4() }]);
    localStorage.setItem(
      "passwords",
      JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]),
    );

    setform({
      site: "",
      username: "",
      password: "",
    });

    toast.success("Saved successfully", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const deletePassword = (id) => {
    // Deleting password
    let c = confirm("Are you sure you want to delete this password?");
    if (c) {
      setpasswordArray(passwordArray.filter((item) => item.id !== id));
      localStorage.setItem(
        "passwords",
        JSON.stringify(passwordArray.filter((item) => item.id !== id)),
      );
      toast.success("Deleted successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const editPassword = (id) => {
    // Editing password
    setform(passwordArray.filter((item) => item.id === id)[0]);
    setpasswordArray(passwordArray.filter((item) => item.id !== id));
  };

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  const copyText = (text) => {
    toast.success("Copied to clipboard", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    navigator.clipboard.writeText(text);
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="fixed inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]"></div>
      {showWarning && (
        <div className="fixed top-5 right-5 z-50 flex items-center gap-3 bg-red-100 border border-red-400 text-red-600 px-5 py-3 rounded-xl shadow-lg animate-bounce">
          <span className="font-semibold">{warningMessage}</span>
        </div>
      )}
      <div className="mycontainer">
        <h1 className="hidden sm:block font-bold text-purple-600 text-2xl text-center">
          <span className="text-green-500">&lt;</span>
          Pass
          <span className="text-green-500">OP/&gt;</span>
        </h1>
        <p className="text-purple-950 text-lg text-center pt-5 sm:p-0">
          Your own password manager
        </p>
        <div className="blockbox md:flex-row flex flex-col items-center p-5">
          <div className="blockbox1  flex flex-col p-5 gap-3 w-full">
            <div>
              <input
                value={form.site}
                onChange={handleChange}
                placeholder="Enter Website URL"
                className="border border-green-500 rounded-full caret-purple-600 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-400 px-4 py-1 w-full text-black"
                type="text"
                name="site"
              />
            </div>
            <div className="md:flex-row flex flex-col gap-5 w-full justify-between">
              <input
                value={form.username}
                onChange={handleChange}
                placeholder="Username"
                className="border border-green-500 rounded-full caret-purple-600 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-400 px-4 py-1 w-full text-black"
                type="text"
                name="username"
              />
              <div className="relative w-full">
                <input
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Password"
                  className="border border-green-500 rounded-full caret-purple-600 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-400 px-4 py-1 w-full text-black"
                  type={showFormPassword ? "text" : "password"}
                  name="password"
                />
                <span
                  className="absolute right-px top-0 cursor-pointer"
                  onClick={toggleFormPassword}
                >
                  <img
                    className="p-2"
                    width={35}
                    src={
                      showFormPassword
                        ? "/icons/eyecross.png"
                        : "/icons/eye.png"
                    }
                    alt={showFormPassword ? "Hide password" : "Show password"}
                  />
                </span>
              </div>
            </div>
          </div>
          <div className="blockbox2">
            <button
              onClick={savePassword}
              className="bg-purple-600 text-white text-2xl font-bold flex justify-center items-center gap-2 px-4 py-3 rounded-2xl cursor-pointer transition-all duration-300  hover:bg-purple-700 hover:shadow-[0_0_20px_rgba(147,51,234,0.5)] active:scale-95 group"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="#ffffff"
                stroke="#ffffff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="  transition-all  duration-300  group-hover:rotate-90  group-hover:scale-110"
              >
                <rect x="2" y="2" width="8.5" height="8.5" rx="2.5" />
                <rect x="13.5" y="2" width="8.5" height="8.5" rx="2.5" />
                <rect x="2" y="13.5" width="8.5" height="8.5" rx="2.5" />
                <rect x="13.5" y="16.45" width="8.5" height="2.6" rx="1.3" />
                <rect x="16.45" y="13.5" width="2.6" height="8.5" rx="1.3" />
              </svg>
              Add
            </button>
          </div>
        </div>
        <div className="passwords overflow-auto">
          <h2 className="font-bold text-xl py-2">Your Saved Passwords</h2>
          {passwordArray.length === 0 && (
            <div className="text-gray-500 py-2">No saved passwords yet.</div>
          )}
          {passwordArray.length != 0 && (
            <table className="table-auto w-full rounded-md">
              <thead className="bg-purple-500 text-white">
                <tr className="gap-2">
                  <th className="py-2">Website</th>
                  <th className="py-2">Username</th>
                  <th className="py-2">Password</th>
                  <th className="py-2">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-purple-100 text-gray-700">
                {passwordArray.map((item, index) => {
                  return (
                    <tr key={item.id}>
                      <td>
                        <div className="flex items-center justify-around gap-1 py-1 px-1 transition-all duration-300 hover:decoration-purple-700 hover:drop-shadow-[0_0_6px_rgba(147,51,234,0.2)] ">
                          <a
                            className="max-w-52 truncate hover:underline"
                            href={item.site}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {item.site}
                          </a>
                          <svg
                            onClick={() => {
                              copyText(item.site);
                            }}
                            className="cursor-pointer text-gray-700 transition-all duration-300 hover:text-gray-500 hover:scale-110 hover:drop-shadow-[0_0_6px_rgba(34,197,94,0.4)] active:scale-90"
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <rect
                              width="14"
                              height="14"
                              x="8"
                              y="8"
                              rx="2"
                              ry="2"
                            />
                            <path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h2" />
                          </svg>
                        </div>
                      </td>
                      <td>
                        <div className="flex items-center justify-between gap-2 py-1 px-1 transition-all duration-300 hover:decoration-purple-700 hover:drop-shadow-[0_0_6px_rgba(147,51,234,0.2)] ">
                          <span>{item.username}</span>
                          <svg
                            onClick={() => {
                              copyText(item.username);
                            }}
                            className="cursor-pointer text-gray-700 transition-all duration-300 hover:text-gray-500 hover:scale-110 hover:drop-shadow-[0_0_6px_rgba(34,197,94,0.4)] active:scale-90"
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <rect
                              width="14"
                              height="14"
                              x="8"
                              y="8"
                              rx="2"
                              ry="2"
                            />
                            <path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h2" />
                          </svg>
                        </div>
                      </td>
                      <td>
                        <div className="shrink-0 flex items-center justify-center gap-2 py-1 px-1 transition-all duration-300 hover:decoration-purple-700 hover:drop-shadow-[0_0_6px_rgba(147,51,234,0.2)] ">
                          <span>
                            {visiblePasswords[item.id]
                              ? item.password
                              : "•".repeat(item.password.length)}
                          </span>
                          <span
                            className="cursor-pointer shrink-0"
                            onClick={() => toggleSavedPassword(item.id)}
                          >
                            <img
                              className="p-2"
                              width={35}
                              src={
                                visiblePasswords[item.id]
                                  ? "/icons/eyecross.png"
                                  : "/icons/eye.png"
                              }
                              alt={
                                visiblePasswords[item.id]
                                  ? "Hide password"
                                  : "Show password"
                              }
                            />
                          </span>
                          <svg
                            onClick={() => {
                              copyText(item.password);
                            }}
                            className=" shrink-0 cursor-pointer text-gray-700 transition-all duration-300 hover:text-gray-500 hover:scale-110 hover:drop-shadow-[0_0_6px_rgba(34,197,94,0.4)] active:scale-90"
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <rect
                              width="14"
                              height="14"
                              x="8"
                              y="8"
                              rx="2"
                              ry="2"
                            />
                            <path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h2" />
                          </svg>
                        </div>
                      </td>
                      <td>
                        <div className=" flex items-center justify-center gap-2 py-1 px-1 transition-all duration-300 hover:decoration-purple-700 hover:drop-shadow-[0_0_6px_rgba(147,51,234,0.2)] ">
                          <button
                            onClick={() => editPassword(item.id)}
                            title="Edit password"
                          >
                            <svg
                              className="cursor-pointer text-gray-700 transition-all duration-300 hover:text-green-500 hover:scale-110 hover:drop-shadow-[0_0_6px_rgba(34,197,94,0.4)] active:scale-90"
                              xmlns="http://www.w3.org/2000/svg"
                              width="18"
                              height="18"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M12 20h9" />
                              <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4Z" />
                            </svg>
                          </button>
                          <button
                            onClick={() => deletePassword(item.id)}
                            title="Delete password"
                          >
                            <svg
                              className="cursor-pointer text-gray-700 transition-all duration-300 hover:text-red-500 hover:scale-110 hover:drop-shadow-[0_0_6px_rgba(239,68,68,0.4)] active:scale-90"
                              xmlns="http://www.w3.org/2000/svg"
                              width="18"
                              height="18"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M3 6h18" />
                              <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                              <path d="M19 6l-1 14H6L5 6" />
                              <path d="M10 11v5" />
                              <path d="M14 11v5" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;
