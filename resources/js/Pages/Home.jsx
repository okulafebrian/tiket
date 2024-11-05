import EmployeeLayout from "@/Layouts/EmployeeLayout";
import { Head } from "@inertiajs/react";
import { Card, CardBody, CardHeader, Link } from "@nextui-org/react";

export default function Home({ helpdesks }) {

    return (
        <EmployeeLayout>
            <Head title="Home" />

            <div className="px-60 pt-16 pb-32 space-y-10">
                <div className="text-3xl font-semibold">Pilih topik</div>
                <div className="grid grid-cols-3 gap-4">
                    {helpdesks.map((helpdesk) => (
                        <Card className="p-2" key={helpdesk.id}>
                            <CardHeader>
                                <div className="text-lg">{helpdesk.name}</div>
                            </CardHeader>
                            <CardBody>
                                {helpdesk.topics.map((topic) => (
                                    <Link
                                        href={route("topics.show", topic)}
                                        key={topic.id}
                                    >
                                        {topic.name}
                                    </Link>
                                ))}
                            </CardBody>
                        </Card>
                    ))}
                </div>
            </div>
        </EmployeeLayout>
    );
}
