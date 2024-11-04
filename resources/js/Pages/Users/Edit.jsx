import AgentLayout from "@/Layouts/AgentLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import React from "react";

export default function Edit({ user, departments, roles }) {
    const { data, setData, put, processing, errors, reset } = useForm({
        name: user.name,
        email: user.email,
        department_id: user.department.id.toString(),
        roles: user.roles.map((role) => role.name.toString()),
    });

    const submit = (e) => {
        e.preventDefault();

        put(route("users.update", user));
    };

    return (
        <AgentLayout>
            <Head title="Edit Akun" />

            <form onSubmit={submit}>
                <div className="px-10 pt-8 pb-24 space-y-8">
                    <div className="text-2xl font-semibold">Edit Akun</div>

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
                            label="Role"
                            placeholder="Pilih role"
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
