import {
    Avatar,
    Button,
    Card,
    CardHeader,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
} from "@nextui-org/react";
import { Icon } from "@iconify-icon/react";
import { Link, router, usePage } from "@inertiajs/react";
import Sidebar from "@/Components/Sidebar";

export default function Authenticated({ children }) {
    const { auth, flash } = usePage().props;

    return (
        <div className="h-screen overflow-hidden flex flex-col">
            <nav className="px-7 py-2 flex items-center justify-between border-b">
                <Link
                    href={route("dashboard")}
                    className="text-xl font-semibold leading-tight text-gray-800"
                >
                    Tiket
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
                        <DropdownMenu
                            aria-label="User dropdown"
                            disabledKeys={["profile"]}
                        >
                            <DropdownItem isReadOnly key="profile">
                                <div className="font-semibold">
                                    {auth.user.name}
                                </div>
                            </DropdownItem>
                            <DropdownItem
                                key="logout"
                                color="danger"
                                onClick={() => router.post(route("logout"))}
                            >
                                Keluar
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>
            </nav>

            <div className="flex-1 flex divide-x overflow-auto">
                <div className="w-[14%]">
                    <Sidebar />
                </div>

                <div className="w-[86%] overflow-auto relative">{children}</div>
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
