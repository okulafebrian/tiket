import { Icon } from "@iconify-icon/react";
import { Card, CardBody } from "@nextui-org/react";

export default function Attachment({ data, children }) {
    const sizeInKB = data.size / 1024;
    const sizeInMB = sizeInKB / 1024;

    return (
        <Card
            shadow="sm"
            classNames={{ body: "flex flex-row items-center gap-3" }}
        >
            <CardBody>
                <Icon icon="solar:file-bold" height={36} />
                <div className="flex-1 truncate">
                    <div className="text-sm font-medium truncate">
                        {data.name}
                    </div>
                    <div className="text-xs">
                        {sizeInKB > 1000
                            ? `${sizeInMB.toFixed(2)} MB`
                            : `${sizeInKB.toFixed(2)} KB`}
                    </div>
                </div>
                {children}
            </CardBody>
        </Card>
    );
}
