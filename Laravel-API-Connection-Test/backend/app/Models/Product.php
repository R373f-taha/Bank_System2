<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $guarded = [];

     protected $casts = [
        'is_active' => 'boolean',
        'display_order' => 'integer',
        'created_at' => 'datetime',
        'updated_at' => 'datetime'
    ];

    public function features()
    {
        return $this->belongsToMany(Feature::class);
    }

    public function values()
    {
        return $this->hasMany(Value::class);
    }

    public function useCases()
    {
        return $this->hasMany(UseCase::class);
    }
}
