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
        Role::create(['name' => 'super admin']);

        $admin = Role::create(['name' => 'admin']);
        $admin->givePermissionTo([
            'dashboard',
            'create users',
            'read users',
            'update users',
            'delete users',
            'create topics',
            'read topics',
            'update topics',
            'delete topics',
            'read departments',
        ]);

        $support1 = Role::create(['name' => 'support 1']);
        $support1->givePermissionTo([
            'dashboard',
            'create tickets',
            'read tickets',
            'update tickets',
            'delete tickets',
            'assign tickets'
        ]);

        $support2 = Role::create(['name' => 'support 2']);
        $support2->givePermissionTo([
            'dashboard',
            'create tickets',
            'read tickets',
            'update tickets',
            'delete tickets',
        ]);

        $support3 = Role::create(['name' => 'support 3']);
        $support3->givePermissionTo([
            'dashboard',
            'create tickets',
            'read tickets',
            'update tickets',
            'delete tickets',
        ]);
    }
}
