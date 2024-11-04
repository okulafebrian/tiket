import AgentLayout from "@/Layouts/AgentLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { Button, Input } from "@nextui-org/react";
import React from "react";

export default function Edit({ location }) {
    const { data, setData, put, processing, errors, reset } = useForm({
        name: location.name,
    });

    const submit = (e) => {
        e.preventDefault();

        put(route("locations.update", location.id));
    };

    return (
        <AgentLayout>
            <Head title="Edit Lokasi" />

            <form onSubmit={submit}>
                <div className="px-10 pt-8 pb-24 space-y-8">
                    <div className="text-2xl font-semibold">Edit Lokasi</div>

                    <div className="w-1/2 grid grid-cols-1 gap-6">
                        <Input
                            type="text"
                            label="Nama"
                            labelPlacement="outside"
                            placeholder=" "
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                        />
                    </div>

                    <div className="flex gap-3">
                        <Button type="submit" color="primary" size="lg">
                            Simpan
                        </Button>
                        <Button
                            href={route("locations.index")}
                            as={Link}
                            color="primary"
                            variant="light"
                            size="lg"
                        >
                            Batal
                        </Button>
                    </div>
                </div>
            </form>
        </AgentLayout>
    );
}
