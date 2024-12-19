import { Button, notification } from "antd";
import React from "react";

const Todo = ({ id, date, text, deleteMutation }) => {
  return (
    <div className="p-3 bg-slate-500 mb-5 flex items-center justify-between rounded-lg">
      <p>{text}</p>
      <span>{date}</span>
      <Button
        onClick={() => {
          deleteMutation.mutate(id);
        }}
      >
        Delete
      </Button>
    </div>
  );
};

export default Todo;
