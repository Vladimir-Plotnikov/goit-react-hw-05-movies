import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { getMovieByQuery } from "services/movieApi";
import { Notification } from "components/Notification/Notification";
import { Hearts } from "react-loader-spinner";
import { MovieList } from "components/MovieList/MovieList";
import {
  Section,
  Container,
  Form,
  Field,
  Label,
  Input,
  Button,
} from './Movies.styled';

const Status = {
    IDLE: 'idle',
    PENDING: 'pending',
    REJECTED: 'rejected',
    RESOLVED: 'resolved'
};

const Movies = () => {
    const [query, setQuery] = useState('');
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [status, setStatus] = useState(Status.IDLE);
    const [searchParams, setSearchParams] = useSearchParams();
    const queryParams = searchParams.get('query')

    useEffect(() => {
        if (!queryParams) {
            return
        }
        setStatus(Status.PENDING)
        getMovieByQuery(queryParams)
            .then(({ results }) => {
                if (!results.length) {
                    setError(`No such a movie by this ${queryParams}`)
                    setStatus(Status.REJECTED)
                }
                setMovies(results);
                setStatus(Status.RESOLVED);
            }).catch(error => {
                setError(error)
                setStatus(Status.REJECTED)
            })
    }, [queryParams]);

    const handleChange = e => {
        const { value } = e.currentTarget;
        setQuery(value)
    }

    const submitHandler = e => {
        e.preventDefault();

        const searchQuery = query.trim().toLowerCase()

        if (!searchQuery) {
            alert('WOWOWOW SEARCH BOX CAN NOT BE EMPTY')
            return
        }
    
        setSearchParams({ query: searchQuery })
    
        setQuery('')
    }

    return (
        <main>
            <Section>
                <Container>
                    <Form onSubmit={submitHandler}>
                        <Field>
                            <Input
                                type="text"
                                name="query"
                                value={query}
                                autoComplete="off"
                                placeholder=" "
                                onChange={handleChange}
                            />
                            <Label>Search movies</Label>
                        </Field>
                        <Button type="submit">SEARCH</Button>
                    </Form>
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
                    {status === Status.RESOLVED && <MovieList items={movies} />}
                </Container>
            </Section>
        </main>
    )
};

export default Movies;

