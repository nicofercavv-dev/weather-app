import React from "react";
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
  value: string;
  onChange: (value: string) => void;
  isPending: boolean;
}

export const SearchBar = React.memo(
  ({ value, onChange, isPending }: SearchBarProps) => (
    <SearchContainerStyled>
      <LabelStyled htmlFor="search-cidade">Cidade</LabelStyled>
      <SearchInputWrapperStyled>
        <InputStyled
          id="search-cidade"
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Pesquisar cidade"
          disabled={isPending}
        />
        <SearchButtonStyled aria-hidden="true">
          <ImageStyled src={imgSearch} />
        </SearchButtonStyled>
      </SearchInputWrapperStyled>
    </SearchContainerStyled>
  ),
);
