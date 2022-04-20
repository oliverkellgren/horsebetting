import React from "react";
import Header from "../components/Header";
import UpdateProfileForm from "../components/UpdateProfileForm";
import { useSpring, animated, config } from "react-spring";

const FadeWrapper = animated.div;

const MyProfilePage = () => {
  const fade = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    delay: 400,
    config: config.molasses,
  });
  return (
    <div>
      <Header title={"MY PROFILE"} />
      <FadeWrapper style={fade}>
        <UpdateProfileForm />
      </FadeWrapper>
    </div>
  );
};

export default MyProfilePage;
