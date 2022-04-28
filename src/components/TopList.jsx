import React from "react";
import styled from "@emotion/styled";
import MostWins from "./MostWins";
import MostCoins from "./MostCoins";

const Container = styled.div({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
});

const TopList = () => {
  return (
    <Container>
      <MostWins />
      <MostCoins />
    </Container>
  );
};

export default TopList;
