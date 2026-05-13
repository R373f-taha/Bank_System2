<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Testimonials extends Model
{
    protected $guarded = [];

        protected $casts = [
        'rating' => 'integer',
        'is_approved' => 'boolean',
        'created_at' => 'datetime',
        'deleted_at' => 'datetime'
    ];

    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }

    public function scopeApproved($query)
    {
        return $query->where('is_approved', true);
    }

    public function scopePending($query)
    {
        return $query->where('is_approved', false);
    }

}
