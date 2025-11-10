import type React from "react";

const LayoutContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {children}
    </div>
  );
};

export default LayoutContainer;
