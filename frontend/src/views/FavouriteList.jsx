import React, { useState, useEffect } from "react";

import { ResultCard } from "../components/ResultCard";
import { useHistory } from "react-router-dom";
import {
  CardsDiv,
  FavouritesDiv,
  InfoDiv,
  StyledTypography,
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
        <StyledTypography color={"textPrimary"} align={"center"}>
          {results && !isLoading && <> {results.numFound} results found</>}
        </StyledTypography>
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
              results.docs
                .filter((el) => el.isFavourite)
                .map((el, idx) => (
                  <ResultCard
                    {...el}
                    key={el.id}
                    onFavouriteClick={() => {
                      setResults((s) => {
                        const newState = { ...s, docs: [...s.docs] };
                        newState.docs[idx].isFavourite = !newState.docs[idx]
                          .isFavourite;
                        io.changeFavourite(el.id);
                        return newState;
                      });
                    }}
                    onShowMoreClick={() => {
                      history.push(`/document/${el.id}`);
                    }}
                  />
                ))}
          </>
        </InfiniteScroll>
      </CardsDiv>
    </FavouritesDiv>
  );
}
