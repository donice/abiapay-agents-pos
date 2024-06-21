"use client"
import React from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import {
    useReactTable,
    getCoreRowModel,
    ColumnDef,
    flexRender,
} from '@tanstack/react-table';
import { Loading } from '@/src/components/common/loader/redirecting';
import "./style.scss"

interface Transaction {
    idagent_transactions: number;
    state_id: string;
    agency: string;
    agent_user: string;
    agent_code: string | null;
    trans_date: string;
    trans_ref: string;
    rev_head: string;
    rev_code: string;
    payment_ref: string;
    reference: string;
    initialize_url: string | null;
    paymentToken: string | null;
    amount: string;
    payment_period: string;
    next_date: string;
    no_of_days: string;
    trans_channel: string;
    status: string;
    trans_type: string;
    lga: string;
    createtime: string;
    vehicle_type: string | null;
    vehicle_tonnage: string | null;
    vehicle_content: string | null;
    take_off_point: string | null;
    drop_off_destination: string | null;
    taxpayer_name: string;
    taxpayer_email: string;
    taxpayer_phone: string;
    zoneLine: string | null;
    shopNumber: string | null;
    revenue_item: string;
    payment_method: string;
    plate_number: string;
    enumeration_id: string | null;
    comment: string | null;
    taxoffice: string;
}

const fetchTransactions = async (): Promise<Transaction[]> => {
    const response = await axios.post('https://sandboxmobileapi.abiapay.ng/api/v1/transport/transactions');
    return response.data.data;
};

const TransactionsTable: React.FC = () => {
    const { data, error, isLoading, isError } = useQuery<Transaction[]>({
        queryKey: ['transactions'],
        queryFn: fetchTransactions,
    });

    const columns = React.useMemo<ColumnDef<Transaction>[]>(
        () => [
            // {
            //     accessorKey: 'idagent_transactions',
            //     header: 'ID',
            // },
            // {
            //     accessorKey: 'state_id',
            //     header: 'State ID',
            // },
            // {
            //     accessorKey: 'agency',
            //     header: 'Agency',
            // },
            // {
            //     accessorKey: 'agent_user',
            //     header: 'Agent User',
            // },
          
            {
                accessorKey: 'trans_ref',
                header: 'Reference',
            },
            {
                accessorKey: 'amount',
                header: 'Amount',
            },
            {
                accessorKey: 'status',
                header: 'Status',
            },
            // {
            //     accessorKey: 'payment_method',
            //     header: 'Payment Method',
            // },
            // {
            //     accessorKey: 'taxpayer_name',
            //     header: 'Taxpayer Name',
            // },  
            {
                accessorKey: 'trans_date',
                header: 'Date',
            },
            // {
            //     accessorKey: 'taxpayer_phone',
            //     header: 'Taxpayer Phone',
            // },
            {
                accessorKey: 'revenue_item',
                header: 'Revenue Item',
            },
            {
                accessorKey: 'plate_number',
                header: 'Plate No',
            },
            // {
            //     accessorKey: 'taxoffice',
            //     header: 'Tax Office',
            // },
        ],
        []
    );

    const table = useReactTable({
        data: data || [],
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    if (isLoading) {
        return <div className={"loading"}><Loading/></div>;
    }

    if (isError) {
        return <div className={"error"}>Error: {error instanceof Error ? error.message : 'Unknown error'}</div>;
    }

    if (!data || data.length === 0) {
        return <div className={"empty"}>No transactions found.</div>;
    }

    return (
        <section className='main-table'>
        <table className={"table-container"}>
            <thead>
                {table.getHeaderGroups().map(headerGroup => (
                    <tr key={headerGroup.id}>
                        {headerGroup.headers.map(header => (
                            <th key={header.id}>
                                {flexRender(header.column.columnDef.header, header.getContext())}
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody>
                {table.getRowModel().rows.map(row => (
                    <tr key={row.id}>
                        {row.getVisibleCells().map(cell => (
                            <td key={cell.id}>
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
        </section>
    );
};

export default TransactionsTable;
