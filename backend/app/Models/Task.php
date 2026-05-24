<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use PHPUnit\Metadata\Before;

class Task extends Model
{
    protected $fillable = [
        'user_id',
        'assigned_to',
        'title',
        'description',
        'status',
        'priority',
        'due_date',
    ];

    protected $casts = [
        'due_date' => 'date'
    ];

    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }
    public function assignee(): BelongsTo
    {
        return $this->belongsTo(User::class, 'assigned_to');
    }
    public function isUrgent(): bool
    {
        if($this->due_date){
            return false;
        }
        return $this->due_date->diffInHours(Carbon::now()) <= 48;
    }
}
