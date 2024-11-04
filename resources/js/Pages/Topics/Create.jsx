import AgentLayout from "@/Layouts/AgentLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import React from "react";

export default function Create({ departments }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        department_id: "",
    });

    const submit = (e) => {
        e.preventDefault();

        post(route("topics.store"));
    };

    return (
        <AgentLayout>
            <Head title="Topik Baru" />

            <form onSubmit={submit}>
                <div className="px-10 pt-8 pb-24 space-y-8">
                    <div className="text-2xl font-semibold">Topik Baru</div>

                    <div className="w-1/2 grid grid-cols-1 gap-6">
                        <Select
                            label="Departemen"
                            placeholder="Pilih departemen"
                            labelPlacement="outside"
                            selectedKeys={[data.department_id]}
                            onChange={(e) =>
                                setData("department_id", e.target.value)
                            }
                        >
                            {departments.map((department) => (
                                <SelectItem key={department.id}>
                                    {department.name}
                                </SelectItem>
                            ))}
                        </Select>
                        <Input
                            type="text"
                            label="Keterangan"
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
                            href={route("topics.index")}
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
