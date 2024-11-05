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
    const [data, setData] = React.useState({
        page: tickets.meta.current_page,
        status: parameters.status ?? [],
        department: parameters.department ?? [],
        search: parameters.search ?? "",
    });

    const updateFilters = (newFilters) => {
        const searchParams = new URLSearchParams(window.location.search);

        if (newFilters.status !== undefined) {
            if (
                newFilters.status === "" ||
                newFilters.status === null ||
                newFilters.status.length < 1
            ) {
                searchParams.delete("status");
            } else {
                searchParams.set("status", newFilters.status);
            }
            searchParams.delete("page");

            setData((prev) => ({
                ...prev,
                status: newFilters.status,
                page: 1,
            }));
        }

        if (newFilters.department !== undefined) {
            if (
                newFilters.department === "" ||
                newFilters.department === null ||
                newFilters.department.length < 1
            ) {
                searchParams.delete("department");
            } else {
                searchParams.set("department", newFilters.department);
            }
            searchParams.delete("page");

            setData((prev) => ({
                ...prev,
                department: newFilters.department,
                page: 1,
            }));
        }

        if (newFilters.page !== undefined) {
            if (newFilters.page > 1) {
                searchParams.set("page", newFilters.page);
            } else {
                searchParams.delete("page");
            }

            setData((prev) => ({
                ...prev,
                page: newFilters.page,
            }));
        }

        if (newFilters.search !== undefined) {
            if (newFilters.search.length > 1) {
                searchParams.set("search", newFilters.search);
            } else {
                searchParams.delete("search");
            }

            setData((prev) => ({
                ...prev,
                search: newFilters.search,
            }));
        }

        router.visit(route("tickets.index") + "?" + searchParams.toString(), {
            only: ["tickets"],
            preserveState: true,
            preserveScroll: true,
        });
    };

    const handleStatusChange = (newStatus) => {
        updateFilters({ status: Array.from(newStatus)[0] ?? [] });
    };

    const handleDepartmentChange = (newDepartment) => {
        updateFilters({ department: Array.from(newDepartment)[0] ?? [] });
    };

    const handleSearchChange = (newSearch) => {
        updateFilters({ search: newSearch });
    };

    const handlePageChange = (newPage) => {
        updateFilters({ page: newPage });
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
                        value={data.search}
                        onValueChange={handleSearchChange}
                    />
                    <Select
                        aria-label="Status"
                        placeholder="Status"
                        selectedKeys={data.status}
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
                        selectedKeys={data.department}
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
                    <Table
                        removeWrapper
                        aria-label="Ticket table"
                        selectionMode="single"
                        onRowAction={(key) =>
                            router.get(route("tickets.edit", key))
                        }
                    >
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
                                    <TableCell>{item.topic.name}</TableCell>
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
                        page={data.page}
                        onChange={handlePageChange}
                    />
                </div>
            </div>
        </AgentLayout>
    );
}
