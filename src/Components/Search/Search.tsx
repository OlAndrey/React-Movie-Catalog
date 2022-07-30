import React from "react";
import SearchIcon from '@mui/icons-material/Search';
import { SearchBlock, SearchIconWrapper, StyledInputBase } from "./SearchStyle";

const Search = () => {
    return (
        <SearchBlock>
            <SearchIconWrapper>
                <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
            placeholder="Search…"
            inputProps={{ 'aria-label': 'search' }}
            />
        </SearchBlock>
    )
}

export default Search;