import EmployeeLayout from "@/Layouts/EmployeeLayout";
import { Head } from "@inertiajs/react";
import { Card, CardBody, CardHeader } from "@nextui-org/react";

export default function Home({ tickets }) {
    return (
        <EmployeeLayout>
            <Head title="Home" />

            <div className="px-60 py-16 space-y-10">
                <div className="text-4xl font-semibold">Tiket Saya</div>

                <div className="space-y-4">
                    {tickets.map((ticket) => (
                        <Card className="p-2" key={ticket.id}>
                            <CardHeader>
                                <div className="text-lg">
                                    {ticket.reference_number}
                                </div>
                            </CardHeader>
                            <CardBody>
                                <div className="text-lg">
                                    {ticket.topic.name}
                                </div>
                            </CardBody>
                        </Card>
                    ))}
                </div>
            </div>
        </EmployeeLayout>
    );
}
