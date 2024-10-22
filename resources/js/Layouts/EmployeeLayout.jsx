import { usePage } from "@inertiajs/react";
import {
    Avatar,
    Button,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
    Link,
} from "@nextui-org/react";

export default function Guest({ children }) {
    const user = usePage().props.auth.user;

    return (
        <div className="h-screen flex flex-col">
            <nav className="px-60 py-3 flex justify-between items-center shadow-sm">
                <div className="text-xl font-semibold leading-tight text-gray-800">
                    Tiket
                </div>

                <Dropdown>
                    <DropdownTrigger>
                        <Avatar isBordered as="button" />
                    </DropdownTrigger>
                    <DropdownMenu>
                        <DropdownItem
                            key="mytickets"
                            href={route("tickets.history")}
                        >
                            Tiket Saya
                        </DropdownItem>
                        <DropdownItem
                            key="logout"
                            color="danger"
                            href={route("logout")}
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
