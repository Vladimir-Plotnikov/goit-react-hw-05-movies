import { Suspense, useEffect, useState } from "react";
import { NavLink, Outlet, useLocation, useParams } from "react-router-dom";
import { getMovieById } from "services/movieApi";
import defaultPicture from '../../images/default-movie.jpeg'
import { Notification } from "components/Notification/Notification";
import { Hearts } from "react-loader-spinner";
import { AdditionalInfo, Container, Genre, GenreWrapper, MovieWrapper, NavItem, Section, Title } from "./MoviesDetails.styled";

const Status = {
    IDLE: 'idle',
    PENDING: 'pending',
    REJECTED: 'rejected',
    RESOLVED: 'resolved',
}

const MoviesDelails = () => {
    const {movieId} = useParams();
    const [movie, setMovie] = useState(null);
    const [error, setError] = useState(null);
    const [status, setStatus] = useState(Status.IDLE)
    const location = useLocation();

    useEffect(() => {
        setStatus(Status.PENDING)
        getMovieById(movieId).then(movieInfo => {
            if (!Object.keys(movieInfo).length) {
                setError(
                    'We are sorry, we cant find any information about this movie'
                );
                setStatus(Status.REJECTED);
                return
            }
            setMovie(movieInfo)
            setStatus(Status.RESOLVED)
        }).catch(error => {
            setError(error);
            setStatus(Status.REJECTED)
        })
    }, [movieId]);

    const backLinkHref = location.state?.from ?? '/'
    

    return (
        <main>
            <Section>
                <Container>
                    <NavItem to={backLinkHref}>
                        <span>Go back</span>
                    </NavItem>
                    {status === Status.PENDING &&
                        <div>
                            <Hearts
                                height="300"
                                width="300"
                                color="#ec9706"
                                ariaLabel="hearts-loading"
                                wrapperStyle={{}}
                                wrapperClass=""
                                visible={true}
                            />
                        </div>}
                    {status === Status.REJECTED && <Notification message={error} />}
                    {status === Status.RESOLVED && (
                        <>
                            <MovieWrapper>
                                <img
                                    src={
                                        movie.poster_path
                                            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                                            : defaultPicture
                                    }
                                    alt={movie.title}
                                />
                                <div>
                                    <Title>
                                        {movie.title}({new Date(movie.release_date).getFullYear()})
                                    </Title>
                                    <p>User Score: {Math.round(movie.vote_average * 10)}%</p>
                                    <p>
                                        <b>Overview</b>
                                    </p>
                                    <p>{movie.overview}</p>
                                    <p>
                                        <b>Genres</b>
                                    </p>
                                    <GenreWrapper>
                                        {movie.genres.map(({ name }) => (
                                            <Genre key={name}>{name}</Genre>
                                        ))}
                                    </GenreWrapper>
                                </div>
                            </MovieWrapper>
                            <AdditionalInfo>
                                <h2>
                                    Additional information
                                </h2>
                                <ul>
                                    <li>
                                        <NavItem to="cast" state={{ from: backLinkHref }}>
                                            <span>Cast</span>
                                        </NavItem>
                                    </li>
                                    <li>
                                        <NavItem to="reviews" state={{ from: backLinkHref }}>
                                            <span>Reviews</span>
                                        </NavItem>
                                    </li>
                                </ul>
                            </AdditionalInfo>
                            <Suspense fallback={null}>
                                <Outlet />
                            </Suspense>
                        </>
                    )}
                </Container>
            </Section>
        </main>
    )
};

export default MoviesDelails

