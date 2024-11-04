import { Button, User } from "@nextui-org/react";
import { Link } from "@inertiajs/react";
import Attachment from "./Attachment";
import { Icon } from "@iconify-icon/react";

export default function Feed({ data }) {
    return (
        <div className="space-y-3">
            <User
                classNames={{
                    base: "gap-3",
                    name: "font-medium",
                }}
                name={data.user.name}
                description={data.created_at}
            />

            <div className="text-sm">{data.description}</div>

            <div className="grid grid-cols-3 gap-3">
                {data.attachments &&
                    data.attachments.map((attachment, index) => (
                        <Attachment key={index} data={attachment}>
                            <Button
                                href={route("medias.download", attachment.uuid)}
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
        </div>
    );
}
