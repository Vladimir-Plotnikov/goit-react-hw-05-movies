import { useState, useEffect } from "react";
import { getTrendingMovies } from "services/movieApi";
import { Hearts } from "react-loader-spinner";
import { Notification } from "components/Notification/Notification";
import { MovieList } from "components/MovieList/MovieList";
import { Container, Heading, Section } from "./Home.styled";

const Status = {
    PENDING: 'pending',
    RESOLVED: 'resolved',
    REJECTED: 'rejected',
}

const Home = () => {
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [status, setStatus] = useState(Status.PENDING);

    useEffect(() => {
        getTrendingMovies()
            .then(({ results }) => {
                if (!results.length) {
                    setStatus(Status.REJECTED);
                    setError(
                        "Oops, something went wrong... We can't load trending movies :("
                    );
                    return;
                }
                setMovies(results);
                setStatus(Status.RESOLVED);
            })
            .catch(error => {
                setError(error);
                setStatus(Status.REJECTED);
            });
    }, []);

    return (
        <main>
            <Section>
                <Container>
                    <Heading>Trending today</Heading>
                    {status === Status.PENDING && <div>
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
                    {status === Status.REJECTED &&<Notification message={error}/> }
                    {status === Status.RESOLVED && <MovieList items={movies} />}
                </Container>
            </Section>
        </main>
    )
}

export default Home;