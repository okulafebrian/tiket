import AgentLayout from "@/Layouts/AgentLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import {
    Autocomplete,
    AutocompleteItem,
    Button,
    Select,
    SelectItem,
    Textarea,
} from "@nextui-org/react";

export default function Create({ categories, locations, topics }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        topic_id: "",
        location_id: "",
        category: "",
        description: "",
    });

    const submit = (e) => {
        e.preventDefault();

        post(route("tickets.store"));
    };

    return (
        <AgentLayout>
            <Head title="Tiket Baru" />

            <form onSubmit={submit}>
                <div className="px-10 py-8 space-y-8">
                    <div className="text-2xl font-semibold">Tiket Baru</div>

                    <div className="w-1/2 grid grid-cols-2 gap-6">
                        <Autocomplete
                            id="topic_id"
                            label="Topik"
                            defaultItems={topics}
                            placeholder="Pilih topik"
                            labelPlacement="outside"
                            selectedKey={data.topic_id}
                            onSelectionChange={(value) =>
                                setData("topic_id", value)
                            }
                            className="col-span-2"
                        >
                            {(topic) => (
                                <AutocompleteItem key={topic.id}>
                                    {topic.name}
                                </AutocompleteItem>
                            )}
                        </Autocomplete>

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
                            id="location_id"
                            label="Lokasi Kejadian"
                            placeholder="Pilih lokasi"
                            labelPlacement="outside"
                            selectedKeys={[data.location_id]}
                            onChange={(e) =>
                                setData("location_id", e.target.value)
                            }
                        >
                            {locations.map((location) => (
                                <SelectItem key={location.id}>
                                    {location.name}
                                </SelectItem>
                            ))}
                        </Select>

                        <Textarea
                            id="description"
                            label="Keterangan"
                            labelPlacement="outside"
                            value={data.description}
                            onChange={(e) =>
                                setData("description", e.target.value)
                            }
                            className="col-span-2"
                        />
                    </div>

                    <div className="flex gap-3">
                        <Button type="submit" color="primary" size="lg">
                            Kirim
                        </Button>
                        <Button
                            href={route("tickets.index")}
                            as={Link}
                            color="primary"
                            variant="light"
                            size="lg"
                        >
                            Batal
                        </Button>
                    </div>
                </div>
            </form>
        </AgentLayout>
    );
}
