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
import { useForm, usePage } from "@inertiajs/react";

export default function CreateTodoDialog({
    open,
    toggle,
}: {
    open: boolean;
    toggle: () => void;
}) {
    const { csrf_token }: any = usePage().props;

    const { data, setData, post, processing, errors } = useForm({
        group: "",
        task: "",
        priority: "",
        _token: csrf_token,
    });

    const handleSubmit = (e: any) => {
        e.preventDefault();
        post(route("todos.store"), {
            onSuccess: () => {
                toggle();
            },
        });
    };

    return (
        <Dialog open={open} onOpenChange={toggle}>
            <DialogClose />
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>New Todo</DialogTitle>
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
                            onChange={(e) => setData("task", e.target.value)}
                        />
                        <Label htmlFor="priority" className="text-right">
                            Priority
                        </Label>
                        <Select
                            name="priority"
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
                            Create
                        </Button>
                    </div>
                </section>
            </DialogContent>
        </Dialog>
    );
}
