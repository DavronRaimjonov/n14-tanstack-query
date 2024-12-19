import { useQueryClient } from "@tanstack/react-query";
import React from "react";
import Todo from "./todo";

const About = () => {
  const queryClient = useQueryClient();

  const data = queryClient.getQueryData(["TODO"]);
//   console.log(data);
  return (
    <div>
      {/* {data?.map((value) => (
        <Todo key={value.id} {...value} />
      ))} */}
      About
    </div>
  );
};

export default About;
