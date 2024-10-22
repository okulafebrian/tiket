<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $admin = Role::create(['name' => 'admin']);
        $agent = Role::create(['name' => 'agent']);
        $employee = Role::create(['name' => 'employee']);

        $admin->givePermissionTo('dashboard');
        $agent->givePermissionTo('dashboard');
        $employee->givePermissionTo('dashboard');
    }
}
