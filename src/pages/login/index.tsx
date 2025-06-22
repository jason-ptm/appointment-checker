import { TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { checkUser, createUser } from "../../context/actions/auth";
import { useContext } from "../../context/useContenxt";
import type { AuthDto } from "../../model/authDto";
import { USER_TYPE } from "../../utils/constants";
import { useNavigate } from "react-router-dom";
import "./index.scss";

export const Login = () => {
  const [form, setForm] = useState<AuthDto>({
    id: "",
    name: "",
    phoneNumber: "",
    region: "",
  });
  const { state, dispatch } = useContext();
  const navigate = useNavigate();
  const {
    isLoading,
    data: {
      accessToken,
      user: { type },
    },
  } = state;

  useEffect(() => {
    console.log("🚀 ~ useEffect ~ accessToken:", accessToken);
    if (accessToken) {
      navigate("/");
    }
  }, [accessToken]);

  const defaultClassName = "login-page";
  const isNewUser = type === USER_TYPE.NEW_USER;

  const handleCheckUser = async () => {
    checkUser(dispatch, form.id);
  };

  const handleCreateUser = async () => {
    createUser(dispatch, form);
  };

  return (
    <div className={defaultClassName}>
      <div className={`${defaultClassName}-container`}>
        <Typography variant="h1">
          {isNewUser ? "Crear usuario" : "Login"}
        </Typography>
        <div className={`${defaultClassName}-container-form`}>
          <TextField
            label="Cédula"
            variant="filled"
            value={form.id}
            disabled={isNewUser}
            onChange={(e) => setForm({ ...form, id: e.target.value })}
          />
          {isNewUser && (
            <>
              <TextField
                label="Nombre"
                variant="filled"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
              <TextField
                label="Número de teléfono"
                variant="filled"
                value={form.phoneNumber}
                onChange={(e) =>
                  setForm({ ...form, phoneNumber: e.target.value })
                }
                type="number"
              />
              <TextField
                label="Región"
                variant="filled"
                value={form.region}
                onChange={(e) => setForm({ ...form, region: e.target.value })}
              />
            </>
          )}
          <button
            disabled={isLoading}
            onClick={isNewUser ? handleCreateUser : handleCheckUser}
          >
            {isNewUser ? "Crear usuario" : "Entrar"}
          </button>
        </div>
      </div>
    </div>
  );
};
