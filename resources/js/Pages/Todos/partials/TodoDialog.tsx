import { Button } from "@/Components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/Components/ui/dialog";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
import { toTitleCase } from "@/lib/utils";
import { useForm, usePage } from "@inertiajs/react";
import { useEffect } from "react";
import { Todo } from "../Index";

export default function TodoDialog({
    todo,
    action,
    open,
    toggle,
}: {
    todo: Todo | null;
    action: "create" | "edit" | null;
    open: boolean;
    toggle: (
        toggle: boolean,
        actionType: "create" | "edit" | null,
        todo?: Todo | null
    ) => void;
}) {
    const { csrf_token }: any = usePage().props;

    const { data, setData, post, put, processing, errors } = useForm<{
        group: string;
        task: string;
        priority: string;
        _token: string;
    }>({
        group: "",
        task: "",
        priority: "",
        _token: csrf_token,
    });

    // Update form data when todo changes
    useEffect(() => {
        if (!!todo && action === "edit") {
            setData({
                _token: csrf_token,
                group: todo?.group ?? "",
                task: todo?.task ?? "",
                priority: todo?.priority?.toString() ?? "",
            });
        }
    }, [todo, action]);

    const handleSubmit = (e: any) => {
        e.preventDefault();
        const routeAction = {
            create: "todos.store",
            edit: "todos.update",
        };
        if (!action) return alert("Invalid action");
        put(route(routeAction[action], todo?.id), {
            onSuccess: () => {
                toggle(false, null, null);
            },
        });
    };

    const handleOpenChange = () => {
        toggle(false, null);
    };

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogClose />
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{toTitleCase(action)} Todo</DialogTitle>
                    <DialogDescription>
                        This action cannot be undone. This will permanently
                        delete your account and remove your data from our
                        servers.
                    </DialogDescription>
                </DialogHeader>
                <section>
                    <form
                        id="create-todo-form"
                        onSubmit={handleSubmit}
                        className="grid grid-cols-[5rem,1fr] gap-4 place-items-center"
                    >
                        <input type="hidden" name="_token" value={csrf_token} />
                        <Label htmlFor="group" className="text-right">
                            Group
                        </Label>
                        <Input
                            name="group"
                            id="group"
                            placeholder="Chores"
                            type="text"
                            value={data?.group}
                            onChange={(e) => setData("group", e.target.value)}
                        />
                        <Label htmlFor="task" className="text-right">
                            Task
                        </Label>
                        <Input
                            name="task"
                            id="task"
                            required
                            placeholder="Clean my desk"
                            type="text"
                            value={data?.task}
                            onChange={(e) => setData("task", e.target.value)}
                        />
                        <Label htmlFor="priority" className="text-right">
                            Priority
                        </Label>
                        <Select
                            name="priority"
                            value={data?.priority}
                            onValueChange={(e) => setData("priority", e)}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue
                                    id="priority"
                                    placeholder="Select a priority"
                                />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="0">None</SelectItem>
                                <SelectItem value="1">Low</SelectItem>
                                <SelectItem value="2">Medium</SelectItem>
                                <SelectItem value="3">High</SelectItem>
                            </SelectContent>
                        </Select>
                    </form>
                    <div className="flex justify-end mt-6">
                        <Button
                            type="submit"
                            variant="default"
                            form="create-todo-form"
                            disabled={processing}
                        >
                            {toTitleCase(
                                action === "create" ? "Submit" : "Save"
                            )}
                        </Button>
                    </div>
                </section>
            </DialogContent>
        </Dialog>
    );
}
