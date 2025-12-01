import React, { Suspense } from "react";
import { RouterProvider } from "react-router";
import { router } from "./routes/routes";
import { Toaster } from "react-hot-toast";
import Loading from "./features/Loading";
import { useGetUserQuery } from "./store/api/user-api";

const App = () => {
  const { isLoading } = useGetUserQuery(undefined);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <React.Fragment>
      <div>
        <Suspense fallback={<Loading />}>
          <RouterProvider router={router} />
        </Suspense>
      </div>
      <Toaster position="top-center" />
    </React.Fragment>
  );
};

export default App;
