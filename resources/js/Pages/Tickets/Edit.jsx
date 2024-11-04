import Feed from "@/Components/Feed";
import Comment from "@/Components/Comment";
import AgentLayout from "@/Layouts/AgentLayout";
import { Icon } from "@iconify-icon/react";
import { Head, Link, useForm } from "@inertiajs/react";
import { Button, Chip, Select, SelectItem, User } from "@nextui-org/react";
import Attachment from "@/Components/Attachment";
import React from "react";

export default function Edit({
    ticket,
    statuses,
    categories,
    departments,
    users,
}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        _method: "put",
        status: ticket.status.id.toString(),
        department_id: ticket.department.id.toString(),
        category: ticket.category.id.toString(),
        assignees: ticket.assignees.map((assignee) => assignee.id.toString()),
        comment: {
            description: "",
            attachments: [],
        },
    });

    const submit = (e) => {
        e.preventDefault();

        post(route("tickets.update", ticket.id), {
            preserveState: true,
            preserveScroll: true,
        });
    };

    return (
        <AgentLayout>
            <Head title={ticket.topic.name} />

            <form onSubmit={submit}>
                <div className="divide-y">
                    <div className="p-8 flex items-center justify-between gap-24">
                        <div className="w-full">
                            <div className="text-2xl font-semibold">
                                {ticket.topic.name}
                            </div>
                            <div className="flex gap-2">
                                <Chip
                                    variant="light"
                                    startContent={
                                        <Icon
                                            icon="solar:hashtag-square-linear"
                                            height={16}
                                        />
                                    }
                                >
                                    {ticket.reference_number}
                                </Chip>
                                <Chip
                                    variant="light"
                                    startContent={
                                        <Icon
                                            icon="solar:map-point-linear"
                                            height={16}
                                        />
                                    }
                                >
                                    {ticket.location.name}
                                </Chip>
                                <Chip
                                    variant="light"
                                    startContent={
                                        <Icon
                                            icon="solar:sort-by-time-linear"
                                            height={16}
                                        />
                                    }
                                >
                                    Besok 12:55
                                </Chip>
                            </div>
                        </div>
                        <Button type="submit" color="primary" size="lg">
                            Simpan
                        </Button>
                    </div>

                    <div className="px-40 p-8 space-y-8">
                        <div className="p-4 border rounded-2xl space-y-3">
                            <User
                                classNames={{
                                    base: "gap-3",
                                    name: "font-medium",
                                }}
                                name={ticket.user}
                                description={ticket.created_at}
                            />
                            <div className="text-sm">{ticket.description}</div>

                            {ticket.attachments && (
                                <div className="grid grid-cols-3 gap-3">
                                    {ticket.attachments.map((attachment) => (
                                        <Attachment data={attachment}>
                                            <Button
                                                href={route(
                                                    "medias.download",
                                                    attachment.uuid
                                                )}
                                                as={Link}
                                                isIconOnly
                                                size="sm"
                                                variant="flat"
                                            >
                                                <Icon
                                                    icon="solar:download-linear"
                                                    height={20}
                                                />
                                            </Button>
                                        </Attachment>
                                    ))}
                                </div>
                            )}
                        </div>
                        <div className="grid grid-cols-2 gap-x-20 gap-y-2">
                            <Select
                                items={statuses}
                                selectedKeys={[data.status]}
                                onChange={(e) =>
                                    setData("status", e.target.value)
                                }
                                label="Status"
                                variant="flat"
                                labelPlacement="outside-left"
                                classNames={{
                                    base: "items-center",
                                    label: "w-36",
                                }}
                                renderValue={(items) => {
                                    return (
                                        <>
                                            {items.map((item) => (
                                                <Chip
                                                    variant="flat"
                                                    key={item.data.id}
                                                    color={item.data.color}
                                                >
                                                    {item.data.name}
                                                </Chip>
                                            ))}
                                        </>
                                    );
                                }}
                            >
                                {(status) => (
                                    <SelectItem
                                        key={status.id}
                                        textValue={status.name}
                                    >
                                        <Chip
                                            variant="flat"
                                            key={status.id}
                                            color={status.color}
                                        >
                                            {status.name}
                                        </Chip>
                                    </SelectItem>
                                )}
                            </Select>
                            <Select
                                name="department_id"
                                label="Departemen"
                                labelPlacement="outside-left"
                                selectedKeys={[data.department_id]}
                                onChange={(e) =>
                                    setData("department_id", e.target.value)
                                }
                                variant="flat"
                                classNames={{
                                    base: "items-center",
                                    label: "w-36",
                                }}
                            >
                                {departments.map((department) => (
                                    <SelectItem key={department.id}>
                                        {department.name}
                                    </SelectItem>
                                ))}
                            </Select>
                            <Select
                                name="category"
                                label="Kategori"
                                labelPlacement="outside-left"
                                selectedKeys={[data.category]}
                                onChange={(e) =>
                                    setData("category", e.target.value)
                                }
                                variant="flat"
                                classNames={{
                                    base: "items-center",
                                    label: "w-36",
                                }}
                            >
                                {categories.map((category) => (
                                    <SelectItem key={category.id}>
                                        {category.name}
                                    </SelectItem>
                                ))}
                            </Select>
                            <Select
                                name="assignees"
                                label="Petugas"
                                labelPlacement="outside-left"
                                selectedKeys={data.assignees}
                                onSelectionChange={(e) =>
                                    setData("assignees", Array.from(e))
                                }
                                selectionMode="multiple"
                                placeholder="Belum ditentukan"
                                variant="flat"
                                classNames={{
                                    base: "items-center",
                                    label: "w-36",
                                }}
                            >
                                {users.map((user) => (
                                    <SelectItem key={user.id}>
                                        {user.name}
                                    </SelectItem>
                                ))}
                            </Select>
                        </div>
                    </div>

                    <div className="px-40 py-8">
                        <Comment data={data} setData={setData} />
                    </div>

                    <div className="px-40 pt-8 pb-24 space-y-6">
                        <div className="text-xl font-semibold">
                            {ticket.comments.length} Komentar
                        </div>
                        {ticket.comments.map((comment) => (
                            <Feed key={comment.id} data={comment} />
                        ))}
                    </div>
                </div>
            </form>
        </AgentLayout>
    );
}
