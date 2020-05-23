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
import Button from "@material-ui/core/Button";

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
            <HelpOutlineIcon/>
        </Tooltip>
    );

    // searchContext.setState((state) => ({ ...state, sort: value }));

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
                            {value: "Tax Division", label: "Tax Division"},
                            {value: "civil rights", label: "Civil Rights"},
                        ]}
                        elementSelected={(checked, el) => {
                            if (checked) {
                                searchContext.setState((state) => ({
                                    ...state,
                                    components: [...searchContext.state.components, el.value]
                                }));
                            } else {
                                searchContext.setState((state) => ({
                                    ...state,
                                    components: searchContext.state.components.filter(e => e !== el.value),
                                }));
                            }
                        }}
                    />
                    <ExpandingMultiSelectDropdown
                        title="Topic"
                        values={[
                            {value: "tax", label: "tax"},
                            {value: "civil rights", label: "Civil Rights"},
                        ]}
                        elementSelected={(checked, el) => {
                            if (checked) {
                                searchContext.setState((state) => ({
                                    ...state,
                                    topics: [...searchContext.state.topics, el.value]
                                }));
                            } else {
                                searchContext.setState((state) => ({
                                    ...state,
                                    topics: searchContext.state.topics.filter(e => e !== el.value),
                                }));
                            }
                        }}
                    />
                    <CalendarDiv>
                        <UpperDateField
                            placeholder="Date from"
                            onDateChange={(date) => {
                                searchContext.setState((state) => ({
                                    ...state,
                                    dateFrom: date,
                                }));
                            }}
                        />
                        <StyledDivider/>
                        <LowerDateField
                            placeholder="Date to"
                            onDateChange={(date) => {
                                searchContext.setState((state) => ({
                                    ...state,
                                    dateTo: date,
                                }));
                            }}
                        />
                    </CalendarDiv>
                </FiltersDiv>
                <Divider orientation="vertical"/>
            </DividerDiv>
            <ResultsDiv>
                <InfoDiv>
                    <Typography color={"textPrimary"} align={"center"}>
                        {results && !isLoading && <> {results.numFound} results found</>}
                    </Typography>
                    <StyledSortDropdown
                        values={[
                            {value: " ", label: "Sort by relevance"},
                            {value: "title asc", label: "Sort by title"},
                            {value: "date asc", label: "Sort by newest"},
                            {value: "date desc", label: "Sort by oldest"},
                        ]}
                        value={searchContext.state.sort || " "}
                        onChange={(event) => {
                            const value = event.target.value;
                            searchContext.setState((state) => ({...state, sort: value}));
                        }}
                    />
                </InfoDiv>
                <CardsDiv>
                    <InfiniteScroll isLoading={isLoading} callback={onScroll}>
                        <>
                            {/*{results &&*/}
                            {/*  results.docs.map((el, idx) => (*/}
                            {/*    <ResultCard*/}
                            {/*      {...el}*/}
                            {/*      key={el.id}*/}
                            {/*      onFavouriteClick={() => {*/}
                            {/*        setResults((s) => {*/}
                            {/*          const newState = { ...s, docs: [...s.docs] };*/}
                            {/*          newState.docs[idx].isFavourite = !newState.docs[idx]*/}
                            {/*            .isFavourite;*/}
                            {/*          io.changeFavourite(el.id);*/}
                            {/*          return newState;*/}
                            {/*        });*/}
                            {/*      }}*/}
                            {/*      onShowMoreClick={() => {*/}
                            {/*        history.push(`/document/${el.id}`);*/}
                            {/*      }}*/}
                            {/*    />*/}
                            {/*  ))}*/}
                        </>
                    </InfiniteScroll>
                </CardsDiv>
            </ResultsDiv>
        </SearchDiv>
    );
}
