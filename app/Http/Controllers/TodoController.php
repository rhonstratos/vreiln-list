<?php

namespace App\Http\Controllers;

use App\Http\Resources\TodoResource;
use App\Models\Todo;
use App\Http\Requests\StoreTodoRequest;
use App\Http\Requests\UpdateTodoRequest;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TodoController extends Controller
{
    protected static function queryIndex(User $user)
    {
        return TodoResource::collection(
            $user
                ->todos()
                ->orderBy('priority', 'ASC')
                ->orderBy('created_at', 'DESC')
                ->paginate(parent::PAGINATION_COUNT)
        );
    }
    protected static function renderIndex(User $user)
    {
        return inertia('Todos/Index', [
            'resource' => self::queryIndex($user),
            'debug' => true
        ]);
    }

    public function index(Request $request)
    {
        return self::renderIndex($request->user());
    }
    public function store(StoreTodoRequest $request)
    {
        try {
            $validated = $request->validated();

            $todo = $request->user()->todos()->create(
                array_merge($validated, ['priority' => ($validated['priority'] ?? 0)])
            );

            return to_route('todos.index')
                ->with('success', 'Todo created successfully');

        } catch (Exception $e) {
            return back()->withInput()->withErrors(['error' => $e->getMessage()]);
        }
    }
    public function update(UpdateTodoRequest $request, Todo $todo)
    {
        try {
            $validated = $request->validated();

            $todo->update(
                array_merge($validated, ['priority' => ($validated['priority'] ?? 0)])
            );

            return to_route('todos.index')
                ->with('success', 'Todo updated successfully');

        } catch (Exception $e) {
            return back()->withInput()->withErrors(['error' => $e->getMessage()]);
        }
    }
    public function destroy(Todo $todo)
    {
        try {
            $todo->delete();

            return to_route('todos.index')
                ->with('success', 'Todo deleted successfully');

        } catch (Exception $e) {
            return back()->withErrors(['error' => $e->getMessage()]);
        }
    }
}
