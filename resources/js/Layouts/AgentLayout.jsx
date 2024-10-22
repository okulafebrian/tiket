import {
    Accordion,
    AccordionItem,
    Avatar,
    Button,
    Card,
    CardHeader,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
    Link,
} from "@nextui-org/react";
import { Icon } from "@iconify-icon/react";
import { usePage } from "@inertiajs/react";
import { useEffect } from "react";

export default function Authenticated({ children }) {
    const menus = [
        {
            name: "Dashboard",
            route: "dashboard",
            icon: "solar:widget-5-linear",
        },
        {
            name: "Tiket",
            route: "tickets.index",
            icon: "solar:ticket-linear",
        },
        {
            name: "Pengaturan",
            route: "settings.index",
            icon: "solar:settings-linear",
        },
    ];

    const { flash } = usePage().props;

    return (
        <div className="h-screen overflow-hidden flex flex-col">
            <nav className="px-7 py-2 flex items-center justify-between border-b">
                <Link>
                    <div className="text-xl font-semibold leading-tight text-gray-800">
                        Tiket
                    </div>
                </Link>
                <div className="flex items-center gap-3">
                    <Button
                        href={route("tickets.create")}
                        as={Link}
                        variant="light"
                        startContent={
                            <Icon icon="solar:add-square-linear" height={20} />
                        }
                    >
                        Tiket
                    </Button>
                    <Dropdown>
                        <DropdownTrigger>
                            <Avatar isBordered as="button" size="sm" />
                        </DropdownTrigger>
                        <DropdownMenu>
                            <DropdownItem
                                key="logout"
                                color="danger"
                                href={route("logout")}
                            >
                                Keluar
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>
            </nav>

            <div className="flex-1 flex divide-x overflow-auto">
                <div className="w-[14%]">
                    <div className="p-3 grid grid-cols-1 gap-1">
                        {menus.map((menu, index) => (
                            <Button
                                key={index}
                                href={route(menu.route)}
                                as={Link}
                                color="default"
                                variant="light"
                                startContent={
                                    <Icon icon={menu.icon} height={20} />
                                }
                                className="justify-start"
                            >
                                {menu.name}
                            </Button>
                        ))}
                    </div>
                </div>

                <div className="w-[86%] overflow-auto">{children}</div>
            </div>

            {flash?.message && (
                <div className="absolute bottom-0 p-4">
                    <Card radius="sm" className="w-72 bg-black text-white">
                        <CardHeader className="text-sm">
                            {flash.message}
                        </CardHeader>
                    </Card>
                </div>
            )}
        </div>
    );
}
