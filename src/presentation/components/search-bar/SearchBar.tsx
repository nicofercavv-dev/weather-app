import React, { useRef } from "react";
import {
  ImageStyled,
  InputStyled,
  LabelStyled,
  SearchButtonStyled,
  SearchContainerStyled,
  SearchInputWrapperStyled,
} from "./SearchBar.styles";
import imgSearch from "../../../assets/search-icon.png";

export interface SearchBarProps {
  onClick: (value: string) => void;
  isPending: boolean;
}

export const SearchBar = React.memo(
  ({ onClick, isPending }: SearchBarProps) => {
    const inputRef = useRef<HTMLInputElement>(null);

    return (
      <SearchContainerStyled>
        <LabelStyled htmlFor="search-cidade">Cidade</LabelStyled>
        <SearchInputWrapperStyled>
          <InputStyled
            id="search-cidade"
            type="text"
            placeholder="Pesquisar cidade"
            disabled={isPending}
            ref={inputRef}
          />
          <SearchButtonStyled
            aria-hidden="true"
            onClick={() => onClick(inputRef.current?.value || "")}
          >
            <ImageStyled src={imgSearch} />
          </SearchButtonStyled>
        </SearchInputWrapperStyled>
      </SearchContainerStyled>
    );
  },
);
