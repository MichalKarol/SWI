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
import {ExpandingMultiSelectDropdown, ExpandingSingleSelectDropdown} from "../components/ExpansionPanel";
import {
  CalendarDiv, CardsDiv,
  DividerDiv,
  FiltersDiv, InfoDiv,
  ResultsDiv,
  SearchDiv,
  StyledDivider, StyledTypography
} from "../components/StyledComponents";
import { InfiniteScroll } from "../components/InfiniteScroll";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import Divider from "@material-ui/core/Divider";
import { SearchContext } from "../search";
import { useAuthenticatedIO } from "../authenticated-io";

export function Search() {
  const history = useHistory();
  const searchContext = useContext(SearchContext);
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState();
  const io = useAuthenticatedIO("FIXMETOKEN");

  useEffect(() => {
    if (!results) {
      setIsLoading(true);
      io.search(searchContext.state).then((results) => {
        setIsLoading(false);
        setResults(results);
      });
    }
  }, [results]);

  function onScroll() {
    if (results && results.docs.length < results.numFound && !isLoading) {
      setIsLoading(true);
      io.search(searchContext.state, results.docs.length).then((results) => {
        setIsLoading(false);
        setResults((s) => ({
          ...s,
          docs: [...s.docs, ...results.docs],
        }));
      });
    }
  }

  const pivotTooltip = (
    <Tooltip title="Mark fields to group searches" aria-label="add">
      <HelpOutlineIcon />
    </Tooltip>
  );

  return (
    <SearchDiv>
      <DividerDiv>
        <FiltersDiv>
          <StyledTypography>
            Limit your search:
          </StyledTypography>

          <ExpandingMultiSelectDropdown
            title="Component"
            values={[
              { value: "topic", label: "topic" },
              { value: "topic2", label: "topic2" },
            ]}
          />
          <ExpandingMultiSelectDropdown
            title="Topic"
            values={[
              { value: "environment", label: "Environment" },
              { value: "civil rights", label: "Civil Rights" },
            ]}
          />
          {/*<ExpandingSingleSelectDropdown*/}
          {/*  title="Pivot field"*/}
          {/*  tooltip={pivotTooltip}*/}
          {/*  components={[*/}
          {/*    { value: "component1", label: "component1" },*/}
          {/*    { value: "component2", label: "component2" },*/}
          {/*  ]}*/}
          {/*  topics={[*/}
          {/*    { value: "topic", label: "topic" },*/}
          {/*    { value: "topic2", label: "topic2" },*/}
          {/*  ]}*/}
          {/*/>*/}
          <CalendarDiv>
            <UpperDateField placeholder="Date from" />
            <StyledDivider />
            <LowerDateField placeholder="Date to" />
          </CalendarDiv>
        </FiltersDiv>
        <Divider orientation="vertical" />
      </DividerDiv>
      <ResultsDiv>
        <InfoDiv>
          <Typography color={"textPrimary"} align={"center"}>
            {results && !isLoading && <>Found {results.numFound} results</>}
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
          <InfiniteScroll isLoading={isLoading} callback={onScroll}>
            <>
              {results &&
                results.docs.map((el, idx) => (
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
      </ResultsDiv>
    </SearchDiv>
  );
}
