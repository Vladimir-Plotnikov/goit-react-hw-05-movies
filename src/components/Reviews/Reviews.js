import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieByReviews } from "services/movieApi";
import { Notification } from "components/Notification/Notification";
import { Hearts } from "react-loader-spinner";
import { Blockquote } from './Reviews.styled';

const Status = {
    IDLE: 'idle',
    PENDING: 'pending',
    REJECTED: 'rejected',
    RESOLVED: 'resolved',
}

const Reviews = () => {

    const { movieId } = useParams();
    const [reviews, setReviews] = useState(null);
    const [error, setError] = useState(null);
    const [status, setStatus] = useState(Status.IDLE)

    useEffect(() => {
        setStatus(Status.PENDING);
        getMovieByReviews(movieId)
            .then(({ results }) => {
                if (!results.length) {
                    setError(
                        'We dont have any reveiws on this movie'
                    )
                    setStatus(Status.REJECTED);
                    return
                }
                setReviews(results)
                setStatus(Status.RESOLVED)
            })
            .catch(error => {
                setError(error);
                setStatus(Status.error)
            })
    }, [movieId])

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
                <ul>
                    {reviews.map(({ id, author, content, url }) => (
                        <li key={id}>
                            <Blockquote cite={url}>
                                <cite>Author:{author}</cite>
                                <p>{content}</p>
                            </Blockquote>
                        </li>
                    ))}
                </ul>
            )}
        </>
    );
}
export default Reviews;