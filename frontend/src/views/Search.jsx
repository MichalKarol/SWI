import React, { useState, useEffect, useContext, useCallback } from "react";
import { StyledSortDropdown } from "../components/Dropdown";
import { LowerDateField, UpperDateField } from "../components/DateField";
import { ResultCard } from "../components/ResultCard";
import { useHistory, useLocation } from "react-router-dom";
import { ExpandingMultiSelectDropdown } from "../components/ExpansionPanel";
import {
  CalendarDiv,
  CardsDiv,
  CenteredTypography,
  DividerDiv,
  FiltersDiv,
  InfoDiv,
  ResultsDiv,
  SearchDiv,
  StyledDivider,
} from "../components/StyledComponents";
import { InfiniteScroll } from "../components/InfiniteScroll";
import Divider from "@material-ui/core/Divider";
import { SearchContext, generateQueryParams } from "../search";
import { useAuthenticatedIO } from "../authenticated-io";
import { TOPICS, COMPONENTS } from "../globals";

export function Search() {
  const history = useHistory();
  const location = useLocation();
  const searchContext = useContext(SearchContext);
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState();
  const io = useAuthenticatedIO();

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

  const onComponentChange = (checked, value) => {
    const new_state = {
      ...searchContext.state,
      components: checked
        ? [...searchContext.state.components, value]
        : searchContext.state.components.filter((e) => e !== value),
    };
    searchContext.setState(new_state);
    history.push(`/search?${generateQueryParams(new_state)}`);
  };

  const onTopicChange = (checked, value) => {
    const new_state = {
      ...searchContext.state,
      topics: checked
        ? [...searchContext.state.topics, value]
        : searchContext.state.topics.filter((e) => e !== value),
    };
    searchContext.setState(new_state);
    history.push(`/search?${generateQueryParams(new_state)}`);
  };

  return (
    <SearchDiv>
      <DividerDiv>
        <FiltersDiv>
          <CenteredTypography variant="h5">
            Limit your search:
          </CenteredTypography>

          <ExpandingMultiSelectDropdown
            title="Component"
            values={COMPONENTS}
            context={searchContext.state.components}
            elementSelected={onComponentChange}
          />
          <ExpandingMultiSelectDropdown
            title="Topic"
            values={TOPICS}
            context={searchContext.state.topics}
            elementSelected={onTopicChange}
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
                  dateFrom:
                    date && !isNaN(date.getTime()) ? date.toISOString() : null,
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
                  dateTo:
                    date && !isNaN(date.getTime()) ? date.toISOString() : null,
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
          <CenteredTypography variant="h5">
            {results && <> {results.numFound} results found</>}
          </CenteredTypography>
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
                      history.push(`/document/"${el.id}"`);
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
