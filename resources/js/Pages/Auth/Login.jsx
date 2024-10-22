import { Head, Link, useForm } from "@inertiajs/react";
import { Button, Card, CardBody, CardHeader, Input } from "@nextui-org/react";

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route("login"), {
            onFinish: () => reset("password"),
        });
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
                            <Input
                                id="password"
                                type="password"
                                label="Password"
                                value={data.password}
                                onChange={(e) =>
                                    setData("password", e.target.value)
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
