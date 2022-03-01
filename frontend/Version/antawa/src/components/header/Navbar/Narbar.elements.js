import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 70px;
  background-color: #23394d; 
`;

export const Wrapper = styled.div`
  width: 100%;
  max-width: 1300px;
  height: 77%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: auto;
`;

export const LogoContainer = styled.div`
  margin-left: 0.5rem;
  display: flex;
  margin-top: 6px;
  align-items: center;
  font-size: 1.2rem;
  font-family: sans-serif;

  p {
    &:nth-child(2) {
      color: #fff;
    }

    &:nth-child(3) {
      font-size: 1.5rem;
      font-weight: 500;
      color: #e07924;
    }
  }

  svg {
    fill: #e07924;
    margin-right: 0.5rem;
  }
`;

export const Menu = styled.ul`
  height: 100%;
  display: flex;
  justify-content: space-between;
  list-style: none;


  @media screen and (max-width: 1050px) {
    background-color: #23394d;
    position: absolute;
    top: 70px;
    left: ${({ open }) => (open ? "0" : "-100%")}; //Import
    width: 100%;
    height: 90vh;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    transition: 0.5s all ease;
    z-index:2;
  }
`;

export const MenuItem = styled.li`
  height: 100%;

  @media screen and (max-width: 1050px) {
    width: 100%;
    height: 70px;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 0.5s all ease;
  }
  &:hover {
    //background-color: #E9C46A ;
    
    color: #23394d;
    cursor: pointer;

    svg {
      fill: #23394d;
      margin-right: 0.5rem;
    }
  }

 
`;

export const MenuItemLink = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: 0.5rem 2.5rem;
  color: #fff;
  text-decoration: none;
  font-family: sans-serif;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: 0.2s all ease;
  z-index:2;

  &:hover {
    color: rgb(95, 95, 95);
    font-weight: 600;
    background-color: #E9C46A ;
   

    div {
      svg {
        fill: #23394d;
      }
    }
  }

  div {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    svg {
      display: none;
      fill: #E9C46A;
      margin-right: 0.5rem;
    }
  }

  @media screen and (max-width: 1050px) {
    width: 100%;

    div {
      width: 100%;
      justify-content: left;

      svg {
        display: flex;
      }
    }
  }

  @media screen and (max-width: 880px) {
    div {
      width: 100%;
      justify-content: left;

      svg {
        display: flex;
      }
    }
  }

  @media screen and (max-width: 500px) {
    div {
      width: 100%;
      justify-content: left;

      svg {
        display: flex;
      }
    }
  }

  @media screen and (max-width: 260px) {
    div {
      width: 100%;
      justify-content: left;

      svg {
        display: flex;
      }
    }
  }
`;

export const MobileIcon = styled.div`
  display: none;

  @media screen and (max-width: 1050px) {
    display: flex;
    align-items: center;
    cursor: pointer;

    svg {
      fill: #E9C46A ;
      margin-right: 0.5rem;
    }
  }
`;