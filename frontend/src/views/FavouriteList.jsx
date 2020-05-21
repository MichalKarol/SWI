import React, {
  useState,
  useRef,
  useEffect,
  useContext,
  useCallback,
} from "react";
import styled from "styled-components";

import {
  StyledFieldDropdown,
  StyledSortDropdown,
} from "../components/Dropdown";
import { LowerDateField, UpperDateField } from "../components/DateField";
import { ResultCard } from "../components/ResultCard";
import { useHistory } from "react-router-dom";
import { ExpandingMultiSelectDropdown } from "../components/ExpansionPanel";
import { StyledDivider } from "../components/StyledComponents";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import Divider from "@material-ui/core/Divider";
import { SearchContext } from "../search";
import { useAuthenticatedIO } from "../authenticated-io";
import { InfiniteScroll } from "../components/InfiniteScroll";

// const StyledDivider = withStyles({
//   root: {
//     color: "#fff",
//   },
// })(Divider);

// const StyledInputBase = withStyles({
//   root: {
//     fontStyle: "normal",
//     fontSize: "24px",
//     backgroundColor: "#ffffff",
//     textIndent: "1em",
//     boxShadow:
//       "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
//   },
// })(InputBase);

// const ContainerDiv = styled.div`
//   display: flex;
//   justify-content: start;
// `;

// const DateContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   width: 200px;
// `;

// const SearchContainer = styled.div`
//   display: flex;
//   flex-direction: row;
//   justify-content: center;
//   height: auto;
//   width: 100%;
//   align-items: stretch;
//   height: 5vh;
// `;

// const LimitText = styled.span`
//   color: black;
// `;

const FavouritesDiv = styled.div`
  display: grid;
  grid-template-rows: 10fr 90fr;
  grid-template-areas:
    "info"
    "cards";
`;

const InfoDiv = styled.div`
  background: E5E5E5;
  grid-area: info;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

const CardsDiv = styled.div`
  background: E5E5E5;
  grid-area: cards;
`;

const PAGE_SIZE = 10;

export function FavouriteList() {
  const history = useHistory();
  const searchContext = useContext(SearchContext);
  const [isLoading, setIsLoading] = useState(false);
  const [stars, setStars] = useState();
  const [page, setPage] = useState(0);
  const [results, setResults] = useState();
  const io = useAuthenticatedIO("FIXMETOKEN");

  useEffect(() => {
    if (!stars) {
      setIsLoading(true);
      io.getFavourites().then((results) => {
        const newStars = results.map((star) => star.doc_id);
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
        <Typography color={"textPrimary"} align={"center"}>
          {results && !isLoading && <>Found {results.length} results</>}
        </Typography>
        <StyledSortDropdown
          values={[
            { value: "relevance", label: "Sort by relevance" },
            { value: "title", label: "Sort by title" },
            { value: "asc", label: "Sort by newest" },
            { value: "desc", label: "Sort by oldest" },
          ]}
          value={searchContext.state.sort || ""}
          onChange={(event) => {
            const value = event.target.value;
            searchContext.setState((state) => ({ ...state, sort: value }));
          }}
        />
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
