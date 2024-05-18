import { MoreHorizontal } from "lucide-react";

import { Badge } from "@/Components/ui/badge";
import { Button } from "@/Components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import { dateFormat } from "@/lib/utils";
import { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { ListResource, Todo } from "../Index";
import TodoDialog from "./TodoDialog";

export default function TodosTable({
    resource,
}: {
    resource: ListResource<Todo>;
}) {
    const [todo, setTodo] = useState<Todo | null>(null);
    const [open, setOpen] = useState(false);
    const [action, setAction] = useState<"create" | "edit" | "delete" | null>(
        "create"
    );

    const toggleDialog = (
        toggle: boolean,
        actionType: "create" | "edit" | "delete" | null,
        todo?: Todo | null
    ) => {
        if (!!todo && (actionType === "edit" || actionType === "delete")) {
            setTodo(todo);
        } else {
            setTodo(null);
        }
        setAction(actionType);
        setOpen(toggle);
    };

    const priorityMapping: Record<number, { label: string; class: string }> = {
        0: {
            label: "None",
            class: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        },
        1: {
            label: "Low",
            class: "bg-green-300 text-secondary-foreground hover:bg-green-300/80",
        },
        2: {
            label: "Medium",
            class: "bg-orange-300 text-secondary-foreground hover:bg-orange-300/80",
        },
        3: {
            label: "High",
            class: "bg-destructive text-primary-foreground hover:bg-destructive/80",
        },
    };

    return (
        <>
            {/* Modals */}
            <TodoDialog
                todo={todo}
                action={action}
                open={open}
                toggle={toggleDialog}
            />

            {/* Main */}
            <Card>
                <CardHeader className="flex flex-row justify-between">
                    <section>
                        <CardTitle>Todos</CardTitle>
                        <CardDescription>
                            Manage your todo list for the day.
                        </CardDescription>
                    </section>
                    <section>
                        <Button
                            variant="default"
                            size="icon"
                            className="rounded-full"
                            onClick={() => toggleDialog(true, "create")}
                        >
                            <FaPlus></FaPlus>
                        </Button>
                    </section>
                </CardHeader>
                <CardContent>
                    <Table className="overflow-auto">
                        <TableHeader>
                            <TableRow>
                                <TableHead>Todo</TableHead>
                                <TableHead>Priority</TableHead>
                                <TableHead>Group</TableHead>
                                <TableHead className="hidden md:table-cell">
                                    Is Done
                                </TableHead>
                                <TableHead className="hidden md:table-cell">
                                    Created at
                                </TableHead>
                                <TableHead>
                                    <span className="sr-only">Actions</span>
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {!!resource?.data &&
                                resource?.data?.length > 0 &&
                                resource?.data?.map((todo, i) => (
                                    <TableRow key={"todo_key_" + todo.id}>
                                        <TableCell className="font-medium">
                                            {todo.task}
                                        </TableCell>
                                        <TableCell>
                                            <Badge
                                                variant="default"
                                                className={
                                                    priorityMapping[
                                                        todo.priority
                                                    ].class
                                                }
                                            >
                                                {
                                                    priorityMapping[
                                                        todo.priority
                                                    ].label
                                                }
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="hidden md:table-cell">
                                            {todo?.group}
                                        </TableCell>
                                        <TableCell className="hidden md:table-cell">
                                            {todo.is_done ? "Yes" : "No"}
                                        </TableCell>
                                        <TableCell className="hidden md:table-cell">
                                            {dateFormat(todo.created_at)}
                                        </TableCell>
                                        <TableCell>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button
                                                        aria-haspopup="true"
                                                        size="icon"
                                                        variant="ghost"
                                                    >
                                                        <MoreHorizontal className="h-4 w-4" />
                                                        <span className="sr-only">
                                                            Toggle menu
                                                        </span>
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuLabel>
                                                        Actions
                                                    </DropdownMenuLabel>
                                                    <DropdownMenuItem
                                                        onClick={() =>
                                                            toggleDialog(
                                                                true,
                                                                "edit",
                                                                todo
                                                            )
                                                        }
                                                    >
                                                        Edit
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem
                                                        onClick={() =>
                                                            toggleDialog(
                                                                true,
                                                                "delete",
                                                                todo
                                                            )
                                                        }
                                                    >
                                                        Delete
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </CardContent>
                <CardFooter>
                    <div className="text-xs text-muted-foreground">
                        Showing{" "}
                        <strong>
                            {resource?.meta?.from ?? 0} -{" "}
                            {resource?.meta?.to ?? 0}
                        </strong>{" "}
                        {resource?.meta?.total > resource?.meta?.per_page ? (
                            <>
                                of <strong>{resource?.meta?.total ?? 0}</strong>
                            </>
                        ) : (
                            ""
                        )}{" "}
                        todos
                    </div>
                </CardFooter>
            </Card>
        </>
    );
}
