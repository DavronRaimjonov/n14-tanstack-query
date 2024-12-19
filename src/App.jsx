import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React, { useRef } from "react";
import Todo from "./todo";
import useLoader from "./generic/loader";
import About from "./about";
import { Button, Input, notification } from "antd";

const App = () => {
  const ref = useRef();
  const queryClient = useQueryClient();
  const { useTodoLoading } = useLoader();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["TODO"],
    queryFn: () =>
      axios
        .get("https://67172d90b910c6a6e026d725.mockapi.io/mesage/telgram")
        .then((data) => data.data),
  });

  const deleteMutation = useMutation({
    mutationFn: (id) =>
      axios({
        url: `https://67172d90b910c6a6e026d725.mockapi.io/mesage/telgram/${id}`,
        method: "DELETE",
      }).then((data) => data.data),
    onSuccess: () => {
      queryClient.invalidateQueries(["TODO"]);
      notification.success({ message: "Delete tood" });
    },
    onError: () => {
      notification.error({ message: "Nimadr xato keti oka" });
    },
  });
  const {
    mutate: addTodoMutation,
    isPending,
    data: dataAdd,
  } = useMutation({
    mutationFn: (newData) =>
      axios({
        url: "https://67172d90b910c6a6e026d725.mockapi.io/mesage/telgram",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        data: newData,
      }).then((data) => data.data),
    onSuccess: () => {
      queryClient.invalidateQueries(["TODO"]);
      notification.success({ message: "Add todo" });
    },
    onError: () => {
      notification.error({ message: "Nimadr xato keti oka" });
    },
  });
  console.log(dataAdd);
  // console.log(data);
  // console.log(isLoading);
  // console.log(isError);

  const addTodo = () => {
    let text = ref.current.input.value;
    ref.current.input.value = "";
    addTodoMutation({ text, ID: Date.now(), date: new Date() });
  };

  return (
    <div className="w-[500px] m-auto">
      <form>
        <Input ref={ref} type="text" />
        <Button onClick={addTodo}>Send</Button>
      </form>
      {isLoading || isError || deleteMutation.isPending || isPending
        ? useTodoLoading()
        : data?.map((value) => (
            <Todo key={value.id} {...value} deleteMutation={deleteMutation} />
          ))}

      <About />
    </div>
  );
};

export default App;
