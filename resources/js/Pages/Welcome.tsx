import { PageProps } from "@/types";
import { Head } from "@inertiajs/react";

export default function Welcome({
    auth,
    laravelVersion,
    phpVersion,
}: PageProps<{ laravelVersion: string; phpVersion: string }>) {
    return (
        <>
            <Head title="Welcome" />
            <main>
                <h2>Hello World</h2>
            </main>
        </>
    );
}
