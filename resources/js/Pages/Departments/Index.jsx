import AgentLayout from "@/Layouts/AgentLayout";
import { Icon } from "@iconify-icon/react";
import { Head, Link, router } from "@inertiajs/react";
import {
    Button,
    Chip,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
    useDisclosure,
} from "@nextui-org/react";
import React from "react";

export default function Index({ departments }) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [selectedItem, setSelectedItem] = React.useState();

    return (
        <AgentLayout>
            <Head title="Departemen" />

            <div className="px-10 pt-8 pb-24 space-y-6">
                <div className="text-2xl font-semibold">Departemen</div>

                <div className="flex justify-between">
                    <Input
                        placeholder="Cari"
                        className="max-w-xs"
                        startContent={<Icon icon="solar:magnifer-linear" />}
                    />
                    <Button
                        href={route("departments.create")}
                        as={Link}
                        color="primary"
                        variant="solid"
                    >
                        Tambah
                    </Button>
                </div>

                <div className="border rounded-xl p-4">
                    <Table removeWrapper aria-label="Department table">
                        <TableHeader>
                            <TableColumn>NAMA</TableColumn>
                            <TableColumn>KODE</TableColumn>
                            <TableColumn>AKUN</TableColumn>
                            <TableColumn>TOPIK</TableColumn>
                            <TableColumn>STATUS</TableColumn>
                            <TableColumn></TableColumn>
                        </TableHeader>
                        <TableBody
                            items={departments}
                            emptyContent={"Data tidak tersedia."}
                        >
                            {(item) => (
                                <TableRow key={item.id}>
                                    <TableCell>{item.name}</TableCell>
                                    <TableCell>{item.code}</TableCell>
                                    <TableCell>{item.users_count}</TableCell>
                                    <TableCell>{item.topics_count}</TableCell>
                                    <TableCell>
                                        <Chip
                                            color={item.status.color}
                                            variant="flat"
                                        >
                                            {item.status.name}
                                        </Chip>
                                    </TableCell>
                                    <TableCell>
                                        <Dropdown>
                                            <DropdownTrigger>
                                                <Button
                                                    variant="light"
                                                    isIconOnly
                                                    aria-label="Menu"
                                                >
                                                    <Icon
                                                        icon="solar:menu-dots-bold"
                                                        height={20}
                                                    />
                                                </Button>
                                            </DropdownTrigger>
                                            <DropdownMenu aria-label="Action">
                                                <DropdownItem
                                                    key="edit"
                                                    onClick={() =>
                                                        router.get(
                                                            route(
                                                                "departments.edit",
                                                                item.id
                                                            )
                                                        )
                                                    }
                                                >
                                                    Edit
                                                </DropdownItem>
                                                <DropdownItem
                                                    key="delete"
                                                    onPress={() => {
                                                        onOpen();
                                                        setSelectedItem(item);
                                                    }}
                                                >
                                                    Hapus
                                                </DropdownItem>
                                            </DropdownMenu>
                                        </Dropdown>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>

            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                Hapus Departemen
                            </ModalHeader>
                            <ModalBody>
                                <div>{selectedItem.name}</div>
                            </ModalBody>
                            <ModalFooter>
                                <Button
                                    color="danger"
                                    variant="light"
                                    onPress={onClose}
                                >
                                    Batal
                                </Button>
                                <Button
                                    color="primary"
                                    onClick={() => {
                                        router.delete(
                                            route(
                                                "departments.destroy",
                                                selectedItem
                                            )
                                        );
                                        onClose();
                                    }}
                                >
                                    Hapus
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </AgentLayout>
    );
}
