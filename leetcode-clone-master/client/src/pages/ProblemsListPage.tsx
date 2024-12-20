import { useQuery } from '@tanstack/react-query';
import { problemsListService } from '../services';
import CustomLoader from '../components/common/CustomLoader';
import CustomDataGrid from '../components/common/CustomDataGrid';
import { GridRenderCellParams } from '@mui/x-data-grid';
import { useEffect, useMemo, useState } from 'react';
import { PageInfoInterface, ProblemsTableDataInterface } from '../interfaces';
import { Link } from 'react-router-dom';

function ProblemsListPage() {
  const [, setRowCountState] = useState<number | null>(null);
  const [paginationModel, setPaginationModel] = useState<PageInfoInterface>({
    page: 0,
    pageSize: 10,
  });

  const { data, refetch, isLoading, isFetching } = useQuery({
    queryKey: ['problemList'],
    queryFn: () => problemsListService(paginationModel),
  });

  const totalRowCount = data?.data.totalProblems;

  const formattedData = useMemo(() => {
    const finalData: ProblemsTableDataInterface = { columns: [], rows: [] };

    if (data?.data.data && data.data.data.length > 0) {
      const formattedColumns = Object.keys(data.data.data[0])
        .filter((field) => field !== 'id')
        .map((item) => ({
          field: item,
          headerName: item.toUpperCase(),
          width: item !== 'difficulty' ? 400 : 150,
          editable: true,
          renderCell: (params: GridRenderCellParams) => {
            if (params.colDef.field !== 'difficulty') {
              return (
                <Link className="hover:text-blue-500" to={`/problem/${params.row.id}`}>
                  {params.value}
                </Link>
              );
            }
            if (params.value === 'EASY') {
              return <span className="text-green-500">{params.value}</span>;
            }
            if (params.value === 'MEDIUM') {
              return <span className="text-yellow-500">{params.value}</span>;
            }
            if (params.value === 'HARD') {
              return <span className="text-red-500">{params.value}</span>;
            }
          },
        }));

      finalData.columns.push(...formattedColumns);
      finalData.rows.push(...data.data.data);
    }

    return finalData;
  }, [data?.data]);

  /**
   * The function `handlePageChange` updates the page number in the pagination model.
   */
  const handlePageChange = (newPage: number) => {
    setPaginationModel((prevModel) => ({
      ...prevModel,
      page: newPage,
    }));
  };

  useEffect(() => {
    if (totalRowCount !== undefined) {
      setRowCountState(totalRowCount);
    } else {
      setRowCountState(null);
    }

    refetch();
  }, [totalRowCount, paginationModel]);

  return (
    <>
      {isLoading ? (
        <CustomLoader />
      ) : (
        <div className="h-[92vh] w-screen flex flex-col items-center justify-center bg-gradient-to-r from-black to-gray-800 text-white p-8">
          <h2 className="text-3xl text-center text-white font-semibold mb-4">Top Interview 150</h2>
          <CustomDataGrid
            rows={formattedData.rows}
            columns={formattedData.columns}
            rowCount={totalRowCount}
            loading={isFetching}
            pageSizeOptions={[10]}
            paginationModel={paginationModel}
            paginationMode="server"
            onPaginationModelChange={(newModel: PageInfoInterface) => {
              handlePageChange(newModel.page);
              problemsListService(newModel);
            }}
          />
        </div>
      )}
    </>
  );
}

export default ProblemsListPage;
