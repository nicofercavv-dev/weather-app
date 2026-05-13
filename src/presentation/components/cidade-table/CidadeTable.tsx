import React from "react";
import type { DadosMeteorologicos } from "../../../domain/models/dados-meteorologicos";
import {
  CidadeTableStyled,
  ImageStyled,
  TableResponsiveStyled,
} from "./CidadeTable.styles";
import imgEdit from "../../../assets/edit-icon.png";
import imgDelete from "../../../assets/delete-icon.png";

export interface CidadeTableProps {
  cidades: DadosMeteorologicos[];
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

export const CidadeTable = React.memo(
  ({ cidades, onEdit, onDelete }: CidadeTableProps) => (
    <TableResponsiveStyled>
      <CidadeTableStyled>
        <thead>
          <tr>
            <th>Cidade</th>
            <th>Data</th>
            <th>Ação</th>
          </tr>
        </thead>
        <tbody>
          {cidades.length === 0 ? (
            <tr>
              <td colSpan={3} className="text-center">
                Nenhum registro encontrado.
              </td>
            </tr>
          ) : (
            cidades.map((item) => (
              <tr key={item.id}>
                <td>{item.cidade}</td>
                <td>{item.data.split("-").reverse().join("/")}</td>
                <td>
                  <button
                    onClick={() => onEdit(item.id)}
                    className="btn-action btn-edit"
                    aria-label={`Editar ${item.cidade}`}
                  >
                    <ImageStyled src={imgEdit} />
                  </button>
                  <button
                    onClick={() => onDelete(item.id)}
                    className="btn-action btn-delete"
                    aria-label={`Excluir ${item.cidade}`}
                  >
                    <ImageStyled src={imgDelete} />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </CidadeTableStyled>
    </TableResponsiveStyled>
  ),
);
