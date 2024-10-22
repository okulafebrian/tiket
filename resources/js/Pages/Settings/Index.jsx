import AgentLayout from "@/Layouts/AgentLayout";
import { Head } from "@inertiajs/react";
import { Tab, Tabs } from "@nextui-org/react";

export default function Index() {
    return (
        <AgentLayout>
            <Head title="Tiket" />

            <div className="px-10 py-8 space-y-4">
                <div className="text-2xl font-semibold">Pengaturan</div>

                <Tabs variant="underlined">
                    <Tab key="account" title="Akun" />
                    <Tab key="department" title="Departemen" />
                    <Tab key="topic" title="Topik" />
                    <Tab key="location" title="Lokasi" />
                </Tabs>
            </div>
        </AgentLayout>
    );
}
