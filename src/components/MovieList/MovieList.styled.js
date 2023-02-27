import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const Image = styled.img`
  height: 365px;
  object-fit: cover;
`;

const Item = styled(NavLink)`
  transition: transform 250ms cubic-bezier(0.4, 0, 0.2, 1),
    color 250ms cubic-bezier(0.4, 0, 0.2, 1);
  &:hover:not(.active),
  &:focus-visible:not(.active) {
    transform: scale(1.1);
    color: #ec9706;
  }
`;

export{Image, Item}