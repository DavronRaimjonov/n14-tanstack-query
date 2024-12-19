import { Skeleton } from "antd";

const useLoader = () => {
  let useTodoLoading = () => {
    return (
      <div className="w-full">
        {Array.from({ length: 8 }).map((_, idx) => (
          <div key={idx} className="mb-5">
            <Skeleton.Input active={true} className="!w-full !h-[50px]" />
          </div>
        ))}
      </div>
    );
  };
  return { useTodoLoading };
};
export default useLoader;
