import { UserIcon } from "@heroicons/react/24/solid";
import { Menu } from "@headlessui/react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { deleteAccount } from "../services/api";
import AlertModal from "./AlertModal";
const Navbar = ({ onUploadClick }) => {
  const navigate = useNavigate();
  const [isAlertOpen, setIsAlertOpen]= useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [fullname, setFullname] = useState(null);
  const [username, setUsername] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [password, setPassword] = useState("");

  useEffect(() => {
    const storedUsername = localStorage.getItem("cervify_username");
    const storedFullname = localStorage.getItem("cervify_fullname");
    if (storedUsername && storedFullname) {
      setUsername(storedUsername);
      setFullname(storedFullname);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("cervify_fullname");
    localStorage.removeItem("cervify_username");
    setFullname(null);
    setUsername(null);
    navigate("/login");
  };

  const closeAlert = () => {
    setIsAlertOpen(false); 
  }
  const handleAccountDeletion = async () => {
    try {
      await deleteAccount(username, password);
      setAlertMessage("Account deleted successfully.");
      setIsAlertOpen(true);
      handleLogout();
    } catch (err) {
      setAlertMessage("Failed to delete account: " + err.message);
      setIsAlertOpen(true);
    }
  };

  return (
    <>
      <nav className="fixed top-0 w-full flex items-center justify-between px-6 py-3 backdrop-blur-md bg-white/30 shadow-md z-50 rounded-b-xl font-poppins">
        <Link to="/">
          <div className="flex items-center gap-2">
            <img src="./Logo.png" alt="Cervify Logo" className="h-12 w-auto object-contain" />
          </div>
        </Link>

        <div className="flex gap-8 text-base font-semibold text-gray-700">
          <Link to="/" className="hover:text-blue-700 hover:drop-shadow-md transition duration-200">Home</Link>
          {username && (
            <Link to="/model" className="hover:text-blue-700 hover:drop-shadow-md transition duration-200">Model</Link>
          )}
          <Link to="/about" className="hover:text-blue-700 hover:drop-shadow-md transition duration-200">About</Link>
          <Link to="/faqs" className="hover:text-blue-700 hover:drop-shadow-md transition duration-200">FAQs</Link>
        </div>

        <div className="flex items-center gap-6 relative">
          {username && (
            <button
              onClick={onUploadClick}
              className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-4 py-2 rounded-full text-sm font-medium hover:scale-105 transition-transform shadow"
            >
              Upload Photo
            </button>
          )}

          <Menu as="div" className="relative right-2">
            <Menu.Button className="flex items-center gap-2 text-gray-800 hover:text-blue-700 hover:drop-shadow-md transition duration-200">
              <UserIcon className="h-6 w-6 text-purple-600" />
              <span>{username ? fullname : "USER"}</span>
            </Menu.Button>

            <Menu.Items className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-50">
              <div className="p-1">
                {username ? (
                  <>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={handleLogout}
                          className={`w-full text-center px-4 py-2 text-sm rounded ${active ? "bg-gray-100" : ""}`}
                        >
                          Logout
                        </button>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={() => setShowDeleteModal(true)}
                          className={`w-full text-center px-4 py-2 text-sm rounded text-red-600 ${active ? "bg-red-50" : ""}`}
                        >
                          Delete Account
                        </button>
                      )}
                    </Menu.Item>
                  </>
                ) : (
                  <>
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          to="/login"
                          className={`block text-center px-4 py-2 text-sm rounded ${active ? "bg-blue-100" : ""}`}
                        >
                          Login
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          to="/signup"
                          className={`block text-center px-4 py-2 text-sm rounded ${active ? "bg-blue-100" : ""}`}
                        >
                          Sign Up
                        </Link>
                      )}
                    </Menu.Item>
                  </>
                )}
              </div>
            </Menu.Items>
          </Menu>
        </div>
      </nav>

      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80 space-y-4">
            <h2 className="text-lg font-semibold text-red-600">Confirm Deletion</h2>
            <p className="text-sm text-gray-700">Are you sure you want to delete your account? This action cannot be undone.</p>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-3 py-2 border rounded"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 text-sm bg-gray-200 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleAccountDeletion}
                className="px-4 py-2 text-sm bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
         <AlertModal
          isOpen={isAlertOpen}
          message={alertMessage}
          onClose={closeAlert}
        ></AlertModal>
        </div>
      )}
    </>
  );
};

export default Navbar;
