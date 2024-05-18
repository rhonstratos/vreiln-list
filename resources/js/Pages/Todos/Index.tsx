import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { Head } from "@inertiajs/react";
import TodosTable from "./partials/TodosTable";
export type ListResource<T> = {
    data: T[];
    links: {
        first: string;
        last: string;
        prev?: string;
        next?: string;
    };
    meta: {
        current_page: number;
        from?: number | string;
        last_page: number;
        links: { url: string; active: boolean; label: string }[];
        path: string;
        per_page: number;
        to?: number | string;
        total: number;
    };
};
export type Todo = {
    id: number;
    user_id: number;
    task: string;
    group: string;
    priority: number;
    is_done: boolean;
    created_at: string;
};

export default function Todo({
    auth,
    resource,
}: PageProps & { resource: ListResource<Todo> }) {
    return (
        <AuthenticatedLayout user={auth.user} header={null}>
            <Head title="Todos" />
            <main className="px-5 lg:px-72 lg:py-10">
                <TodosTable resource={resource}></TodosTable>
            </main>
        </AuthenticatedLayout>
    );
}
