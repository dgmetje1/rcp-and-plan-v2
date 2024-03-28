import { styled, TextField } from "@mui/material";

const StyledHomePageBannerSearcherTextField = styled(TextField)`
input{
    color: white
  }
  input::placeholder{
    color:white;
    opacity:0.9;
  }
  input:-webkit-autofill{
    backgroundColor: transparent !important,
    -webkit-text-fill-color: #fff !important,
    transition: background-color 5000s,
  }
  .MuiInputBase-root::before{
    border-bottom-color: white
  }
  .MuiInputBase-root:hover:not(.Mui-disabled,.Mui-error)::before {
    border-bottom-color: white
  },
  .MuiInputBase-root::after {
    border-bottom-color: white
  },
`;

export default StyledHomePageBannerSearcherTextField;
