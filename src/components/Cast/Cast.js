import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieByCast } from "services/movieApi";
import { Notification } from "components/Notification/Notification";
import defaultPicture from '../../images/default-movie.jpeg'
import { Hearts } from "react-loader-spinner";
import { List, Character } from './Cast.styled';

const Status = {
    IDLE: 'idle',
    PENDING: 'pending',
    REJECTED: 'rejected',
    RESOLVED: 'resolved',
}

const Cast = () => {
    const { movieId } = useParams();
    const [cast, setCast] = useState(null);
    const [error, setError] = useState(null);
    const [status, setStatus] = useState(Status.IDLE)
    
    useEffect(() => {
        setStatus(Status.PENDING);
        getMovieByCast(movieId)
            .then(({ cast }) => {
                if (!cast.length) {
                    setError(
                        'We are sorry, but we did not find any cast on this film'
                    )
                    setStatus(Status.REJECTED)
                    return
                }
                setCast(cast)
                setStatus(Status.RESOLVED)
            })
            .catch(error => {
                setError(error)
                setStatus(Status.REJECTED);
            })
    }, [movieId]);
    
    return (
        <>
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
            
                <List>
                    {cast.map(({ id, character, name, profile_path }) => (
                        <li key={id}>
                            <img
                                src={
                                    profile_path
                                        ? `https://image.tmdb.org/t/p/w500${profile_path}`
                                        : defaultPicture
                                }
                                alt={name}
                            />
                            <p>{name}</p>
                            <Character>Character: {character}</Character>
                        </li>
                    ))}
                </List>
            )}
        </>
    );
};

export default Cast