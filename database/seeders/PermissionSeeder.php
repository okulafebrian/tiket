<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Permissions for dashboard
        Permission::firstOrCreate([
            'name' => 'dashboard'
        ]);

        // Permissions for tickets
        Permission::firstOrCreate([
            'name' => 'create tickets'
        ]);

        Permission::firstOrCreate([
            'name' => 'read tickets'
        ]);

        Permission::firstOrCreate([
            'name' => 'update tickets'
        ]);

        Permission::firstOrCreate([
            'name' => 'delete tickets'
        ]);

        Permission::firstOrCreate([
            'name' => 'assign tickets'
        ]);

        // Permissions for topics
        Permission::firstOrCreate([
            'name' => 'create topics'
        ]);

        Permission::firstOrCreate([
            'name' => 'read topics'
        ]);

        Permission::firstOrCreate([
            'name' => 'update topics'
        ]);

        Permission::firstOrCreate([
            'name' => 'delete topics'
        ]);

        // Permissions for departments
        Permission::firstOrCreate([
            'name' => 'create departments'
        ]);

        Permission::firstOrCreate([
            'name' => 'read departments'
        ]);

        Permission::firstOrCreate([
            'name' => 'update departments'
        ]);

        Permission::firstOrCreate([
            'name' => 'delete departments'
        ]);

        // Permissions for users
        Permission::firstOrCreate([
            'name' => 'create users'
        ]);

        Permission::firstOrCreate([
            'name' => 'read users'
        ]);

        Permission::firstOrCreate([
            'name' => 'update users'
        ]);

        Permission::firstOrCreate([
            'name' => 'delete users'
        ]);

        // Permissions for locations
        Permission::firstOrCreate([
            'name' => 'create locations'
        ]);

        Permission::firstOrCreate([
            'name' => 'read locations'
        ]);

        Permission::firstOrCreate([
            'name' => 'update locations'
        ]);

        Permission::firstOrCreate([
            'name' => 'delete locations'
        ]);

        // Permissions for roles
        Permission::firstOrCreate([
            'name' => 'read roles'
        ]);

        Permission::firstOrCreate([
            'name' => 'update roles'
        ]);
    }
}
