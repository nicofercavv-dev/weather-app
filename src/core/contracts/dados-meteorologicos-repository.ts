import type {
  DadosMeteorologicos,
  RegistrarDadosMeteorologicosDTO,
} from "../../domain/models/dados-meteorologicos";
import type { Page } from "../../types/page";

export interface DadosMeteorologicosRepository {
  registrar(dados: RegistrarDadosMeteorologicosDTO): Promise<void>;
  listar(cidade: string, page: number): Promise<Page<DadosMeteorologicos>>;
  listar7Dias(cidade: string): Promise<DadosMeteorologicos[]>;
}
