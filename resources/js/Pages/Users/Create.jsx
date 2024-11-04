import AgentLayout from "@/Layouts/AgentLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import React from "react";

export default function Create({ departments, roles }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        department_id: "",
        roles: "",
    });

    const submit = (e) => {
        e.preventDefault();

        post(route("users.store"));
    };

    return (
        <AgentLayout>
            <Head title="Akun Baru" />

            <form onSubmit={submit}>
                <div className="px-10 pt-8 pb-24 space-y-8">
                    <div className="text-2xl font-semibold">Akun Baru</div>

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
                            type="email"
                            label="Email"
                            labelPlacement="outside"
                            placeholder=" "
                            value={data.email}
                            onChange={(e) => setData("email", e.target.value)}
                        />
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
                        <Select
                            label="Hak Akses"
                            placeholder="Pilih hak akses"
                            labelPlacement="outside"
                            selectedKeys={data.roles}
                            selectionMode="multiple"
                            onSelectionChange={(e) =>
                                setData("roles", Array.from(e))
                            }
                        >
                            {roles.map((role) => (
                                <SelectItem key={role.name}>
                                    {role.name}
                                </SelectItem>
                            ))}
                        </Select>
                    </div>

                    <div className="flex gap-3">
                        <Button type="submit" color="primary" size="lg">
                            Simpan
                        </Button>
                        <Button
                            href={route("users.index")}
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
