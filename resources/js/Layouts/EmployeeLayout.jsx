import { Link, router, usePage } from "@inertiajs/react";
import {
    Avatar,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
} from "@nextui-org/react";

export default function Guest({ children }) {
    const user = usePage().props.auth.user;

    return (
        <div className="h-screen flex flex-col">
            <nav className="px-60 py-3 flex justify-between items-center shadow-sm">
                <Link
                    href={route("home")}
                    className="text-xl font-semibold leading-tight text-gray-800"
                >
                    Tiket
                </Link>

                <Dropdown>
                    <DropdownTrigger>
                        <Avatar isBordered as="button" />
                    </DropdownTrigger>
                    <DropdownMenu>
                        <DropdownItem
                            key="mytickets"
                            onClick={() => router.get(route("tickets.history"))}
                        >
                            Tiket Saya
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
            </nav>

            <div>{children}</div>
        </div>
    );
}
