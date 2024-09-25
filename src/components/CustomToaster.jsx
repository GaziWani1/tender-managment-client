import React from "react";
import toast, { ToastBar, Toaster } from "react-hot-toast";

const CustomToaster = () => {
  return   <Toaster
  position="top-center"
  reverseOrder={false}
  gutter={8}
  containerClassName=""
  containerStyle={{}}
>
  {(t) => (
    <ToastBar toast={t}>
      {({ icon, message }) => (
        <>
          {icon}
          {message}
          {t.type !== 'loading' && (
            <button onClick={() => toast.dismiss(t.id)}>X</button>
          )}
        </>
      )}
    </ToastBar>
  )}
</Toaster>
};

export default CustomToaster;
