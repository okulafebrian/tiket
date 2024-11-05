import EmployeeLayout from "@/Layouts/EmployeeLayout";
import { Head, Link, router } from "@inertiajs/react";
import { Card, CardBody, Pagination, Tab, Tabs } from "@nextui-org/react";
import React from "react";

export default function History({ parameters, tickets, statuses }) {
    const [data, setData] = React.useState({
        page: tickets.meta.current_page,
        status: parameters.status ?? "1",
    });

    const updateFilters = (newFilters) => {
        const searchParams = new URLSearchParams(window.location.search);

        if (newFilters.status !== undefined) {
            searchParams.set("status", newFilters.status);
            searchParams.delete("page");

            setData((prev) => ({
                ...prev,
                status: newFilters.status,
                page: 1,
            }));
        } else if (newFilters.page !== undefined) {
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

        router.visit(route("tickets.history") + "?" + searchParams.toString(), {
            only: ["tickets"],
            preserveState: true,
            preserveScroll: true,
        });
    };

    const handleStatusChange = (newStatus) => {
        updateFilters({ status: newStatus });
    };

    const handlePageChange = (newPage) => {
        updateFilters({ page: newPage });
    };

    return (
        <EmployeeLayout>
            <Head title="Tiket Saya" />

            <div className="px-60 pt-16 pb-32 space-y-8">
                <div className="text-3xl font-semibold">Tiket Saya</div>

                <Tabs
                    aria-label="Status"
                    size="lg"
                    selectedKey={data.status}
                    onSelectionChange={handleStatusChange}
                >
                    {statuses.map((status) => (
                        <Tab key={status.id} title={status.name}></Tab>
                    ))}
                </Tabs>

                {tickets.data.length > 0 ? (
                    <>
                        <div className="space-y-4">
                            {tickets.data.map((ticket) => (
                                <Card
                                    className="shadow-none ring-2 ring-gray-200 p-2"
                                    key={ticket.id}
                                >
                                    <CardBody className="px-4 space-y-2">
                                        <Link
                                            href={route(
                                                "tickets.show",
                                                ticket.id
                                            )}
                                            className="text-xl font-medium"
                                            underline="always"
                                        >
                                            {ticket.topic.name}
                                        </Link>
                                        <div>{ticket.created_at}</div>
                                    </CardBody>
                                </Card>
                            ))}
                        </div>

                        <div className="flex justify-center">
                            <Pagination
                                total={tickets.meta.per_page}
                                isCompact
                                showControls
                                color="primary"
                                page={data.page}
                                onChange={handlePageChange}
                                size="lg"
                            />
                        </div>
                    </>
                ) : (
                    <Card shadow="sm" className="p-4 text-center">
                        <CardBody>
                            <p className="text-xl font-medium text-gray-600">
                                Data tidak ditemukan
                            </p>
                        </CardBody>
                    </Card>
                )}
            </div>
        </EmployeeLayout>
    );
}
