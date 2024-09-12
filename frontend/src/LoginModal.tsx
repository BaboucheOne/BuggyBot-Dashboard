import React, { useState, FormEvent, ChangeEvent } from "react";
import { Modal, Box, TextField, Button, Typography } from "@mui/material";
import Cookies from "js-cookie";
import {COOKIES_TOKEN_KEY} from "./constant";
import {useAuthContext} from "./AuthContext";
import loginRequest from "./loginRequest";

interface LoginModalProps {
  open: boolean;
  onClose: () => void;
}

const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const LoginModal: React.FC<LoginModalProps> = ({ open, onClose }) => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const { login } = useAuthContext();

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const data = await loginRequest(username, password);
      Cookies.set(COOKIES_TOKEN_KEY, data.access_token, { expires: 7 });
      login();
      onClose();
    } catch (error) {
      setError("Invalid username or password");
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "username") setUsername(value);
    if (name === "password") setPassword(value);
  };

  return (
    <Modal
      open={open}
      onClose={() => {}}
      disableEscapeKeyDown
      aria-labelledby="login-modal-title"
      aria-describedby="login-modal-description"
    >
      <Box sx={style}>
        <Typography variant="h6" component="h2" id="login-modal-title">
          Login
        </Typography>
        <form onSubmit={handleLogin}>
          <TextField
            fullWidth
            label="Username"
            name="username"
            margin="normal"
            value={username}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="Password"
            name="password"
            margin="normal"
            type="password"
            value={password}
            onChange={handleChange}
          />
          {error && (
            <Typography color="error" variant="body2">
              {error}
            </Typography>
          )}
          <Button
            fullWidth
            variant="contained"
            color="primary"
            type="submit"
            sx={{ mt: 2 }}
          >
            Login
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default LoginModal;
