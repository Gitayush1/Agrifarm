import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { app } from "../../firebase";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import { LoadingButton } from "../ui/LoadingButton";
import { toast } from "react-hot-toast";
import apis from "../../utils/apis";
import { Signout } from "../ui/Signout";

export const Profile = ({ user, setUser }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [profileLoading, setProfileLoading] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [photoURL, setPhotoURL] = useState("");

  // ✅ Ensure user is properly loaded before checking
  useEffect(() => {
    if (!user) {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      } else {
        navigate("/login"); // Redirect if no user exists
      }
    }
    setProfileLoading(false);
  }, [user]);

  // ✅ Set user details when user state updates
  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
      setPhotoURL(
        user.photoURL ||
          "https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg"
      );
    }
  }, [user]);

  const handleSignOut = async () => {
    const auth = getAuth(app);
    try {
      await signOut(auth);
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      setUser(null);
      toast.success("Logged out successfully!");
      navigate('/login');
    } catch (error) {
      console.error("Sign-out error:", error);
      toast.error("Error signing out. Please try again.");
    }
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Authentication token missing!");

      const updateData = { name };
      const response = await fetch(apis().updateProfile, {
        method: "POST",
        body: JSON.stringify(updateData),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();
      if (!response.ok)
        throw new Error(result.message || "Failed to update profile");

      toast.success("Profile updated successfully!");
      const updatedUser = { ...user, name, photoURL };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);
    } catch (error) {
      toast.error(error.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  if (profileLoading) {
    return (
      <div className="text-center mt-10">
        <p className="text-gray-600 text-lg">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="auth_main">
      <form onSubmit={submitHandler}>
        <div className="auth_container">
          <div className="auth_header">
            <img
              src={photoURL}
              alt="Profile"
              className="w-24 h-24 rounded-full mb-4 border-2 border-gray-300 shadow-lg"
            />
            <h2 className="auth_heading">Profile</h2>
          </div>

          <div className="auth_item">
            <label>Name *</label>
            <Input
              onChange={(e) => setName(e.target.value)}
              value={name}
              type="text"
              required
              placeholder="Enter your name"
            />
          </div>

          <div className="auth_item">
            <label>Email *</label>
            <Input
              value={email}
              type="email"
              disabled
              placeholder="Your email"
            />
          </div>

          <div className="auth_action">
            <Button disabled={loading} type="submit">
              <LoadingButton
                loading={loading}
                title={loading ? "Updating..." : "Update"}
              />
            </Button>
          </div>

          <button onClick={handleSignOut} className="mt-4">
            <Signout />
          </button>
        </div>
      </form>
    </div>
  );
};
