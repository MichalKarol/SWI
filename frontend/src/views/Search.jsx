import React, {
  useState,
  useRef,
  useEffect,
  useContext,
  useCallback,
  useMemo,
} from "react";
import styled from "styled-components";

import {
  StyledFieldDropdown,
  StyledSortDropdown,
} from "../components/Dropdown";
import { LowerDateField, UpperDateField } from "../components/DateField";
import { ResultCard } from "../components/ResultCard";
import { useHistory, useLocation } from "react-router-dom";
import { ExpandingMultiSelectDropdown } from "../components/ExpansionPanel";
import {
  CalendarDiv,
  CardsDiv,
  DividerDiv,
  FiltersDiv,
  InfoDiv,
  ResultsDiv,
  SearchDiv,
  StyledDivider,
  StyledTypography,
} from "../components/StyledComponents";
import { InfiniteScroll } from "../components/InfiniteScroll";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import Divider from "@material-ui/core/Divider";
import { SearchContext, generateQueryParams } from "../search";
import { useAuthenticatedIO } from "../authenticated-io";
import Button from "@material-ui/core/Button";
import { TOPICS, COMPONENTS } from "../globals.ts";

export function Search() {
  const history = useHistory();
  const location = useLocation();
  const searchContext = useContext(SearchContext);
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState();
  const io = useAuthenticatedIO("FIXMETOKEN");

  useEffect(() => {
    setResults(undefined);
    setIsLoading(true);
    io.search(searchContext.state).then((results) => {
      setIsLoading(false);
      setResults(results);
    });
  }, [location]);

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

  function onComponentChange(checked, el) {
    const new_state = {
      ...searchContext.state,
      components: checked
        ? [...searchContext.state.components, el.value]
        : searchContext.state.components.filter((e) => e !== el.value),
    };
    searchContext.setState(new_state);
    history.push(`/search?${generateQueryParams(new_state)}`);
  }

  return (
    <SearchDiv>
      <DividerDiv>
        <FiltersDiv>
          <StyledTypography>Limit your search:</StyledTypography>

          <ExpandingMultiSelectDropdown
            title="Component"
            values={COMPONENTS}
            elementSelected={onComponentChange}
          />
          <ExpandingMultiSelectDropdown
            title="Topic"
            values={TOPICS}
            elementSelected={(checked, el) => {
              const new_state = {
                ...searchContext.state,
                topics: checked
                  ? [...searchContext.state.topics, el.value]
                  : searchContext.state.topics.filter((e) => e !== el.value),
              };
              searchContext.setState(new_state);
              history.push(`/search?${generateQueryParams(new_state)}`);
            }}
          />
          <CalendarDiv>
            <UpperDateField
              placeholder="Date from"
              value={
                (searchContext.state.dateFrom &&
                  new Date(searchContext.state.dateFrom)) ||
                null
              }
              onDateChange={(date) => {
                const new_state = {
                  ...searchContext.state,
                  dateFrom: date ? date.toISOString() : null,
                };
                searchContext.setState(new_state);
                history.push(`/search?${generateQueryParams(new_state)}`);
              }}
            />
            <StyledDivider />
            <LowerDateField
              placeholder="Date to"
              value={
                (searchContext.state.dateTo &&
                  new Date(searchContext.state.dateTo)) ||
                null
              }
              onDateChange={(date) => {
                const new_state = {
                  ...searchContext.state,
                  dateTo: date ? date.toISOString() : null,
                };
                searchContext.setState(new_state);
                history.push(`/search?${generateQueryParams(new_state)}`);
              }}
            />
          </CalendarDiv>
        </FiltersDiv>
        <Divider orientation="vertical" />
      </DividerDiv>
      <ResultsDiv>
        <InfoDiv>
          <StyledTypography color={"textPrimary"} align={"center"}>
            {results && <> {results.numFound} results found</>}
          </StyledTypography>
          <StyledSortDropdown
            values={[
              { value: " ", label: "Sort by relevance" },
              { value: "title asc", label: "Sort by title" },
              { value: "date asc", label: "Sort from newest" },
              { value: "date desc", label: "Sort from oldest" },
            ]}
            value={searchContext.state.sort || " "}
            onChange={(event) => {
              const value = event.target.value;
              const new_state = {
                ...searchContext.state,
                sort: value,
              };
              searchContext.setState(new_state);
              history.push(`/search?${generateQueryParams(new_state)}`);
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
