import styled from "styled-components";
export const NavbarWrapper = styled.div`
  position: fixed;
  bottom: 10px;
  left: 50%;
  transform: translate(-50%, 0);
  width: clamp(30%, 500px, 100%);
  max-width: 100%;
  height: 50px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  background-color: rgb(64, 119, 114);
  border-radius: 5em;

  ul {
    width: 90%;
    margin: 0px auto;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    list-style: none;
    cursor: pointer;
  }
  li {
    text-align: center;
    display: flex;
    justify-content: center;
  }
  @media screen and (max-width: 500px) {
    border-radius: 0;
    bottom: 0px;
    ul {
      width: 100%;
    }
  }
`;

export const NavImage = styled.img`
  height: 25px;
  width: 25px;
  padding: 10px;
  border-radius: 25%;
  :hover {
    background-color: white;
    transition: 250ms ease-in-out;
  }
`;
