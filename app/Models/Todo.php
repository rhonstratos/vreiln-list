<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Todo extends Model
{
    use HasFactory;
    protected $table = 'todos';
    protected $fillable = [
        'group',
        'task',
        'priority',
        'is_done',
    ];

    protected $casts = [
        'priority' => 'integer',
        'is_done' => 'boolean',
    ];
}
