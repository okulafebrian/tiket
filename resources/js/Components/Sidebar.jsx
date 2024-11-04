import { Button } from "@nextui-org/react";
import { Icon } from "@iconify-icon/react";
import { Link, usePage } from "@inertiajs/react";

export default function Sidebar() {
    const menus = [
        {
            name: "Dashboard",
            route: "dashboard",
            icon: "solar:widget-5-linear",
            permission: "dashboard",
        },
        {
            name: "Tiket",
            route: "tickets.index",
            icon: "solar:ticket-linear",
            permission: "read tickets",
        },
        {
            name: "Lokasi",
            route: "locations.index",
            icon: "solar:map-point-wave-linear",
            permission: "read locations",
        },
        {
            name: "Departemen",
            route: "departments.index",
            icon: "solar:structure-linear",
            permission: "read departments",
        },
        {
            name: "Topik",
            route: "topics.index",
            icon: "solar:hashtag-square-linear",
            permission: "read topics",
        },
        {
            name: "Akun",
            route: "users.index",
            icon: "solar:users-group-two-rounded-linear",
            permission: "read users",
        },
        {
            name: "Role",
            route: "roles.index",
            icon: "solar:shield-keyhole-linear",
            permission: "read roles",
        },
    ];

    const { can } = usePage().props.auth;

    return (
        <div className="p-3 grid grid-cols-1 gap-1">
            {menus.map((menu, index) => {
                return (
                    can[menu.permission] && (
                        <Button
                            key={index}
                            href={route(menu.route)}
                            as={Link}
                            color="default"
                            variant="light"
                            startContent={<Icon icon={menu.icon} height={20} />}
                            className="gap-3 justify-start"
                        >
                            {menu.name}
                        </Button>
                    )
                );
            })}
        </div>
    );
}
