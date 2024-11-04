import { Head, useForm } from "@inertiajs/react";
import { Button, Card, CardBody, CardHeader, Input } from "@nextui-org/react";

export default function Login({ status, canResetPassword, credential }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        credential: credential,
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route("login"));
    };

    return (
        <div className="h-screen flex items-center justify-center">
            <Head title="Log in" />

            <form onSubmit={submit}>
                <Card className="p-2">
                    <CardBody>
                        <div className="w-80 grid grid-cols-1 gap-4">
                            <Input
                                id="email"
                                type="email"
                                label="Email"
                                value={data.email}
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                                required
                            />
                            <Button
                                type="submit"
                                color="primary"
                                disabled={processing}
                            >
                                Masuk
                            </Button>
                        </div>
                    </CardBody>
                </Card>
            </form>
        </div>
    );
}
