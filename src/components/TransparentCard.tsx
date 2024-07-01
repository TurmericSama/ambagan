import { Box, styled } from "@mui/material";

const TransparentCard = styled(Box)(({ theme }) => ({
  background: "rgba(144, 11, 233, 0.54)",
  boxShadow: "0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
  backdropFilter: "blur( 5px )",
  "-webkit-backdrop-filter": "blur( 5px )",
  borderRadius: 10,
  border: "1px solid rgba( 255, 255, 255, 0.18 )",
  minHeight: "180px",
  padding: theme.spacing(1.5),
  ".textBackground": {
    backgroundColor: "#35165cb9",
    borderRadius: 8,
    padding: theme.spacing(0.5),
    color: "white",
    border: "1px solid #985ee1b9",
  },
  ".price": {
    color: "white",
    padding: theme.spacing(0.5),
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    backgroundColor: "#35165cb9",
    borderRadius: 8,
    border: "1px solid #985ee1b9",
    width: "max-content",
  },
  ".description": {
    color: "#e7cdcd",
    fontSize: "0.7rem",
    marginTop: theme.spacing(1.5),
    display: "-webkit-box",
    "-webkit-line-clamp": "2",
    "-webkit-box-orient": "vertical",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
}));

export default TransparentCard;

/*

*/
