import type { DadoMeteorologicoResponse } from "../../data/dtos/DadoMeteorologicoResponse.dto";
import type {
  DadosMeteorologicos,
  RegistrarDadosMeteorologicosDTO,
} from "../../domain/models/dados-meteorologicos";
import type { Page } from "../../types/page";

export interface DadosMeteorologicosRepository {
  registrar(dados: RegistrarDadosMeteorologicosDTO): Promise<void>;
  buscarPorId(id: number): Promise<DadoMeteorologicoResponse>;
  listar(cidade: string, page: number): Promise<Page<DadosMeteorologicos>>;
  listar7Dias(cidade: string): Promise<DadosMeteorologicos[]>;
  editar(
    id: number,
    dados: RegistrarDadosMeteorologicosDTO,
  ): Promise<DadosMeteorologicos>;
  deletar(id: number): Promise<void>;
}
