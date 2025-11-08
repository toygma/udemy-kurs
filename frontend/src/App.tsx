import React, { Suspense } from "react";
import { RouterProvider } from "react-router";
import { router } from "./routes/routes";
import { Toaster } from "react-hot-toast";
import Loading from "./features/Loading";

const App = () => {
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
