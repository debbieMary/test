import React, { ReactNode } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  useMediaQuery,
  useTheme
} from '@mui/material';

export interface Column<T> {
  id: string;
  label: string;
  minWidth?: number;
  align?: 'left' | 'right' | 'center';
  format?: (value: any, row: T) => ReactNode;
  hideOnMobile?: boolean;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  getRowKey: (row: T) => string | number;
  onRowClick?: (row: T) => void;
  actions?: (row: T) => ReactNode;
  actionsLabel?: string;
  renderMobileCard?: (row: T) => ReactNode;
  headerContent?: ReactNode;
}

export default function DataTable<T>({
  columns,
  data,
  getRowKey,
  onRowClick,
  actions,
  actionsLabel = 'Actions',
  renderMobileCard,
  headerContent
}: DataTableProps<T>) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Vista mobile con cards
  if (isMobile && renderMobileCard) {
    return (
      <Box>
        {headerContent}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {data.map((row) => (
            <Box key={getRowKey(row)} onClick={() => onRowClick?.(row)}>
              {renderMobileCard(row)}
            </Box>
          ))}
        </Box>
      </Box>
    );
  }

  // Vista desktop con tabla
  return (
    <Box>
      {headerContent}
      <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: 'grey.100' }}>
              {columns
                .filter((col) => !isMobile || !col.hideOnMobile)
                .map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                    sx={{ fontWeight: 600 }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              {actions && (
                <TableCell align="center" sx={{ fontWeight: 600 }}>
                  {actionsLabel}
                </TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow
                key={getRowKey(row)}
                hover
                onClick={() => onRowClick?.(row)}
                sx={{
                  cursor: onRowClick ? 'pointer' : 'default',
                  '&:hover': {
                    backgroundColor: onRowClick ? 'action.hover' : 'transparent'
                  }
                }}
              >
                {columns
                  .filter((col) => !isMobile || !col.hideOnMobile)
                  .map((column) => {
                    const value = (row as any)[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format ? column.format(value, row) : value}
                      </TableCell>
                    );
                  })}
                {actions && <TableCell align="center">{actions(row)}</TableCell>}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
