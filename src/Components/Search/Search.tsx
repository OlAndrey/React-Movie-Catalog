import React, { useState } from "react";
import SearchIcon from '@mui/icons-material/Search';
import { SearchBlock, SearchIconWrapper, StyledInputBase } from "./SearchStyle";
import { useNavigate } from "react-router-dom";

const Search = () => {
    const [searchValue, setSearchValue] = useState('');
    let navigate = useNavigate();

    const handler = () => {
        navigate(`/search/${searchValue}`, { replace: true });
        setSearchValue('');
    }

    return (
        <SearchBlock>
            <SearchIconWrapper>
                <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
                value={searchValue}
                onChange={e => setSearchValue(e.target.value)}
                onKeyDown={ev => ev.key === 'Enter' && handler()}
            />
        </SearchBlock>
    )
}

export default Search;