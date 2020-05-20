import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";

import { StyledSortDropdown} from "../components/Dropdown";
import { LowerDateField, UpperDateField} from "../components/DateField";
import { ResultCard } from "../components/ResultCard";
import { useHistory } from "react-router-dom";
import { ExpandingMultiSelectDropdown } from "../components/ExpansionPanel";
import { StyledDivider } from "../components/StyledComponents";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';

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

export function Search() {
  const history = useHistory();
  const [results, setResults] = useState([
    {
      title: "Ala ma kota",
      description: "ALA MA KOTA I NIE MA ALI",
      isFavourite: false,
    },
    {
      title: "Ala ma kota1",
      description: "ALA MA KOTA I NIE MA ALI",
      isFavourite: false,
    },
    {
      title: "Ala ma kota2",
      description: "ALA MA KOTA I NIE MA ALI",
      isFavourite: false,
    },
    {
      title: "Ala ma kota3",
      description: "ALA MA KOTA I NIE MA ALI",
      isFavourite: false,
    },
    {
      title: "Ala ma kota4",
      description: "ALA MA KOTA I NIE MA ALI",
      isFavourite: false,
    },
  ]);

  const cardsDivRef = useRef(null);
  useEffect(() => {
    function onScroll() {
      if (cardsDivRef.current) {
        const scrollTop = cardsDivRef.current.scrollTop;
        const scrollHeight = cardsDivRef.current.scrollHeight;
        const clientHeight = cardsDivRef.current.clientHeight;
        if (scrollTop + clientHeight > (3 / 4) * scrollHeight) {
          setResults((s) => [...s, ...s]); // Poor man infinite scroll
        }
      }
    }

    cardsDivRef.current &&
      cardsDivRef.current.addEventListener("scroll", onScroll);

    return () => {
      cardsDivRef.current &&
        cardsDivRef.current.removeEventListener("scroll", onScroll);
    };
  }, [cardsDivRef.current]);

  const SearchDiv = styled.div`
    display: grid;
    grid-template-columns: 30fr 70fr;
    grid-template-rows: auto;
    grid-template-areas: "filters results";
  `;

  const FiltersDiv = styled.div`
    background: E5E5E5;
    grid-area: filters;
  `;

  const ResultsDiv = styled.div`
    grid-area: results;
    display: grid;
    grid-template-rows: 10fr 90fr;
    grid-template-areas:
      "info"
      "cards";
  `;

  const InfoDiv = styled.div`
    background: orange;
    grid-area: info;
  `;

  const CardsDiv = styled.div`
    background: green;
    grid-area: cards;
    position: relative;
    overflow: auto;
  `;

  const pivotTooltip = (
      <Tooltip title="Mark fields to group searches" aria-label="add">
          <HelpOutlineIcon />
      </Tooltip>
  )

  return (
    <SearchDiv>
      <FiltersDiv>
        <Typography
            color={"textPrimary"}
            align={"center"}
        >
          Limit your search:
        </Typography>

        <ExpandingMultiSelectDropdown
          title="Component"
          values={[
            { value: "environment", label: "Environment" },
            { value: "civil rights", label: "Civil Rights" },
          ]}
        />
        <ExpandingMultiSelectDropdown
          title="Topic"
          values={[
            { value: "environment", label: "Environment" },
            { value: "civil rights", label: "Civil Rights" },
          ]}
        />
        <ExpandingMultiSelectDropdown
          title="Pivot field"
          tooltip={pivotTooltip}
          values={[
            { value: "environment", label: "Environment" },
            { value: "civil rights", label: "Civil Rights" },
          ]}
        />
        <UpperDateField placeholder="Date from" />
        <StyledDivider />
        <LowerDateField placeholder="Date to" />
      </FiltersDiv>
      <ResultsDiv>
        <InfoDiv>
          <span>Found {results.length} results</span>
          <StyledSortDropdown
            values={[
              { value: "relevance", label: "Sort by relevance" },
              { value: "title", label: "Sort by title" },
              { value: "asc", label: "Sort by newest" },
              { value: "desc", label: "Sort by oldest" },
            ]}
          />
        </InfoDiv>
        <CardsDiv ref={cardsDivRef}>
          <div style={{ position: "absolute" }}>
            {results.map((el, idx) => (
              <ResultCard
                {...el}
                key={idx}
                onFavouriteClick={() => {
                  setResults((s) => {
                    const newState = [...s];
                    newState[idx].isFavourite = !newState[idx].isFavourite;
                    return newState;
                  });
                }}
                onShowMoreClick={() => {
                  history.push(`/document/${idx}`);
                }}
              />
            ))}
          </div>
        </CardsDiv>
      </ResultsDiv>
    </SearchDiv>
  );
}
