import { useMemo, useState, useTransition } from "react";
import { DadosMeteorologicosRepositoryImpl } from "../../../infra/repositories/dados-meteorologicos-repository-impl";
import { SearchBar } from "../../components/search-bar/SearchBar";
import { H1Styled, SearchBarSectionStyled } from "./HomePage.styles";
import { ListarDadosMeteorologicos7Dias } from "../../../data/usecase/listar-dados-meteorologicos-7-dias";
import type { DadosMeteorologicos } from "../../../domain/models/dados-meteorologicos";
import PrevisaoDiaAtual from "../../components/previsao-dia-atual/PrevisaoDiaAtual";

function HomePage() {
  const listarUseCase = useMemo(() => {
    const repository = new DadosMeteorologicosRepositoryImpl();
    return new ListarDadosMeteorologicos7Dias(repository);
  }, []);

  const [previsoes, setPrevisoes] = useState<DadosMeteorologicos[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [isPending, startTransition] = useTransition();

  return (
    <>
      <SearchBarSectionStyled>
        <H1Styled>Lista de Cidades</H1Styled>
        <SearchBar onClick={() => null} isPending={isPending} />
      </SearchBarSectionStyled>
      <PrevisaoDiaAtual />
    </>
  );
}

export default HomePage;
