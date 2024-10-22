import AgentLayout from "@/Layouts/AgentLayout";
import { Icon } from "@iconify-icon/react";
import { Head, router } from "@inertiajs/react";
import {
    Button,
    Chip,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
    Input,
    Pagination,
    Select,
    SelectItem,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
} from "@nextui-org/react";
import React, { useEffect } from "react";

export default function Index({ parameters, tickets, statuses, departments }) {
    // const [filters, setFilters] = React.useState({
    //     page: tickets.meta.current_page,
    //     status: parameters.status ?? "",
    //     department: parameters.department ?? "",
    // });

    // const updateFilters = (newFilters) => {
    //     const updatedFilters = { ...filters, ...newFilters };
    //     setFilters(updatedFilters);

    //     const queryParams = new URLSearchParams();

    //     Object.entries(updatedFilters).forEach(([key, value]) => {
    //         if (value !== null && value !== undefined && value !== "") {
    //             queryParams.append(key, value);
    //         }
    //     });

    //     const queryString = queryParams.toString();

    //     const url = `/tickets${queryString ? `?${queryString}` : ""}`;

    //     router.visit(url, {
    //         preserveState: true,
    //         preserveScroll: true,
    //         only: ["tickets"],
    //     });
    // };

    // const handlePageChange = (page) => {
    //     updateFilters({ page });
    // };

    // const handleStatusChange = (value) => {
    //     updateFilters({ status: Array.from(value)[0] || "", page: 1 });
    // };

    // const handleDepartmentChange = (value) => {
    //     updateFilters({ department: Array.from(value)[0] || "", page: 1 });
    // };

    const [page, setPage] = React.useState(tickets.meta.current_page);
    const [status, setStatus] = React.useState(new Set([]));
    const [department, setDepartment] = React.useState(new Set([]));

    useEffect(() => {
        const queryParams = new URLSearchParams();

        queryParams.append("page", page);

        const queryString = queryParams.toString();

        const url = `/tickets${queryString ? `?${queryString}` : ""}`;

        router.visit(url, {
            preserveState: true,
            preserveScroll: true,
            only: ["tickets"],
        });
    }, [page, status, department]);

    return (
        <AgentLayout>
            <Head title="Tiket" />

            <div className="px-10 py-8 space-y-4">
                <div className="text-2xl font-semibold">Tiket</div>

                <div className="flex gap-3">
                    <Input
                        placeholder="Cari"
                        className="max-w-xs"
                        startContent={<Icon icon="solar:magnifer-linear" />}
                    />
                    <Select
                        aria-label="Status"
                        placeholder="Status"
                        selectedKeys={status}
                        className="w-40"
                        onSelectionChange={setStatus}
                    >
                        {statuses.map((status) => (
                            <SelectItem key={status.id}>
                                {status.name}
                            </SelectItem>
                        ))}
                    </Select>
                    <Select
                        aria-label="Department"
                        placeholder="Departemen"
                        selectedKeys={department}
                        className="w-40"
                        onSelectionChange={setDepartment}
                    >
                        {departments.map((department) => (
                            <SelectItem key={department.id}>
                                {department.name}
                            </SelectItem>
                        ))}
                    </Select>
                </div>

                <div className="border rounded-xl p-4">
                    <Table removeWrapper aria-label="Ticket table">
                        <TableHeader>
                            <TableColumn>TOPIK</TableColumn>
                            <TableColumn>DEPARTEMEN</TableColumn>
                            <TableColumn>PELAPOR</TableColumn>
                            <TableColumn>STATUS</TableColumn>
                        </TableHeader>
                        <TableBody
                            items={tickets.data}
                            emptyContent={"Data tidak tersedia."}
                        >
                            {(item) => (
                                <TableRow key={item.id}>
                                    <TableCell>{item.topic.name}</TableCell>
                                    <TableCell>
                                        {item.department.name}
                                    </TableCell>
                                    <TableCell>{item.user}</TableCell>
                                    <TableCell>
                                        <Chip color={item.status.color}>
                                            {item.status.name}
                                        </Chip>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>

                <div>
                    <Pagination
                        total={tickets.meta.per_page}
                        isCompact
                        showControls
                        color="primary"
                        page={page}
                        onChange={setPage}
                    />
                </div>
            </div>
        </AgentLayout>
    );
}
