<?php

namespace Database\Seeders;

use App\Models\Ticket;
use App\Models\Topic;
use App\Services\TicketService;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            PermissionSeeder::class,
            RoleSeeder::class,
            DepartmentSeeder::class,
            UserSeeder::class,
            LocationSeeder::class,
            TicketSeeder::class
        ]);
    }
}
