import AgentLayout from "@/Layouts/AgentLayout";
import { Icon } from "@iconify-icon/react";
import { Head, Link, router } from "@inertiajs/react";
import { Card, CardBody } from "@nextui-org/react";
import React from "react";

export default function Index({ roles, permissionCount }) {
    return (
        <AgentLayout>
            <Head title="Role" />

            <div className="px-10 pt-8 pb-20 space-y-6">
                <div className="text-2xl font-semibold">Role</div>

                <div className="grid grid-cols-4 gap-4">
                    {roles.map((role) => (
                        <Card
                            shadow="sm"
                            key={role.id}
                            isPressable
                            onPress={() => {
                                router.get(route("roles.edit", role));
                            }}
                            className="p-1"
                        >
                            <CardBody>
                                <div className="text-xl mb-1">
                                    {role.name.replace(/\b\w/g, (char) =>
                                        char.toUpperCase()
                                    )}
                                </div>
                                <div className="text-sm">
                                    {role.name == "super admin"
                                        ? permissionCount
                                        : role.permissions_count}{" "}
                                    hak akses
                                </div>
                            </CardBody>
                        </Card>
                    ))}
                </div>
            </div>
        </AgentLayout>
    );
}
