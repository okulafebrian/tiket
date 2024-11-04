import EmployeeLayout from "@/Layouts/EmployeeLayout";
import { Head, Link } from "@inertiajs/react";
import { Card, CardBody, Pagination, Tab, Tabs } from "@nextui-org/react";

export default function Home({ tickets, statuses }) {
    return (
        <EmployeeLayout>
            <Head title="Home" />

            <div className="px-60 pt-16 pb-32 space-y-8">
                <div className="text-3xl font-semibold">Tiket Saya</div>

                <div className="flex">
                    <Tabs aria-label="Status" size="lg">
                        {statuses.map((status) => (
                            <Tab key={status.id} title={status.name}></Tab>
                        ))}
                    </Tabs>
                </div>

                <div className="space-y-4">
                    {tickets.data.map((ticket) => (
                        <Card
                            className="shadow-none ring-2 ring-gray-200 p-2"
                            key={ticket.id}
                        >
                            <CardBody className="px-4 space-y-2">
                                <Link
                                    href={route("tickets.show", ticket.id)}
                                    className="text-xl font-medium"
                                    underline="always"
                                >
                                    {ticket.topic?.name}
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
                        page={tickets.meta.current_page}
                        // onChange={handlePageChange}
                        size="lg"
                    />
                </div>
            </div>
        </EmployeeLayout>
    );
}
