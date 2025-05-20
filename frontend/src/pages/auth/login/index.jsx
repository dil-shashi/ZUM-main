import {
  Button,
  Divider,
  FormControl,
  FormLabel,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Stack,
  Typography
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { VisibilityOffTwoTone, VisibilityTwoTone } from "@mui/icons-material";
import Common from "../common";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../../redux/slices/user";
import { useDispatch, useSelector } from "react-redux";
import useCustomSnackbar from "../../../hooks/useCustomSnackbar";
import get from "lodash.get";
import { rootPath, signup } from "../../../routes/routePaths";
import { REDUX_KEYS } from "../../../_helpers/constants";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useCustomSnackbar();
  const { isAuthenticated } = useSelector((state) => state[REDUX_KEYS.REDUX_USER]);

  const [togglePassword, setTogglePassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({ email: null, password: null });

  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      return navigate(rootPath, { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, isLoading]);

  const handleLogin = () => {
    setIsLoading(true);
    dispatch(loginUser({ ...data })).then(({ payload }) => {
      console.log(payload);
      if (payload.message) {
        enqueueSnackbar(payload.message, "error");
        setIsLoading(false);
      } else if (get(payload, "data.data")?.accessToken) {
        setTimeout(() => {
          setIsLoading(false);
          navigate("/profile");
          enqueueSnackbar("Login Successfully", "success");
        }, 100);
      }
    });
  };

  return (
    <Common
      subTitle={() => (
        <>
          Your future is just a click away. <br />
          Log in to access convenient, secure, and personalized services.
        </>
      )}
      footer={() => {
        return (
          <Stack
            direction="row"
            spacing={2}
            useFlexGap
            flexWrap="wrap"
            divider={<Divider orientation="vertical" flexItem sx={{ backgroundColor: "primary.main" }} />}
          >
            <Typography>
              New to this Website?{" "}
              <Typography
                variant="span"
                color="primary"
                sx={{ cursor: "pointer", fontWeight: 700 }}
                onClick={() => navigate(signup, { replace: true })}
              >
                SignUp here
              </Typography>
            </Typography>

            <Typography
              color="primary"
              sx={{ cursor: "pointer", fontWeight: 700 }}
              onClick={() => navigate("/forgot-password", { replace: true })}
            >
              Forgot password?
            </Typography>
          </Stack>
        );
      }}
    >
      <FormControl fullWidth sx={{ textAlign: "left" }}>
        <FormLabel sx={{ color: "#000", mb: 0.5 }}>Email Address</FormLabel>
        <OutlinedInput
          type="email"
          variant="outlined"
          fullWidth
          onChange={({ target }) => setData({ ...data, email: target.value })}
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
                onClick={() => setTogglePassword(!togglePassword)}
                onMouseDown={(e) => e.preventDefault()}
              >
                {togglePassword ? <VisibilityOffTwoTone /> : <VisibilityTwoTone />}
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
      <Button variant="contained" size="large" fullWidth sx={{ my: 3 }} onClick={handleLogin}>
        LOGIN
      </Button>
    </Common>
  );
};

export default Login;
