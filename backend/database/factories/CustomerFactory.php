<?php

namespace Database\Factories;

use App\Models\Customer;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class CustomerFactory extends Factory
{
    protected $model = Customer::class;

    /**
     * Define the model's default state.
     */
    public function definition(): array
    {
        return [
            // إنشاء مستخدم جديد تلقائياً وربطه بالعميل
            'user_id' => User::factory(), 
            'phone' => fake()->numerify('+963 9## ### ###'), 
            'address' => fake()->city() . ', ' . fake()->streetAddress(),
            'date_of_birth' => fake()->date('Y-m-d', '-18 years'),
            'account_type' => fake()->randomElement(['savings', 'checking']),
            'account_balance' => fake()->randomFloat(2, 500, 75000), 
        ];
    }
}