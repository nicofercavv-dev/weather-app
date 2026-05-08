import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  useTransition,
} from "react";
import { H1Styled } from "../cadastrar/CadastrarPage.styles";
import type { DadosMeteorologicos } from "../../../domain/models/dados-meteorologicos";
import { SearchBar } from "../../components/search-bar/SearchBar";
import { CidadeTable } from "../../components/cidade-table/CidadeTable";
import { Pagination } from "../../components/pagination/Pagination";
import { ListarDadosMeteorologicos } from "../../../data/usecase/listar-dados-meteorologicos";
import { DadosMeteorologicosRepositoryImpl } from "../../../infra/repositories/dados-meteorologicos-repository-impl";

function ListarPage() {
  const listarUseCase = useMemo(() => {
    const repository = new DadosMeteorologicosRepositoryImpl();
    return new ListarDadosMeteorologicos(repository);
  }, []);

  const [cidades, setCidades] = useState<DadosMeteorologicos[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [isPending, startTransition] = useTransition();

  const fetchCidades = useCallback(
    async (termo: string, pagina: number) => {
      try {
        const response = await listarUseCase.execute(termo, pagina);
        setCidades(response.content || []);
        setTotalPages(response.totalPages || 1);
      } catch (error) {
        console.error("Erro ao buscar cidades:", error);
      }
    },
    [listarUseCase],
  );

  const handleSearchChange = useCallback(
    (value: string) => {
      setSearchTerm(value);
      setPage(0);

      startTransition(() => {
        fetchCidades(value, 0);
      });
    },
    [fetchCidades],
  );

  const handlePageChange = useCallback(
    (newPage: number) => {
      setPage(newPage);
      startTransition(() => {
        fetchCidades(searchTerm, newPage);
      });
    },
    [searchTerm, fetchCidades],
  );

  useEffect(() => {
    let active = true;

    const loadData = async () => {
      if (active) {
        await fetchCidades(searchTerm, page);
      }
    };

    loadData();

    return () => {
      active = false;
    };
  }, [fetchCidades, page, searchTerm]);

  return (
    <div>
      <H1Styled>Lista de Cidades</H1Styled>
      <SearchBar
        onClick={handleSearchChange}
        isPending={isPending}
      />
      <CidadeTable
        cidades={cidades}
        onEdit={(id) => console.log("Editar ", id)}
        onDelete={(id) => console.log("Excluir ", id)}
      />
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default ListarPage;
