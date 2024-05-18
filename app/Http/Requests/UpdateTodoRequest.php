<?php

namespace App\Http\Requests;

use App\Models\Todo;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateTodoRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'group' => ['nullable', 'string'],
            'task' => ['required', 'string', 'max:255'],
            'priority' => ['nullable', 'string', 'in:0,1,2,3'],
        ];
    }
}
