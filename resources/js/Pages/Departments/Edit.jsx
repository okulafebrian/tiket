import AgentLayout from "@/Layouts/AgentLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { Button, Input } from "@nextui-org/react";
import React from "react";

export default function Edit({ department }) {
    const { data, setData, put, processing, errors, reset } = useForm({
        name: department.name,
        code: department.code,
    });

    const submit = (e) => {
        e.preventDefault();

        put(route("departments.update", department.id));
    };

    return (
        <AgentLayout>
            <Head title="Edit Departemen" />

            <form onSubmit={submit}>
                <div className="px-10 pt-8 pb-24 space-y-8">
                    <div className="text-2xl font-semibold">
                        Edit Departemen
                    </div>

                    <div className="w-1/2 grid grid-cols-1 gap-6">
                        <Input
                            type="text"
                            label="Nama"
                            labelPlacement="outside"
                            placeholder=" "
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                        />

                        <Input
                            type="text"
                            label="Kode"
                            labelPlacement="outside"
                            placeholder=" "
                            value={data.code}
                            onChange={(e) => setData("code", e.target.value)}
                        />
                    </div>

                    <div className="flex gap-3">
                        <Button type="submit" color="primary" size="lg">
                            Simpan
                        </Button>
                        <Button
                            href={route("departments.index")}
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
