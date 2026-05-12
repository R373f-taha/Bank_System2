<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RoleSeeder extends Seeder
{
    public function run(): void
    {
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // ============ All Permissions (API Guard) ============

        // -- Customer Permissions --
        Permission::firstOrCreate(['name' => 'view balance', 'guard_name' => 'api']);
        Permission::firstOrCreate(['name' => 'transfer money', 'guard_name' => 'api']);
        Permission::firstOrCreate(['name' => 'apply for loan', 'guard_name' => 'api']);
        Permission::firstOrCreate(['name' => 'view transactions', 'guard_name' => 'api']);
        Permission::firstOrCreate(['name' => 'chat with ai', 'guard_name' => 'api']);
        Permission::firstOrCreate(['name' => 'register', 'guard_name' => 'api']);
        Permission::firstOrCreate(['name' => 'login', 'guard_name' => 'api']);
        Permission::firstOrCreate(['name' => 'submit testimonial', 'guard_name' => 'api']);
        Permission::firstOrCreate(['name' => 'view products', 'guard_name' => 'api']);

        // -- Employee Permissions --
        Permission::firstOrCreate(['name' => 'assist customers', 'guard_name' => 'api']);
        Permission::firstOrCreate(['name' => 'view customer accounts', 'guard_name' => 'api']);
        Permission::firstOrCreate(['name' => 'approve transactions', 'guard_name' => 'api']);
        Permission::firstOrCreate(['name' => 'reject transactions', 'guard_name' => 'api']);
        Permission::firstOrCreate(['name' => 'manage testimonials', 'guard_name' => 'api']);
        Permission::firstOrCreate(['name' => 'manage products', 'guard_name' => 'api']);
        Permission::firstOrCreate(['name' => 'manage features', 'guard_name' => 'api']);
        Permission::firstOrCreate(['name' => 'manage jobs', 'guard_name' => 'api']);
        Permission::firstOrCreate(['name' => 'manage job applications', 'guard_name' => 'api']);
        Permission::firstOrCreate(['name' => 'manage faqs', 'guard_name' => 'api']);
        Permission::firstOrCreate(['name' => 'manage pages', 'guard_name' => 'api']);
        Permission::firstOrCreate(['name' => 'view reports', 'guard_name' => 'api']);

        // -- Admin Permissions --
        Permission::firstOrCreate(['name' => 'manage users', 'guard_name' => 'api']);
        Permission::firstOrCreate(['name' => 'approve loans', 'guard_name' => 'api']);
        Permission::firstOrCreate(['name' => 'view audit logs', 'guard_name' => 'api']);
        Permission::firstOrCreate(['name' => 'manage mission vision', 'guard_name' => 'api']);
        Permission::firstOrCreate(['name' => 'manage press releases', 'guard_name' => 'api']);
        Permission::firstOrCreate(['name' => 'manage security measures', 'guard_name' => 'api']);
        Permission::firstOrCreate(['name' => 'manage benefits', 'guard_name' => 'api']);
        Permission::firstOrCreate(['name' => 'assign roles', 'guard_name' => 'api']);
        Permission::firstOrCreate(['name' => 'manage permissions', 'guard_name' => 'api']);
        Permission::firstOrCreate(['name' => 'access admin panel', 'guard_name' => 'api']);

        // ============ Roles ============

        // Admin Role - All permissions
        $admin = Role::firstOrCreate(['name' => 'admin', 'guard_name' => 'api']);
        $admin->givePermissionTo(Permission::where('guard_name', 'api')->get());

        // Employee Role
        $employee = Role::firstOrCreate(['name' => 'employee', 'guard_name' => 'api']);
        $employee->givePermissionTo([
            'assist customers',
            'view customer accounts',
            'approve transactions',
            'reject transactions',
            'view reports',
            'manage testimonials',
            'manage products',
            'manage features',
            'manage jobs',
            'manage job applications',
            'manage faqs',
            'manage pages',
            'view balance',
            'transfer money',
            'chat with ai',
            'login',
        ]);

        // Customer Role
        $customer = Role::firstOrCreate(['name' => 'customer', 'guard_name' => 'api']);
        $customer->givePermissionTo([
            'view balance',
            'transfer money',
            'apply for loan',
            'view transactions',
            'chat with ai',
            'register',
            'login',
            'submit testimonial',
            'view products',
        ]);

        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();
    }
}