import styled from "styled-components";

export const HeaderWrapper = styled.div`
  /* width: 95%; */
  height: 50px;
  background-color: rgb(22, 20, 19);
  color: rgb(253, 233, 217);
  border-radius: 5px;
  padding: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .heading {
    font-family: "Yeseva One", cursive;
    font-weight: 300;
  }

  @media screen and (max-width: 1100px) {
    border-radius: 0;
  }
`;

export const SearchInput = styled.input`
  height: 30px;
  margin-right: 20px;
`;
