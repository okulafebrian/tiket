import { Icon } from "@iconify-icon/react";
import { Head, useForm, usePage } from "@inertiajs/react";
import { Avatar, Button, Textarea } from "@nextui-org/react";
import { useRef, useState } from "react";
import Attachment from "./Attachment";

export default function CommentBox({ ticket }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        ticket_id: ticket.id,
        description: "",
        attachments: [],
    });

    const submit = (e) => {
        e.preventDefault();

        post(route("comments.store"));
    };

    const inputFile = useRef(null);

    const handleClick = () => {
        inputFile.current.click();
    };

    const addAttachment = (e) => {
        const files = Array.from(e.target.files);
        setData("attachments", [...data.attachments, ...files]);
        e.target.value = null;
    };

    const removeAttachment = (index) => {
        const newAttachments = [...data.attachments];
        newAttachments.splice(index, 1);
        setData("attachments", newAttachments);
    };

    return (
        <form onSubmit={submit}>
            <input
                ref={inputFile}
                multiple
                hidden
                type="file"
                onChange={addAttachment}
            />

            <div className="space-y-6">
                <div className="flex items-center gap-3">
                    <Button
                        isIconOnly
                        variant="bordered"
                        size="lg"
                        onClick={handleClick}
                    >
                        <Icon icon="solar:paperclip-linear" height={20} />
                    </Button>
                    <Textarea
                        fullWidth
                        minRows={1}
                        placeholder="Tulis komentar..."
                        onChange={(e) => setData("description", e.target.value)}
                        variant="bordered"
                        size="lg"
                    />
                    <Button
                        type="submit"
                        color="primary"
                        size="lg"
                        isDisabled={!data.description.trim()}
                    >
                        Kirim
                    </Button>
                </div>

                {data.attachments.length > 0 && (
                    <div className="grid grid-cols-3 gap-3">
                        {data.attachments.map((attachment, index) => (
                            <Attachment data={attachment}>
                                <Button
                                    isIconOnly
                                    size="sm"
                                    variant="flat"
                                    onClick={() => removeAttachment(index)}
                                >
                                    <Icon
                                        icon="solar:close-circle-linear"
                                        height={20}
                                    />
                                </Button>
                            </Attachment>
                        ))}
                    </div>
                )}
            </div>
        </form>
    );
}
