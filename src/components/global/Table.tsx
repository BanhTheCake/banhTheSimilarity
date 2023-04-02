'use client';

import { FC, useMemo } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import moment from 'moment';
import { useTheme } from 'next-themes';
import { ThemeProvider, createTheme } from '@mui/material/styles';

interface TableProps {
    rows: any;
}

const Table: FC<TableProps> = ({ rows }) => {
    const { theme, systemTheme } = useTheme();
    const themeValue = theme === 'system' ? systemTheme : theme;

    const columns: GridColDef[] = [
        {
            field: 'apiKeyId',
            headerName: 'API key used',
            flex: 1,
            minWidth: 200,
        },
        { field: 'path', headerName: 'Path', flex: 0.6, minWidth: 100 },
        {
            field: 'timestamp',
            headerName: 'Recently',
            valueFormatter(params) {
                return moment(params.value).fromNow();
            },
            flex: 0.8,
            minWidth: 200,
        },
        { field: 'duration', headerName: 'Duration', flex: 0.6, minWidth: 100 },
        { field: 'status', headerName: 'Status', flex: 0.6, minWidth: 100 },
    ];

    const themeMode = useMemo(() => {
        return createTheme(
            themeValue === 'light'
                ? {
                      palette: {
                          mode: 'light',
                      },
                  }
                : {
                      palette: {
                          mode: 'dark',
                      },
                  }
        );
    }, [themeValue]);

    return (
        <ThemeProvider theme={themeMode}>
            <div className="h-[300px]">
                <DataGrid
                    sx={{
                        bgcolor: themeValue === 'light' ? 'white' : '#152238',
                        boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px;',
                    }}
                    columns={columns}
                    rows={rows}
                    getRowId={(row) => row.id}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 1, pageSize: 10 },
                        },
                    }}
                    pageSizeOptions={[5, 10, 20]}
                    paginationMode="client"
                    disableDensitySelector
                />
            </div>
        </ThemeProvider>
    );
};

export default Table;
