import {
  Button,
  CircularProgress,
  FormControl,
  FormLabel,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Typography
} from "@mui/material";
import React from "react";
import { EmailTwoTone, PhoneAndroidTwoTone, VisibilityOffTwoTone, VisibilityTwoTone } from "@mui/icons-material";
import Common from "../common";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import useCustomSnackbar from "../../../hooks/useCustomSnackbar";
import get from "lodash.get";
import { login } from "../../../routes/routePaths";
import { signupUser } from "../../../redux/slices/user";

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return email && emailRegex.test(email);
};
const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useCustomSnackbar();
  const [data, setData] = React.useState({});
  const [togglePassword, setTogglePassword] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSignUp = () => {
    setIsLoading(true);
    dispatch(signupUser({ ...data })).then(({ payload }) => {
      if (payload.message) {
        enqueueSnackbar(payload.message, "error");
        setIsLoading(false);
      } else if (Object.values(get(payload, "data.data")).some((x) => !x)) {
        setIsLoading(false);
        setTimeout(() => {
          navigate("/");
          enqueueSnackbar("Signup Successfully", "success");
        }, 100);
      }
    });
  };

  return (
    <Common
      type={"Sign Up"}
      subTitle={() => (
        <>
          Join User Management today and experienc like never before. Sign up now to get your unlock a world of
          possibilities. Sign up now and start your journey with us! <br />
        </>
      )}
      footer={() => {
        return (
          <Typography>
            Already a member?{" "}
            <Typography
              variant="span"
              color="primary"
              sx={{ cursor: "pointer", fontWeight: 700 }}
              onClick={() => navigate(login, { replace: true })}
            >
              Login here
            </Typography>
          </Typography>
        );
      }}
    >
      <FormControl fullWidth sx={{ textAlign: "left" }}>
        <FormLabel sx={{ color: "#000", mb: 0.5 }}>name*</FormLabel>
        <OutlinedInput
          variant="outlined"
          fullWidth
          onChange={({ target }) => setData({ ...data, name: target.value })}
          endAdornment={
            <InputAdornment position="end">
              <EmailTwoTone color="inherit" />
            </InputAdornment>
          }
        />
      </FormControl>
      <FormControl fullWidth sx={{ textAlign: "left" }}>
        <FormLabel sx={{ color: "#000", mb: 0.5 }}>Phone number*</FormLabel>
        <OutlinedInput
          variant="outlined"
          fullWidth
          onChange={({ target }) => setData({ ...data, phone: target.value })}
          endAdornment={
            <InputAdornment position="end">
              <PhoneAndroidTwoTone color="inherit" />
            </InputAdornment>
          }
        />
      </FormControl>
      <FormControl fullWidth sx={{ textAlign: "left" }}>
        <FormLabel sx={{ color: "#000", mb: 0.5 }}>Email Address*</FormLabel>
        <OutlinedInput
          variant="outlined"
          fullWidth
          onChange={({ target }) => setData({ ...data, email: target.value })}
          endAdornment={
            <InputAdornment position="end">
              <EmailTwoTone color="inherit" />
            </InputAdornment>
          }
        />
      </FormControl>
      <FormControl fullWidth sx={{ textAlign: "left", mt: 2 }}>
        <FormLabel sx={{ color: "#000", mb: 0.5 }}>Password</FormLabel>
        <OutlinedInput
          variant="outlined"
          type={togglePassword ? "text" : "password"}
          fullWidth
          onChange={({ target }) => setData({ ...data, password: target.value })}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                sx={{ display: !data.password ? "none" : "inline-flex" }}
                onMouseDown={(e) => e.preventDefault()}
                disabled
              >
                <VisibilityOffTwoTone />
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
      <FormControl fullWidth sx={{ textAlign: "left", mt: 2 }}>
        <FormLabel sx={{ color: "#000", mb: 0.5 }}>Confirm Password</FormLabel>
        <OutlinedInput
          variant="outlined"
          type={togglePassword ? "text" : "password"}
          fullWidth
          onChange={({ target }) => setData({ ...data, confirmPassword: target.value })}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                sx={{ display: !data.confirmPassword ? "none" : "inline-flex" }}
                onClick={() => setTogglePassword(!togglePassword)}
                onMouseDown={(e) => e.preventDefault()}
              >
                {togglePassword ? <VisibilityOffTwoTone /> : <VisibilityTwoTone />}
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
      <Button variant="contained" disabled={isLoading} size="large" fullWidth sx={{ my: 3 }} onClick={handleSignUp}>
        {isLoading ? <CircularProgress size={20} /> : "SIGN UP"}
      </Button>
    </Common>
  );
};

export default SignUp;
