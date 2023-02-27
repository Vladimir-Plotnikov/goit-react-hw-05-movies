import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const Appbar = styled.header`
  background-color: rgba(255, 255, 255, 0.074);
`;

const Container = styled.div`
display: flex;
  padding-left: 20px;
  padding-right: 20px;
  margin-left: auto;
  margin-right: auto;
  width: 1280px;
`;

const Navigation = styled.nav`
  display: flex;
  margin-left: 40px;
  justify-content: center;
  gap: 24px;
`;

// const Span = styled.span`
// margin-left: 40px;
// `

const NavItem = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 4px;
  padding-top: 16px;
  padding-bottom: 16px;
  text-transform: capitalize;
  border-bottom: 4px solid transparent;
  transition: color 250ms cubic-bezier(0.4, 0, 0.2, 1);
  &.active {
    border-color: #ec9706;
    border-radius: 2px;
  }
  &:hover:not(.active),
  &:focus-visible:not(.active) {
    color: #ec9706;
  }
`;

export { Appbar, Container, Navigation, NavItem};