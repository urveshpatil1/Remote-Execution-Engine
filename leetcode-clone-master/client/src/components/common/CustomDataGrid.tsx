import { DataGrid, DataGridProps } from '@mui/x-data-grid';
import { styled } from '@mui/material/styles';

interface CustomDataGridProps extends DataGridProps {}

/**
@description : This is a custom DataGrid component
*/
function CustomDataGrid({ rows, columns, ...props }: CustomDataGridProps) {
  const StyledDataGrid = styled(DataGrid)(() => ({
    height: 'fit-content',
    width: 'fit-content',
    border: 'solid 1px #303030',
    color: 'rgba(255,255,255,0.85)',
    fontSize: '1rem',
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    WebkitFontSmoothing: 'auto',
    letterSpacing: 'normal',
    '& .MuiDataGrid-columnHeaders': {
      backgroundColor: '#1d1d1d',
    },
    '& .MuiDataGrid-columnsContainer': {
      backgroundColor: '#1d1d1d',
    },
    '& .MuiDataGrid-iconSeparator': {
      display: 'none',
    },
    '& .MuiDataGrid-columnHeader, .MuiDataGrid-cell': {
      // borderRight: `1px solid ${'#303030'}`,
      width: 'auto',
    },
    '& .MuiDataGrid-columnsContainer, .MuiDataGrid-cell': {
      // borderBottom: `1px solid ${'#303030'}`,
      borderBottom: 'transparent',
    },
    '& .MuiDataGrid-cell': {
      color: 'white',
    },
    '& .MuiPaginationItem-root': {
      borderRadius: 0,
    },
    '& .MuiTablePagination-displayedRows': {
      color: 'white',
    },
    '& .MuiButtonBase-root': {
      color: 'white',
      border: 'solid 1px #303030',
      margin: '10px',
    },
    '& .MuiTablePagination-selectLabel': {
      color: 'white',
    },
    '& .MuiSelect-select, .MuiTablePagination-select, .MuiSelect-standard': {
      color: 'white',
    },
  }));

  return (
    <StyledDataGrid
      isCellEditable={() => false}
      sx={{ color: 'white', marginBottom: '10vh' }}
      rows={rows}
      columns={columns}
      {...props}
    />
  );
}

export default CustomDataGrid;
