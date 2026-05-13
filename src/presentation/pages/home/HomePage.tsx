import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  useTransition,
} from "react";
import { DadosMeteorologicosRepositoryImpl } from "../../../infra/repositories/dados-meteorologicos-repository-impl";
import { SearchBar } from "../../components/search-bar/SearchBar";
import { H1Styled, SearchBarSectionStyled } from "./HomePage.styles";
import { ListarDadosMeteorologicos7Dias } from "../../../data/usecase/listar-dados-meteorologicos-7-dias";
import type { DadosMeteorologicos } from "../../../domain/models/dados-meteorologicos";
import PrevisaoDiaAtual from "../../components/previsao-dia-atual/PrevisaoDiaAtual";
import { PrevisaoProximosDias } from "../../components/previsao-proximos-dias/PrevisaoProximosDias";

function HomePage() {
  const listarUseCase = useMemo(() => {
    const repository = new DadosMeteorologicosRepositoryImpl();
    return new ListarDadosMeteorologicos7Dias(repository);
  }, []);

  const [previsoes, setPrevisoes] = useState<DadosMeteorologicos[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isPending, startTransition] = useTransition();

  const fetchPrevisoes = useCallback(
    async (termo: string) => {
      try {
        const response = await listarUseCase.execute(termo);
        setPrevisoes(response || []);
      } catch (error) {
        console.error("Erro ao buscar previsões:", error);
      }
    },
    [listarUseCase],
  );

  const handleSearchChange = useCallback(
    (value: string) => {
      setSearchTerm(value);

      startTransition(() => {
        fetchPrevisoes(value);
      });
    },
    [fetchPrevisoes],
  );

  useEffect(() => {
    let active = true;

    const loadData = async () => {
      if (active) {
        await fetchPrevisoes(searchTerm);
      }
    };

    loadData();

    return () => {
      active = false;
    };
  }, [fetchPrevisoes, searchTerm]);

  return (
    <>
      <SearchBarSectionStyled>
        <H1Styled>Hoje</H1Styled>
        <SearchBar onClick={handleSearchChange} isPending={isPending} />
      </SearchBarSectionStyled>
      <PrevisaoDiaAtual dadoMeteorologico={previsoes.slice(0, 1)[0]} />
      <PrevisaoProximosDias dadosMeteorologicos={previsoes.slice(1, 7)} />
    </>
  );
}

export default HomePage;
