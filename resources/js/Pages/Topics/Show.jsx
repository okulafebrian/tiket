import EmployeeLayout from "@/Layouts/EmployeeLayout";
import { Head, useForm } from "@inertiajs/react";
import {
    Button,
    Card,
    CardBody,
    Select,
    SelectItem,
    Textarea,
} from "@nextui-org/react";

export default function Show({ topic, categories, locations }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        topic_id: topic.id,
        description: "",
    });

    const submit = (e) => {
        e.preventDefault();

        post(route("tickets.store"));
    };

    return (
        <EmployeeLayout>
            <Head title={topic.name} />

            <form onSubmit={submit}>
                <div className="px-60 py-16 space-y-16">
                    <div className="text-center text-4xl font-semibold">
                        {topic.name}
                    </div>

                    <div className="px-40 space-y-6">
                        <div className="grid grid-cols-2 gap-6">
                            <Select
                                id="category"
                                label="Kategori"
                                placeholder="Pilih kategori"
                                labelPlacement="outside"
                                selectedKeys={[data.category]}
                                onChange={(e) =>
                                    setData("category", e.target.value)
                                }
                            >
                                {categories.map((category) => (
                                    <SelectItem key={category.id}>
                                        {category.name}
                                    </SelectItem>
                                ))}
                            </Select>
                            <Select
                                id="location"
                                label="Lokasi Kejadian"
                                placeholder="Pilih lokasi kejadian"
                                labelPlacement="outside"
                                selectedKeys={[data.location]}
                                onChange={(e) =>
                                    setData("location", e.target.value)
                                }
                            >
                                {locations.map((location) => (
                                    <SelectItem key={location.id}>
                                        {location.name}
                                    </SelectItem>
                                ))}
                            </Select>
                        </div>

                        <Textarea
                            id="description"
                            label="Keterangan"
                            labelPlacement="outside"
                            value={data.description}
                            onChange={(e) =>
                                setData("description", e.target.value)
                            }
                        />

                        <Button type="submit" color="primary" size="lg">
                            Kirim
                        </Button>
                    </div>
                </div>
            </form>
        </EmployeeLayout>
    );
}
