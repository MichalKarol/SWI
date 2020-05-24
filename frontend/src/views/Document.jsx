import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import {IconButton, Typography} from "@material-ui/core";
import { SearchContext, generateQueryParams } from "../search";
import {
  StyledBackButton,
  StyledElementButton,
  YellowStarIcon,
} from "../components/StyledComponents";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { useAuthenticatedIO } from "../authenticated-io";
import withStyles from "@material-ui/core/styles/withStyles";
import StarBorderIcon from "@material-ui/icons/StarBorder";

const DocumentDiv = styled.div`
  display: grid;
  grid-template-columns: 70fr 30fr;
  grid-template-rows: auto;
  grid-template-areas: "text info";
  margin-right: 128px;
`;

const TextDiv = styled.div`
  grid-area: text;
  background: E5E5E5;
  margin-top: 16px;
`;

const InfoDiv = styled.div`
  background: E5E5E5;
  grid-area: info;
  display: flex;
  flex-direction: column;
`;

export function Document(props) {
    const history = useHistory();
    const searchContext = useContext(SearchContext);
    const [result, setResult] = useState();
    const io = useAuthenticatedIO("FIXMETOKEN");

    useEffect(() => {
        if (!result) {
            setResult("loading");
            io.getDocuments([props.id]).then((result) => setResult(result.docs[0]));
        }
    }, [result]);

    const CenteredTypography = withStyles({
        root: {
            margin: "16px 0 16px 16px",
            textAlign: "center",
        },
    })(Typography);

    if (!result || result === "loading") return null;

    return (
        <DocumentDiv>
            <TextDiv>
                <Typography variant="h3">
                    {result.title}
                    <IconButton
                        onClick={
                            () => {
                                io.changeFavourite(result.id).then(() => {
                                        const currentResult = result
                                        currentResult.isFavourite = !currentResult.isFavourite
                                        setResult(currentResult)
                                    }
                                )
                            }
                        }
                    >
                        {result.isFavourite ? (
                            <YellowStarIcon fontSize="large"/>
                        ) : (
                            <StarBorderIcon fontSize="large"/>
                        )}
                    </IconButton>
                    {result.isFavourite && <YellowStarIcon/>}
                </Typography>

                <Typography>{result.contents}</Typography>
            </TextDiv>
            <InfoDiv>
                <StyledBackButton
                    variant="contained"
                    color="secondary"
                    startIcon={<ArrowBackIcon/>}
                    onClick={() => {
                        history.push(`/search?${generateQueryParams(searchContext.state)}`);
                    }}
                >
                    Back to search results
                </StyledBackButton>

                {result.components?.length > 0 &&
                <CenteredTypography variant="h5">Components</CenteredTypography>
                }
                {result.components?.map((el) => (
                    <StyledElementButton
                        variant="contained"
                        color="primary"
                        onClick={() => {
                            searchContext.setState(() => ({
                                query: "",
                                field: "*",
                                sort: " ",
                                topics: [],
                                components: [el],
                                dateTo: "*",
                                dateFrom: "*"
                            }))
                            history.push(`/search?${generateQueryParams(searchContext.state)}`);
                        }}
                    >
                        {el}
                    </StyledElementButton>
                ))}


                {result.topics?.length > 0 &&
                <CenteredTypography variant="h5">Topics</CenteredTypography>
                }
                {result.topics?.map((el) => (
                    <StyledElementButton
                        variant="contained"
                        color="primary"
                        onClick={() => {
                            searchContext.setState(() => ({
                                query: "",
                                field: "*",
                                sort: " ",
                                topics: [el],
                                components: [],
                                dateTo: "*",
                                dateFrom: "*"
                            }))
                            history.push(`/search?${generateQueryParams(searchContext.state)}`);
                        }}
                    >
                        {el}
                    </StyledElementButton>
                ))}

            </InfoDiv>
        </DocumentDiv>
    );
}
