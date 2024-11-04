import AgentLayout from "@/Layouts/AgentLayout";
import { Head } from "@inertiajs/react";

export default function Dashboard({ statuses }) {
    return (
        <AgentLayout>
            <Head title="Tiket" />

            <div className="px-10 py-8 space-y-4">
                <div className="text-2xl font-semibold">Dashboard</div>

                <div className="grid grid-cols-6 gap-3">
                    {statuses.map((status, index) => (
                        <div
                            key={index}
                            className="border rounded-2xl p-4 space-y-1"
                        >
                            <div>Tiket {status.name}</div>
                            <div className="text-xl font-medium">
                                {status.tickets_count}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </AgentLayout>
    );
}
