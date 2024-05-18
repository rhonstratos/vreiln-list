<?php

namespace App\Http\Controllers;

use App\Http\Resources\TodoResource;
use App\Models\Todo;
use App\Http\Requests\StoreTodoRequest;
use App\Http\Requests\UpdateTodoRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TodoController extends Controller
{
    public function index(Request $request)
    {
        return Inertia::render('Todos/Index', [
            'todos' => TodoResource::collection(
                $request->user()
                    ->todos()
                    ->orderBy('priority', 'ASC')
                    ->orderBy('created_at', 'DESC')
                    ->paginate()
            ),
        ]);
    }
    public function create()
    {
        //
    }
    public function store(StoreTodoRequest $request)
    {
        //
    }
    public function show(Todo $todo)
    {
        //
    }
    public function edit(Todo $todo)
    {
        //
    }
    public function update(UpdateTodoRequest $request, Todo $todo)
    {
        //
    }
    public function destroy(Todo $todo)
    {
        //
    }
}
