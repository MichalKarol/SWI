import React, { useState, useEffect } from "react";

import { ResultCard } from "../components/ResultCard";
import { useHistory } from "react-router-dom";
import {
    CardsDiv, CenteredTypography,
    FavouritesDiv,
    InfoDiv,
} from "../components/StyledComponents";
import { useAuthenticatedIO } from "../authenticated-io";
import { InfiniteScroll } from "../components/InfiniteScroll";

const PAGE_SIZE = 10;

export function FavouriteList() {
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(false);
    const [stars, setStars] = useState();
    const [page, setPage] = useState(0);
    const [results, setResults] = useState();
    const io = useAuthenticatedIO();

    useEffect(() => {
        if (!stars) {
            setIsLoading(true);
            io.getFavourites().then((results) => {
                const newStars = results.map((star) => `"${star.doc_id}"`);
                setStars(newStars);
                io.getDocuments(
                    newStars.slice(
                        page * PAGE_SIZE,
                        Math.max(newStars.length, (page + 1) * PAGE_SIZE)
                    )
                ).then((results) => {
                    setResults(results);
                    setPage((s) => s + 1);
                    setIsLoading(false);
                });
            });
        }
    }, [stars]);

    return (
        <FavouritesDiv>
            <InfoDiv>
                <CenteredTypography variant="h5">
                    {results && !isLoading && <> {results.numFound} results found</>}
                </CenteredTypography>
            </InfoDiv>
            <CardsDiv>
                <InfiniteScroll
                    isLoading={isLoading}
                    callback={() => {
                        setIsLoading(true);
                        io.getDocuments(
                            stars.slice(
                                page * PAGE_SIZE,
                                Math.max(stars.length, (page + 1) * PAGE_SIZE)
                            )
                        ).then((results) => {
                            setIsLoading(false);
                            setResults((s) => ({
                                ...s,
                                docs: [...s.docs, ...results.docs],
                            }));
                            setPage((s) => s + 1);
                        });
                    }}
                >
                    <>
                        {results &&
                        results.docs.map((el, idx) => (
                                <ResultCard
                                    {...el}
                                    key={el.id}
                                    onFavouriteClick={() => {
                                        setResults((s) => {
                                            const newState = {...s, docs: [...s.docs]};
                                            newState.numFound = newState.numFound - 1
                                            newState.docs[idx].isFavourite = !newState.docs[idx].isFavourite;
                                            newState.docs = newState.docs.filter((el) => el.isFavourite)
                                            io.changeFavourite(el.id);
                                            return newState;
                                        });
                                    }}
                                    onShowMoreClick={() => {
                                        history.push(`/document/"${el.id}"`);
                                    }}
                                />
                            ))}
                    </>
                </InfiniteScroll>
            </CardsDiv>
        </FavouritesDiv>
    );
}
