import AgentLayout from "@/Layouts/AgentLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { Button, Checkbox, CheckboxGroup, Input } from "@nextui-org/react";
import React from "react";

export default function Create({ role, permissions }) {
    const { data, setData, put, processing, errors, reset } = useForm({
        permissions:
            role.name == "super admin"
                ? permissions.map((permission) => permission.id)
                : role.permissions.map((permission) => permission.id),
    });

    const submit = (e) => {
        e.preventDefault();

        put(route("roles.update", role));
    };

    return (
        <AgentLayout>
            <Head title="Edit Role" />

            <form onSubmit={submit}>
                <div className="px-10 pt-8 pb-24 space-y-8">
                    <div className="text-2xl font-semibold">Edit Role</div>

                    <div className="w-1/2 grid grid-cols-1 gap-6">
                        <Input
                            type="text"
                            label="Nama"
                            labelPlacement="outside"
                            placeholder=" "
                            value={role.name}
                            isReadOnly
                        />
                        <CheckboxGroup
                            label="Hak Akses"
                            value={data.permissions}
                            onValueChange={(e) =>
                                setData("permissions", Array.from(e))
                            }
                        >
                            {permissions.map((permission) => (
                                <Checkbox
                                    key={permission.id}
                                    value={permission.id}
                                    isReadOnly={role.name == "super admin"}
                                >
                                    {permission.name}
                                </Checkbox>
                            ))}
                        </CheckboxGroup>
                    </div>

                    <div className="flex gap-3">
                        <Button type="submit" color="primary" size="lg">
                            Simpan
                        </Button>
                        <Button
                            href={route("roles.index")}
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
