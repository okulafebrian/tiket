import { Icon } from "@iconify-icon/react";
import { Button, Textarea } from "@nextui-org/react";
import React, { useRef } from "react";
import Attachment from "./Attachment";

export default function Comment({ data, setData }) {
    const inputFile = useRef(null);

    const handleClick = () => {
        inputFile.current.click();
    };

    const addAttachment = (e) => {
        const files = Array.from(e.target.files);
        setData("comment", {
            ...data.comment,
            attachments: [...data.comment.attachments, ...files],
        });
        e.target.value = null;
    };

    const removeAttachment = (index) => {
        const newAttachments = [...data.comment.attachments];
        newAttachments.splice(index, 1);
        setData("comment", {
            ...data.comment,
            attachments: newAttachments,
        });
    };

    return (
        <>
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
                        onChange={(e) =>
                            setData("comment", {
                                ...data.comment,
                                description: e.target.value,
                            })
                        }
                        variant="bordered"
                        size="lg"
                    />
                </div>

                {data.comment.attachments.length > 0 && (
                    <div className="grid grid-cols-3 gap-3">
                        {data.comment.attachments.map((attachment, index) => (
                            <Attachment key={index} data={attachment}>
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
        </>
    );
}
