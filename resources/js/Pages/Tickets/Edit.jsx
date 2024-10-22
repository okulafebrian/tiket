import Feed from "@/Components/Feed";
import Comment from "@/Components/Comment";
import AgentLayout from "@/Layouts/AgentLayout";
import { Icon } from "@iconify-icon/react";
import { Head, useForm } from "@inertiajs/react";
import {
    Button,
    Chip,
    Link,
    Select,
    SelectItem,
    User,
} from "@nextui-org/react";
import Attachment from "@/Components/Attachment";

export default function Edit({
    ticket,
    statuses,
    categories,
    departments,
    users,
}) {
    const { data, setData, put, processing, errors, reset } = useForm({
        status: ticket.status.id.toString(),
        department_id: ticket.department.id.toString(),
        category: ticket.category.id.toString(),
        assignees: ticket.assignees.toString(),
    });

    function handleChange(e) {
        const { name, value } = e.target;

        setData(name, value);
    }

    const submit = (e) => {
        e.preventDefault();

        put(route("tickets.update", ticket.id), {
            preserveState: true,
            preserveScroll: true,
        });
    };

    return (
        <AgentLayout>
            <Head title={ticket.topic.name} />

            <div className="divide-y">
                <div className="px-40 py-8 space-y-6">
                    <div>
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

                    <form
                        onSubmit={submit}
                        className="border rounded-2xl p-4 space-y-6"
                    >
                        <div className="grid grid-cols-4 gap-3">
                            <Select
                                name="status"
                                label="Status"
                                selectedKeys={[data.status]}
                                onChange={handleChange}
                            >
                                {statuses.map((status) => (
                                    <SelectItem key={status.id}>
                                        {status.name}
                                    </SelectItem>
                                ))}
                            </Select>
                            <Select
                                name="department_id"
                                label="Departemen"
                                selectedKeys={[data.department_id]}
                                onChange={handleChange}
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
                                selectedKeys={[data.category]}
                                onChange={handleChange}
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
                                selectionMode="multiple"
                                placeholder="Belum ditentukan"
                                onChange={handleChange}
                            >
                                {users.map((user) => (
                                    <SelectItem key={user.id}>
                                        {user.name}
                                    </SelectItem>
                                ))}
                            </Select>
                        </div>

                        <Button
                            type="submit"
                            color="primary"
                            size="lg"
                            fullWidth
                        >
                            Simpan
                        </Button>
                    </form>

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
                </div>

                <div className="px-40 py-8">
                    <Comment ticket={ticket} />
                </div>

                <div className="px-40 pt-8 pb-32 space-y-6">
                    <div className="text-xl font-semibold">
                        {ticket.comments.length} Komentar
                    </div>
                    {ticket.comments.map((comment) => (
                        <Feed key={comment.id} data={comment} />
                    ))}
                </div>
            </div>
        </AgentLayout>
    );
}
