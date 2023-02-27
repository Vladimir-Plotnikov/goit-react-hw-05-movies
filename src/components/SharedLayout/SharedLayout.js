import { Outlet } from "react-router-dom";
import { Suspense } from "react";
import { Appbar, Container, Navigation, NavItem } from './SharedLayout.styled';

export const SharedLayout = () => {
    return (
        <>
            <Appbar>
                <Container>
                    <Navigation>
                        <NavItem to="/">
                            <span>Home</span>
                        </NavItem>
                    </Navigation>
                    <Navigation>
                        <NavItem to="movies">
                            <span>Movies</span>
                        </NavItem>
                    </Navigation>
                </Container>
            </Appbar>
            <Suspense fallback={null}>
                <Outlet />
            </Suspense>
        </>
    );
};