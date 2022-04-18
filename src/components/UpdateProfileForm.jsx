import React, { useRef, useState } from "react";
import styled from "@emotion/styled";
import { useAuthContext } from "../contexts/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import ColorPicker from "./ColorPicker";

const InputWrapper = styled.div({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
});
const Input = styled.input({
  backgroundColor: "#dedede",
  width: "85vw",
  height: "35px",
  marginTop: "0.2rem",
  marginBottom: "1rem",
  borderRadius: "5px",
  paddingLeft: "5px",
  border: "none",
  textAlign: "center",
  "&:focus": {
    outline: "none",
  },
  "@media screen and (min-width: 600px)": {
    width: "40vw",
  },
  "@media screen and (min-width: 1024px)": {
    width: "25vw",
  },
});
const Button = styled.button({
  background: "linear-gradient(to right, #00b4db, #0083b0)",
  width: "100px",
  height: "35px",
  borderRadius: "5px",
  color: "white",
  textAlign: "center",
  border: "none",
  marginBottom: "1rem",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "#187580",
  },
});
const Photo = styled.div({
  width: "200px",
  height: "200px",
  backgroundColor: "#4f4f4f",
  borderRadius: "50%",
  margin: "auto",
  marginBottom: "1rem",
  padding: "1rem",
});
const PhotoLabel = styled.label({
  cursor: "pointer",
});
const FileInput = styled.input({
  display: "none",
});
const Icon = styled(FontAwesomeIcon)({
  fontSize: "2rem",
  color: "white",
  "@media screen and (min-width: 600px)": {
    fontSize: "2rem",
  },
});

const IconWrapper = styled.div({
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "flex-end",
  width: "100%",
  height: "100%",
  marginRight: "1rem",
});

const UpdateProfileForm = () => {
  const displayNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const [color, setColor] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const { currentUser, setDisplayName, setEmail, setPassword } =
    useAuthContext();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("The passwords does not match");
    }

    try {
      setLoading(true);

      if (displayNameRef.current.value !== currentUser.displayName) {
        await setDisplayName(displayNameRef.current.value);
      }

      if (emailRef.current.value !== currentUser.email) {
        await setEmail(emailRef.current.value);
      }

      if (passwordRef.current.value) {
        await setPassword(passwordRef.current.value);
      }
      setMessage("Profile successfully updated");
      setLoading(false);
    } catch (e) {
      setError("Error updating profile. Please try logging out and in again.");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <PhotoLabel>
        <Photo>
          <IconWrapper>
            <Icon icon={faPlus} />
          </IconWrapper>
        </Photo>
        <FileInput type="file" />
      </PhotoLabel>
      {error && <h1>{error}</h1>}
      {message && <h1 variant="success">{message}</h1>}
      <InputWrapper>
        <label>DISPLAYNAME</label>
        <Input
          type="text"
          ref={displayNameRef}
          defaultValue={currentUser && currentUser.displayName}
        />
        <label>EMAIL</label>
        <Input
          type="email"
          ref={emailRef}
          defaultValue={currentUser && currentUser.email}
          required={true}
        />
        <label>THEME COLOR 1</label>
        <ColorPicker getValue={(value) => setColor(value)} />
        <label>THEME COLOR 2</label>
        <ColorPicker getValue={(value) => setColor(value)} />
        <label>NEW PASSWORD</label>
        <Input type="password" ref={passwordRef} autoComplete="new-password" />
        <label>CONFIRM NEW PASSWORD</label>
        <Input
          type="password"
          ref={passwordConfirmRef}
          autoComplete="new-password"
        />
      </InputWrapper>
      <Button disabled={loading} type="submit">
        CONFIRM
      </Button>
    </form>
  );
};

export default UpdateProfileForm;
