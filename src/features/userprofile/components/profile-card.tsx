"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { updateUser } from "../actions/update-user";

interface User {
  id: string;
  username?: string;
  email?: string;
}

interface ProfileCardProps {
  user: User;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ user }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState<User>({ ...user });

  // Handle change in input fields
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  // Handle save changes
  const handleSave = () => {
    updateUser(user.id, {
      username: editedUser.username,
      email: editedUser.email,
    });
    setIsEditing(false);
  };

  // Handle cancel editing
  const handleCancel = () => {
    setEditedUser({ ...user });
    setIsEditing(false);
  };

  return (
    <Card className="shadow-lg rounded-lg">
      <CardHeader>
        <h3 className="text-2xl font-semibold text-gray-800">
          User Information
        </h3>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-600 font-medium">Username:</span>
            {isEditing ? (
              <Input
                name="username"
                value={editedUser.username || ""}
                onChange={handleChange}
                className="max-w-[200px]"
              />
            ) : (
              <span className="text-gray-900">
                {user.username || "Not provided"}
              </span>
            )}
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600 font-medium">Email:</span>
            {isEditing ? (
              <Input
                name="email"
                value={editedUser.email || ""}
                onChange={handleChange}
                className="max-w-[200px]"
              />
            ) : (
              <span className="text-gray-900">
                {user.email || "Not provided"}
              </span>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end space-x-2">
        {isEditing ? (
          <>
            <Button onClick={handleSave} variant="default">
              Save
            </Button>
            <Button onClick={handleCancel} variant="outline">
              Cancel
            </Button>
          </>
        ) : (
          <Button onClick={handleEdit} variant="outline">
            Edit
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default ProfileCard;
