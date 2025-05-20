import React from "react";
import { useSnackbar } from "notistack";
import { CloseRounded } from "@mui/icons-material";

const useCustomSnackbar = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const DEFAULT_VARIANT = "success";
  const DEFAULT_TIMEOUT = 3000;
  const TRANSITION_DURATION = { enter: 225, exit: 195 };

  const DEFAULT_ACTION = (key) => (
    <CloseRounded
      onClick={() => {
        closeSnackbar(key);
      }}
    />
  );

  const showSnackbar = (message, variant = DEFAULT_VARIANT, config = {}) => {
    enqueueSnackbar(message, {
      variant,
      action: DEFAULT_ACTION,
      autoHideDuration: DEFAULT_TIMEOUT - TRANSITION_DURATION.enter - TRANSITION_DURATION.exit,
      disableWindowBlurListener: true,
      transitionDuration: TRANSITION_DURATION,
      preventDuplicate: true,
      ...config
    });
  };

  return { enqueueSnackbar: showSnackbar };
};

export default useCustomSnackbar;
