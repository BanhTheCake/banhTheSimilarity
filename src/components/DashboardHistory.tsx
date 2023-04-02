import React from 'react';
import Table from './global/Table';
import { GridColDef } from '@mui/x-data-grid';
import getAllApiRequest from '@/lib/api/getAllApiRequest';
import moment from 'moment';

const DashboardHistory = async () => {
    const apiRequests = await getAllApiRequest();

    return <Table rows={apiRequests} />;
};

export default DashboardHistory;
