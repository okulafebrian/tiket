import AgentLayout from "@/Layouts/AgentLayout";
import { Icon } from "@iconify-icon/react";
import { Head, Link, router } from "@inertiajs/react";
import {
    Chip,
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
import React from "react";

export default function Index({ parameters, tickets, statuses, departments }) {
    const [filters, setFilters] = React.useState({
        page: tickets.meta.current_page,
        status: parameters.status ?? "",
        department: parameters.department ?? "",
    });

    const updateFilters = (newFilters) => {
        const updatedFilters = { ...filters, ...newFilters };
        setFilters(updatedFilters);

        const queryParams = new URLSearchParams();

        Object.entries(updatedFilters).forEach(([key, value]) => {
            if (value !== null && value !== undefined && value !== "") {
                queryParams.append(key, value);
            }
        });

        const queryString = queryParams.toString();

        const url = `/tickets${queryString ? `?${queryString}` : ""}`;

        router.visit(url, {
            preserveState: true,
            preserveScroll: true,
            only: ["tickets"],
        });
    };

    const handlePageChange = (page) => {
        updateFilters({ page });
    };

    const handleStatusChange = (value) => {
        updateFilters({ status: Array.from(value)[0] || "", page: 1 });
    };

    const handleDepartmentChange = (value) => {
        updateFilters({ department: Array.from(value)[0] || "", page: 1 });
    };

    return (
        <AgentLayout>
            <Head title="Tiket" />

            <div className="px-10 pt-8 pb-20 space-y-6">
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
                        selectedKeys={filters.status}
                        className="w-40"
                        onSelectionChange={handleStatusChange}
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
                        selectedKeys={filters.department}
                        className="w-40"
                        onSelectionChange={handleDepartmentChange}
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
                            <TableColumn>NO</TableColumn>
                            <TableColumn>TOPIK</TableColumn>
                            <TableColumn>DEPARTEMEN</TableColumn>
                            <TableColumn>STATUS</TableColumn>
                            <TableColumn>PELAPOR</TableColumn>
                            <TableColumn>TANGGAL</TableColumn>
                        </TableHeader>
                        <TableBody
                            items={tickets.data}
                            emptyContent={"Data tidak tersedia."}
                        >
                            {(item) => (
                                <TableRow key={item.id}>
                                    <TableCell>
                                        {item.reference_number}
                                    </TableCell>
                                    <TableCell>
                                        <Link
                                            href={route(
                                                "tickets.edit",
                                                item.id
                                            )}
                                        >
                                            {item.topic?.name ?? "N/A"}
                                        </Link>
                                    </TableCell>
                                    <TableCell>
                                        {item.department.name}
                                    </TableCell>
                                    <TableCell>
                                        <Chip
                                            color={item.status.color}
                                            variant="flat"
                                        >
                                            {item.status.name}
                                        </Chip>
                                    </TableCell>
                                    <TableCell>{item.user}</TableCell>
                                    <TableCell>{item.created_at}</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>

                <div className="flex justify-center">
                    <Pagination
                        total={tickets.meta.per_page}
                        isCompact
                        showControls
                        color="primary"
                        page={filters.page}
                        onChange={handlePageChange}
                    />
                </div>
            </div>
        </AgentLayout>
    );
}
